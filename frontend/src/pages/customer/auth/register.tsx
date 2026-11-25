import { useState, type SubmitEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerWithSampleResponse } from "@/api/auth"
import { useCustomerAuth } from "@/components/common/customer-auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CustomerRegisterPage() {
  const { signIn } = useCustomerAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState("")

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "")
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")
    const confirmPassword = String(formData.get("confirmPassword") ?? "")

    if (password !== confirmPassword) {
      setFormError("Mật khẩu xác nhận không khớp.")
      return
    }

    setFormError("")
    const response = registerWithSampleResponse({ name, email, password })
    signIn(response.data.user, response.data.accessToken)
    navigate("/", { replace: true })
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Tạo tài khoản</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        API được gọi nền; trang nhận response mẫu ngay mà không chờ server.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="register-name" className="text-sm font-medium">Họ tên</label>
          <Input
            id="register-name"
            name="name"
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="register-email" className="text-sm font-medium">Email</label>
          <Input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="register-password" className="text-sm font-medium">Mật khẩu</label>
          <Input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="register-confirm-password" className="text-sm font-medium">
            Xác nhận mật khẩu
          </label>
          <Input
            id="register-confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        {formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}

        <Button type="submit" className="w-full bg-[#fb4b1f] text-white hover:bg-[#e64018]">
          Đăng ký
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Đã có tài khoản?{" "}
        <Link to="/login" className="font-medium text-[#fb4b1f] hover:underline">
          Đăng nhập
        </Link>
      </p>
    </section>
  )
}
