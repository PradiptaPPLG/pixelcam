import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padded?: boolean;
}

/* Size map — max-width per PROJECT_RULES: desktop = 1280px */
const SIZE_MAP = {
  sm:   "max-w-2xl",
  md:   "max-w-4xl",
  lg:   "max-w-5xl",
  xl:   "max-w-[1280px]",
  full: "max-w-full",
} as const;

/**
 * Global layout container.
 * Max-width: 1280px (PROJECT_RULES spec).
 * Horizontal padding: 24px (PROJECT_RULES spec).
 */
export default function Container({
  as: Tag = "div",
  children,
  className,
  size = "xl",
  padded = true,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full",
        SIZE_MAP[size],
        padded && "px-6",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
