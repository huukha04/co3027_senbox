from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
  email: EmailStr
  password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
  email: EmailStr
  password: str = Field(min_length=1, max_length=128)


class UserResponse(BaseModel):
  id: UUID
  email: EmailStr
  active_at: datetime | None

  model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
  access_token: str
  token_type: str = "bearer"
  expires_in: int
  user: UserResponse