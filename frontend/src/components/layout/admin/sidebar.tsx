import {
  BarChart3,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  Package,
  Scissors,
  Users,
} from "lucide-react"
import { Link, NavLink } from "react-router-dom"

const sections = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Transactions", href: "/admin/transactions", icon: ClipboardList },
  { label: "Grooming", href: "/admin/grooming", icon: Scissors },
  { label: "Staff", href: "/admin/staff", icon: Users },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
] as const

export type AdminSection = (typeof sections)[number]["label"]

type AdminSidebarProps = {
  activeSection?: AdminSection
}

export default function AdminSidebar({ activeSection }: AdminSidebarProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col bg-[#1e2b30] text-white md:min-h-screen md:w-[215px]">
      <Link to="/admin" className="px-5 py-4">
        <span className="block text-xl font-bold tracking-tight">SenBox</span>
        <span className="block text-[10px] uppercase tracking-wide text-slate-400">Admin</span>
      </Link>

      <nav
        aria-label="Admin navigation"
        className="flex gap-1 overflow-x-auto px-2 pb-2 md:flex-1 md:flex-col md:overflow-visible md:py-3"
      >
        {sections.map(({ label, href, icon: Icon }) => {
          return (
            <NavLink
              key={label}
              to={href}
              end={href === "/admin"}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive || label === activeSection
                  ? "bg-[#fb4b1f] font-semibold text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={17} aria-hidden="true" />
              {label}
            </NavLink>
          )
        })}
      </nav>

      <div className="hidden px-5 py-5 text-xs text-slate-400 md:block">
        <p>Signed in as</p>
        <p className="mt-1 font-semibold text-white">Admin · Operations</p>
      </div>
    </aside>
  )
}