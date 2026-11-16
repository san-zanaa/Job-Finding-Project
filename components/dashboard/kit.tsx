import { Badge as BadgeFallback } from "@/components/ui/badge"
import { cn } from "cn"

/**
 * Shared dashboard building blocks translated from the HireLoop 2.0 Figma
 * kit (HL 2.0 tokens). All components are presentational so they can render
 * inside server components.
 */

export function PageHeader({
  title,
  subtitle,
  actions,
  className,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4",
        className
      )}>
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-hl-text-strong">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-sm text-hl-muted">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  )
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.06] bg-hl-card",
        className
      )}>
      {children}
    </div>
  )
}

export function SectionTitle({
  title,
  action,
}: {
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-lg font-semibold text-hl-text">{title}</h2>
      {action}
    </div>
  )
}

export function StatCard({
  label,
  value,
  icon,
  delta,
  tone = "neutral",
  layout = "label-first",
}: {
  label: string
  value: string
  icon?: React.ReactNode
  /** Small change indicator, e.g. "+12%". */
  delta?: string
  tone?: "neutral" | "success" | "warning" | "danger"
  /** Admin cards show an icon chip + delta chip on top; base cards put the label first. */
  layout?: "label-first" | "chips-first"
}) {
  const deltaColor =
    tone === "success"
      ? "text-hl-success"
      : tone === "warning"
        ? "text-hl-warn"
        : tone === "danger"
          ? "text-hl-danger"
          : "text-hl-muted"

  if (layout === "chips-first") {
    return (
      <Panel className="flex flex-col gap-3 p-5">
        {icon || delta ? (
          <div className="flex items-center justify-between">
            {icon ? (
              <span className="flex size-9 items-center justify-center rounded-[10px] bg-hl-chip text-hl-muted [&_svg]:size-4">
                {icon}
              </span>
            ) : (
              <span />
            )}
            {delta ? (
              <span className={cn("text-xs font-medium", deltaColor)}>
                {delta}
              </span>
            ) : null}
          </div>
        ) : null}
        <p className="text-sm text-hl-muted">{label}</p>
        <p className="text-[1.75rem] leading-8 font-semibold text-hl-text">
          {value}
        </p>
      </Panel>
    )
  }

  return (
    <Panel className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-sm text-hl-muted">{label}</p>
        {icon ? (
          <span className="text-hl-faint [&_svg]:size-4">{icon}</span>
        ) : null}
      </div>
      <p className="text-[1.75rem] leading-8 font-semibold text-hl-text">
        {value}
      </p>
    </Panel>
  )
}

export type DataColumn = {
  key: string
  label: string
  className?: string
}

export type DataRow = Record<string, React.ReactNode>

/**
 * High-density data table styled after the Figma "Table" frames:
 * #1a1a1f header, 64px body rows, hairline separators.
 */
export function DataTable({
  columns,
  rows,
  className,
}: {
  columns: DataColumn[]
  rows: DataRow[]
  className?: string
}) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="bg-hl-raise">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "px-4 py-3 text-left text-[11px] font-medium tracking-[0.08em] text-hl-faint uppercase",
                  column.className
                )}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="border-t border-white/[0.05] transition-colors first:border-t-0 hover:bg-white/[0.02]">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn("px-4 py-3 align-middle", column.className)}>
                  {row[column.key] ?? null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PaginationFooter({
  label,
  pages = [1, 2, 3],
}: {
  label: string
  pages?: number[]
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] bg-hl-raise px-4 py-3">
      <p className="text-xs text-hl-muted">{label}</p>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Previous page"
          className="flex size-8 items-center justify-center rounded-lg text-hl-muted transition-colors hover:bg-hl-active hover:text-hl-text">
          ‹
        </button>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={cn(
              "flex size-8 items-center justify-center rounded-lg text-xs transition-colors",
              page === 1
                ? "bg-hl-brand text-white"
                : "text-hl-muted hover:bg-hl-active hover:text-hl-text"
            )}>
            {page}
          </button>
        ))}
        <button
          type="button"
          aria-label="Next page"
          className="flex size-8 items-center justify-center rounded-lg text-hl-muted transition-colors hover:bg-hl-active hover:text-hl-text">
          ›
        </button>
      </div>
    </div>
  )
}

export function AvatarInitials({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")

  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-hl-brand/20 text-xs font-semibold text-hl-brand-soft",
        className
      )}>
      {initials || "U"}
    </span>
  )
}

export function GhostAction({
  children,
  tone = "neutral",
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"button">, "className"> & {
  tone?: "neutral" | "brand" | "danger" | "success"
  className?: string
}) {
  const tones = {
    neutral: "bg-white/[0.06] text-hl-text hover:bg-white/[0.1]",
    brand: "bg-hl-brand/15 text-hl-brand-text hover:bg-hl-brand/25",
    danger: "bg-hl-danger/12 text-hl-danger hover:bg-hl-danger/20",
    success: "bg-hl-success/12 text-hl-success hover:bg-hl-success/20",
  } as const

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-lg px-3 text-xs font-medium whitespace-nowrap transition-colors",
        tones[tone],
        className
      )}
      {...props}>
      {children}
    </button>
  )
}

/** Maps the workflow statuses used across the figma boards to badge tones. */
const STATUS_TONES: Record<string, "neutral" | "brand" | "success" | "warning" | "danger" | "info"> = {
  // applications
  applied: "neutral",
  review: "warning",
  "under review": "warning",
  reviewing: "warning",
  shortlisted: "info",
  interviewing: "brand",
  offered: "success",
  rejected: "danger",
  new: "info",
  // jobs
  active: "success",
  draft: "neutral",
  closed: "neutral",
  expired: "neutral",
  // companies
  pending: "warning",
  approved: "success",
  // users / payments
  success: "success",
  paid: "success",
  failed: "danger",
  suspended: "danger",
}

export function StatusBadge({
  status,
  className,
}: {
  status: string
  className?: string
}) {
  const tone = STATUS_TONES[status.trim().toLowerCase()] ?? "neutral"
  const variants = {
    neutral: "neutral",
    brand: "brand",
    success: "success",
    warning: "warning",
    danger: "danger",
    info: "info",
  } as const

  return (
    <BadgeFallback variant={variants[tone]} className={className}>
      {status}
    </BadgeFallback>
  )
}
