import { Download, Filter } from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import {
  DataTable,
  PageHeader,
  SectionTitle,
  StatCard,
  StatusBadge,
} from "@/components/dashboard/kit"
import { paymentMetrics, platformPayments } from "@/components/dashboard/data"
import { Badge } from "@/components/ui/badge"

export default async function AdminPayments() {
  await requireRole("admin")

  const columns = [
    { key: "email", label: "User Email" },
    { key: "plan", label: "Plan" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "txn", label: "Transaction ID", className: "font-mono" },
    { key: "status", label: "Status" },
  ]

  const rows = platformPayments.map((payment) => ({
    email: <span className="text-hl-text">{payment.email}</span>,
    plan: (
      <Badge variant={payment.plan === "Enterprise" ? "brand" : "neutral"}>
        {payment.plan}
      </Badge>
    ),
    amount: <span className="font-medium text-hl-text">{payment.amount}</span>,
    date: (
      <div className="space-y-0.5 whitespace-nowrap">
        <p className="text-hl-muted">{payment.date}</p>
        <p className="text-xs text-hl-faint">{payment.relative}</p>
      </div>
    ),
    txn: <span className="text-hl-muted">{payment.txn}</span>,
    status: <StatusBadge status={payment.status} />,
  }))

  return (
    <div className="space-y-8">
      <PageHeader
        title="Payments & Subscriptions"
        subtitle="Comprehensive overview of platform revenue and active subscriptions."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-9 items-center gap-1.5 rounded-xl bg-hl-raise px-3 text-sm text-hl-text transition-colors hover:bg-hl-active">
              <Filter className="size-3.5" />
              Filter
            </button>
            <button
              type="button"
              className="flex h-9 items-center gap-1.5 rounded-xl bg-hl-text px-3 text-sm text-hl-bg transition-colors hover:bg-white">
              <Download className="size-3.5" />
              Export CSV
            </button>
          </div>
        }/>

      <section
        aria-label="Revenue metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {paymentMetrics.map((metric) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            delta={metric.delta}
            tone={metric.tone as "success" | "warning" | "neutral" | "danger"}
            layout="chips-first"
          />
        ))}
      </section>

      <section className="space-y-4">
        <SectionTitle
          title="Recent Transactions"
          action={<Badge variant="neutral">LATEST 4 OF 12,408</Badge>}/>
        <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-hl-card">
          <DataTable columns={columns} rows={rows} />
        </div>
      </section>
    </div>
  )
}
