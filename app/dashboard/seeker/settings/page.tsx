import { FileText, UploadCloud, X } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import { PageHeader, Panel } from "@/components/dashboard/kit"
import { Field, HLInput, HLTextarea } from "@/components/dashboard/form"
import { AvatarInitials } from "@/components/dashboard/kit"
import { Button } from "@/components/ui/button"

export default async function SeekerSettings() {
  const user = await requireRole("seeker")

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        subtitle="Manage your account details and professional profile."
      />

      <div className="grid gap-6 xl:grid-cols-[1.9fr_1fr]">
        <div className="space-y-6">
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
              <Field label="Full Name" htmlFor="seeker-name">
                <HLInput
                  id="seeker-name"
                  defaultValue={user.name}
                  name="name"
                />
              </Field>
              <Field label="Email Address" htmlFor="seeker-email">
                <HLInput
                  id="seeker-email"
                  type="email"
                  defaultValue={user.email ?? ""}
                  name="email"
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

          <Panel className="p-6">
            <h2 className="text-lg font-semibold text-hl-text">
              Professional Details
            </h2>

            <div className="mt-5 grid gap-4">
              <Field label="Professional Headline" htmlFor="seeker-headline">
                <HLInput
                  id="seeker-headline"
                  defaultValue="Senior UX/UI Designer"
                />
              </Field>

              <Field label="Bio" htmlFor="seeker-bio">
                <HLTextarea
                  id="seeker-bio"
                  defaultValue="Passionate designer with 5+ years of experience crafting user-centric digital experiences..."
                />
              </Field>

              <Field label="Skills" htmlFor="seeker-skill-input">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {["Figma", "UI Design", "Prototyping"].map((skill) => (
                      <span
                        key={skill}
                        className="flex h-8 items-center gap-1.5 rounded-full border border-white/[0.08] bg-hl-raise pr-2 pl-3 text-sm text-hl-text">
                        {skill}
                        <button
                          type="button"
                          aria-label={`Remove skill ${skill}`}
                          className="flex size-4 items-center justify-center rounded-full text-hl-faint transition-colors hover:text-hl-danger">
                          <X className="size-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <HLInput
                    id="seeker-skill-input"
                    placeholder="Add a skill..."
                  />
                </div>
              </Field>
            </div>

            <div className="mt-5 border-t border-white/[0.06] pt-5">
              <Button className="h-9 rounded-xl bg-hl-text text-hl-bg hover:bg-white">
                Save Details
              </Button>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="flex h-fit flex-col p-6">
            <h2 className="text-lg font-semibold text-hl-text">Resume</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-hl-muted">
              Upload your most recent resume to enable one-click applications.
            </p>

            <div className="mt-5 rounded-2xl border border-dashed border-white/[0.12] bg-hl-sunken p-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-hl-raise p-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-hl-chip text-hl-brand-soft">
                  <FileText className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-hl-text">
                    Jane_Doe_Resume_2023.pdf
                  </p>
                  <p className="mt-0.5 text-xs text-hl-muted">
                    Last updated 2 days ago • 1.2 MB
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="secondary"
                  className="h-8 flex-1 rounded-lg border-white/[0.08] bg-hl-raise text-xs text-hl-text hover:bg-hl-active">
                  Replace
                </Button>
                <Button
                  variant="secondary"
                  className="h-8 flex-1 rounded-lg border-white/[0.08] bg-hl-raise text-xs text-hl-danger hover:bg-hl-danger/10">
                  Remove
                </Button>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 flex h-24 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/[0.12] text-sm text-hl-muted transition-colors hover:border-hl-brand/40 hover:text-hl-text">
              <UploadCloud className="size-5 text-hl-faint" />
              Drop a new PDF here or click to browse
            </button>
          </Panel>
        </div>
      </div>
    </div>
  )
}
