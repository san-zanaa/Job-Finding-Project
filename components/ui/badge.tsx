import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        neutral:
          "border-white/10 bg-white/[0.06] text-hl-muted",
        brand:
          "border-hl-brand/30 bg-hl-brand/15 text-hl-brand-soft",
        success:
          "border-hl-success/25 bg-hl-success/12 text-hl-success",
        warning:
          "border-hl-warn/25 bg-hl-warn/12 text-hl-warn",
        danger:
          "border-hl-danger/25 bg-hl-danger/12 text-hl-danger",
        info: "border-hl-info/25 bg-hl-info/12 text-hl-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
