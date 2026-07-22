"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import { FilterFooter } from "@/components/film-lab";
import InteractivePreviewCanvas from "./InteractivePreviewCanvas";
import StickerSidebar from "@/components/stickers/StickerSidebar";
import {
  StickerPlacement,
  saveStickerState,
  loadStickerState,
} from "@/utils/sticker";
import { getThemeStateSnapshot } from "@/utils/theme";
import { getFilterStateSnapshot } from "@/utils/filter";
import { getSessionPhotosSnapshot } from "@/utils/session";
import { Clapperboard } from "lucide-react";

const MAX_STICKERS = 10;

const generateId = () => Math.random().toString(36).substring(2, 9);

export default function StickersExperience() {
  const router = useRouter();
  
  // State
  const [placements, setPlacements] = useState<StickerPlacement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Dependencies for preview
  const themeState = getThemeStateSnapshot();
  const filterState = getFilterStateSnapshot();
  const photos = getSessionPhotosSnapshot();

  // Load initial state
  useEffect(() => {
    const saved = loadStickerState();
    if (saved && saved.length > 0) {
      setPlacements(saved);
    }
  }, []);

  const handleAddSticker = (url: string) => {
    if (placements.length >= MAX_STICKERS) return;
    
    const newSticker: StickerPlacement = {
      id: generateId(),
      url,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
    };
    
    setPlacements((prev) => [...prev, newSticker]);
    setSelectedId(newSticker.id);
  };

  const handleUpdateSticker = (id: string, updates: Partial<StickerPlacement>) => {
    setPlacements((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const handleDeleteSticker = (id: string) => {
    setPlacements((prev) => prev.filter((p) => p.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleContinue = () => {
    saveStickerState(placements);
    router.push("/preview");
  };

  const handleSkip = () => {
    saveStickerState([]);
    router.push("/preview");
  };

  // Deselect when clicking outside
  const handleCanvasClick = () => {
    setSelectedId(null);
  };

  return (
    <section className="relative flex flex-col flex-1 pb-24 lg:pb-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#F9FAFB]" />

      <Container className="relative h-full flex flex-col lg:flex-row lg:overflow-hidden">
        {/* Left: Canvas Area */}
        <div 
          className="flex-1 flex flex-col items-center pt-8 pb-12 lg:py-12 lg:overflow-y-auto hide-scrollbar"
          onClick={handleCanvasClick}
        >
          <div className="flex flex-col gap-1 text-center items-center">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
              <Clapperboard className="h-3.5 w-3.5" aria-hidden="true" />
              Decorate
            </span>
            <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111] sm:text-[30px]">
              Stickers
            </h1>
            <p className="text-[14px] leading-relaxed text-[#6B7280]">
              Add stickers to personalize your strip.
            </p>
          </div>

          <div className="mt-8 relative max-w-full">
            <InteractivePreviewCanvas
              theme={themeState.themeId}
              customization={themeState.customization}
              filter={filterState.filterId}
              photos={photos}
              placements={placements}
              selectedId={selectedId}
              onSelectSticker={setSelectedId}
              onUpdateSticker={handleUpdateSticker}
              onDeleteSticker={handleDeleteSticker}
            />
          </div>
        </div>

        {/* Right: Sidebar / Controls */}
        <div className="w-full lg:w-[400px] flex-shrink-0 lg:h-full lg:overflow-y-auto hide-scrollbar pb-safe">
          <div className="p-4 lg:p-6 lg:pl-0 h-full flex flex-col">
            <div className="flex-1 min-h-[400px] mb-6">
              <StickerSidebar
                onAddSticker={handleAddSticker}
                stickerCount={placements.length}
                maxStickers={MAX_STICKERS}
              />
            </div>

            {/* Custom Footer for Stickers (Skip/Continue) */}
            <div className="flex items-center justify-between bg-white rounded-[24px] p-5 shadow-sm border border-[#E5E7EB]">
              <button
                onClick={handleSkip}
                className="text-sm font-medium text-[#6B7280] hover:text-[#111111] transition-colors"
              >
                Skip
              </button>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.back()}
                  className="px-5 py-2.5 rounded-xl border border-[#E5E7EB] text-[13px] font-semibold text-[#111111] bg-white hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  className="px-6 py-2.5 rounded-xl bg-[#4F46E5] text-[13px] font-semibold text-white hover:bg-[#4338CA] transition-colors shadow-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
