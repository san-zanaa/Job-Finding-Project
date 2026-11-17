"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authClient, useSession } from "@/lib/auth-client"
import { DEFAULT_ROLE, isUserRole, ROLE_HOME, type UserRole } from "@/lib/roles"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Browse Jobs", href: "#" },
  { label: "Company", href: "#" },
  { label: "Pricing", href: "#" },
]

const roleLabels: Record<UserRole, string> = {
  seeker: "Job Seeker",
  recruiter: "Recruiter",
  admin: "Admin",
}

type SessionUser = { name?: string | null; image?: string | null }

function UserAvatar({
  user,
  className,
}: {
  user: SessionUser
  className?: string
}) {
  return (
    <Avatar size="default" className={className}>
      {user.image ? (
        <AvatarImage src={user.image} alt={user.name || "User"} />
      ) : null}
      <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
    </Avatar>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const user = session?.user

  const role = user && isUserRole(user.role) ? user.role : DEFAULT_ROLE
  const dashboardHref = ROLE_HOME[role]

  const handleSignOut = async () => {
    setIsProfileOpen(false)
    setIsOpen(false)
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  const closeMenus = () => {
    setIsProfileOpen(false)
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-md bg-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          {isPending ? null : user ? (
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full p-1 pr-2 transition-colors hover:bg-white/10"
                onClick={() => setIsProfileOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={isProfileOpen}>
                <UserAvatar user={user} />
                <span className="max-w-32 truncate text-sm font-medium text-gray-200">
                  {user.name || user.email}
                </span>
                <ChevronDown className="size-4 text-gray-400" />
              </button>

              {isProfileOpen && (
                <>
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-white/10 bg-[#12121a] p-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={user} className="size-10" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <span className="mt-3 inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-300">
                      {roleLabels[role]}
                    </span>
                    <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-3">
                      <Link
                        href={dashboardHref}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={closeMenus}>
                        <LayoutDashboard className="size-4" />
                        Go to Dashboard
                      </Link>
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={handleSignOut}>
                        <LogOut className="size-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
                Sign In
              </Link>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-indigo-600 text-white hover:bg-indigo-500">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}>
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-white/10 transition-all duration-300 md:hidden",
          isOpen ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0"
        )}>
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          ))}

          {isPending ? null : user ? (
            <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-4">
              <div className="flex items-center gap-3 px-3 py-2">
                <UserAvatar user={user} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
              <Link
                href={dashboardHref}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                onClick={closeMenus}>
                <LayoutDashboard className="size-4" />
                Go to Dashboard
              </Link>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                onClick={handleSignOut}>
                <LogOut className="size-4" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
              <Link
                href="/signin"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
              <Link href="/signup" className="w-full" onClick={() => setIsOpen(false)}>
                <Button
                  size="lg"
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-500">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
