# SenBox Frontend

Giao diện web của SenBox, gồm khu vực khách hàng và khu vực quản trị (admin).

## Chạy local

Cần cài Node.js và npm. Từ thư mục gốc repository, tạo file cấu hình frontend
(chỉ cần làm lần đầu):

```powershell
Copy-Item frontend\.env.example frontend\.env
```

Mở `frontend/.env` và đặt URL backend:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Mở terminal tại thư mục `frontend`, cài dependencies và chạy Vite:

```powershell
cd frontend
npm install
npm run dev
```

Truy cập `http://localhost:5173`. Khi cần kiểm tra bản production hoặc lint:

```powershell
npm run build
npm run lint
```

Backend cần chạy tại `http://127.0.0.1:8000` để nhận các request API. Lưu ý:
form đăng ký/đăng nhập hiện vẫn dùng response demo ở giao diện và gửi request API
ở chế độ nền; để kiểm tra kết quả API thật, xem Swagger tại
`http://127.0.0.1:8000/docs`.

## Framework and Technology Stack

| Công nghệ | Vai trò |
|-----------|---------|
| [Vite](https://vite.dev/guide/) | Dev server và công cụ build |
| React + TypeScript | Thư viện giao diện và ngôn ngữ |
| [Tailwind CSS](https://tailwindcss.com/docs) | Styling |
| [shadcn/ui](https://ui.shadcn.com/docs) | Bộ component giao diện |

## Cấu trúc thư mục

```
frontend/
├── public/                  # file tĩnh
├── src/
│   ├── api/                 # Axios client và các lời gọi API
│   ├── assets/              # ảnh, icon, font
│   ├── components/
│   │   ├── common/          # Settings, ThemeProvider, customer auth
│   │   ├── layout/
│   │   │   ├── admin/       # layout Admin
│   │   │   ├── auth/        # layout đăng nhập/đăng ký
│   │   │   └── customer/    # layout Customer
│   │   └── ui/              # component giao diện shadcn
│   ├── hooks/               # custom hook dùng chung
│   ├── lib/                 # tiện ích và thư viện nội bộ
│   ├── pages/
│   │   ├── admin/           # các trang quản trị
│   │   ├── customer/
│   │   │   └── auth/        # trang đăng nhập/đăng ký Customer
│   │   └── App.tsx          # ghép provider và router
│   ├── routes/
│   │   └── index.tsx        # khai báo route
│   ├── index.css            # Tailwind và biến theme
│   ├── index.tsx            # entrypoint React
│   └── utils.ts             # tiện ích dùng chung
├── .env.example             # ví dụ cấu hình VITE_API_URL
├── components.json          # cấu hình shadcn
├── index.html
├── vite.config.ts
├── package.json
└── package-lock.json
```

Quy ước:
- `components/ui/` chỉ chứa component do shadcn sinh ra; component tự viết đặt ở `common/`.
- Mỗi trang một file trong `pages/`, đặt tên theo trang.
- Luôn import bằng alias `@/`.