"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FILTER_PRESETS } from "@/data/filterPresets";
import FilterCard from "./FilterCard";
import { useFilterThumbnails } from "@/hooks/useFilterThumbnails";

interface FilterSidebarProps {
  selectedId: string;
  onSelect: (id: string) => void;
  intensity?: number;
  onIntensityChange?: (value: number) => void;
  /** The first user photo, used to generate per-filter thumbnail previews. */
  firstPhoto?: string;
}

/** Scrollable list of filter cards with Filter Intensity Slider. */
export default function FilterSidebar({
  selectedId,
  onSelect,
  intensity = 100,
  onIntensityChange,
  firstPhoto,
}: FilterSidebarProps) {
  const thumbnails = useFilterThumbnails(firstPhoto || null);
  const isOriginal = selectedId === "original";

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Intensity Slider Control */}
      <AnimatePresence>
        {!isOriginal && onIntensityChange && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                Filter Intensity
              </span>
              <span className="inline-flex items-center rounded-full bg-[#4F46E5]/10 px-2.5 py-0.5 text-xs font-bold text-[#4F46E5]">
                {Math.round(intensity)}%
              </span>
            </div>

            {/* Custom Range Slider Bar */}
            <div className="relative flex items-center py-1">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={intensity}
                onChange={(e) => onIntensityChange(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E5E7EB] accent-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40"
                style={{
                  background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${intensity}%, #E5E7EB ${intensity}%, #E5E7EB 100%)`,
                }}
              />
            </div>

            {/* Quick Preset Buttons */}
            <div className="mt-3 flex items-center justify-between gap-1.5 pt-1">
              {[25, 50, 75, 100].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => onIntensityChange(val)}
                  className={`flex-1 rounded-lg py-1 text-[11px] font-semibold transition-all ${
                    Math.round(intensity) === val
                      ? "bg-[#111111] text-white shadow-sm"
                      : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] hover:text-[#111111]"
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Presets List */}
      <div className="flex flex-col gap-2.5">
        {FILTER_PRESETS.map((preset) => (
          <FilterCard
            key={preset.id}
            preset={preset}
            selected={preset.id === selectedId}
            onSelect={() => onSelect(preset.id)}
            thumbnail={thumbnails[preset.id] || null}
          />
        ))}
      </div>
    </div>
  );
}
