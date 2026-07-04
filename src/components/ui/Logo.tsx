import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

/**
 * PixelCam Logo — camera aperture SVG icon + optional wordmark.
 * Uses brand gradient colors from the design system.
 */
export default function Logo({
  size = 32,
  className,
  showWordmark = true,
  wordmarkClassName,
}: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5 select-none", className)}
      aria-label="PixelCam"
    >
      {/* Aperture icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient
            id="pc-logo-gradient"
            x1="0"
            y1="0"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient
            id="pc-bg-gradient"
            x1="0"
            y1="0"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <rect width="32" height="32" rx="9" fill="url(#pc-bg-gradient)" />

        {/* Outer aperture ring */}
        <circle
          cx="16"
          cy="16"
          r="9.5"
          stroke="url(#pc-logo-gradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />

        {/* Aperture blades */}
        <g transform="translate(16,16)">
          {/* 6 blades at 60° intervals */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <rect
              key={angle}
              x="-2.5"
              y="-8"
              width="5"
              height="9"
              rx="2.5"
              fill="url(#pc-logo-gradient)"
              opacity="0.85"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>

        {/* Center dot */}
        <circle cx="16" cy="16" r="2.5" fill="url(#pc-logo-gradient)" />
      </svg>

      {showWordmark && (
        <span
          className={cn(
            "font-semibold text-[var(--fg)] tracking-tight leading-none",
            wordmarkClassName,
          )}
          style={{ fontSize: size * 0.56 }}
        >
          Pixel
          <span className="text-gradient font-semibold">Cam</span>
        </span>
      )}
    </span>
  );
}
