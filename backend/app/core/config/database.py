from pydantic_settings import SettingsConfigDict
from app.core.config.base import CommonBaseSettings


class DatabaseSetting(CommonBaseSettings):
  model_config = SettingsConfigDict(env_prefix="DB_")

  type: str
  user: str
  password: str
  host: str
  port: int
  name: str

  @property
  def url(self) -> str:
    return f"{self.type}://{self.user}:{self.password}@{self.host}:{self.port}/{self.name}"