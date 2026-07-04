import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--bg-3)] text-[var(--fg-2)] border border-[var(--border)]",
  brand:
    "bg-[var(--color-brand-500)]/10 text-[var(--color-brand-500)] border border-[var(--color-brand-500)]/20",
  success:
    "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:text-emerald-400",
  warning:
    "bg-amber-500/10 text-amber-600 border border-amber-500/20 dark:text-amber-400",
  danger:
    "bg-red-500/10 text-red-600 border border-red-500/20 dark:text-red-400",
  outline:
    "bg-transparent text-[var(--fg-2)] border border-[var(--border)]",
};

/**
 * Compact badge / pill label component.
 */
export default function Badge({
  variant = "default",
  dot = false,
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5",
        "text-xs font-medium leading-5 rounded-full",
        "transition-colors duration-150",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-current shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
