import Link from "next/link"
import { Briefcase } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import {
  DataTable,
  GhostAction,
  PageHeader,
  PaginationFooter,
  StatusBadge,
} from "@/components/dashboard/kit"
import { recruiterJobPosts } from "@/components/dashboard/data"
import { Button } from "@/components/ui/button"

const CATEGORY_TONE: Record<string, string> = {
  Engineering: "text-hl-info",
  Design: "text-hl-warn",
  Infrastructure: "text-hl-info",
  Marketing: "text-hl-brand-text",
  Quality: "text-hl-brand-soft",
}

export default async function RecruiterJobs() {
  await requireRole("recruiter")

  const columns = [
    { key: "title", label: "Job Title & Dept" },
    { key: "company", label: "Company & Location" },
    { key: "type", label: "Type" },
    { key: "salary", label: "Compensation" },
    { key: "applicants", label: "Applicants" },
    { key: "status", label: "Status" },
    { key: "deadline", label: "Deadline" },
    { key: "actions", label: "Actions" },
  ]

  const rows = recruiterJobPosts.map((job) => ({
    title: (
      <div className="space-y-1.5">
        <p className="font-medium text-hl-text-strong">{job.title}</p>
        <p
          className={`text-xs font-medium ${
            CATEGORY_TONE[job.category] ?? "text-hl-muted"
          }`}
        >
          {job.category}
        </p>
      </div>
    ),
    company: (
      <div className="space-y-1.5">
        <p className="text-hl-text-strong">{job.company}</p>
        <p className="text-xs text-hl-muted">{job.location}</p>
      </div>
    ),
    type: (
      <span className="inline-flex items-center rounded-md border border-white/[0.1] bg-white/[0.04] px-2 py-0.5 text-xs whitespace-nowrap text-hl-text">
        {job.type}
      </span>
    ),
    salary: (
      <span className="font-medium whitespace-nowrap text-hl-text">
        {job.salary}
      </span>
    ),
    applicants: (
      <span
        className={`font-medium whitespace-nowrap ${
          Number.parseInt(job.applicants, 10) >= 20
            ? "text-hl-brand-text"
            : "text-hl-muted"
        }`}
      >
        {job.applicants}
      </span>
    ),
    status: <StatusBadge status={job.status} />,
    deadline: (
      <div className="space-y-1.5">
        <p className="whitespace-nowrap text-hl-text">{job.deadline}</p>
        <p className="text-xs text-hl-faint">{job.posted}</p>
      </div>
    ),
    actions: <GhostAction tone="brand">Update</GhostAction>,
  }))

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm">
          <span className="text-hl-muted">Manage Jobs</span>
          <span className="mx-1.5 text-hl-faint">/</span>
          <span className="text-hl-brand-text">Job Listings & Postings</span>
        </p>
        <PageHeader
          title="Manage Job Posts"
          subtitle="Review live listings, monitor applicants, and update job details across your organization."
          actions={
            <Link href="/dashboard/recruiter/jobs/new">
              <Button className="rounded-xl bg-hl-brand text-white hover:bg-hl-brand/85">
                <Briefcase data-icon="inline-start" />
                New Job Post
              </Button>
            </Link>
          }
        />
      </div>

      <section className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-white/[0.06] bg-hl-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-hl-muted">Plan usage — Growth tier</p>
            <p className="text-sm font-medium text-hl-text">
              4 / 10 active posts
            </p>
          </div>
          <div
            role="progressbar"
            aria-valuenow={4}
            aria-valuemin={0}
            aria-valuemax={10}
            aria-label="Active job posts used"
            className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full w-[40%] rounded-full bg-hl-brand" />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-hl-card p-5">
          <div>
            <p className="text-sm text-hl-muted">Total applicants</p>
            <p className="mt-1 text-xl font-semibold text-hl-text">100</p>
          </div>
          <Link
            href="/dashboard/recruiter/applications"
            className="text-sm text-hl-brand-text transition-colors hover:text-hl-brand-soft">
            View applicants →
          </Link>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-hl-card">
        <DataTable columns={columns} rows={rows} />
        <PaginationFooter label="Showing 5 of 48 job posts" />
      </section>
    </div>
  )
}
