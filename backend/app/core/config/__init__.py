from functools import lru_cache
from pydantic_settings import BaseSettings

from app.core.config.app import AppSetting
from app.core.config.database import DatabaseSetting


class Settings(BaseSettings):
  app: AppSetting = AppSetting()
  db: DatabaseSetting = DatabaseSetting()

@lru_cache
def get_settings() -> Settings:
  return Settings()

# Export singleton để import dùng ở mọi nơi
settings = get_settings()

__all__ = ["settings", "get_settings", "Settings"]