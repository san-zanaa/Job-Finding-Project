import Link from "next/link"
import {
  Briefcase,
  Building2,
  Download,
  DollarSign,
  FileStack,
  Users,
} from "lucide-react"

import { requireRole } from "@/lib/dashboard-user"
import {
  AvatarInitials,
  DataTable,
  PageHeader,
  SectionTitle,
  StatCard,
  StatusBadge,
} from "@/components/dashboard/kit"
import { adminStats, adminTransactions } from "@/components/dashboard/data"
import { Button } from "@/components/ui/button"

const STAT_ICONS = [Users, FileStack, Building2, Briefcase, DollarSign]

export default async function AdminDashboard() {
  await requireRole("admin")

  const columns = [
    { key: "user", label: "User / Recruiter" },
    { key: "plan", label: "Plan Type" },
    { key: "txn", label: "Transaction ID", className: "font-mono" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ]

  const rows = adminTransactions.map((transaction) => ({
    user: (
      <span className="flex items-center gap-3">
        <AvatarInitials name={transaction.org} className="size-9" />
        <span className="min-w-0">
          <span className="block truncate font-medium text-hl-text">
            {transaction.user}
          </span>
          <span className="block truncate text-xs text-hl-muted">
            {transaction.org}
          </span>
        </span>
      </span>
    ),
    plan: <span className="text-hl-muted">{transaction.plan}</span>,
    txn: <span className="text-hl-muted">{transaction.txn}</span>,
    amount: (
      <span className="font-medium text-hl-text">{transaction.amount}</span>
    ),
    date: <span className="text-hl-muted">{transaction.date}</span>,
    status: <StatusBadge status={transaction.status} />,
  }))

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard Overview"
        subtitle="Real-time platform performance and growth metrics."
        actions={
          <>
            <Button
              variant="secondary"
              className="rounded-xl bg-hl-raise text-hl-text hover:bg-hl-active">
              Last 30 Days
            </Button>
            <Button className="rounded-xl bg-hl-text text-hl-bg hover:bg-white">
              <Download data-icon="inline-start" />
              Export Report
            </Button>
          </>
        }/>

      <section
        aria-label="Platform stats"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {adminStats.map((stat, index) => {
          const Icon = STAT_ICONS[index % STAT_ICONS.length]
          return (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
              tone={stat.tone as "success" | "neutral"}
              icon={<Icon />}
              layout="chips-first"/>
          )
        })}
      </section>

      <section className="space-y-4">
        <SectionTitle
          title="Recent Subscription Transactions"
          action={
            <Link
              href="/dashboard/admin/payments"
              className="text-sm text-hl-muted transition-colors hover:text-hl-text">
              View All Activity
            </Link>
          }/>
        <DataTable
          columns={columns}
          rows={rows}
          className="rounded-2xl border border-white/[0.06] bg-hl-card"/>
      </section>
    </div>
  )
}
