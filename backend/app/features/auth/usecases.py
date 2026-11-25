from app.features.auth.repositories import AuthRepository
from app.shared.services.password import PasswordService
from app.shared.services.tokens import AccessTokenService


class AuthUseCases:
  def __init__(self, repository: AuthRepository) -> None:
    self.repository = repository
    self.passwords = PasswordService()
    self.access_tokens = AccessTokenService()

  def register(self, email: str, password: str):
    normalized_email = email.strip().lower()
    if self.repository.find_user_by_email(normalized_email) is not None:
      raise ValueError("Email is already registered")
    return self.repository.create_user(
      email=normalized_email,
      password_hash=self.passwords.hash(password),
    )

  def login(self, email: str, password: str):
    user = self.repository.find_user_by_email(email.strip().lower())
    if user is None or user.active_at is None:
      raise ValueError("Invalid email or password")
    if not self.passwords.verify(password, user.password_hash):
      raise ValueError("Invalid email or password")

    return user, self.access_tokens.create(user.id, user.email)
