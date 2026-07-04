import { cn } from "@/lib/utils";

/* ── Avatar placeholder ─────────────────────────────────────── */
const AVATARS = [
  { id: 1, initials: "A", bg: "#fde68a", fg: "#92400e" },
  { id: 2, initials: "S", bg: "#ddd6fe", fg: "#5b21b6" },
  { id: 3, initials: "M", bg: "#bfdbfe", fg: "#1e40af" },
  { id: 4, initials: "J", bg: "#bbf7d0", fg: "#166534" },
  { id: 5, initials: "L", bg: "#fecaca", fg: "#991b1b" },
  { id: 6, initials: "R", bg: "#fed7aa", fg: "#9a3412" },
] as const;

/* ── TrustSection ───────────────────────────────────────────── */
export default function TrustSection() {
  return (
    <section
      className="py-14 border-y border-[#e5e7eb] bg-[#fafafa]"
      aria-label="Social proof"
    >
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-5">
        {/* Avatars */}
        <div
          className="flex items-center"
          aria-label="User avatars"
          role="img"
        >
          {AVATARS.map(({ id, initials, bg, fg }, i) => (
            <div
              key={id}
              className={cn(
                "w-9 h-9 rounded-full border-2 border-white flex items-center justify-center",
                "text-[12px] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
                i > 0 && "-ml-2.5",
              )}
              style={{ backgroundColor: bg, color: fg, zIndex: AVATARS.length - i }}
              aria-hidden="true"
            >
              {initials}
            </div>
          ))}
        </div>

        {/* Text */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1" aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="#facc15"
                aria-hidden="true"
              >
                <path d="M6.5 1l1.545 3.13 3.455.502-2.5 2.436.59 3.44L6.5 9l-3.09 1.507.59-3.439L1.5 4.632l3.455-.503L6.5 1z" />
              </svg>
            ))}
          </div>

          <p className="text-[14px] text-[#6b7280]">
            <strong className="text-[#111111] font-medium">Loved by</strong>
            {" "}students, couples, creators, and friends.
          </p>
        </div>
      </div>
    </section>
  );
}
