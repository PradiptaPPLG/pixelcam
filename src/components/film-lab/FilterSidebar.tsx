"use client";

import { FILTER_PRESETS } from "@/data/filterPresets";
import FilterCard from "./FilterCard";
import { useFilterThumbnails } from "@/hooks/useFilterThumbnails";

interface FilterSidebarProps {
  selectedId: string;
  onSelect: (id: string) => void;
  /** The first user photo, used to generate per-filter thumbnail previews. */
  firstPhoto?: string;
}

/** Scrollable list of filter cards. */
export default function FilterSidebar({
  selectedId,
  onSelect,
  firstPhoto,
}: FilterSidebarProps) {
  const thumbnails = useFilterThumbnails(firstPhoto || null);

  return (
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
  );
}
