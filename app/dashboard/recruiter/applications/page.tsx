import { Download, FileText } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import {
  AvatarInitials,
  DataTable,
  PageHeader,
  StatusBadge,
} from "@/components/dashboard/kit"
import { HLSelect } from "@/components/dashboard/form"
import { recruiterApplicants } from "@/components/dashboard/data"
import { Badge } from "@/components/ui/badge"

const STATUS_FLOW = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Rejected",
  "Offered",
] as const

export default async function RecruiterApplications() {
  await requireRole("recruiter")

  const columns = [
    { key: "applicant", label: "Applicant" },
    { key: "job", label: "Job Applied For" },
    { key: "applied", label: "Date Applied" },
    { key: "resume", label: "Resume" },
    { key: "status", label: "Status" },
  ]

  const rows = recruiterApplicants.map((applicant) => ({
    applicant: (
      <div className="flex items-center gap-3">
        <AvatarInitials name={applicant.name} />
        <div className="min-w-0">
          <p className="font-medium text-hl-text">{applicant.name}</p>
          <p className="truncate text-xs text-hl-muted">{applicant.email}</p>
        </div>
      </div>
    ),
    job: <span className="text-hl-muted">{applicant.job}</span>,
    applied: (
      <span className="whitespace-nowrap text-hl-muted">
        {applicant.applied}
      </span>
    ),
    resume: (
      <button
        type="button"
        className="flex items-center gap-1.5 text-sm text-hl-brand-text transition-colors hover:text-hl-brand-soft">
        <FileText className="size-3.5" />
        View
      </button>
    ),
    status: (
      <div className="flex items-center gap-2">
        <HLSelect
          aria-label={`Status for ${applicant.name}`}
          defaultValue={applicant.status}
          className="h-8 w-40 rounded-lg text-xs">
          {STATUS_FLOW.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </HLSelect>
        <StatusBadge status={applicant.status} />
      </div>
    ),
  }))

  return (
    <div className="space-y-8">
      <PageHeader
        title="Applicants"
        subtitle="Review candidates across every job post and move them through your pipeline."
        actions={
          <div className="flex items-center gap-2">
            <HLSelect
              aria-label="Filter by job post"
              defaultValue="all"
              className="h-9 w-52">
              <option value="all">All job posts</option>
              <option>Frontend Developer</option>
              <option>Senior Product Designer</option>
              <option>DevOps Specialist</option>
              <option>Product Marketing Lead</option>
              <option>QA Automation Engineer</option>
            </HLSelect>
            <Badge variant="neutral">5 CANDIDATES</Badge>
          </div>
        }/>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Applied", value: "1" },
          { label: "Under Review", value: "1" },
          { label: "Shortlisted", value: "1" },
          { label: "Offered", value: "1" },
        ].map((stage) => (
          <div
            key={stage.label}
            className="rounded-2xl border border-white/[0.06] bg-hl-card p-5">
            <p className="text-sm text-hl-muted">{stage.label}</p>
            <p className="mt-2 text-[1.75rem] leading-8 font-semibold text-hl-text">
              {stage.value}
            </p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-hl-card">
        <DataTable columns={columns} rows={rows} className="min-h-[200px]" />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] bg-hl-raise px-4 py-3">
          <p className="text-xs text-hl-muted">
            Changing a status emails the applicant automatically.
          </p>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs text-hl-muted transition-colors hover:text-hl-text">
            <Download className="size-3.5" />
            Export pipeline CSV
          </button>
        </div>
      </section>
    </div>
  )
}
