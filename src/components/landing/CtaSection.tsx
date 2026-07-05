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
          className="relative overflow-hidden rounded-[24px] px-8 py-16 md:py-20 flex flex-col items-center text-center gap-7 shadow-[0_16px_48px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)] border border-[#e5e7eb] dark:border-white/10 bg-gradient-to-br from-[#e0e7ff] via-[#fce7f3] to-[#ffedd5] dark:from-[#064e3b] dark:via-[#0f766e] dark:to-[#1e3a8a]"
        >
          {/* Subtle plus pattern texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.25] dark:opacity-20"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 9H5V11H9V15H11V11H15V9H11V5H9V9Z' fill='%236b7280' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E\")",
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />

          {/* Accent glow */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] opacity-20 dark:opacity-30 blur-[60px]"
            style={{ background: "radial-gradient(ellipse, #ffffff 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center gap-7">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/5 dark:border-white/10 bg-white/40 dark:bg-black/20 text-[11px] font-semibold text-[#4b5563] dark:text-gray-300 tracking-wide uppercase backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] dark:bg-[#34d399]" aria-hidden="true" />
              Free to start · No account required
            </span>

            <div className="flex flex-col gap-4">
              <h2
                id="cta-heading"
                className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.04em] text-gray-900 dark:text-white"
              >
                Ready to create
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4338ca] to-[#be185d] dark:from-[#34d399] dark:to-[#60a5fa]">
                  your memories?
                </span>
              </h2>
              <p className="text-[#4b5563] dark:text-gray-300 text-[16px] leading-relaxed max-w-[400px]">
                Start your first photobooth session in seconds.
                No downloads, no setup. Just open and shoot.
              </p>
            </div>

            <Link
              href="/booth"
              id="cta-start-session"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[14px] bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-[15px] font-semibold hover:bg-[#333333] dark:hover:bg-[#f3f4f6] active:bg-[#000000] dark:active:bg-[#e5e7eb] transition-colors duration-150 shadow-[0_4px_14px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_14px_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#111111]"
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
