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
import { Clapperboard, Undo2, Redo2, Trash2 } from "lucide-react";

const MAX_STICKERS = 10;

const generateId = () => Math.random().toString(36).substring(2, 9);

export default function StickersExperience() {
  const router = useRouter();
  
  // State
  const [mounted, setMounted] = useState(false);
  const [placements, setPlacements] = useState<StickerPlacement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // History for Undo/Redo
  const [history, setHistory] = useState<StickerPlacement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Load initial state on client
  useEffect(() => {
    setMounted(true);
    const saved = loadStickerState();
    if (saved && saved.length > 0) {
      setPlacements(saved);
      setHistory([saved]);
      setHistoryIndex(0);
    } else {
      setHistory([[]]);
      setHistoryIndex(0);
    }
  }, []);

  // Dependencies for preview
  const themeState = getThemeStateSnapshot();
  const filterState = getFilterStateSnapshot();
  const photos = getSessionPhotosSnapshot();

  const commitPlacements = (newPlacements: StickerPlacement[]) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    setHistory([...nextHistory, newPlacements]);
    setHistoryIndex(nextHistory.length);
    setPlacements(newPlacements);
  };

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
    
    const nextPlacements = [...placements, newSticker];
    commitPlacements(nextPlacements);
    setSelectedId(newSticker.id);
  };

  const handleUpdateSticker = (id: string, updates: Partial<StickerPlacement>) => {
    const nextPlacements = placements.map((p) => (p.id === id ? { ...p, ...updates } : p));
    commitPlacements(nextPlacements);
  };

  const handleDeleteSticker = (id: string) => {
    const nextPlacements = placements.filter((p) => p.id !== id);
    commitPlacements(nextPlacements);
    if (selectedId === id) setSelectedId(null);
  };

  const handleDeleteAll = () => {
    commitPlacements([]);
    setSelectedId(null);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setPlacements(history[nextIndex]);
      setSelectedId(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setPlacements(history[nextIndex]);
      setSelectedId(null);
    }
  };

  const handleContinue = () => {
    saveStickerState(placements);
    router.push("/preview");
  };

  // Deselect when clicking outside
  const handleCanvasClick = () => {
    setSelectedId(null);
  };

  if (!mounted) {
    return (
      <section className="relative flex flex-col flex-1 pb-24 lg:pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#F9FAFB] dark:bg-[#0D0D0F]" />
        <Container className="relative h-full flex flex-col items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-sm text-[#6B7280] dark:text-[#a1a1aa] font-medium animate-pulse">
              Loading editor...
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col flex-1 pb-24 lg:pb-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#F9FAFB] dark:bg-[#0D0D0F]" />

      <Container className="relative h-full flex flex-col lg:flex-row lg:overflow-hidden">
        {/* Left: Canvas Area */}
        <div 
          className="flex-1 flex flex-col items-center pt-8 pb-12 lg:py-12 lg:overflow-y-auto hide-scrollbar"
          onClick={handleCanvasClick}
        >
          <div className="flex flex-col gap-1 text-center items-center">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B7280] dark:text-[#a1a1aa]">
              <Clapperboard className="h-3.5 w-3.5" aria-hidden="true" />
              Decorate
            </span>
            <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111] dark:text-[#f4f4f5] sm:text-[30px]">
              Stickers
            </h1>
            <p className="text-[14px] leading-relaxed text-[#6B7280] dark:text-[#a1a1aa]">
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
        <div className="w-full lg:w-[440px] flex-shrink-0 lg:h-full lg:overflow-y-auto hide-scrollbar pb-safe">
          <div className="p-4 lg:p-6 lg:pl-0 h-full flex flex-col">
            <div className="flex-1 min-h-[400px] mb-6">
              <StickerSidebar
                onAddSticker={handleAddSticker}
                stickerCount={placements.length}
                maxStickers={MAX_STICKERS}
              />
            </div>

            {/* Custom Footer for Stickers (Skip/Continue) */}
            <div className="flex items-center justify-between bg-white dark:bg-[#18181b] rounded-[24px] p-5 shadow-sm border border-[#E5E7EB] dark:border-[#2a2a2e] w-full gap-3">
              {/* Left: Back Button */}
              <button
                onClick={() => router.push("/film-lab")}
                className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#2a2a2e] text-[13px] font-semibold text-[#111111] dark:text-[#f4f4f5] bg-white dark:bg-[#18181b] hover:bg-gray-50 dark:hover:bg-[#232327] transition-colors whitespace-nowrap"
              >
                Back
              </button>
              
              {/* Middle: Undo, Delete All, Redo */}
              <div className="flex items-center gap-1.5 justify-center flex-1">
                <button
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className="p-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#2a2a2e] bg-white dark:bg-[#18181b] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#232327] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Undo"
                >
                  <Undo2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handleDeleteAll}
                  disabled={placements.length === 0}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-red-200 dark:border-red-950/40 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/40 text-[12px] font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                  title="Delete All Stickers"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Delete All</span>
                </button>

                <button
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  className="p-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#2a2a2e] bg-white dark:bg-[#18181b] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#232327] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Redo"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
              </div>

              {/* Right: Skip/Continue Button */}
              <button
                onClick={handleContinue}
                className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-[13px] font-semibold text-white transition-colors shadow-sm min-w-[80px] text-center whitespace-nowrap"
              >
                {placements.length === 0 ? "Skip" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
