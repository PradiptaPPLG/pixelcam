"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CameraIcon, Layers, Sparkles, ArrowDownToLine } from "lucide-react";

/* ── Step data ──────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    icon: CameraIcon,
    title: "Take Photos",
    description: "Open the booth, position yourself, and click to snap. Take up to 4 photos per session.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Choose Theme",
    description: "Browse through our curated strip layouts. Pick the one that matches your vibe.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Apply Filter",
    description: "Add a cinematic film look: color grade, grain, or keep it clean and natural.",
  },
  {
    number: "04",
    icon: ArrowDownToLine,
    title: "Download",
    description: "Export your strip as a high-resolution image. Ready to print or share in one click.",
  },
] as const;

/* ── Step card ──────────────────────────────────────────────── */
function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[number];
  index: number;
  isLast: boolean;
}) {
  const Icon  = step.icon;
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: index * 0.12, ease: "easeOut" }}
        className="flex flex-col items-center text-center gap-4"
      >
        {/* Number + icon circle */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-2 border-[#e5e7eb] bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <Icon
              size={20}
              strokeWidth={1.75}
              className="text-[#4f46e5]"
              aria-hidden="true"
            />
          </div>
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#111111] text-white text-[9px] font-bold flex items-center justify-center"
            aria-hidden="true"
          >
            {step.number}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5 max-w-[180px]">
          <h3 className="text-[15px] font-semibold text-[#111111] tracking-tight">
            {step.title}
          </h3>
          <p className="text-[13px] text-[#6b7280] leading-relaxed">
            {step.description}
          </p>
        </div>
      </motion.div>

      {/* Connector arrow */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.12 + 0.3 }}
          className="mt-6 mb-6 flex flex-col items-center gap-1 md:hidden"
          aria-hidden="true"
        >
          <div className="w-px h-6 bg-[#e5e7eb]" />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}

/* ── HowItWorksSection ──────────────────────────────────────── */
export default function HowItWorksSection() {
  const titleRef   = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-40px" });

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-[96px]"
      aria-labelledby="how-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          className="flex flex-col items-center text-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <span className="text-label">How It Works</span>
          <h2 id="how-heading" className="text-heading max-w-sm">
            From camera to download in four steps
          </h2>
        </motion.div>

        {/* Steps — desktop: horizontal with connector lines; mobile: vertical */}
        <div className="relative">
          {/* Desktop connector line */}
          <div
            className="hidden md:block absolute top-7 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-[#e5e7eb]"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-4 gap-0 md:gap-4">
            {STEPS.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
