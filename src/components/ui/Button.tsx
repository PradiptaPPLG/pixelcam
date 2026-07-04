import { cn } from "@/lib/utils";
import { type Size, type Variant } from "@/types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    "bg-[var(--color-brand-500)] text-white",
    "hover:bg-[var(--color-brand-600)]",
    "active:bg-[var(--color-brand-700)]",
    "shadow-[0_1px_2px_rgba(0,0,0,0.2)]",
    "hover:shadow-[0_2px_8px_rgba(124,58,237,0.4)]",
  ].join(" "),

  secondary: [
    "bg-[var(--bg-2)] text-[var(--fg)]",
    "border border-[var(--border)]",
    "hover:bg-[var(--bg-3)] hover:border-[var(--border-strong,rgba(0,0,0,0.18))]",
  ].join(" "),

  ghost: [
    "text-[var(--fg-2)]",
    "hover:bg-[var(--bg-2)] hover:text-[var(--fg)]",
  ].join(" "),

  outline: [
    "border border-[var(--color-brand-500)] text-[var(--color-brand-500)]",
    "hover:bg-[var(--color-brand-500)] hover:text-white",
  ].join(" "),

  danger: [
    "bg-red-500 text-white",
    "hover:bg-red-600",
    "active:bg-red-700",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  xs: "h-7 px-2.5 text-xs gap-1 rounded-[var(--radius-sm)]",
  sm: "h-8 px-3 text-sm gap-1.5 rounded-[var(--radius-sm)]",
  md: "h-10 px-4 text-sm gap-2 rounded-[var(--radius-md)]",
  lg: "h-11 px-5 text-base gap-2 rounded-[var(--radius-md)]",
  xl: "h-13 px-7 text-base gap-2.5 rounded-[var(--radius-lg)]",
};

/**
 * PixelCam Button — Apple-inspired with smooth hover/active transitions.
 */
export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      className={cn(
        // Base
        "inline-flex items-center justify-center font-medium",
        "transition-all duration-150 ease-out",
        "select-none cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-2",
        // Disabled
        isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
        // Variant & size
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
          />
        </svg>
      ) : (
        <>
          {leftIcon && (
            <span className="shrink-0" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className="shrink-0" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
