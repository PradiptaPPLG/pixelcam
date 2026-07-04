"use client";

import { motion } from "framer-motion";
import PreviewCanvas from "@/components/preview/PreviewCanvas";
import { getFilterById } from "@/utils/filter";
import type { StripCustomization, ThemePreset } from "@/utils/theme";

interface FilterPreviewProps {
  theme: ThemePreset;
  customization: StripCustomization;
  photos: string[];
  filterId: string;
}

/**
 * Large live photostrip preview. The strip (theme, layout, photos) stays
 * fixed; only the photo appearance changes with the selected filter, with a
 * subtle crossfade. Reuses the shared PreviewCanvas so it matches export.
 */
export default function FilterPreview({
  theme,
  customization,
  photos,
  filterId,
}: FilterPreviewProps) {
  const filter = getFilterById(filterId);

  return (
    <motion.div
      animate={{ backgroundColor: theme.style.canvas }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="flex justify-center rounded-[24px] p-8 ring-1 ring-black/5 sm:p-12"
    >
      <motion.div
        key={filterId}
        initial={{ opacity: 0.55 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      >
        <PreviewCanvas
          theme={theme}
          customization={customization}
          filter={filter}
          photos={photos}
        />
      </motion.div>
    </motion.div>
  );
}
