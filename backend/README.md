# SenBox Backend

Backend API của SenBox, xây dựng bằng FastAPI, SQLAlchemy và PostgreSQL. Hiện
backend cung cấp đăng ký, đăng nhập bằng email/mật khẩu và các endpoint kiểm tra
tình trạng ứng dụng/database.

## Công nghệ

- Python 3.12
- FastAPI và Uvicorn
- SQLAlchemy 2
- PostgreSQL với Psycopg 3
- Pydantic Settings
- JWT access token (HS256)
- Argon2 password hashing

## Cấu trúc chính

```text
backend/
├── app/
│   ├── core/
│   │   ├── config/       # Cấu hình ứng dụng và database
│   │   └── database/     # SQLAlchemy engine, Base, session và mixins
│   ├── features/
│   │   └── auth/         # Model, schema, repository, use case, router
│   ├── shared/
│   │   └── services/     # Password và token services
│   ├── main.py           # Khởi tạo FastAPI và database
│   └── router.py         # Ghép các feature router
├── tests/                # Unit tests
├── .env.example
├── requirements.txt
└── Dockerfile
```

## Cấu hình môi trường

Từ thư mục gốc repository, tạo `backend/.env` từ file mẫu (chỉ làm lần đầu):

```powershell
Copy-Item backend\.env.example backend\.env
```

Thiết lập các giá trị phù hợp với môi trường của bạn:

| Biến | Mô tả |
|---|---|
| `APP_NAME` | Tên ứng dụng trong OpenAPI |
| `APP_ENV` | Môi trường, ví dụ `development` hoặc `production` |
| `APP_PORT` | Port ứng dụng |
| `APP_DEBUG` | Bật/tắt debug |
| `APP_SECRET_KEY` | Secret dùng ký JWT; đặt giá trị ngẫu nhiên, tối thiểu 32 ký tự |
| `APP_CORS_ORIGINS` | Danh sách origin, phân cách bằng dấu phẩy |
| `APP_ACCESS_TOKEN_EXPIRE_MINUTES` | Thời hạn access token, mặc định 30 phút |
| `DB_TYPE` | SQLAlchemy URL scheme, ví dụ `postgresql+psycopg` |
| `DB_USER` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port |
| `DB_NAME` | Tên database |

Không commit file `.env` hoặc chia sẻ thông tin kết nối database.

## Chạy local

Đảm bảo PostgreSQL đang chạy, database đã được tạo và `backend/.env` trỏ đến
đúng database. Tạo virtual environment tại thư mục gốc repository:

```powershell
cd A:\Users\Workspace\co3027_senbox
python -m venv .venv
.\.venv\Scripts\Activate.ps1
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Ứng dụng đọc `.env` tương đối theo thư mục chạy, vì vậy hãy chạy Uvicorn trong
thư mục `backend`.

Khi khởi động, SQLAlchemy gọi `Base.metadata.create_all()` để tạo các bảng đã
được đăng ký với `Base` nếu chúng chưa tồn tại. PostgreSQL user cần quyền tạo
bảng trong schema `public` (thường là quyền `CREATE` trên schema). Để thêm bảng,
định nghĩa model kế thừa `Base` và đảm bảo model được import trước khi
`create_all()` chạy.

`create_all()` không cập nhật cấu trúc bảng đã tồn tại. Khi thay đổi cột hoặc
constraint của bảng hiện có, cần cập nhật schema database tương ứng.

## Soft delete và khóa ngoại

Model có thể dùng `SoftDeleteMixin` để đánh dấu bản ghi đã xóa bằng cách đặt
`deleted_at`, thay vì xóa vật lý khỏi database. Các truy vấn thông thường cần
lọc `deleted_at IS NULL`; nếu không, dữ liệu đã xóa mềm vẫn xuất hiện.

Hạn chế dùng `ON DELETE CASCADE` cho quan hệ cần giữ lịch sử:

- Soft delete là thao tác `UPDATE`, nên không kích hoạt `ON DELETE CASCADE`.
- Xóa vật lý bản ghi cha có thể xóa vĩnh viễn các bản ghi con.
- Nếu cần xóa mềm cả dữ liệu liên quan, hãy cập nhật `deleted_at` rõ ràng trong
  use case/repository; không dựa vào cascade của database.

Chỉ dùng `ON DELETE CASCADE` khi chủ ý xóa vật lý dữ liệu con cùng bản ghi cha.
Với unique constraint trên dữ liệu xóa mềm, cân nhắc partial unique index chỉ
áp dụng cho bản ghi còn hoạt động, như index email trong model `User`.

## API

Swagger UI: `http://127.0.0.1:8000/docs`

### Đăng ký

`POST /auth/register`

```json
{
  "email": "user@example.com",
  "password": "strong-password"
}
```

- Thành công: `201 Created`, trả về `id`, `email`, `active_at`.
- Email đã đăng ký: `409 Conflict`.
- Email hoặc password không hợp lệ: `422 Unprocessable Entity`.
- Password dài từ 8 đến 128 ký tự.

### Đăng nhập

`POST /auth/login`

```json
{
  "email": "user@example.com",
  "password": "strong-password"
}
```

Thành công trả về `access_token`, `token_type`, `expires_in` (giây) và thông
tin user. Sai email hoặc password trả về `401 Unauthorized`.

### Kiểm tra hệ thống

- `GET /health`: trạng thái ứng dụng và môi trường.
- `GET /db`: kiểm tra kết nối database.

## Chạy test

Khi virtual environment đã kích hoạt, chạy từ thư mục `backend`:

```powershell
python -m pytest
```

## Tham khảo

- [FastAPI Best Practices and Conventions](https://github.com/zhanymkanov/fastapi-best-practices)

