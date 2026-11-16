import Link from "next/link"
import { Globe, ImagePlus, MapPin, Users } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import { PageHeader, Panel, StatusBadge } from "@/components/dashboard/kit"
import {
  Field,
  HLInput,
  HLSelect,
  HLTextarea,
} from "@/components/dashboard/form"
import { companyProfile } from "@/components/dashboard/data"
import { Button } from "@/components/ui/button"

export default async function RecruiterCompany() {
  const user = await requireRole("recruiter")
  const company = companyProfile

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Company"
        subtitle="Your organization profile shown to candidates and reviewed by admins."/>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.6fr]">
        <Panel className="flex h-fit flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-hl-brand/40 to-hl-brand/10 text-lg font-semibold text-hl-brand-soft">
              {company.name
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0])
                .join("")}
            </span>
            <StatusBadge status={company.status} />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-hl-text-strong">
            {company.name}
          </h2>
          <p className="mt-1 text-sm text-hl-muted">{company.industry}</p>
          <p className="mt-3 text-sm leading-relaxed text-hl-muted">
            {company.description}
          </p>

          <dl className="mt-5 space-y-3 border-t border-white/[0.06] pt-5 text-sm">
            <dt className="sr-only">Company details</dt>
            <div className="flex items-center gap-2.5 text-hl-muted">
              <Globe className="size-4 shrink-0 text-hl-faint" />
              <dd className="text-hl-text">{company.website}</dd>
            </div>
            <div className="flex items-center gap-2.5 text-hl-muted">
              <MapPin className="size-4 shrink-0 text-hl-faint" />
              <dd className="text-hl-text">{company.location}</dd>
            </div>
            <div className="flex items-center gap-2.5 text-hl-muted">
              <Users className="size-4 shrink-0 text-hl-faint" />
              <dd className="text-hl-text">{company.employees}</dd>
            </div>
          </dl>

          <p className="mt-5 rounded-xl bg-hl-sunken px-3 py-2.5 text-xs leading-relaxed text-hl-muted">
            Registered by <span className="text-hl-text">{user.email}</span>.
            Verified companies appear publicly on job listings.
          </p>
        </Panel>

        <Panel className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-hl-text">
              Company Registration
            </h2>
            <span className="text-xs text-hl-faint">
              Save with status <span className="text-hl-warn">Pending</span>{" "}
              until an admin approves
            </span>
          </div>

          <form
            className="mt-5 grid gap-4"
            action="/dashboard/recruiter/company">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company Name" htmlFor="company-name">
                <HLInput
                  id="company-name"
                  defaultValue={company.name}
                  name="name"
                  required/>
              </Field>
              <Field label="Industry / Category" htmlFor="company-industry">
                <HLSelect
                  id="company-industry"
                  name="industry"
                  defaultValue={company.industry}>
                  <option>Engineering & Tech</option>
                  <option>Design</option>
                  <option>Developer Tools</option>
                  <option>Fintech</option>
                  <option>Cloud & Infrastructure</option>
                  <option>AI</option>
                </HLSelect>
              </Field>
              <Field label="Website URL" htmlFor="company-website">
                <HLInput
                  id="company-website"
                  type="url"
                  defaultValue={`https://${company.website}`}
                  name="website"
                />
              </Field>
              <Field label="Location" htmlFor="company-location">
                <HLInput
                  id="company-location"
                  defaultValue={company.location}
                  name="location"
                />
              </Field>
              <Field label="Employee Count Range" htmlFor="company-employees">
                <HLSelect
                  id="company-employees"
                  name="employees"
                  defaultValue={company.employees}
                >
                  <option>1 – 10 employees</option>
                  <option>11 – 50 employees</option>
                  <option>51 – 200 employees</option>
                  <option>201 – 500 employees</option>
                  <option>500+ employees</option>
                </HLSelect>
              </Field>
              <Field label="Company Logo" htmlFor="company-logo-file">
                <div className="flex h-10 items-center gap-2 rounded-xl border border-dashed border-white/[0.12] bg-hl-sunken px-3 text-sm text-hl-muted">
                  <ImagePlus className="size-4 shrink-0 text-hl-faint" />
                  <span className="truncate">PNG or SVG, max 1MB</span>
                  <input
                    id="company-logo-file"
                    name="logo"
                    type="file"
                    accept="image/png,image/svg+xml"
                    className="sr-only"
                  />
                </div>
              </Field>
            </div>

            <Field label="Short Description" htmlFor="company-description">
              <HLTextarea
                id="company-description"
                defaultValue={company.description}
                name="description"
              />
            </Field>

            <div className="mt-1 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-5">
              <Button
                type="submit"
                className="h-9 rounded-xl bg-hl-text text-hl-bg hover:bg-white">
                Save Company Details
              </Button>
              <Link
                href="/dashboard/recruiter/jobs/new"
                className="text-sm text-hl-brand-text transition-colors hover:text-hl-brand-soft">
                Post a job with this company →
              </Link>
            </div>
          </form>
        </Panel>
      </div>
    </div>
  )
}
