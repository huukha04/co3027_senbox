# SenBox

## Hướng dẫn theo từng phần

- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)

## Framework and Technology Stack

### Vite

**Vite** là công cụ build và dev server cho frontend hiện đại. Khi phát triển, Vite chạy project gần như ngay lập tức và cập nhật giao diện tức thì (HMR) mỗi khi sửa code. Khi đóng gói để deploy, nó tạo ra bản build đã tối ưu.

Trong dự án này, Vite kết hợp với React, TypeScript và Tailwind CSS.

**Cách dùng:**

```bash
cd frontend
npm install        # cài thư viện (lần đầu)
npm run dev        # chạy dev server tại http://localhost:5173
npm run build      # build bản production vào thư mục dist/
npm run preview    # chạy thử bản build
```

- Biến môi trường khai báo trong `.env`, bắt buộc bắt đầu bằng `VITE_`, đọc bằng `import.meta.env.VITE_API_URL`.
- Có thể import từ `src` bằng alias `@/`, ví dụ `import { cn } from "@/lib/utils"`.

**Tài liệu:**
- Vite docs: https://vite.dev/guide/
- Biến môi trường và mode: https://vite.dev/guide/env-and-mode

### Shadcn

**shadcn/ui** là bộ component giao diện (button, form, dialog, table…) xây trên Tailwind CSS và Radix UI. Khác với thư viện thông thường, shadcn **không cài thành package**: component được sao chép thẳng vào `src/components/ui/`, nên có thể sửa code theo ý mình.

**Cách dùng:**

```bash
npx shadcn@latest add button      # thêm một component
npx shadcn@latest add dialog input table   # thêm nhiều component
```

Sau đó import và dùng như component bình thường:

```tsx
import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button variant="outline">Lưu</Button>
}
```

**Đổi theme:** màu sắc và giao diện chung chỉnh trong `src/index.css`; cấu hình shadcn nằm trong `components.json`. Có thể dùng **shadcn studio** để chọn màu, bo góc, font trên giao diện trực quan rồi sinh CSS:
1. Vào Theme Generator, chỉnh màu và xem trước.
2. Copy đoạn CSS hoặc lệnh được tạo ra.
3. Dán đè phần biến màu (`:root` và `.dark`) trong `src/index.css`.

**Tài liệu:**
- shadcn/ui docs: https://ui.shadcn.com/docs
- Cài đặt với Vite: https://ui.shadcn.com/docs/installation/vite
- Danh sách component: https://ui.shadcn.com/docs/components
- shadcn studio Theme Generator: https://shadcnstudio.com/theme-generator
- shadcn studio Theme Editor: https://shadcnstudio.com/theme-editor
- Hướng dẫn dùng Theme Generator: https://shadcnstudio.com/docs/getting-started/theme-generator

### FastAPI

**FastAPI** là framework Python dùng để xây dựng API. Framework hỗ trợ kiểm tra
dữ liệu đầu vào bằng type hints và Pydantic, đồng thời tự tạo tài liệu OpenAPI
cho API.

Trong SenBox, FastAPI phục vụ API đăng ký/đăng nhập; SQLAlchemy kết nối
PostgreSQL, Argon2 dùng để băm mật khẩu và JWT dùng làm access token.

**Chạy backend local:**

```powershell
cd backend
Copy-Item .env.example .env   # chỉ chạy lần đầu, sau đó cấu hình thông tin DB
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

- Swagger UI: http://127.0.0.1:8000/docs
- API đăng ký: `POST /auth/register`
- API đăng nhập: `POST /auth/login`
- Kiểm tra trạng thái: `GET /health`
- Hướng dẫn backend: [backend/README.md](./backend/README.md)

**Tài liệu:**
- FastAPI: https://fastapi.tiangolo.com/
- FastAPI Best Practices: https://github.com/zhanymkanov/fastapi-best-practices




