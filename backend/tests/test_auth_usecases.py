from datetime import datetime, timezone
from uuid import uuid4

import pytest

from app.features.auth.models import User
from app.features.auth.router import router as auth_router
from app.features.auth.usecases import AuthUseCases
from app.router import router


class FakeAuthRepository:
  def __init__(self) -> None:
    self.user: User | None = None

  def find_user_by_email(self, email: str) -> User | None:
    if self.user and self.user.email == email.strip().lower():
      return self.user
    return None

  def create_user(self, email: str, password_hash: str) -> User:
    self.user = User(
      id=uuid4(),
      email=email,
      password_hash=password_hash,
      active_at=datetime.now(timezone.utc),
    )
    return self.user


def test_register_normalizes_email_and_sets_active_at() -> None:
  repository = FakeAuthRepository()
  usecases = AuthUseCases(repository)

  user = usecases.register(" User@Example.com ", "strong-password")

  assert user.email == "user@example.com"
  assert user.active_at is not None
  assert user.password_hash != "strong-password"


def test_register_rejects_duplicate_email() -> None:
  repository = FakeAuthRepository()
  usecases = AuthUseCases(repository)
  usecases.register("user@example.com", "strong-password")

  with pytest.raises(ValueError, match="already registered"):
    usecases.register("USER@example.com", "another-password")


def test_login_returns_access_token_for_registered_user() -> None:
  repository = FakeAuthRepository()
  usecases = AuthUseCases(repository)
  user = usecases.register("user@example.com", "strong-password")

  logged_in_user, access_token = usecases.login(
    user.email,
    "strong-password",
  )

  assert logged_in_user.id == user.id
  assert usecases.access_tokens.decode(access_token) == user.id


def test_auth_router_exposes_only_registration_and_login() -> None:
  assert {route.path for route in auth_router.routes} == {
    "/register",
    "/login",
  }

  assert len(router.routes) == 1
