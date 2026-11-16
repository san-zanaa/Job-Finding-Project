import { Search } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import {
  AvatarInitials,
  DataTable,
  GhostAction,
  PageHeader,
  StatusBadge,
} from "@/components/dashboard/kit"
import { HLInput, HLSelect } from "@/components/dashboard/form"
import { adminUsers } from "@/components/dashboard/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const STATS = [
  {
    label: "Total Active Users",
    value: "12,842",
    note: "+12% vs last month",
    tone: "success",
  },
  {
    label: "Recruiter Growth",
    value: "843",
    note: "High demand",
    tone: "success",
  },
  {
    label: "Suspended Accounts",
    value: "124",
    note: "0.8% of total",
    tone: "muted",
  },
  {
    label: "New Signups (24h)",
    value: "42",
    note: "Steady activity",
    tone: "warning",
  },
] as const

function userActions(role: string, status: string) {
  if (status === "Suspended") {
    return (
      <div className="flex items-center gap-2">
        <GhostAction tone="success">Activate</GhostAction>
        <GhostAction>Delete</GhostAction>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <GhostAction tone="brand">
        {role === "Seeker" ? "Make Recruiter" : "Make Seeker"}
      </GhostAction>
      <GhostAction tone="danger">Suspend</GhostAction>
    </div>
  )
}

export default async function AdminUsers() {
  await requireRole("admin")

  const columns = [
    { key: "name", label: "User Name" },
    { key: "email", label: "Email Address" },
    { key: "role", label: "Role" },
    { key: "joined", label: "Join Date" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ]

  const rows = adminUsers.map((user) => ({
    name: (
      <span className="flex items-center gap-3">
        <AvatarInitials name={user.name} />
        <span className="font-medium text-hl-text">{user.name}</span>
      </span>
    ),
    email: <span className="text-hl-muted">{user.email}</span>,
    role: (
      <span
        className={`rounded-full px-2 py-0.5 text-xs ${
          user.role === "Recruiter"
            ? "bg-hl-brand/15 text-hl-brand-soft"
            : "bg-white/[0.06] text-hl-muted"
        }`}>
        {user.role}
      </span>
    ),
    joined: (
      <span className="whitespace-nowrap text-hl-muted">{user.joined}</span>
    ),
    status: <StatusBadge status={user.status} />,
    actions: userActions(user.role, user.status),
  }))

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageHeader
          title="User Management"
          subtitle="Review, filter, and manage platform access for all users."/>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-hl-faint" />
            <HLInput
              aria-label="Search users by email"
              placeholder="Search by email..."
              className="h-9 w-64 pl-8"/>
          </div>
          <HLSelect
            aria-label="Filter by role"
            defaultValue="all"
            className="h-9 w-36">
            <option value="all">All Roles</option>
            <option>Seeker</option>
            <option>Recruiter</option>
          </HLSelect>
          <Button
            variant="secondary"
            className="h-9 rounded-xl bg-hl-text text-hl-bg hover:bg-white">
            Export List
          </Button>
        </div>
      </div>

      <section
        aria-label="User statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="space-y-3 rounded-2xl border border-white/[0.06] bg-hl-card p-5">
            <p className="text-sm text-hl-muted">{stat.label}</p>
            <p className="text-[1.75rem] leading-8 font-semibold text-hl-text">
              {stat.value}
            </p>
            <p
              className={`text-xs font-medium ${
                stat.tone === "success"
                  ? "text-hl-success"
                  : stat.tone === "warning"
                    ? "text-hl-warn"
                    : "text-hl-muted"
              }`}>
              {stat.note}
            </p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-hl-card">
        <DataTable columns={columns} rows={rows} />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] bg-hl-raise px-4 py-3">
          <p className="text-xs text-hl-muted">
            Role changes send a confirmation email to the affected user.
          </p>
          <Badge variant="neutral">4 ACCOUNTS SHOWN</Badge>
        </div>
      </section>
    </div>
  )
}
