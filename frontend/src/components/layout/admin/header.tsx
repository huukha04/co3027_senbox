import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCustomerAuth } from "@/components/common/customer-auth-context"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import SettingsMenu from "@/components/common/settings-menu"

export default function AdminHeader() {
  const { signOut } = useCustomerAuth()
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate("/admin/login", { replace: true })
  }

  return (
    <header className="flex h-16 items-center justify-end gap-2 border-b border-border bg-background px-4 sm:px-7 dark:border-slate-600 dark:bg-[#263238]">
      <SettingsMenu />
      <Popover>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="rounded-full bg-orange-50 text-xs font-semibold text-[#fb4b1f] hover:bg-orange-100"
              aria-label="Admin account"
            >
              AD
            </Button>
          }
        />
        <PopoverContent align="end" className="w-40 p-2">
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut aria-hidden="true" />
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </header>
  )
}