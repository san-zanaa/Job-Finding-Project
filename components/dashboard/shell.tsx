"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/roles"
import { DashboardSidebar } from "./sidebar"
import { DashboardTopbar } from "./topbar"

/**
 * Responsive dashboard frame: fixed role-based sidebar on desktop, slide-over
 * drawer on mobile, and a shared topbar rendered above the page content.
 */
export function DashboardShell({
  role,
  name,
  email,
  children,
}: {
  role: UserRole
  name: string
  email: string
  children: React.ReactNode
}) {
  const [navOpen, setNavOpen] = useState(false)

  // Close the drawer whenever the viewport grows past the desktop breakpoint.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)")
    const listener = () => {
      if (media.matches) setNavOpen(false)
    }
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [])

  return (
    <div className="flex min-h-screen bg-hl-surface text-hl-text">
      {/* Desktop sidebar */}
      <div className="sticky top-0 hidden h-screen lg:block">
        <DashboardSidebar role={role} name={name} email={email} />
      </div>

      {/* Mobile drawer + scrim */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          navOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!navOpen}>
        <div
          className={cn(
            "absolute inset-0 bg-black/60 transition-opacity duration-300",
            navOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setNavOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 transition-transform duration-300 ease-out",
            navOpen ? "translate-x-0" : "-translate-x-full"
          )}>
          <DashboardSidebar
            role={role}
            name={name}
            email={email}
            onNavigate={() => setNavOpen(false)}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar
          role={role}
          name={name}
          onOpenNav={() => setNavOpen(true)}
        />
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-290">{children}</div>
        </main>
      </div>
    </div>
  )
}
