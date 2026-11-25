
import json
import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.features.auth import models as auth_models  # noqa: F401
from app.core.config import settings
from app.core.database import Base, engine, get_db
from app.router import router

logger = logging.getLogger(__name__)


def export_openapi_schema(app: FastAPI) -> None:
  output_path = Path(__file__).resolve().parent.parent / ".docs" / "openapi.json"
  output_path.parent.mkdir(parents=True, exist_ok=True)
  output_path.write_text(
    json.dumps(app.openapi(), ensure_ascii=False, indent=2),
    encoding="utf-8",
  )


@asynccontextmanager
async def lifespan(app: FastAPI):
  Base.metadata.create_all(bind=engine)

  if settings.app.env in {"local", "development"}:
    export_openapi_schema(app)

  logger.info("Application started")

  yield

  # Shutdown
  engine.dispose()

  logger.info("Application stopped")


app = FastAPI(
  title=settings.app.name,
  debug=settings.app.debug,
  lifespan=lifespan,
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=[
    origin.strip()
    for origin in settings.app.cors_origins.split(",")
    if origin.strip()
  ],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(router)


@app.get("/health", tags=["System"])
def health_check():
  return {
    "status": "ok",
    "env": settings.app.env,
  }


@app.get("/db", tags=["System"])
def db_check(db: Session = Depends(get_db)):
  try:
    db.execute(text("SELECT 1"))
    return {
      "status": "ok",
      "db": "connected",
    }
  except Exception as e:
    logger.exception("Database connection failed")
    raise HTTPException(
      status_code=500,
      detail="Database connection error",
    ) from e
