import { CreditCard, LifeBuoy, Plus } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import {
  DataTable,
  PageHeader,
  Panel,
  SectionTitle,
  StatusBadge,
} from "@/components/dashboard/kit"
import { billingHistory } from "@/components/dashboard/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const RECRUITER_PLAN_NAMES: Record<string, string> = {
  "Professional Tier": "Growth Tier",
  "Standard Tier": "Starter Tier",
}

export default async function RecruiterBilling() {
  await requireRole("recruiter")

  const columns = [
    { key: "date", label: "Date" },
    { key: "plan", label: "Plan" },
    { key: "amount", label: "Amount" },
    { key: "txn", label: "Transaction ID", className: "font-mono" },
    { key: "status", label: "Status" },
  ]

  const rows = billingHistory.map((entry) => ({
    date: <span className="text-hl-text">{entry.date}</span>,
    plan: (
      <span className="text-hl-text">
        {RECRUITER_PLAN_NAMES[entry.plan] ?? entry.plan}
      </span>
    ),
    amount: <span className="font-medium text-hl-text">{entry.amount}</span>,
    txn: <span className="text-hl-muted">{entry.txn}</span>,
    status: <StatusBadge status={entry.status} />,
  }))

  return (
    <div className="space-y-8">
      <PageHeader
        title="Subscription & Billing"
        subtitle="Manage the plan that powers your active job posts and company hiring tooling."/>

      <section className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
        <Panel className="relative overflow-hidden p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-hl-brand/10 blur-2xl"/>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[11px] font-medium tracking-[0.14em] text-hl-faint uppercase">
                Current Plan
              </p>
              <h2 className="text-2xl font-semibold text-hl-text-strong">
                Growth Tier
              </h2>
              <p className="text-sm text-hl-muted">
                10 active job posts, applicant tracking, and basic analytics.
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-hl-text">
                $49<span className="text-base text-hl-muted">/mo</span>
              </p>
              <p className="mt-1 text-xs text-hl-muted">
                Next billing date: Oct 24, 2023
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/[0.06] bg-hl-sunken p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-hl-muted">Active job posts</span>
              <span className="font-medium text-hl-text">4 / 10 used</span>
            </div>
            <div
              aria-label="Active job post usage"
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full w-[40%] rounded-full bg-hl-brand" />
            </div>
          </div>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Up to 10 Active Job Posts",
              "Applicant Tracking Pipeline",
              "Basic Analytics",
              "Email Support",
            ].map((feature) => (
              <li
                key={feature}
                className="flex h-10 items-center rounded-xl bg-white/[0.03] px-3 text-sm text-hl-text">
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="rounded-xl bg-hl-text text-hl-bg hover:bg-white">
              Upgrade Plan
            </Button>
            <Button
              variant="secondary"
              className="rounded-xl bg-hl-raise text-hl-text hover:bg-hl-active">
              Manage Plan
            </Button>
          </div>
        </Panel>

        <Panel className="flex flex-col p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-hl-text">
              Payment Method
            </h3>
            <Badge variant="neutral">SECURE BY STRIPE</Badge>
          </div>

          <div className="relative mt-4 flex aspect-[8/5] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#1b1b24] via-[#15151b] to-[#0d0d12] p-5">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -left-6 size-40 rounded-full bg-hl-brand/20 blur-3xl"/>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-widest text-hl-text">
                VISA
              </span>
              <CreditCard className="size-5 text-hl-faint" />
            </div>
            <p className="text-lg tracking-[0.2em] text-hl-text">
              •••• •••• •••• 4242
            </p>
            <div className="flex items-end justify-between text-xs">
              <div>
                <p className="tracking-[0.12em] text-hl-faint uppercase">
                  Card Holder
                </p>
                <p className="mt-1 text-sm text-hl-text">ALEX STERLING</p>
              </div>
              <div className="text-right">
                <p className="tracking-[0.12em] text-hl-faint uppercase">
                  Expires
                </p>
                <p className="mt-1 text-sm text-hl-text">08/27</p>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            className="mt-4 w-full rounded-xl bg-hl-raise text-hl-muted hover:text-hl-text">
            <Plus data-icon="inline-start" />
            Add New Payment Method
          </Button>
        </Panel>
      </section>

      <section className="space-y-4">
        <SectionTitle
          title="Billing History"
          action={
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm text-hl-muted transition-colors hover:text-hl-text">
              Export PDF
            </button>
          }/>
        <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-hl-card">
          <DataTable columns={columns} rows={rows} />
        </div>
      </section>

      <Panel className="flex flex-wrap items-center justify-between gap-6 p-6">
        <div className="max-w-lg space-y-1.5">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-hl-text">
            <LifeBuoy className="size-4 text-hl-brand-soft" />
            Need help with your invoice?
          </h3>
          <p className="text-sm text-hl-muted">
            Our support team is available 24/7 to help you resolve any payment
            issues or clarify billing details.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className="rounded-xl bg-hl-raise text-hl-text hover:bg-hl-active">
            Contact Support
          </Button>
          <button
            type="button"
            className="text-sm text-hl-muted transition-colors hover:text-hl-text">
            Read Refund Policy
          </button>
        </div>
      </Panel>
    </div>
  )
}
