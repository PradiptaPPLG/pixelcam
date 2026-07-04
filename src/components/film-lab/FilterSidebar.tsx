"use client";

import { FILTER_PRESETS } from "@/data/filterPresets";
import FilterCard from "./FilterCard";

interface FilterSidebarProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

/** Scrollable list of filter cards. */
export default function FilterSidebar({
  selectedId,
  onSelect,
}: FilterSidebarProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {FILTER_PRESETS.map((preset) => (
        <FilterCard
          key={preset.id}
          preset={preset}
          selected={preset.id === selectedId}
          onSelect={() => onSelect(preset.id)}
        />
      ))}
    </div>
  );
}
