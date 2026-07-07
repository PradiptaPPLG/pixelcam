"use client";

import { useRef, useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import TutorialModal from "./TutorialModal";
import Shuffle from "../ui/Shuffle";
import ShinyText from "../ui/ShinyText";
import RotatingText from "../ui/RotatingText";
import {
  subscribeThemeMode,
  getThemeMode,
  getServerThemeMode,
  isDark,
} from "@/lib/theme-mode";

const PixelBlast = dynamic(() => import("@/components/ui/PixelBlast"), {
  ssr: false,
});

/* ── Photo strip mock data ──────────────────────────────────── */
const STRIPS = [
  {
    id: "strip-a",
    rotate: -6,
    offsetY: 20,
    delay: 0,
    label: "Cherry Blossom",
    theme: "cherry-blossom",
    bg: "radial-gradient(#f472b6 1px, transparent 1px) 0 0 / 6px 6px, #ffe5ec",
    cardBorder: "1px solid #fbcfe8",
    headerTextColor: "#db2777",
    footerTextColor: "#db2777",
    frameBorderColor: "rgba(255, 255, 255, 0.8)",
    photos: [
      "/images/dinihari1.webp",
      "/images/dinihari2.webp",
      "/images/dinihari3.webp"
    ]
  },
  {
    id: "strip-b",
    rotate: 2,
    offsetY: -10,
    delay: 0.1,
    label: "Crimson Velvet",
    theme: "crimson-velvet",
    bg: "linear-gradient(to bottom, #500a12, #1f0307)",
    cardBorder: "1px solid rgba(255, 255, 255, 0.15)",
    headerTextColor: "#f43f5e",
    footerTextColor: "#f43f5e",
    frameBorderColor: "rgba(255, 255, 255, 0.25)",
    photos: [
      "/images/gelapterang1.webp",
      "/images/gelapterang2.webp",
      "/images/gelapterang3.webp"
    ]
  },
  {
    id: "strip-c",
    rotate: 8,
    offsetY: 30,
    delay: 0.2,
    label: "Cotton Candy",
    theme: "cotton-candy",
    bg: "linear-gradient(to bottom, #fae8ff, #e0e7ff, #d1fae5, #fef3c7)",
    cardBorder: "1px solid rgba(255, 255, 255, 0.4)",
    headerTextColor: "#8b5cf6",
    footerTextColor: "#8b5cf6",
    frameBorderColor: "rgba(255, 255, 255, 0.9)",
    photos: [
      "/images/senja1.webp",
      "/images/senja2.webp",
      "/images/senja3.webp"
    ]
  }
] as const;

/* ── Single photo strip card ────────────────────────────────── */
function PhotoStrip({
  strip,
}: {
  strip: (typeof STRIPS)[number];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: strip.rotate - 4 }}
      animate={{ opacity: 1, y: strip.offsetY, rotate: strip.rotate }}
      transition={{
        duration: 0.7,
        delay: strip.delay + 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ y: strip.offsetY - 8, scale: 1.02 }}
      style={{ rotate: strip.rotate }}
      className="flex-shrink-0 select-none"
    >
      <div
        className="w-[128px] rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.6)] transition-shadow"
        style={{
          background: strip.bg,
          border: strip.cardBorder,
        }}
        aria-label={`Photo strip: ${strip.label}`}
      >
        {/* Film header */}
        <div className="h-8 flex items-center justify-center relative">
          <span
            className="text-[9px] font-mono tracking-[0.25em] font-bold uppercase"
            style={{ color: strip.headerTextColor }}
          >
            • PIXELCAM •
          </span>
        </div>

        {/* Photo frames */}
        <div className="flex flex-col gap-2 p-2 pt-0">
          {strip.photos.map((photo, i) => (
            <div
              key={i}
              className="h-[102px] rounded-[8px] relative overflow-hidden bg-black/10"
              style={{ border: `2px solid ${strip.frameBorderColor}` }}
            >
              <img
                src={photo}
                alt={`${strip.label} frame ${i + 1}`}
                className="w-full h-full object-cover select-none"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Film footer */}
        <div className="h-9 flex items-center justify-center pt-0">
          <span
            className="text-[8.5px] font-mono tracking-[0.2em] font-bold"
            style={{ color: strip.footerTextColor }}
          >
            {strip.label.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Hero section ───────────────────────────────────────────── */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  const mode = useSyncExternalStore(
    subscribeThemeMode,
    getThemeMode,
    getServerThemeMode,
  );
  const isDarkMode = isDark(mode);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex items-center min-h-[calc(100vh-64px)] py-16 md:py-24 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* PixelBlast interactive WebGL background — Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <PixelBlast
            variant="square"
            pixelSize={3}
            color={isDarkMode ? "#B497CF" : "#a586ff"}
            patternScale={2}
            patternDensity={1}
            pixelSizeJitter={0}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.5}
            edgeFade={0.25}
            transparent
            className="pointer-events-auto"
          />
        </div>
      )}

      {/* Subtle noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
        aria-hidden="true"
      />


      <div className="w-full max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left — copy */}
        <div className="flex flex-col gap-7 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#e5e7eb] bg-white text-[12px] font-medium text-[#6b7280] shadow-[var(--shadow-sm)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" aria-hidden="true" />
              Browser-based · No install required
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="text-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          >
            <ShinyText
              text="Capture Moments"
              speed={3}
              color="currentColor"
              shineColor="#a5b4fc"
              spread={90}
              direction="left"
              pauseOnHover
            />
            <br />
            <span className="inline-flex items-baseline gap-2 flex-wrap">
              <span className="text-[#4f46e5]">Like a</span>
              <RotatingText
                texts={['Real', 'Perfect', 'Premium', 'Epic', 'Aesthetic', 'Timeless']}
                mainClassName="px-3 py-0.5 bg-[#4f46e5]/60 backdrop-blur-sm text-white rounded-lg overflow-hidden inline-flex"
                splitLevelClassName="overflow-hidden"
                staggerFrom="last"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                transition={{ type: 'spring', damping: 22, stiffness: 320 }}
                rotationInterval={2200}
                splitBy="characters"
                auto
                loop
              />
            </span>
            <br />
            <Shuffle
              text="PHOTOBOOTH."
              tag="span"
              shuffleDirection="right"
              duration={0.4}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.04}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
              style={{ fontSize: "clamp(1.65rem, 5vw, 2.6rem)", lineHeight: "1.2", letterSpacing: "-0.02em" }}
            />
          </motion.h1>

          <motion.p
            className="text-body text-[#6b7280] max-w-md leading-relaxed text-[17px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            Create beautiful aesthetic photo strips directly from your browser.
            Choose elegant themes, cinematic filters, and download instantly.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <Link
              href="/booth"
              id="hero-start-session"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[14px] bg-[#111111] text-white text-[15px] font-medium hover:bg-[#222222] active:bg-[#333333] transition-colors duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] focus-visible:ring-offset-2"
            >
              Start Session
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <button
              id="hero-watch-demo"
              type="button"
              onClick={() => setTutorialOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[14px] bg-white border border-[#e5e7eb] text-[#111111] text-[15px] font-medium hover:bg-[#f5f5f5] active:bg-[#eeeeee] transition-colors duration-150 shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] focus-visible:ring-offset-2"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="6.5" stroke="#6b7280" strokeWidth="1.2" />
                <path d="M6 5.5l4 2-4 2v-4z" fill="#6b7280" />
              </svg>
              Tutorial
            </button>
          </motion.div>
        </div>

        {/* Right — floating strips mockup */}
        <motion.div
          style={{ y: mockupY }}
          className="relative flex items-center justify-center h-[320px] md:h-[420px] lg:h-[500px] -mt-8 md:mt-0"
          aria-hidden="true"
        >
          <div className="flex items-end gap-3 lg:gap-5 scale-[0.72] sm:scale-[0.85] md:scale-95 lg:scale-100 origin-center transition-transform">
            {STRIPS.map((strip) => (
              <PhotoStrip key={strip.id} strip={strip} />
            ))}
          </div>

          {/* Soft base shadow */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[280px] h-12 bg-black/[0.05] rounded-full blur-2xl" />
        </motion.div>
      </div>

      <TutorialModal open={tutorialOpen} onClose={() => setTutorialOpen(false)} />
    </section>
  );
}
