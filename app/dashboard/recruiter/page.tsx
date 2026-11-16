import Link from "next/link"
import {
  Briefcase,
  CheckCircle2,
  FileStack,
  Users,
} from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import {
  AvatarInitials,
  DataTable,
  PageHeader,
  SectionTitle,
  StatCard,
  StatusBadge,
} from "@/components/dashboard/kit"
import { recentApplications, recruiterStats } from "@/components/dashboard/data"
import { Button } from "@/components/ui/button"

const STAT_ICONS = [FileStack, Users, Briefcase, CheckCircle2]

export default async function RecruiterDashboard() {
  const user = await requireRole("recruiter")

  const columns = [
    { key: "name", label: "Candidate Name" },
    { key: "role", label: "Role" },
    { key: "date", label: "Date Applied" },
    { key: "experience", label: "Experience" },
    { key: "status", label: "Status" },
  ]

  const rows = recentApplications.map((application) => ({
    name: (
      <span className="flex items-center gap-3">
        <AvatarInitials name={application.name} />
        <span className="font-medium text-hl-text">{application.name}</span>
      </span>
    ),
    role: <span className="text-hl-muted">{application.role}</span>,
    date: <span className="text-hl-muted">{application.date}</span>,
    experience: <span className="text-hl-muted">{application.experience}</span>,
    status: <StatusBadge status={application.status} />,
  }))

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${user.name}`}
        subtitle="Your hiring pipeline at a glance."
        actions={
          <Link href="/dashboard/recruiter/jobs/new">
            <Button className="rounded-xl bg-hl-brand text-white hover:bg-hl-brand/85">
              Create Job Post
            </Button>
          </Link>
        }
      />

      <section aria-label="Hiring stats" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {recruiterStats.map((stat, index) => {
          const Icon = STAT_ICONS[index % STAT_ICONS.length]
          return (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={<Icon />}
              layout="chips-first"
            />
          )
        })}
      </section>

      <section className="space-y-4">
        <SectionTitle
          title="Recent Applications"
          action={
            <Link
              href="/dashboard/recruiter/applications"
              className="text-sm text-hl-brand-text transition-colors hover:text-hl-brand-soft">
              View all
            </Link>
          }
        />
        <DataTable columns={columns} rows={rows} className="rounded-2xl border border-white/[0.06] bg-hl-card" />
      </section>
    </div>
  )
}
