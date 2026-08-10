"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface PreviewStripProps {
  photos: string[];
  total: number;
  onRemovePhoto?: (index: number) => void;
}

/**
 * Strip of captured photos. Vertical alongside the camera on desktop,
 * horizontal (scrollable) on mobile. New shots slide in as they're taken;
 * remaining slots show as subtle placeholders.
 */
export default function PreviewStrip({ photos, total, onRemovePhoto }: PreviewStripProps) {
  return (
    <div className="w-full shrink-0 lg:w-auto">
      <ul className="flex flex-row gap-3 overflow-x-auto pb-1 lg:grid lg:grid-rows-2 lg:grid-flow-col lg:gap-3 lg:overflow-visible lg:pb-0">
        {Array.from({ length: total }, (_, index) => {
          const src = photos[index];

          return (
            <li
              key={index}
              className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-[14px] border border-[#E5E7EB] dark:border-[#2a2a2e] bg-white dark:bg-[#18181b] lg:w-28 group"
            >
              <AnimatePresence>
                {src ? (
                  <motion.div
                    key="photo"
                    initial={{ opacity: 0, y: 16, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={src}
                      alt={`Captured photo ${index + 1}`}
                      fill
                      unoptimized
                      sizes="128px"
                      className="object-cover"
                    />
                    {onRemovePhoto && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemovePhoto(index);
                        }}
                        className="absolute right-1.5 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 dark:bg-black/80 text-white backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                        aria-label="Remove photo"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <div
                    key="placeholder"
                    className="absolute inset-0 grid place-items-center text-[13px] font-medium text-[#D1D5DB] dark:text-zinc-600"
                  >
                    {index + 1}
                  </div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
