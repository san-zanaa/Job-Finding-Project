import { KeyRound, ShieldCheck } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import { PageHeader, Panel } from "@/components/dashboard/kit"
import { Field, HLInput } from "@/components/dashboard/form"
import { AvatarInitials } from "@/components/dashboard/kit"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function AdminSettings() {
  const user = await requireRole("admin")

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        subtitle="Update your administrator profile and account security."
      />

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
            <Field label="Full Name" htmlFor="admin-name">
              <HLInput id="admin-name" defaultValue={user.name} name="name" />
            </Field>
            <Field label="Email Address" htmlFor="admin-email">
              <HLInput
                id="admin-email"
                type="email"
                defaultValue={user.email ?? ""}
                name="email"/>
            </Field>
          </div>

          <div className="mt-5 border-t border-white/[0.06] pt-5">
            <Button className="h-9 rounded-xl bg-hl-text text-hl-bg hover:bg-white">
              Update Profile
            </Button>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="flex h-fit flex-col p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-hl-text">
              <KeyRound className="size-4 text-hl-brand-soft" />
              Security
            </h2>

            <div className="mt-5 grid gap-4">
              <Field label="Current Password" htmlFor="admin-current-password">
                <HLInput
                  id="admin-current-password"
                  type="password"
                  name="currentPassword"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </Field>
              <Field label="New Password" htmlFor="admin-new-password">
                <HLInput
                  id="admin-new-password"
                  type="password"
                  name="newPassword"
                  placeholder="••••••••"
                  autoComplete="new-password"/>
              </Field>
            </div>

            <Button
              variant="secondary"
              className="mt-5 w-full rounded-xl bg-hl-raise text-hl-text hover:bg-hl-active">
              Reset Password
            </Button>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-hl-chip text-hl-success">
                  <ShieldCheck className="size-4" />
                </span>
                <div>
                  <h3 className="text-sm font-medium text-hl-text">
                    Super Admin Access
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-hl-muted">
                    This account can manage users, companies, jobs, and payments
                    across the platform.
                  </p>
                </div>
              </div>
              <Badge variant="success">ACTIVE</Badge>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
