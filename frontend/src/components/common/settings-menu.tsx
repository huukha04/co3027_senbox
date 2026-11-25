import { useState } from "react"
import { useTheme } from "next-themes"
import { Languages, Moon, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

type Language = "en" | "vi"

function LanguageFlag({ language }: { language: Language }) {
  if (language === "vi") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 30 20"
        className="size-5 shrink-0 rounded-[3px] shadow-sm"
      >
        <rect width="30" height="20" rx="2" fill="#da251d" />
        <path
          d="m15 4 1.5 4.2 4.5.1-3.5 2.7 1.3 4.3-3.8-2.5-3.8 2.5 1.3-4.3L9 8.3l4.5-.1L15 4Z"
          fill="#ffde00"
        />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 30 20"
      className="size-5 shrink-0 rounded-[3px] shadow-sm"
    >
      <rect width="30" height="20" rx="2" fill="#012169" />
      <path d="M0 0h3.5L30 17.7V20h-3.5L0 2.3zm30 0h-3.5L0 17.7V20h3.5L30 2.3z" fill="#fff" />
      <path d="M0 0h1.6L30 18.9V20h-1.6L0 1.1zm30 0h-1.6L0 18.9V20h1.6L30 1.1z" fill="#c8102e" />
      <path d="M0 7h30v6H0zm12  -7h6v20h-6z" fill="#fff" />
      <path d="M0 8.5h30v3H0zm13.5-8.5h3v20h-3z" fill="#c8102e" />
    </svg>
  )
}

export default function SettingsMenu() {
  const { resolvedTheme, setTheme } = useTheme()
  const [language, setLanguage] = useState<Language>("vi")

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-foreground"
            aria-label="Settings"
            title="Settings"
          >
            <Settings aria-hidden="true" />
          </Button>
        }
      />
      <PopoverContent align="end" className="w-80 gap-4 rounded-xl border border-border p-4 shadow-xl">
        <PopoverHeader className="flex-row items-center gap-3 border-b border-border pb-3">
          <span className="grid size-9 place-items-center rounded-lg bg-orange-50 text-[#fb4b1f]">
            <Settings size={18} aria-hidden="true" />
          </span>
          <div>
            <PopoverTitle className="text-sm font-semibold">Settings</PopoverTitle>
            <PopoverDescription className="mt-0.5 text-xs">
              Appearance and language
            </PopoverDescription>
          </div>
        </PopoverHeader>

        <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background px-3 py-3">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-muted text-muted-foreground">
              <Moon size={17} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium">Dark mode</p>
              <p className="text-xs text-muted-foreground">Change appearance</p>
            </div>
          </div>
          <Switch
            checked={resolvedTheme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label="Dark mode"
          />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-muted text-muted-foreground">
              <Languages size={17} aria-hidden="true" />
            </span>
            <p className="text-sm font-medium">Language</p>
          </div>
          <Select
            value={language}
            onValueChange={(value) => {
              if (value === "vi" || value === "en") {
                setLanguage(value)
              }
            }}
          >
            <SelectTrigger id="settings-language" aria-label="Language" className="h-9 w-36 shrink-0 bg-background">
              <SelectValue>
                {language === "vi" ? (
                  <>
                    <LanguageFlag language="vi" />
                    <span>Tiếng Việt</span>
                  </>
                ) : (
                  <>
                    <LanguageFlag language="en" />
                    <span>English</span>
                  </>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              align="start"
              side="bottom"
              sideOffset={8}
              alignItemWithTrigger={false}
            >
              <SelectItem value="vi">
                <LanguageFlag language="vi" />
                <span>Tiếng Việt</span>
              </SelectItem>
              <SelectItem value="en">
                <LanguageFlag language="en" />
                <span>English</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  )
}
