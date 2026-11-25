import type { ReactNode } from "react"
import { Outlet, useLocation } from "react-router-dom"
import CustomerFooter from "@/components/layout/customer/footer"
import CustomerHeader, { type CustomerNavItem } from "@/components/layout/customer/header"

type CustomerLayoutProps = {
  children?: ReactNode
  activeItem?: CustomerNavItem
}

export default function CustomerLayout({ children, activeItem }: CustomerLayoutProps) {
  const { pathname } = useLocation()
  const navigationItems: Array<{ path: string; item: CustomerNavItem }> = [
    { path: "/pet-profile", item: "Pet Box" },
    { path: "/shop", item: "Shop" },
    { path: "/grooming", item: "Grooming" },
    { path: "/account/subscriptions", item: "Subscription" },
    { path: "/blog", item: "Blog" },
    { path: "/support", item: "Support" },
  ]
  const currentItem =
    activeItem ??
    (pathname === "/"
      ? "Home"
      : navigationItems.find(({ path }) => pathname.startsWith(path))?.item)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <CustomerHeader activeItem={currentItem} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 sm:py-6">
        {children ?? <Outlet />}
      </main>
      <CustomerFooter />
    </div>
  )
}