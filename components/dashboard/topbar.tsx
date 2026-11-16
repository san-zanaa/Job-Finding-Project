"use client"

import {
  Bell,
  Menu,
  Search,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/roles"
import { AvatarInitials } from "./kit"

const SEARCH_PLACEHOLDER: Record<UserRole, string> = {
  seeker: "Search for opportunities...",
  recruiter: "Search jobs, companies, or skills...",
  admin: "Global search...",
}

export function DashboardTopbar({
  role,
  name,
  onOpenNav,
  className,
}: {
  role: UserRole
  name: string
  onOpenNav: () => void
  className?: string
}) {
  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center justify-between gap-4 border-b border-white/[0.06] bg-hl-surface px-4 lg:px-8",
        className
      )}>
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onOpenNav}
          aria-label="Open navigation"
          className="flex size-9 items-center justify-center rounded-lg text-hl-muted transition-colors hover:bg-hl-active hover:text-hl-text lg:hidden">
          <Menu className="size-5" />
        </button>

        <label className="relative w-full max-w-80">
          <span className="sr-only">Search</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-hl-faint" />
          <input
            type="search"
            placeholder={SEARCH_PLACEHOLDER[role]}
            className="h-9 w-full rounded-xl border border-white/[0.04] bg-hl-sunken pr-3 pl-9 text-sm text-hl-text placeholder:text-hl-faint focus:border-hl-brand/40 focus:ring-2 focus:ring-hl-brand/25 focus:outline-none"
          />
        </label>
      </div>

      <div className="flex items-center gap-1.5">
        {role === "admin" ? (
          <span className="mr-1 hidden items-center gap-1.5 rounded-full border border-hl-brand/30 bg-hl-brand/12 px-2.5 py-1 text-[10px] font-medium tracking-wide text-hl-brand-text uppercase sm:inline-flex">
            <ShieldCheck className="size-3.5" />
            Admin View
          </span>
        ) : null}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-9 items-center justify-center rounded-lg text-hl-muted transition-colors hover:bg-hl-active hover:text-hl-text">
          <Bell className="size-[18px]" />
          <span
            aria-hidden
            className="absolute top-2 right-2 size-1.5 rounded-full bg-hl-danger"
          />
        </button>
        <div
          aria-label="Signed in as placeholder"
          className="ml-1 flex size-8 items-center justify-center rounded-full">
          <AvatarInitials name={name} className="size-8" />
        </div>
      </div>
    </header>
  )
}
