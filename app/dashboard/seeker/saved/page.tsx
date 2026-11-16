import { Bookmark, Clock3, MapPin, Trash2 } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import { GhostAction, PageHeader, Panel, StatCard } from "@/components/dashboard/kit"
import { savedJobs } from "@/components/dashboard/data"
import { Button } from "@/components/ui/button"

export default async function SeekerSavedJobs() {
  await requireRole("seeker")

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Jobs"
        subtitle="Manage and track your bookmarked opportunities."
        actions={
          <Button className="rounded-xl bg-hl-text text-hl-bg hover:bg-white">
            Upload Resume
          </Button>
        }
      />

      <section
        aria-label="Saved totals"
        className="grid max-w-xl gap-4 sm:grid-cols-2">
        <StatCard label="Total Saved" value="24" />
        <StatCard label="Closing Soon" value="3" />
      </section>

      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/[0.06] bg-hl-card p-3">
        {["All Saved", "Design (8)", "Engineering (12)", "Product (4)"].map(
          (chip, index) => (
            <button
              key={chip}
              type="button"
              className={
                index === 0
                  ? "h-8 rounded-lg bg-hl-raise px-3 text-xs font-medium text-hl-text"
                  : "h-8 rounded-lg px-3 text-xs text-hl-muted transition-colors hover:bg-hl-hover hover:text-hl-text"
              }>
              {chip}
            </button>
          )
        )}
        <span className="ml-auto flex items-center gap-2 text-xs text-hl-muted">
          Sort by:
          <select
            aria-label="Sort saved jobs"
            className="h-8 rounded-lg border border-white/[0.06] bg-hl-sunken px-2 text-hl-text focus:border-hl-brand/40 focus:outline-none">
            <option>Recently Saved</option>
            <option>Salary: High to Low</option>
            <option>Soonest Deadline</option>
          </select>
        </span>
      </div>

      <div className="space-y-3">
        {savedJobs.map((job) => {
          const closed = job.state === "closed"

          return (
            <Panel key={job.title} className="relative overflow-hidden p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex min-w-0 items-start gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-hl-card ring-1 ring-white/[0.06]">
                    <Bookmark className="size-5 text-hl-brand-soft" />
                  </span>
                  <div className="min-w-0 space-y-1.5">
                    <h3 className="truncate text-lg font-semibold text-hl-text-strong">
                      {job.title}
                    </h3>
                    <p className="text-xs font-medium tracking-[0.12em] text-hl-faint">
                      {job.company}
                    </p>
                    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-hl-muted">
                      <span className="flex items-center gap-1.5 text-hl-text">
                        <MapPin className="size-3.5 text-hl-faint" />
                        {job.location}
                      </span>
                      <span className="text-hl-text">{job.salary}</span>
                    </p>
                    <p className="flex items-center gap-3 text-xs">
                      <span className="text-hl-muted">{job.savedAt}</span>
                      {job.state === "open" && "deadline" in job && job.deadline ? (
                        <span className="text-hl-warn">{job.deadline}</span>
                      ) : job.state === "closed" ? (
                        <span className="text-hl-danger">Closed yesterday</span>
                      ) : job.state === "draft" ? (
                        <span className="text-hl-muted">Application draft started</span>
                      ) : null}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {closed ? (
                    <Button
                      variant="destructive"
                      className="rounded-full bg-hl-danger/12 text-hl-danger hover:bg-hl-danger/20">
                      <Trash2 data-icon="inline-start" />
                      Remove from List
                    </Button>
                  ) : job.state === "draft" ? (
                    <Button className="rounded-full bg-hl-raise text-hl-text hover:bg-hl-active">
                      Continue Draft
                    </Button>
                  ) : (
                    <>
                      <GhostAction
                        className="size-10 rounded-full !px-0"
                        aria-label={`Remove ${job.title}`}>
                        <Trash2 className="size-4" />
                      </GhostAction>
                      <Button className="h-10 rounded-full bg-hl-text px-4 text-hl-bg hover:bg-white">
                        Apply Now
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {closed ? (
                <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-black/30 px-4 py-2 text-xs text-hl-text">
                  <Clock3 className="size-3.5 text-hl-faint" />
                  Job closed by employer
                </div>
              ) : null}
            </Panel>
          )
        })}
      </div>

      <button
        type="button"
        className="mx-auto flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-hl-muted transition-colors hover:bg-hl-hover hover:text-hl-text">
        Load More
        <span aria-hidden>↓</span>
      </button>
    </div>
  )
}
