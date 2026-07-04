"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface PreviewStripProps {
  photos: string[];
  total: number;
}

/**
 * Strip of captured photos. Vertical alongside the camera on desktop,
 * horizontal (scrollable) on mobile. New shots slide in as they're taken;
 * remaining slots show as subtle placeholders.
 */
export default function PreviewStrip({ photos, total }: PreviewStripProps) {
  return (
    <div className="w-full shrink-0 lg:w-32">
      <ul className="flex flex-row gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {Array.from({ length: total }, (_, index) => {
          const src = photos[index];

          return (
            <li
              key={index}
              className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white lg:w-full"
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
                  </motion.div>
                ) : (
                  <div
                    key="placeholder"
                    className="absolute inset-0 grid place-items-center text-[13px] font-medium text-[#D1D5DB]"
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
