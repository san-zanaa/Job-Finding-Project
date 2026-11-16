import { Download } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import {
  AvatarInitials,
  DataTable,
  PageHeader,
  PaginationFooter,
  StatCard,
  StatusBadge,
} from "@/components/dashboard/kit"
import { seekerApplications } from "@/components/dashboard/data"
import { Button } from "@/components/ui/button"

export default async function SeekerApplications() {
  await requireRole("seeker")

  const columns = [
    { key: "job", label: "Job Title" },
    { key: "company", label: "Company" },
    { key: "applied", label: "Applied" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ]

  const rows = seekerApplications.rows.map((row) => ({
    job: (
      <span className="block">
        <span className="font-medium text-hl-text">{row.job}</span>
        <span className="mt-0.5 block text-xs text-hl-muted">{row.meta}</span>
      </span>
    ),
    company: (
      <span className="flex items-center gap-2 text-hl-text">
        <AvatarInitials name={row.company} className="size-8" />
        {row.company}
      </span>
    ),
    applied: <span className="text-hl-muted">{row.applied}</span>,
    status: <StatusBadge status={row.status} />,
    action: (
      <Button
        variant="ghost"
        size="sm"
        className="text-hl-text hover:bg-hl-active hover:text-hl-text">
        Details
      </Button>
    ),
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Applications"
        subtitle="Track your job applications and interview progress in real-time."
        actions={
          <>
            <div className="flex h-10 items-center rounded-xl border border-white/[0.06] bg-hl-card p-1">
              <button
                type="button"
                className="h-8 rounded-lg bg-hl-raise px-3 text-xs font-medium text-hl-text">
                Active
              </button>
              <button
                type="button"
                className="h-8 rounded-lg px-3 text-xs text-hl-muted transition-colors hover:text-hl-text">
                Archived
              </button>
            </div>
            <Button className="rounded-xl bg-hl-text text-hl-bg hover:bg-white">
              <Download data-icon="inline-start" />
              Export PDF
            </Button>
          </>
        }
      />

      <section
        aria-label="Application stats"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {seekerApplications.stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            tone={("tone" in stat ? stat.tone : "neutral") as
              | "success"
              | "warning"
              | "neutral"}
          />
        ))}
      </section>

      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-hl-card">
        <DataTable columns={columns} rows={rows} />
        <PaginationFooter label="Showing 1-5 of 24 applications" />
      </div>
    </div>
  )
}
