"use client";

import { motion } from "framer-motion";
import { StickerGlyph, type StickerDef } from "@/utils/editor/stickers";

interface StickerItemProps {
  def: StickerDef;
  onAdd: () => void;
}

/** A single sticker in a pack — click to add to the canvas. */
export default function StickerItem({ def, onAdd }: StickerItemProps) {
  return (
    <motion.button
      type="button"
      onClick={onAdd}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      title={def.label}
      aria-label={`Add ${def.label} sticker`}
      className="grid aspect-square place-items-center rounded-[12px] border border-[#E5E7EB] bg-white p-2.5 transition-colors hover:border-[#4F46E5]/40 hover:bg-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
    >
      <span className="h-7 w-7">
        <StickerGlyph def={def} color={def.defaultColor} />
      </span>
    </motion.button>
  );
}
