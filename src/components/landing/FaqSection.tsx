"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ── FAQ data ───────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "Is PixelCam completely free to use?",
    answer:
      "Yes, the core photobooth experience is completely free. Take photos, apply filters, and download your strips at no cost. Premium themes and additional features are available in our Pro plan.",
  },
  {
    id: "faq-2",
    question: "Do I need to create an account?",
    answer:
      "No account required to use the basic booth. Simply open PixelCam in your browser, allow camera access, and start capturing. Signing up lets you save your sessions and access premium themes.",
  },
  {
    id: "faq-3",
    question: "What devices and browsers are supported?",
    answer:
      "PixelCam works on any modern browser (Chrome, Safari, Firefox, and Edge) on both desktop and mobile. A working webcam or front-facing camera is required.",
  },
  {
    id: "faq-4",
    question: "Are my photos stored on your servers?",
    answer:
      "No. All photo processing happens entirely in your browser. Your images are never uploaded to our servers unless you explicitly choose to save them to your account.",
  },
  {
    id: "faq-5",
    question: "What resolution are the exported photo strips?",
    answer:
      "Exported strips are generated at high resolution, suitable for printing at 4×6 inches or larger. The exact resolution depends on your camera quality.",
  },
] as const;

/* ── Accordion item ─────────────────────────────────────────── */
function FaqItem({
  item,
  index,
}: {
  item: (typeof FAQ_ITEMS)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="border border-[#e5e7eb] rounded-[16px] bg-white overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
    >
      <button
        type="button"
        id={`${item.id}-trigger`}
        aria-expanded={open}
        aria-controls={`${item.id}-panel`}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#fafafa] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4f46e5]"
      >
        <span className="text-[15px] font-medium text-[#111111]">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-shrink-0"
          aria-hidden="true"
        >
          <ChevronDown size={16} strokeWidth={2} className="text-[#6b7280]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${item.id}-panel`}
            role="region"
            aria-labelledby={`${item.id}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[14px] text-[#6b7280] leading-relaxed border-t border-[#f5f5f5] pt-4">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── FaqSection ─────────────────────────────────────────────── */
export default function FaqSection() {
  const titleRef   = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-40px" });

  return (
    <section
      id="faq"
      className="py-24 md:py-[96px]"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          {/* Header */}
          <motion.div
            ref={titleRef}
            className="flex flex-col gap-3 lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <span className="text-label">FAQ</span>
            <h2 id="faq-heading" className="text-heading">
              Frequently asked questions
            </h2>
            <p className="text-[#6b7280] text-[15px] leading-relaxed mt-1">
              Can&apos;t find your answer? Reach out to us at{" "}
              <a
                href="mailto:hello@pixelcam.app"
                className="text-[#4f46e5] hover:underline focus-visible:outline-none"
              >
                hello@pixelcam.app
              </a>
            </p>
          </motion.div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
