from datetime import datetime, timedelta, timezone
from uuid import UUID

import jwt

from app.core.config import settings


class AccessTokenService:
  def create(self, user_id: UUID, email: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
      "sub": str(user_id),
      "email": email,
      "type": "access",
      "iat": now,
      "exp": now + timedelta(minutes=settings.app.access_token_expire_minutes),
    }
    return jwt.encode(payload, settings.app.secret_key, algorithm="HS256")

  def decode(self, token: str) -> UUID:
    try:
      payload = jwt.decode(
        token,
        settings.app.secret_key,
        algorithms=["HS256"],
      )
      if payload.get("type") != "access":
        raise ValueError("Invalid token type")
      return UUID(payload["sub"])
    except (jwt.PyJWTError, KeyError, TypeError, ValueError) as exc:
      raise ValueError("Invalid access token") from exc

  @property
  def expires_in(self) -> int:
    return settings.app.access_token_expire_minutes * 60
