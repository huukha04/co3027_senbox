from pydantic_settings import SettingsConfigDict
from app.core.config.base import CommonBaseSettings

class AppSetting(CommonBaseSettings):
  model_config = SettingsConfigDict(env_prefix="APP_")

  name: str
  env: str
  port: int
  debug: bool
  secret_key: str
  cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
  access_token_expire_minutes: int = 30