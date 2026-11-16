import Link from "next/link"
import { CalendarClock, CircleDollarSign, MapPin, Sparkles } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import { PageHeader, Panel } from "@/components/dashboard/kit"
import {
  Field,
  HLInput,
  HLSelect,
  HLTextarea,
} from "@/components/dashboard/form"
import { Button } from "@/components/ui/button"

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const

export default async function PostNewJob() {
  const user = await requireRole("recruiter")

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm">
          <Link
            href="/dashboard/recruiter/jobs"
            className="text-hl-muted transition-colors hover:text-hl-text">
            Manage Jobs
          </Link>
          <span className="mx-1.5 text-hl-faint">/</span>
          <span className="text-hl-brand-text">Create New Listing</span>
        </p>
        <PageHeader
          title="Post a New Job"
          subtitle="Fill in the position specifications to attract qualified talent across our network."/>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <form className="space-y-6" action="/dashboard/recruiter/jobs/new">
          <Panel className="space-y-4 p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-hl-text-strong">
              <span className="text-hl-muted">1.</span> Basic Information
            </h2>

            <Field label="Job Title *" htmlFor="job-title">
              <HLInput
                id="job-title"
                name="title"
                defaultValue="Frontend Developer"
                required/>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company Name *" htmlFor="job-company">
                <HLInput
                  id="job-company"
                  name="company"
                  defaultValue="HirePulse Network"
                  required
                />
              </Field>
              <Field label="Job Category *" htmlFor="job-category">
                <HLSelect
                  id="job-category"
                  name="category"
                  defaultValue="Engineering & Tech">
                  <option>Engineering & Tech</option>
                  <option>Design</option>
                  <option>Infrastructure</option>
                  <option>Quality</option>
                  <option>Marketing</option>
                </HLSelect>
              </Field>
            </div>

            <Field label="Job Type *" htmlFor="job-type-full-time">
              <div
                role="radiogroup"
                aria-label="Job type"
                className="flex flex-wrap gap-2">
                {JOB_TYPES.map((type, index) => (
                  <label key={type} className="cursor-pointer">
                    <input
                      type="radio"
                      name="jobType"
                      id="job-type-full-time"
                      value={type}
                      defaultChecked={index === 0}
                      className="peer sr-only"
                    />
                    <span className="flex h-9 items-center rounded-xl border border-white/[0.08] bg-hl-sunken px-4 text-sm text-hl-muted transition-colors peer-checked:border-hl-brand/50 peer-checked:bg-hl-brand/15 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-hl-brand/30">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </Field>
          </Panel>

          <Panel className="space-y-4 p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-hl-text-strong">
              <span className="text-hl-muted">2.</span> Location, Compensation &
              Timeline
            </h2>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-hl-sunken p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-hl-text">
                  Remote Work Allowed (isRemote)
                </p>
                <p className="text-xs text-hl-muted">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                aria-label="Remote work allowed"
                className="relative h-6 w-11 shrink-0 rounded-full bg-hl-brand transition-colors">
                <span className="absolute top-1/2 right-0.5 size-5 -translate-y-1/2 rounded-full bg-white shadow" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Job Location (location)"
                htmlFor="job-location"
                hint={<span className="text-xs text-hl-faint">Required</span>}>
                <HLInput
                  id="job-location"
                  name="location"
                  defaultValue="New York, USA"
                  required />
              </Field>
              <Field
                label={
                  <span className="flex items-center gap-1.5">
                    <CalendarClock className="size-3.5 text-hl-faint" />
                    Application Deadline (deadline)
                  </span>
                }
                htmlFor="job-deadline" >
                <HLInput
                  id="job-deadline"
                  name="deadline"
                  type="date"
                  defaultValue="2025-05-30"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                label={
                  <span className="flex items-center gap-1.5">
                    <CircleDollarSign className="size-3.5 text-hl-faint" />
                    Min Salary / Rate
                  </span>
                }
                htmlFor="job-min-salary"
              >
                <HLInput
                  id="job-min-salary"
                  name="minSalary"
                  inputMode="numeric"
                  defaultValue="25"
                />
              </Field>
              <Field label="Max Salary / Rate" htmlFor="job-max-salary">
                <HLInput
                  id="job-max-salary"
                  name="maxSalary"
                  inputMode="numeric"
                  defaultValue="40"
                />
              </Field>
              <Field label="Frequency" htmlFor="job-frequency">
                <HLSelect
                  id="job-frequency"
                  name="frequency"
                  defaultValue="per hour"
                >
                  <option>per hour</option>
                  <option>per month</option>
                  <option>per year</option>
                </HLSelect>
              </Field>
            </div>
          </Panel>

          <Panel className="space-y-4 p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-hl-text-strong">
              <span className="text-hl-muted">3.</span> Responsibilities &
              Requirements
            </h2>

            <Field
              label="Key Responsibilities *"
              htmlFor="job-responsibilities"
            >
              <HLTextarea
                id="job-responsibilities"
                name="responsibilities"
                required
                defaultValue="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
              />
            </Field>

            <Field
              label="Qualifications & Requirements *"
              htmlFor="job-requirements"
            >
              <HLTextarea
                id="job-requirements"
                name="requirements"
                required
                defaultValue={
                  "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"
                }
              />
            </Field>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
              <p className="text-xs text-hl-faint">
                Publishing links this job to your approved company profile.
              </p>
              <Button
                type="submit"
                className="h-9 rounded-xl bg-hl-text text-hl-bg hover:bg-white"
              >
                Publish Job
              </Button>
            </div>
          </Panel>
        </form>

        <div className="space-y-6">
          <Panel className="sticky top-6 h-fit p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-hl-text">
                <Sparkles className="size-4 text-hl-brand-soft" />
                Live Preview
              </h2>
              <span className="text-xs text-hl-faint">Candidate view</span>
            </div>

            <article className="mt-5 rounded-2xl border border-white/[0.08] bg-hl-sunken p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-hl-chip text-sm font-semibold text-hl-brand-soft">
                  HP
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-hl-text-strong">
                    HirePulse Network
                  </p>
                  <p className="truncate text-xs text-hl-muted">
                    Posted by {user.name}
                  </p>
                </div>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-hl-text-strong">
                Frontend Developer
              </h3>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-hl-muted">
                <MapPin className="size-3.5 text-hl-faint" />
                New York, USA · Remote allowed
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-hl-brand/15 px-2 py-0.5 text-xs text-hl-brand-soft">
                  Full-time
                </span>
                <span className="rounded-md border border-white/[0.1] bg-white/[0.04] px-2 py-0.5 text-xs text-hl-text">
                  Engineering & Tech
                </span>
              </div>

              <p className="mt-4 flex items-baseline gap-1 text-sm text-hl-text">
                <CircleDollarSign className="mb-0.5 size-3.5 shrink-0 self-center text-hl-faint" />
                €25 – €40 <span className="text-hl-muted">per hour</span>
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-hl-faint">
                <CalendarClock className="size-3.5" />
                Apply before May 30, 2025
              </p>

              <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-4 text-xs leading-relaxed text-hl-muted">
                <p>
                  Showcase your commitment to delivering exceptional user
                  interfaces and digital experiences…
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>3+ years of React & TypeScript experience</li>
                  <li>Solid understanding of DOM performance</li>
                </ul>
              </div>

              <Button className="mt-5 h-9 w-full rounded-xl bg-hl-brand text-white hover:bg-hl-brand/85">
                Apply Now
              </Button>
            </article>

            <p className="mt-4 text-xs leading-relaxed text-hl-muted">
              Jobs publish instantly for approved companies. Edits appear on
              public listings within a few minutes.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  )
}
