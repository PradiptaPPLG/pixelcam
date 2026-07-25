"use client";

import { useMemo, useRef } from "react";
import PreviewCanvas from "@/components/preview/PreviewCanvas";
import DraggableSticker from "@/components/stickers/DraggableSticker";
import { StickerPlacement } from "@/utils/sticker";
import { getThemeById } from "@/utils/theme";
import type { StripCustomization } from "@/utils/theme";
import { getFilterById, getFilterStateSnapshot } from "@/utils/filter";
import { getFilterPreset } from "@/data/filterPresets";
import { interpolateFilterSettings } from "@/lib/filterEngine";
import { useFilteredPhotos } from "@/hooks/useFilteredPhotos";

interface InteractivePreviewCanvasProps {
  theme: string;
  customization: StripCustomization;
  filter: string;
  photos: string[];
  placements: StickerPlacement[];
  selectedId: string | null;
  onSelectSticker: (id: string) => void;
  onUpdateSticker: (id: string, updates: Partial<StickerPlacement>) => void;
  onDeleteSticker: (id: string) => void;
}

export default function InteractivePreviewCanvas({
  theme,
  customization,
  filter,
  photos,
  placements,
  selectedId,
  onSelectSticker,
  onUpdateSticker,
  onDeleteSticker,
}: InteractivePreviewCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const themeData = getThemeById(theme);
  const filterData = getFilterById(filter);
  const filterState = getFilterStateSnapshot();
  const intensity = filterState.intensity ?? 100;
  const filterPreset = getFilterPreset(filter);
  const settings = useMemo(
    () => interpolateFilterSettings(filterPreset.settings, intensity),
    [filter, intensity],
  );
  const filteredPhotos = useFilteredPhotos(photos, settings);

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Base Canvas */}
      <PreviewCanvas
        theme={themeData}
        customization={customization}
        filter={filterData}
        photos={filteredPhotos}
      />

      {/* Interactive Sticker Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
        <div className="relative w-full h-full pointer-events-auto">
          {placements.map((placement) => (
            <DraggableSticker
              key={placement.id}
              id={placement.id}
              url={placement.url}
              initialX={placement.x}
              initialY={placement.y}
              initialScale={placement.scale}
              initialRotation={placement.rotation}
              isSelected={selectedId === placement.id}
              onSelect={() => onSelectSticker(placement.id)}
              onDelete={onDeleteSticker}
              onChange={onUpdateSticker}
              boundsRef={containerRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
