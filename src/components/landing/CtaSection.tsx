"use client";

import { useRef, useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import {
  subscribeThemeMode,
  getThemeMode,
  getServerThemeMode,
  isDark,
} from "@/lib/theme-mode";

const DarkVeil = dynamic(() => import("@/components/ui/DarkVeil"), {
  ssr: false,
});

/* ── CtaSection ─────────────────────────────────────────────── */
export default function CtaSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const mode = useSyncExternalStore(
    subscribeThemeMode,
    getThemeMode,
    getServerThemeMode,
  );
  const isDarkMode = isDark(mode);

  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Avoid SSR/CSR mismatch: use neutral style until mounted on client
  const effectiveDarkMode = mounted ? isDarkMode : false;

  return (
    <section
      ref={ref}
      className="py-24 md:py-[96px] border-t border-[#e5e7eb] dark:border-[#1f1f23]"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[24px] px-8 py-16 md:py-20 flex flex-col items-center text-center gap-7"
          style={{
            isolation: "isolate",
            background: effectiveDarkMode
              ? "linear-gradient(135deg, #090b14 0%, #101426 50%, #1b0e2f 100%)"
              : "linear-gradient(135deg, #fff0f6 0%, #fff9fc 50%, #fcf5ff 100%)",
            border: effectiveDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid #fbcfe8",
            boxShadow: effectiveDarkMode
              ? "0 16px 48px rgba(0,0,0,0.4)"
              : "0 16px 48px rgba(180,60,120,0.1)",
          }}
        >
          {/* DarkVeil Shader Background — Desktop only */}
          {!isMobile && (
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{ zIndex: 0 }}
              aria-hidden="true"
            >
              <DarkVeil
                hueShift={0}
                noiseIntensity={0}
                scanlineIntensity={0}
                speed={0.5}
                scanlineFrequency={0}
                warpAmount={0}
                isDarkMode={effectiveDarkMode}
              />
            </div>
          )}

          {/* Accent glow blob */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] blur-[80px]"
            style={{
              zIndex: 1,
              opacity: effectiveDarkMode ? 0.28 : 0.35,
              background: effectiveDarkMode
                ? "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)"
                : "radial-gradient(ellipse, #f472b6 0%, transparent 65%)",
            }}
            aria-hidden="true"
          />

          {/* Plus pattern texture */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              zIndex: 1,
              opacity: effectiveDarkMode ? 0.18 : 0.12,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 9H5V11H9V15H11V11H15V9H11V5H9V9Z' fill='%236b7280' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-7" style={{ zIndex: 2 }}>

            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase backdrop-blur-sm"
              style={{
                border: effectiveDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
                background: effectiveDarkMode ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.6)",
                color: effectiveDarkMode ? "#d1d5db" : "#6b2d6b",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: effectiveDarkMode ? "#34d399" : "#10b981" }}
                aria-hidden="true"
              />
              Free to start · No account required
            </span>

            <div className="flex flex-col gap-4">
              <h2
                id="cta-heading"
                className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.04em]"
                style={{ color: effectiveDarkMode ? "#ffffff" : "#1a0a22" }}
              >
                Ready to create
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: effectiveDarkMode
                      ? "linear-gradient(to right, #34d399, #60a5fa)"
                      : "linear-gradient(to right, #9333ea, #db2777)",
                  }}
                >
                  your memories?
                </span>
              </h2>
              <p
                className="text-[16px] leading-relaxed max-w-[400px]"
                style={{ color: effectiveDarkMode ? "#c4c4cc" : "#4a1a5e" }}
              >
                Start your first photobooth session in seconds.
                No downloads, no setup. Just open and shoot.
              </p>
            </div>

            <Link
              href="/booth"
              id="cta-start-session"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[14px] text-[15px] font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: effectiveDarkMode ? "#ffffff" : "#1a0a22",
                color: effectiveDarkMode ? "#111111" : "#ffffff",
                boxShadow: effectiveDarkMode
                  ? "0 4px 14px rgba(255,255,255,0.1)"
                  : "0 4px 14px rgba(26,10,34,0.25)",
              }}
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
