"use client";

import { STICKER_PACKS } from "@/utils/editor/stickers";
import StickerItem from "./StickerItem";

interface StickerPanelProps {
  onAdd: (stickerId: string) => void;
}

/** Built-in sticker packs grouped by pack name. */
export default function StickerPanel({ onAdd }: StickerPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      {STICKER_PACKS.map((pack) => (
        <div key={pack.id} className="flex flex-col gap-2.5">
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#6B7280]">
            {pack.name}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {pack.stickers.map((sticker) => (
              <StickerItem
                key={sticker.id}
                def={sticker}
                onAdd={() => onAdd(sticker.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
