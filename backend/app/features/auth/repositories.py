from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.features.auth.models import User


class AuthRepository:
  def __init__(self, db: Session) -> None:
    self.db = db

  def find_user_by_email(self, email: str) -> User | None:
    return self.db.scalar(
      select(User).where(
        User.email == email.strip().lower(),
        User.deleted_at.is_(None),
      ),
    )

  def create_user(self, email: str, password_hash: str) -> User:
    user = User(
      email=email.strip().lower(),
      password_hash=password_hash,
      active_at=datetime.now(timezone.utc),
    )
    self.db.add(user)
    self.db.commit()
    self.db.refresh(user)
    return user
