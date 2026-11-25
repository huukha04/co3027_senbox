import { type SubmitEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginWithSampleResponse } from "@/api/auth"
import { useCustomerAuth } from "@/components/common/customer-auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CustomerLoginPage() {
  const { signIn } = useCustomerAuth()
  const navigate = useNavigate()

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    const response = loginWithSampleResponse({ email, password })
    signIn(response.data.user, response.data.accessToken)
    navigate("/", { replace: true })
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Đăng nhập</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        API được gọi nền; trang nhận response mẫu ngay mà không chờ server.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="login-email" className="text-sm font-medium">Email</label>
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="login-password" className="text-sm font-medium">Mật khẩu</label>
          <Input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-[#fb4b1f] text-white hover:bg-[#e64018]">
          Đăng nhập
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="font-medium text-[#fb4b1f] hover:underline">
          Đăng ký
        </Link>
      </p>
    </section>
  )
}
