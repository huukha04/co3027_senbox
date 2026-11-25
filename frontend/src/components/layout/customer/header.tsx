import { ChevronDown, LogOut, ShoppingCart, UserRound } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCustomerAuth } from "@/components/common/customer-auth-context"
import SettingsMenu from "@/components/common/settings-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const navigation = [
  { label: "Home", href: "/", activeItem: "Home" },
  { label: "Pet Box", href: "/pet-profile", activeItem: "Pet Box" },
  { label: "Shop", href: "/shop", activeItem: "Shop" },
  { label: "Grooming", href: "/grooming", activeItem: "Grooming" },
  { label: "Subscription", href: "/account/subscriptions", activeItem: "Subscription" },
  { label: "Blog", href: "/blog", activeItem: "Blog" },
  { label: "Support", href: "/support", activeItem: "Support" },
] as const

export type CustomerNavItem = (typeof navigation)[number]["activeItem"]

type CustomerHeaderProps = {
  activeItem?: CustomerNavItem
}

export default function CustomerHeader({ activeItem }: CustomerHeaderProps) {
  const { user, signOut } = useCustomerAuth()
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate("/", { replace: true })
  }

  return (
    <header className="bg-background dark:bg-[#263238]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:flex-nowrap">
        <Link to="/" className="min-w-36">
          <span className="block text-xl font-extrabold leading-none text-[#fb4b1f]">SENBOX</span>
          <span className="mt-1 block text-[10px] text-muted-foreground">Caring, delivered.</span>
        </Link>

        <form action="/shop" className="order-3 flex w-full min-w-0 lg:order-none lg:flex-1 lg:px-8">
          <label className="sr-only" htmlFor="store-search">
            Search pet food, boxes, grooming
          </label>
          <Input
            id="store-search"
            name="q"
            type="search"
            placeholder="Search pet food, boxes, grooming..."
            className="h-10 rounded-r-none border-input text-xs"
          />
          <Button
            type="submit"
            className="h-10 rounded-l-none bg-[#fb4b1f] px-5 text-xs text-white hover:bg-[#e64018]"
          >
            Search
          </Button>
        </form>

        <div className="flex shrink-0 items-center gap-3 text-xs text-foreground sm:gap-4">
          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-9 shrink-0 rounded-md bg-[#fb4b1f] px-3 text-xs font-semibold text-white hover:bg-[#e64018] hover:text-white"
                  >
                    <UserRound size={16} aria-hidden="true" />
                    Account
                    <ChevronDown size={14} aria-hidden="true" />
                  </Button>
                }
              />
              <PopoverContent align="end" className="w-52 gap-1 p-2">
                <Link
                  to="/account"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  <UserRound size={16} aria-hidden="true" />
                  Account overview
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut size={16} aria-hidden="true" />
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              to="/login"
              className="inline-flex shrink-0 items-center rounded-md bg-[#fb4b1f] px-3 py-2 font-semibold text-white transition-colors hover:bg-[#e64018]"
            >
              Login
            </Link>
          )}
          <SettingsMenu />
          <Link to="/cart" className="flex items-center gap-1.5 font-semibold text-[#fb4b1f]">
            <ShoppingCart size={16} aria-hidden="true" />
            <span className="hidden sm:inline">Cart · 0</span>
            <span className="sm:hidden">0</span>
          </Link>
        </div>
      </div>

      <nav aria-label="Main navigation" className="bg-[#fb4b1f] text-white dark:bg-[#263238]">
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-4 sm:px-6">
          {navigation.map(({ label, href, activeItem: item }) => {
            const active = item === activeItem

            return (
              <Link
                key={label}
                to={href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 px-4 py-3 text-[11px] font-semibold uppercase transition-colors sm:px-6 ${
                  active
                    ? "bg-[#263238] dark:bg-[#fb4b1f] dark:shadow-[inset_0_-3px_0_#fff]"
                    : "hover:bg-[#e64018]"
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}