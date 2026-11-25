from pwdlib import PasswordHash


class PasswordService:
  def __init__(self) -> None:
    self._hasher = PasswordHash.recommended()

  def hash(self, password: str) -> str:
    return self._hasher.hash(password)

  def verify(self, password: str, hashed_password: str) -> bool:
    return self._hasher.verify(password, hashed_password)
