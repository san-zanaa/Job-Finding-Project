import { cn } from "cn"

/**
 * Server-safe form primitives styled after the Figma dark inputs:
 * #0c0c0f sunken field, hairline border, brand focus ring.
 */

const controlClass =
  "w-full rounded-xl border border-white/[0.08] bg-hl-sunken px-3.5 text-sm text-hl-text placeholder:text-hl-faint outline-none transition-colors aria-invalid:border-hl-danger focus-visible:border-hl-brand/60 focus-visible:ring-2 focus-visible:ring-hl-brand/15"

export function Field({
  label,
  hint,
  htmlFor,
  children,
  className,
}: {
  label: React.ReactNode
  hint?: React.ReactNode
  htmlFor?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={htmlFor}
        className="flex items-center justify-between gap-2 text-sm text-hl-text"
      >
        {label}
        {hint ? hint : null}
      </label>
      {children}
    </div>
  )
}

export function HLInput({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return <input className={cn(controlClass, "h-10", className)} {...props} />
}

export function HLTextarea({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      className={cn(
        controlClass,
        "min-h-28 resize-y py-2.5 leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export function HLSelect({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          controlClass,
          "h-10 appearance-none pr-9 [&>option]:bg-hl-card",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[10px] text-hl-faint"
      >
        ▼
      </span>
    </div>
  )
}
