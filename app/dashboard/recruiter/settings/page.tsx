import Link from "next/link"
import { ArrowUpRight, Building2 } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import { PageHeader, Panel, StatusBadge } from "@/components/dashboard/kit"
import { Field, HLInput } from "@/components/dashboard/form"
import { AvatarInitials } from "@/components/dashboard/kit"
import { companyProfile } from "@/components/dashboard/data"
import { Button } from "@/components/ui/button"

export default async function RecruiterSettings() {
  const user = await requireRole("recruiter")

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        subtitle="Manage your account details and your linked company."/>

      <div className="grid gap-6 xl:grid-cols-[1.9fr_1fr]">
        <Panel className="p-6">
          <h2 className="text-lg font-semibold text-hl-text">
            Profile Information
          </h2>

          <div className="mt-5 flex flex-wrap items-center gap-4 rounded-2xl border border-white/[0.06] bg-hl-sunken p-4">
            <AvatarInitials name={user.name} className="size-14" />
            <div className="min-w-0 space-y-0.5">
              <p className="text-sm text-hl-muted">
                JPG, GIF or PNG. Max size of 5MB.
              </p>
              <Button
                variant="secondary"
                className="mt-1 h-8 rounded-lg bg-hl-raise px-3 text-xs text-hl-text hover:bg-hl-active">
                Change Avatar
              </Button>
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            <Field label="Full Name" htmlFor="recruiter-name">
              <HLInput
                id="recruiter-name"
                defaultValue={user.name}
                name="name"/>
            </Field>
            <Field label="Email Address" htmlFor="recruiter-email">
              <HLInput
                id="recruiter-email"
                type="email"
                defaultValue={user.email ?? ""}
                name="email"
              />
            </Field>
            <Field label="New Password" htmlFor="recruiter-password">
              <HLInput
                id="recruiter-password"
                type="password"
                name="password"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </Field>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-5">
            <Button className="h-9 rounded-xl bg-hl-text text-hl-bg hover:bg-white">
              Update Profile
            </Button>
            <Button
              variant="secondary"
              className="h-9 rounded-xl bg-hl-raise text-hl-text hover:bg-hl-active">
              Reset Password
            </Button>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="flex h-fit flex-col p-6">
            <h2 className="text-lg font-semibold text-hl-text">
              Linked Company
            </h2>
            <div className="mt-4 rounded-2xl border border-white/[0.06] bg-hl-sunken p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-hl-chip text-hl-brand-soft">
                  <Building2 className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-hl-text">
                    {companyProfile.name}
                  </p>
                  <p className="mt-0.5 text-xs text-hl-muted">
                    {companyProfile.industry} · {companyProfile.location}
                  </p>
                </div>
                <StatusBadge status={companyProfile.status} />
              </div>

              <Link
                href="/dashboard/recruiter/company"
                className="mt-4 flex h-9 items-center justify-center gap-1.5 rounded-xl bg-hl-raise text-sm text-hl-text transition-colors hover:bg-hl-active">
                Manage company details
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-hl-muted">
              Company details, branding, and approval status live on the My
              Company page.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  )
}
