import Link from "next/link"
import {
  Award,
  BellRing,
  CalendarClock,
  FileText,
  MessageSquare,
  MoreVertical,
} from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import { PageHeader, Panel, SectionTitle, StatCard } from "@/components/dashboard/kit"
import { seekerActivity, seekerStats } from "@/components/dashboard/data"
import { Badge } from "@/components/ui/badge"

const ACTIVITY_ICONS = {
  file: FileText,
  briefcase: BellRing,
  message: MessageSquare,
} as const

const ACTIVITY_TONE = ["brand", "info", "success"] as const

export default async function SeekerDashboard() {
  const user = await requireRole("seeker")

  const icons = [CalendarClock, FileText, Award, BellRing]

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${user.name.split(" ")[0]}`}
        subtitle="Here is what is happening with your job hunt today."
      />

      <section aria-label="Quick stats" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {seekerStats.map((stat, index) => {
          const Icon = icons[index % icons.length]
          return (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={<Icon />}
            />
          )
        })}
      </section>

      <section className="grid gap-6">
        <div>
          <SectionTitle
            title="Recent Activity"
            action={
              <Link
                href="/dashboard/seeker/applications"
                className="text-sm text-hl-muted transition-colors hover:text-hl-text">
                View All Activity
              </Link>
            }
          />
          <div className="mt-4 space-y-3">
            {seekerActivity.map((item) => {
              const Icon = ACTIVITY_ICONS[item.icon as keyof typeof ACTIVITY_ICONS]
              const tone = ACTIVITY_TONE[seekerActivity.indexOf(item)]

              return (
                <Panel
                  key={item.time}
                  className="flex items-center gap-4 rounded-xl px-4 py-3.5">
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                      tone === "brand"
                        ? "bg-hl-brand/15 text-hl-brand-soft"
                        : tone === "info"
                          ? "bg-hl-info/12 text-hl-info"
                          : "bg-hl-success/12 text-hl-success"
                    }`}>
                    <Icon className="size-4" />
                  </span>
                  <p className="min-w-0 flex-1 truncate text-sm text-hl-text">
                    {item.message}
                  </p>
                  <span className="shrink-0 text-sm text-hl-muted">
                    {item.time}
                  </span>
                  <button
                    type="button"
                    aria-label="More options"
                    className="shrink-0 text-hl-faint transition-colors hover:text-hl-text">
                    <MoreVertical className="size-4" />
                  </button>
                </Panel>
              )
            })}
          </div>
        </div>

        <Panel className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle title="Application Status Distribution" />
            <Badge variant="brand">Updated just now</Badge>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {[
              { label: "Applied", value: 12, tone: "bg-hl-brand/60" },
              { label: "Under Review", value: 6, tone: "bg-hl-warn/70" },
              { label: "Shortlisted", value: 3, tone: "bg-hl-info/70" },
              { label: "Rejected", value: 2, tone: "bg-hl-danger/60" },
              { label: "Offered", value: 1, tone: "bg-hl-success/70" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-hl-muted">{item.label}</span>
                  <span className="text-sm font-semibold text-hl-text">
                    {item.value}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className={`h-full rounded-full ${item.tone}`}
                    style={{ width: `${(item.value / 12) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  )
}
