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
    <div className="flex flex-col h-full bg-white dark:bg-[#18181b] rounded-[24px] shadow-sm border border-[#E5E7EB] dark:border-[#2a2a2e] overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#E5E7EB] dark:border-[#2a2a2e]">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-[#111111] dark:text-[#f4f4f5]">
            Stickers
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-[#4F46E5] dark:text-[#818CF8]">
            {stickerCount} / {maxStickers} used
          </span>
        </div>
        <p className="text-xs text-[#6B7280] dark:text-[#a1a1aa] mt-1.5">
          Choose a sticker to customize and decorate your photos.
        </p>
      </div>

      {/* Tabs / Categories */}
      <div className="flex gap-1.5 overflow-x-auto hide-scrollbar p-3 border-b border-[#E5E7EB] dark:border-[#2a2a2e] bg-[#FAFAFA] dark:bg-[#111114]">
        {STICKER_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-[#4F46E5] text-white shadow-sm"
                  : "text-[#6B7280] dark:text-[#a1a1aa] hover:bg-[#E5E7EB]/50 dark:hover:bg-[#2a2a2e]/50 hover:text-[#111111] dark:hover:text-[#f4f4f5]"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Grid Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#FAFAFA] dark:bg-[#0D0D0F]">
        <div className="grid grid-cols-4 gap-2.5">
          {activeCategoryData?.files.map((file) => {
            const url = `${activeCategoryData.path}/${file}`;
            return (
              <button
                key={file}
                onClick={() => onAddSticker(url)}
                disabled={stickerCount >= maxStickers}
                className="group relative aspect-square bg-white dark:bg-[#18181b] border border-[#E5E7EB] dark:border-[#2a2a2e] rounded-xl flex items-center justify-center p-2.5 hover:border-[#4F46E5] dark:hover:border-[#818CF8] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {/* Checkered pattern on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-[0.03] transition-opacity duration-200 rounded-[11px] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt="Sticker"
                  className="w-full h-full object-contain max-h-[64px] transition-transform duration-200 group-hover:scale-110"
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
