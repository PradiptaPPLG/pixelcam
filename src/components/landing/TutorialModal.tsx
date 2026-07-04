"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Download,
  Images,
  Palette,
  WandSparkles,
  X,
  type LucideIcon,
} from "lucide-react";

interface TutorialModalProps {
  open: boolean;
  onClose: () => void;
}

interface Slide {
  icon: LucideIcon;
  title: string;
  text: string;
  accent: string;
}

const SLIDES: Slide[] = [
  {
    icon: Camera,
    title: "Capture",
    text: "Line up in frame and snap your shots right inside the browser. No install, no plugins.",
    accent: "#4F46E5",
  },
  {
    icon: Images,
    title: "Photo session",
    text: "Pick 2, 4, or 6 photos and let the countdown timer do the counting for you.",
    accent: "#EC4899",
  },
  {
    icon: Palette,
    title: "Theme and filter",
    text: "Choose a strip theme and a cinematic filter, previewed live as you tap.",
    accent: "#10B981",
  },
  {
    icon: WandSparkles,
    title: "Decorate",
    text: "Add stickers, captions, and frames in the Creative Studio to make it yours.",
    accent: "#F59E0B",
  },
  {
    icon: Download,
    title: "Export",
    text: "Download your high-resolution photo strip as a PNG or JPG, ready to share.",
    accent: "#06B6D4",
  },
];

const variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -40 : 40 }),
};

/**
 * Tutorial slideshow. Advance by clicking or swiping; auto-closes after the
 * last slide, on backdrop click, or on Escape. Traps focus while open.
 */
export default function TutorialModal({ open, onClose }: TutorialModalProps) {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const dialogRef = useRef<HTMLDivElement>(null);

  const goNext = () => {
    if (index >= SLIDES.length - 1) {
      onClose();
      return;
    }
    setSlide([index + 1, 1]);
  };

  const goPrev = () => {
    if (index <= 0) return;
    setSlide([index - 1, -1]);
  };

  // Reset to the first slide each time it opens (render-phase, not an effect).
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setSlide([0, 0]);
  }

  // Escape to close, Tab to trap focus, lock scroll, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  const slide = SLIDES[index];
  const Icon = slide.icon;
  const isLast = index === SLIDES.length - 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tutorial-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-[24px] border border-[#e5e7eb] bg-white shadow-[0_24px_60px_-16px_rgba(0,0,0,0.35)] focus:outline-none"
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close tutorial"
              className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full text-[#6b7280] transition-colors hover:bg-[#f5f5f5] hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Slide (click or swipe to advance) */}
            <motion.div
              key="slide-area"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) goNext();
                else if (info.offset.x > 60) goPrev();
              }}
              onClick={goNext}
              className="cursor-pointer select-none px-8 pb-6 pt-14"
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9ca3af]">
                Tutorial · {index + 1} / {SLIDES.length}
              </span>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="mt-4 flex flex-col items-center gap-4 text-center"
                >
                  <span
                    className="grid h-16 w-16 place-items-center rounded-[20px]"
                    style={{ backgroundColor: `${slide.accent}1a`, color: slide.accent }}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h2
                    id="tutorial-title"
                    className="text-[22px] font-semibold tracking-[-0.02em] text-[#111111]"
                  >
                    {slide.title}
                  </h2>
                  <p className="max-w-xs text-[15px] leading-relaxed text-[#6b7280]">
                    {slide.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4 border-t border-[#f0f0f0] px-6 py-4">
              <button
                type="button"
                onClick={goPrev}
                disabled={index === 0}
                className="text-[14px] font-medium text-[#6b7280] transition-colors hover:text-[#111111] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:underline"
              >
                Back
              </button>

              <div className="flex items-center gap-1.5" aria-hidden="true">
                {SLIDES.map((_, dot) => (
                  <span
                    key={dot}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: dot === index ? 18 : 6,
                      backgroundColor: dot === index ? "#111111" : "#d1d5db",
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-1.5 rounded-[12px] bg-[#111111] px-4 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#222222] active:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] focus-visible:ring-offset-2"
              >
                {isLast ? "Done" : "Next"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
