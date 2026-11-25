import type { ReactNode } from "react"
import { Link } from "react-router-dom"

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-5 text-foreground">
      <main className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-card-foreground shadow-sm">
        <Link to="/" className="mb-8 inline-block text-xl font-extrabold text-[#fb4b1f]">
          SENBOX
        </Link>
        {children}
      </main>
    </div>
  )
}
