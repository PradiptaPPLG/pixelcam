"use client";

import { useState } from "react";
import { STICKER_CATEGORIES } from "@/data/stickersData";

interface StickerSidebarProps {
  onAddSticker: (url: string) => void;
  stickerCount: number;
  maxStickers: number;
}

export default function StickerSidebar({
  onAddSticker,
  stickerCount,
  maxStickers,
}: StickerSidebarProps) {
  const [activeCategory, setActiveCategory] = useState(STICKER_CATEGORIES[0].id);

  const activeCategoryData = STICKER_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="flex flex-col h-full bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#E5E7EB]">
        <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">
          Stickers
        </h2>
        <p className="text-xs text-[#6B7280] mt-1">
          {stickerCount} / {maxStickers} used
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar border-b border-[#E5E7EB]">
        {STICKER_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? "text-[#4F46E5] border-b-2 border-[#4F46E5]"
                : "text-[#6B7280] hover:text-[#111111]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#FAFAFA]">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {activeCategoryData?.files.map((file) => {
            const url = `${activeCategoryData.path}/${file}`;
            return (
              <button
                key={file}
                onClick={() => onAddSticker(url)}
                disabled={stickerCount >= maxStickers}
                className="aspect-square bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-center p-2 hover:border-[#4F46E5] hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Sticker`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
