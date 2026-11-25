from fastapi import (
  APIRouter,
  Depends,
  HTTPException,
  status,
)
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.features.auth.repositories import AuthRepository
from app.features.auth.usecases import AuthUseCases
from app.features.auth.schemas import (
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  UserResponse,
)


router = APIRouter()


def get_auth_usecases(db: Session = Depends(get_db)) -> AuthUseCases:
  return AuthUseCases(AuthRepository(db))


@router.post(
  "/register",
  response_model=UserResponse,
  status_code=status.HTTP_201_CREATED,
)
def register(
  payload: RegisterRequest,
  usecases: AuthUseCases = Depends(get_auth_usecases),
):
  try:
    return usecases.register(payload.email, payload.password)
  except ValueError as exc:
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail=str(exc),
    ) from exc
  except IntegrityError:
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail="Email is already registered",
    ) from None


@router.post("/login", response_model=TokenResponse)
def login(
  payload: LoginRequest,
  usecases: AuthUseCases = Depends(get_auth_usecases),
):
  try:
    user, access_token = usecases.login(payload.email, payload.password)
  except ValueError as exc:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail=str(exc),
      headers={"WWW-Authenticate": "Bearer"},
    ) from exc

  return TokenResponse(
    access_token=access_token,
    expires_in=settings.app.access_token_expire_minutes * 60,
    user=user,
  )
