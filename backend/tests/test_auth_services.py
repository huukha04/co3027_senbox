from app.shared.services.password import PasswordService


def test_password_service_hashes_and_verifies_password() -> None:
  service = PasswordService()
  password = "strong-password"

  hashed_password = service.hash(password)

  assert hashed_password != password
  assert service.verify(password, hashed_password)
  assert not service.verify("wrong-password", hashed_password)
