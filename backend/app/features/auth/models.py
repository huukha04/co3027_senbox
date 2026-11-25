from datetime import datetime
from sqlalchemy import Index, String, text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import (
  Base,
  SoftDeleteMixin,
  TimestampMixin,
  UUIDPrimaryKeyMixin,
)


class User(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
  __tablename__ = "users"
  __table_args__ = (
    Index(
      "uq_users_email_active",
      "email",
      unique=True,
      postgresql_where=text("deleted_at IS NULL"),
    ),
  )

  email: Mapped[str] = mapped_column(String(255), nullable=False)
  password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
  active_at: Mapped[datetime | None] = mapped_column(nullable=True)