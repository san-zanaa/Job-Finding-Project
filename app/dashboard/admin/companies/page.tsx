import { Building2 } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import {
  DataTable,
  GhostAction,
  PageHeader,
  StatusBadge,
} from "@/components/dashboard/kit"
import { HLSelect } from "@/components/dashboard/form"
import { adminCompanies } from "@/components/dashboard/data"
import { Badge } from "@/components/ui/badge"

function companyActions(status: string) {
  if (status === "Pending") {
    return (
      <div className="flex items-center gap-2">
        <GhostAction tone="success">Approve</GhostAction>
        <GhostAction tone="danger">Reject</GhostAction>
      </div>
    )
  }

  if (status === "Approved") {
    return <GhostAction tone="danger">Reject</GhostAction>
  }

  return <GhostAction tone="success">Approve</GhostAction>
}

export default async function AdminCompanies() {
  await requireRole("admin")

  const columns = [
    { key: "name", label: "Company Name" },
    { key: "recruiter", label: "Recruiter Email" },
    { key: "industry", label: "Industry" },
    { key: "status", label: "Status" },
    { key: "submitted", label: "Date Submitted" },
    { key: "actions", label: "Actions" },
  ]

  const rows = adminCompanies.map((company) => ({
    name: (
      <span className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-hl-chip text-xs font-semibold text-hl-brand-soft">
          {company.name[0]}
        </span>
        <span className="font-medium text-hl-text">{company.name}</span>
      </span>
    ),
    recruiter: <span className="text-hl-muted">{company.recruiter}</span>,
    industry: (
      <span className="rounded-md border border-white/[0.1] bg-white/[0.04] px-2 py-0.5 text-xs text-hl-text">
        {company.industry}
      </span>
    ),
    status: <StatusBadge status={company.status} />,
    submitted: (
      <span className="whitespace-nowrap text-hl-muted">
        {company.submitted}
      </span>
    ),
    actions: companyActions(company.status),
  }))

  const pending = adminCompanies.filter((c) => c.status === "Pending").length

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageHeader
          title="Manage Companies"
          subtitle="Approve or reject company registrations. Approved companies appear publicly on job listings."/>
        <div className="flex items-center gap-2">
          <HLSelect
            aria-label="Filter by status"
            defaultValue="all"
            className="h-9 w-44">
            <option value="all">All Statuses</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </HLSelect>
          <Badge variant="warning">{pending} PENDING REVIEW</Badge>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-hl-card">
        <DataTable columns={columns} rows={rows} />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] bg-hl-raise px-4 py-3">
          <p className="flex items-center gap-2 text-xs text-hl-muted">
            <Building2 className="size-3.5" />
            Approving a company makes it visible immediately across the
            platform.
          </p>
          <p className="text-xs text-hl-muted">5 of 4,281 companies</p>
        </div>
      </section>
    </div>
  )
}
