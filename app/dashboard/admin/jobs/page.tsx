import { Eye, Search, Trash2 } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import {
  DataTable,
  GhostAction,
  PageHeader,
  StatusBadge,
} from "@/components/dashboard/kit"
import { HLInput, HLSelect } from "@/components/dashboard/form"
import { adminJobs, jobInsights } from "@/components/dashboard/data"
import { Button } from "@/components/ui/button"

const NOTE_TONE = {
  success: "text-hl-success",
  neutral: "text-hl-muted",
  warning: "text-hl-warn",
} as const

export default async function AdminJobs() {
  await requireRole("admin")

  const columns = [
    { key: "title", label: "Title" },
    { key: "company", label: "Company" },
    { key: "category", label: "Category" },
    { key: "type", label: "Type" },
    { key: "posted", label: "Date Posted" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ]

  const rows = adminJobs.map((job) => ({
    title: (
      <span className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-hl-chip text-xs font-semibold text-hl-brand-soft">
          {job.company[0]}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium text-hl-text">
            {job.title}
          </span>
          <span className="mt-0.5 block text-xs text-hl-muted">{job.ref}</span>
        </span>
      </span>
    ),
    company: <span className="text-hl-muted">{job.company}</span>,
    category: (
      <span className="rounded-md border border-white/[0.1] bg-white/[0.04] px-2 py-0.5 text-xs text-hl-text">
        {job.category}
      </span>
    ),
    type: <span className="text-hl-muted">{job.type}</span>,
    posted: (
      <span className="whitespace-nowrap text-hl-muted">{job.posted}</span>
    ),
    status: <StatusBadge status={job.status} />,
    actions: (
      <div className="flex items-center gap-2">
        <GhostAction tone="brand">
          <Eye className="size-3.5" />
          View
        </GhostAction>
        <GhostAction tone="danger">
          <Trash2 className="size-3.5" />
          Remove
        </GhostAction>
      </div>
    ),
  }))

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageHeader
          title="Manage Jobs"
          subtitle="Oversee all active listings and historical job posts across the platform."/>
        <Button className="h-9 rounded-xl bg-hl-text text-hl-bg hover:bg-white">
          Create Job
        </Button>
      </div>

      <section className="flex flex-wrap items-end gap-4 rounded-2xl border border-white/[0.06] bg-hl-card p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-hl-faint" />
          <HLInput
            aria-label="Search jobs"
            placeholder="Search by job title or company..."
            className="h-9 w-72 pl-8"/>
        </div>
        <div className="space-y-1.5">
          <p className="text-xs text-hl-muted">Status</p>
          <HLSelect
            aria-label="Filter by status"
            defaultValue="all"
            className="h-9 w-44">
            <option value="all">All Statuses</option>
            <option>Active</option>
            <option>Closed</option>
          </HLSelect>
        </div>
        <div className="space-y-1.5">
          <p className="text-xs text-hl-muted">Category</p>
          <HLSelect
            aria-label="Filter by category"
            defaultValue="all"
            className="h-9 w-44">
            <option value="all">All Categories</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>Marketing</option>
          </HLSelect>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-sm text-hl-muted transition-colors hover:text-hl-text">
            Active (128)
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-sm text-hl-muted transition-colors hover:text-hl-text">
            Closed (45)
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-hl-card">
        <DataTable columns={columns} rows={rows} />
      </section>

      <section aria-label="Job insights" className="grid gap-4 md:grid-cols-3">
        {jobInsights.map((insight) => (
          <div
            key={insight.label}
            className="space-y-2 rounded-2xl border border-white/[0.06] bg-hl-card p-5">
            <p className="text-sm text-hl-muted">{insight.label}</p>
            <p className="text-[1.75rem] leading-8 font-semibold text-hl-text">
              {insight.value}
            </p>
            <p
              className={`text-xs font-medium ${NOTE_TONE[insight.tone as keyof typeof NOTE_TONE]}`}>
              {insight.note}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
