import type { ReactNode } from "react"
import { Outlet, useLocation } from "react-router-dom"
import AdminHeader from "@/components/layout/admin/header"
import AdminSidebar, { type AdminSection } from "@/components/layout/admin/sidebar"

type AdminLayoutProps = {
  children?: ReactNode
  activeSection?: AdminSection
}

export default function AdminLayout({ children, activeSection }: AdminLayoutProps) {
  const { pathname } = useLocation()
  const routeSection = pathname.split("/")[2] ?? ""
  const routeSections: Record<string, AdminSection> = {
    products: "Products",
    inventory: "Inventory",
    transactions: "Transactions",
    grooming: "Grooming",
    staff: "Staff",
    reports: "Reports",
  }

  return (
    <div className="min-h-screen bg-background text-foreground md:flex">
      <AdminSidebar activeSection={activeSection ?? routeSections[routeSection] ?? "Dashboard"} />
      <div className="min-w-0 flex-1">
        <AdminHeader />
        <main className="mx-auto w-full max-w-[1500px] p-4 sm:p-7">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  )
}