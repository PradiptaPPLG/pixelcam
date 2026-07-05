"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

  // Local override gives instant preview updates (same-tab storage writes
  // don't fire the store's "storage" listener); persisted for later stages.
  const [override, setOverride] = useState<string | null>(null);
  const selectedId = override ?? filterState.filterId;

  const theme = getThemeById(themeState.themeId);

  const selectFilter = (id: string) => {
    setOverride(id);
    saveFilterState({ filterId: id });
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
    <section className="flex-1 bg-[#FAFAFA] py-8 sm:py-12">
      <Container size="xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start">
          {/* Left — live preview */}
          <FilterPreview
            theme={theme}
            customization={themeState.customization}
            photos={photos}
            filterId={selectedId}
          />

          {/* Right — Film Lab panel */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]">
            <FilmHeader />
            <div className="-mr-1 min-h-0 flex-1 overflow-y-auto pr-1">
              <FilterSidebar selectedId={selectedId} onSelect={selectFilter} firstPhoto={photos[0]} />
            </div>
            <FilterFooter
              onBack={() => router.push("/theme")}
              onContinue={() => router.push("/preview")}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
