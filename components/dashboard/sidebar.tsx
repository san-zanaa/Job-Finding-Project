"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bookmark,
  Briefcase,
  Building2,
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Users,
} from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/roles"
import { AvatarInitials } from "./kit"

type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  seeker: [
    { label: "Dashboard", href: "/dashboard/seeker", icon: LayoutDashboard },
    { label: "Browse Jobs", href: "/dashboard/seeker/jobs", icon: Search },
    { label: "Saved Jobs", href: "/dashboard/seeker/saved", icon: Bookmark },
    {
      label: "Applications",
      href: "/dashboard/seeker/applications",
      icon: FileText,
    },
    { label: "Billing", href: "/dashboard/seeker/billing", icon: CreditCard },
    { label: "Settings", href: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { label: "Dashboard", href: "/dashboard/recruiter", icon: LayoutDashboard },
    { label: "My Company", href: "/dashboard/recruiter/company", icon: Building2 },
    { label: "Manage Jobs", href: "/dashboard/recruiter/jobs", icon: Briefcase },
    {
      label: "Applications",
      href: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    { label: "Billing", href: "/dashboard/recruiter/billing", icon: CreditCard },
    { label: "Settings", href: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Companies", href: "/dashboard/admin/companies", icon: Building2 },
    { label: "Jobs", href: "/dashboard/admin/jobs", icon: Briefcase },
    { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
    { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ],
}

const ROLE_META: Record<
  UserRole,
  { badge: string; cta: { label: string; href: string } }
> = {
  seeker: { badge: "Free plan", cta: { label: "Upgrade Plan", href: "/#pricing" } },
  recruiter: {
    badge: "Premium account",
    cta: { label: "Post a Job", href: "/dashboard/recruiter/jobs/new" },
  },
  admin: {
    badge: "Super Admin",
    cta: { label: "Payments", href: "/dashboard/admin/payments" },
  },
}

export function DashboardSidebar({
  role,
  name,
  email,
  onNavigate,
}: {
  role: UserRole
  name: string
  email: string
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const items = NAV_BY_ROLE[role]
  const meta = ROLE_META[role]

  async function handleSignOut() {
    const { error } = await authClient.signOut()

    if (!error) {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <aside className="flex h-full w-[248px] shrink-0 flex-col gap-5 overflow-y-auto bg-hl-bg px-3 py-5">
      {/* Brand */}
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-2 px-2">
        <Image
          src="/assets/logo.png"
          alt="HireLoop"
          width={112}
          height={32}
          className="h-7 w-auto"
        />
        <span className="text-[10px] font-medium tracking-[0.14em] text-hl-faint uppercase">
          Portal
        </span>
      </Link>

      {/* Identity card */}
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-hl-card p-3">
        <AvatarInitials name={name} className="size-8" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-hl-text-strong">
            {name}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="truncate text-xs text-hl-muted capitalize">
              {role === "admin" ? "Administrator" : role}
            </span>
            <span
              role="separator"
              className="size-1 rounded-full bg-hl-faint"
            />
          </div>
        </div>
        <span className="rounded-full border border-hl-brand/30 bg-hl-brand/15 px-2 py-0.5 text-[10px] font-medium text-hl-brand-soft">
          {meta.badge}
        </span>
      </div>

      {/* Role-based navigation */}
      <nav className="flex flex-col gap-1" aria-label="Dashboard">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== `/dashboard/${role}` &&
              pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex h-[34px] items-center gap-3 rounded-lg px-3 text-sm transition-colors",
                active
                  ? "bg-hl-active text-hl-text-strong"
                  : "text-hl-muted hover:bg-hl-hover hover:text-hl-text"
              )}>
              {active ? (
                <span
                  aria-hidden
                  className="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-full bg-hl-brand"
                />
              ) : null}
              <item.icon className="size-[18px] shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Public pages */}
      <div className="mt-1 flex flex-col gap-1 border-t border-white/[0.06] pt-4">
        <p className="px-3 pb-1 text-[10px] font-medium tracking-[0.14em] text-hl-faint uppercase">
          Explore
        </p>
        <Link
          href="/"
          onClick={onNavigate}
          className="flex h-[34px] items-center gap-3 rounded-lg px-3 text-sm text-hl-muted transition-colors hover:bg-hl-hover hover:text-hl-text">
          <Home className="size-[18px] shrink-0" />
          <span>Home</span>
        </Link>
        <Link
          href="/#pricing"
          onClick={onNavigate}
          className="flex h-[34px] items-center gap-3 rounded-lg px-3 text-sm text-hl-muted transition-colors hover:bg-hl-hover hover:text-hl-text">
          <CreditCard className="size-[18px] shrink-0" />
          <span>Pricing</span>
        </Link>
      </div>

      <div className="flex-1" />

      {/* Footer: CTA + user + logout */}
      <div className="flex flex-col gap-3">
        <Link
          href={meta.cta.href}
          onClick={onNavigate}
          className="flex h-10 items-center justify-center rounded-xl bg-hl-text text-sm font-medium text-hl-bg transition-colors hover:bg-white">
          {meta.cta.label}
        </Link>

        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-hl-card p-2 pl-3">
          <AvatarInitials name={name} className="size-8" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-hl-text-strong">{name}</p>
            <p className="truncate text-xs text-hl-faint">{email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex h-[34px] items-center gap-3 rounded-lg px-3 text-sm text-hl-muted transition-colors hover:bg-hl-hover hover:text-hl-danger">
          <LogOut className="size-[18px] shrink-0" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}
