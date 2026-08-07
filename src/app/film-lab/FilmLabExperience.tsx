"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import {
  FilmHeader,
  FilterFooter,
  FilterPreview,
  FilterSidebar,
} from "@/components/film-lab";
import {
  getFilterStateServerSnapshot,
  getFilterStateSnapshot,
  saveFilterState,
  subscribeFilterState,
} from "@/utils/filter";
import {
  getSessionPhotosServerSnapshot,
  getSessionPhotosSnapshot,
  subscribeSessionPhotos,
} from "@/utils/session";
import {
  getThemeById,
  getThemeStateServerSnapshot,
  getThemeStateSnapshot,
  subscribeThemeState,
} from "@/utils/theme";
import {
  getTemplateStateServerSnapshot,
  getTemplateStateSnapshot,
  subscribeTemplateState,
} from "@/utils/template";

/**
 * Film Lab — choose the visual style (filter) of the photos before export.
 * The strip (theme, layout, photos) is fixed; only the photo appearance
 * changes. The selection persists via the shared filter state, ready for
 * Preview and Download.
 */
export default function FilmLabExperience() {
  const router = useRouter();

  const photos = useSyncExternalStore(
    subscribeSessionPhotos,
    getSessionPhotosSnapshot,
    getSessionPhotosServerSnapshot,
  );
  const themeState = useSyncExternalStore(
    subscribeThemeState,
    getThemeStateSnapshot,
    getThemeStateServerSnapshot,
  );
  const filterState = useSyncExternalStore(
    subscribeFilterState,
    getFilterStateSnapshot,
    getFilterStateServerSnapshot,
  );
  const templateId = useSyncExternalStore(
    subscribeTemplateState,
    getTemplateStateSnapshot,
    getTemplateStateServerSnapshot,
  );

  // Local override gives instant preview updates (same-tab storage writes
  // don't fire the store's "storage" listener); persisted for later stages.
  const [overrideId, setOverrideId] = useState<string | null>(null);
  const [overrideIntensity, setOverrideIntensity] = useState<number | null>(null);

  const selectedId = overrideId ?? filterState.filterId;
  const intensity = overrideIntensity ?? filterState.intensity ?? 100;
  const isOriginal = selectedId === "original";

  const theme = getThemeById(themeState.themeId);

  const selectFilter = (id: string) => {
    setOverrideId(id);
    saveFilterState({ filterId: id, intensity });
  };

  const handleIntensityChange = (val: number) => {
    setOverrideIntensity(val);
    saveFilterState({ filterId: selectedId, intensity: val });
  };

  if (photos.length === 0) {
    return (
      <section className="flex-1 bg-[#FAFAFA] py-16">
        <Container size="sm" className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111] sm:text-[32px]">
            No photos to style
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-[#6B7280]">
            Capture a photostrip first, then come back to choose a film look.
          </p>
          <Link
            href="/session"
            className="inline-flex h-11 items-center gap-2 rounded-[14px] bg-[#111111] px-5 text-sm font-medium text-white transition-colors hover:bg-[#222222] active:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
          >
            Start a session
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="flex-1 bg-[#FAFAFA] dark:bg-[#0D0D0F] py-6 sm:py-8 lg:py-12">
      <Container size="xl">
        {/* ─── Mobile-only header ─────────────────────────────── */}
        <div className="lg:hidden mb-4">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6B7280] dark:text-[#a1a1aa] mb-1">
            Film Lab
          </span>
          <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-[#111111] dark:text-[#f4f4f5]">
            Choose a Filter
          </h1>
        </div>

        {/* ─── Mobile-only: Filter selector (horizontal pills) ─── */}
        <div className="lg:hidden mb-3">
          <FilterSidebar
            selectedId={selectedId}
            onSelect={selectFilter}
            firstPhoto={photos[0]}
          />
        </div>

        {/* ─── Mobile-only: Intensity slider ─────────────────────── */}
        <div className="lg:hidden">
          <AnimatePresence>
            {!isOriginal && (
              <motion.div
                key="intensity-slider-mobile"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="mb-4 rounded-2xl border border-[#E5E7EB] dark:border-[#2a2a2e] bg-white dark:bg-[#18181b] p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5]">
                    Filter Intensity
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#4F46E5]/10 px-2.5 py-0.5 text-xs font-bold text-[#4F46E5] dark:text-[#818cf8]">
                    {Math.round(intensity)}%
                  </span>
                </div>
                <div className="relative flex items-center py-1">
                  <input
                    type="range" min="0" max="100" step="1" value={intensity}
                    onChange={(e) => handleIntensityChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg accent-[#4F46E5]"
                    style={{ background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${intensity}%, #2a2a2e ${intensity}%, #2a2a2e 100%)` }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  {[25, 50, 75, 100].map((val) => (
                    <button key={val} type="button" onClick={() => handleIntensityChange(val)}
                      className={`flex-1 rounded-lg py-1 text-[11px] font-semibold transition-all ${
                        Math.round(intensity) === val
                          ? "bg-[#111111] dark:bg-white text-white dark:text-[#111111] shadow-sm"
                          : "bg-[#F3F4F6] dark:bg-[#232327] text-[#6B7280] dark:text-[#a1a1aa] hover:bg-[#E5E7EB] dark:hover:bg-[#2a2a2e]"
                      }`}>
                      {val}%
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Desktop: 2-column grid (original layout) ────────── */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start">
          {/* Left — live preview */}
          <FilterPreview
            theme={theme}
            customization={themeState.customization}
            photos={photos}
            filterId={selectedId}
            intensity={intensity}
          />

          {/* Right — Film Lab panel (desktop only) */}
          <div className="hidden lg:flex lg:flex-col gap-3 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]">
            <FilmHeader />

            {/* Scrollable filter card list */}
            <div className="-mr-1 min-h-0 flex-1 overflow-y-auto pr-1">
              <FilterSidebar
                selectedId={selectedId}
                onSelect={selectFilter}
                firstPhoto={photos[0]}
              />
            </div>

            {/* Intensity slider */}
            <AnimatePresence>
              {!isOriginal && (
                <motion.div
                  key="intensity-slider"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="rounded-2xl border border-[#E5E7EB] dark:border-[#2a2a2e] bg-white dark:bg-[#18181b] p-4 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5]">
                      Filter Intensity
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#4F46E5]/10 px-2.5 py-0.5 text-xs font-bold text-[#4F46E5] dark:text-[#818cf8]">
                      {Math.round(intensity)}%
                    </span>
                  </div>
                  <div className="relative flex items-center py-1">
                    <input
                      id="filter-intensity" type="range" min="0" max="100" step="1" value={intensity}
                      onChange={(e) => handleIntensityChange(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg accent-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40"
                      style={{ background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${intensity}%, #2a2a2e ${intensity}%, #2a2a2e 100%)` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    {[25, 50, 75, 100].map((val) => (
                      <button key={val} type="button" onClick={() => handleIntensityChange(val)}
                        className={`flex-1 rounded-lg py-1 text-[11px] font-semibold transition-all ${
                          Math.round(intensity) === val
                            ? "bg-[#111111] dark:bg-white text-white dark:text-[#111111] shadow-sm"
                            : "bg-[#F3F4F6] dark:bg-[#232327] text-[#6B7280] dark:text-[#a1a1aa] hover:bg-[#E5E7EB] dark:hover:bg-[#2a2a2e] hover:text-[#111111] dark:hover:text-white"
                        }`}>
                        {val}%
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <FilterFooter
              onBack={() => router.push(templateId ? "/template" : "/theme")}
              onContinue={() => router.push("/stickers")}
            />
          </div>
        </div>

        {/* Mobile-only footer */}
        <div className="lg:hidden mt-4">
          <FilterFooter
            onBack={() => router.push(templateId ? "/template" : "/theme")}
            onContinue={() => router.push("/stickers")}
          />
        </div>
      </Container>
    </section>
  );
}
