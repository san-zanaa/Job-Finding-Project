import { Bookmark, MapPin, Search, SlidersHorizontal } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import { PageHeader, Panel } from "@/components/dashboard/kit"
import { browseJobs } from "@/components/dashboard/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GhostAction } from "@/components/dashboard/kit"

const FILTER_GROUPS = [
  {
    label: "Job Type",
    options: ["Full-time", "Part-time", "Remote", "Contract", "Internship"],
  },
  {
    label: "Location",
    options: ["Remote, Global", "United States", "Europe", "Asia"],
  },
  {
    label: "Salary Range",
    options: ["$0 – $50k", "$50k – $100k", "$100k – $150k", "$150k+"],
  },
  {
    label: "Category",
    options: ["Engineering & Tech", "Design", "Marketing", "Product"],
  },
]

export default async function SeekerBrowseJobs() {
  await requireRole("seeker")

  return (
    <div className="space-y-6">
      <PageHeader
        title="Browse Jobs"
        subtitle="Search the full marketplace and apply with one click."
      />

      <label className="relative block max-w-2xl">
        <span className="sr-only">Keyword search</span>
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-hl-faint" />
        <input
          type="search"
          placeholder="Search by title, company, or skill..."
          className="h-11 w-full rounded-xl border border-white/[0.06] bg-hl-card pr-24 pl-10 text-sm text-hl-text placeholder:text-hl-faint focus:border-hl-brand/40 focus:ring-2 focus:ring-hl-brand/25 focus:outline-none"
        />
        <Button className="absolute top-1 right-1 h-9 rounded-lg bg-hl-brand text-white hover:bg-hl-brand/85">
          Search
        </Button>
      </label>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <Panel className="h-fit p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-hl-text">
            <SlidersHorizontal className="size-4 text-hl-faint" />
            Filters
          </div>
          <div className="space-y-5">
            {FILTER_GROUPS.map((group) => (
              <fieldset key={group.label} className="space-y-2.5">
                <legend className="pb-1 text-xs font-medium tracking-[0.08em] text-hl-faint uppercase">
                  {group.label}
                </legend>
                {group.options.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-hl-muted transition-colors hover:text-hl-text">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-white/20 bg-hl-sunken accent-hl-brand"
                    />
                    {option}
                  </label>
                ))}
              </fieldset>
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          {browseJobs.map((job) => (
            <Panel key={job.title} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-hl-text-strong">
                      {job.title}
                    </h3>
                    <Badge variant="brand">{job.company}</Badge>
                  </div>
                  <p className="flex items-center gap-1.5 text-sm text-hl-muted">
                    <MapPin className="size-3.5 text-hl-faint" />
                    {job.location} · {job.type} · {job.salary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[11px] text-hl-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GhostAction
                    className="size-9 rounded-full !px-0"
                    aria-label={`Save ${job.title}`}>
                    <Bookmark className="size-4" />
                  </GhostAction>
                  <Button className="h-9 rounded-full bg-hl-text text-hl-bg hover:bg-white">
                    Apply Now
                  </Button>
                </div>
              </div>
              <p className="mt-3 border-t border-white/[0.05] pt-3 text-xs text-hl-faint">
                {job.posted}
              </p>
            </Panel>
          ))}
        </div>
      </div>
    </div>
  )
}
