"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Camera, Palette, Film, Download } from "lucide-react";

/* ── Feature data ───────────────────────────────────────────── */
const FEATURES = [
  {
    id: "real-time-camera",
    icon: Camera,
    title: "Real-Time Camera",
    description:
      "Access your webcam directly in the browser. No downloads, no plugins. Just hit start and you're ready.",
  },
  {
    id: "beautiful-themes",
    icon: Palette,
    title: "Beautiful Themes",
    description:
      "Choose from a curated collection of elegant strip layouts. From minimal to festive, there's a theme for every mood.",
  },
  {
    id: "vintage-filters",
    icon: Film,
    title: "Vintage Filters",
    description:
      "Apply cinematic film looks (grain, duotone, faded) to transform your photos into timeless memories.",
  },
  {
    id: "high-res-export",
    icon: Download,
    title: "High-Res Export",
    description:
      "Download your photo strip as a high-resolution PNG, ready to print, share, or post. Instantly.",
  },
] as const;

/* ── Feature card ───────────────────────────────────────────── */
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
  const Icon = feature.icon;
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      id={`feature-card-${feature.id}`}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.09, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group flex flex-col gap-5 p-6 rounded-[16px] border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] transition-shadow duration-300 cursor-default"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-[12px] bg-[#f5f5f5] flex items-center justify-center group-hover:bg-[#eef2ff] transition-colors duration-200">
        <Icon
          size={18}
          strokeWidth={1.75}
          className="text-[#6b7280] group-hover:text-[#4f46e5] transition-colors duration-200"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-semibold text-[#111111] tracking-tight">
          {feature.title}
        </h3>
        <p className="text-[14px] text-[#6b7280] leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── FeaturesSection ────────────────────────────────────────── */
export default function FeaturesSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-40px" });

  return (
    <section
      id="features"
      className="py-24 md:py-[96px] bg-[#fafafa]"
      aria-labelledby="features-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          className="flex flex-col items-center text-center gap-3 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <span className="text-label">Features</span>
          <h2 id="features-heading" className="text-heading max-w-sm">
            Everything you need for the perfect shot
          </h2>
          <p className="text-[#6b7280] text-[16px] max-w-sm leading-relaxed">
            Built for the browser. Fast, beautiful, and endlessly customisable.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
