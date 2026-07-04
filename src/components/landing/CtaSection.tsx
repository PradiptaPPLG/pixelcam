"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/* ── CtaSection ─────────────────────────────────────────────── */
export default function CtaSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-[96px] border-t border-[#e5e7eb]"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[24px] bg-[#111111] px-8 py-16 md:py-20 flex flex-col items-center text-center gap-7 shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
        >
          {/* Subtle dot grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
            aria-hidden="true"
          />

          {/* Accent glow */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] opacity-20 blur-[80px]"
            style={{ background: "radial-gradient(ellipse, #818cf8 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center gap-7">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-medium text-white/60 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" aria-hidden="true" />
              Free to start · No account required
            </span>

            <div className="flex flex-col gap-4">
              <h2
                id="cta-heading"
                className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.04em] text-white"
              >
                Ready to create
                <br />
                <span className="text-[#818cf8]">your memories?</span>
              </h2>
              <p className="text-[#9ca3af] text-[16px] leading-relaxed max-w-[400px]">
                Start your first photobooth session in seconds.
                No downloads, no setup. Just open and shoot.
              </p>
            </div>

            <Link
              href="/booth"
              id="cta-start-session"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[14px] bg-white text-[#111111] text-[15px] font-semibold hover:bg-[#f5f5f5] active:bg-[#eeeeee] transition-colors duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
            >
              Start Session
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
