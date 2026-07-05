"use client";

import { useEffect, useRef } from "react";
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
import { ScrollStack, ScrollStackItem } from "@/components/ui";

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

/**
 * Tutorial modal utilizing ScrollStack. Shows tutorial steps stacking on top
 * of each other as the user scrolls. Traps focus while open.
 */
export default function TutorialModal({ open, onClose }: TutorialModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

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
            className="relative w-full max-w-md h-[550px] max-h-[85vh] flex flex-col overflow-hidden rounded-[24px] border border-[#e5e7eb] dark:border-[#2a2a2e] bg-[#fafafa] dark:bg-[#0d0d0f] shadow-[0_24px_60px_-16px_rgba(0,0,0,0.35)] focus:outline-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb] dark:border-[#2a2a2e] bg-white dark:bg-[#18181b] z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div>
                <h2
                  id="tutorial-title"
                  className="text-base font-semibold tracking-[-0.02em] text-[#111111] dark:text-[#f4f4f5]"
                >
                  How PixelCam Works
                </h2>
                <p className="text-[11px] text-[#6b7280] dark:text-[#a1a1aa] mt-0.5">
                  Scroll to view the 5 quick steps
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close tutorial"
                className="grid h-8 w-8 place-items-center rounded-full text-[#6b7280] dark:text-[#a1a1aa] transition-colors hover:bg-[#f5f5f5] dark:hover:bg-[#232327] hover:text-[#111111] dark:hover:text-[#f4f4f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable stack content */}
            <div className="flex-1 overflow-hidden relative">
              <ScrollStack
                itemDistance={20}
                itemScale={0.025}
                itemStackDistance={14}
                stackPosition="20px"
                scaleEndPosition="0px"
                baseScale={0.92}
                blurAmount={1.2}
                useWindowScroll={false}
              >
                {SLIDES.map((slide, i) => {
                  const Icon = slide.icon;
                  return (
                    <ScrollStackItem key={i}>
                      <div className="flex items-center justify-between w-full">
                        <div
                          className="grid h-9 w-9 place-items-center rounded-xl"
                          style={{
                            backgroundColor: `${slide.accent}15`,
                            color: slide.accent,
                          }}
                        >
                          <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                        </div>
                        <span
                          className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase"
                          style={{
                            backgroundColor: `${slide.accent}12`,
                            color: slide.accent,
                          }}
                        >
                          Step 0{i + 1}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 mt-1">
                        <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[#111111] dark:text-[#f4f4f5]">
                          {slide.title}
                        </h3>
                        <p className="text-[12.5px] leading-relaxed text-[#6b7280] dark:text-[#a1a1aa]">
                          {slide.text}
                        </p>
                      </div>
                    </ScrollStackItem>
                  );
                })}
              </ScrollStack>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[#e5e7eb] dark:border-[#2a2a2e] px-6 py-4 bg-white dark:bg-[#18181b]">
              <span className="text-[10px] font-semibold text-[#9ca3af] dark:text-[#71717a] tracking-[0.08em] uppercase">
                Step-by-step
              </span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-[12px] bg-[#111111] dark:bg-[#f4f4f5] dark:text-[#111111] px-5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#222222] dark:hover:bg-[#e4e4e7] active:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5]"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
