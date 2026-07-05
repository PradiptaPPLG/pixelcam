"use client";

import { useEffect, useState } from "react";
import { applyFilter } from "@/lib/filterEngine";
import type { FilterSettings } from "@/types/filter";

export function useFilteredPhotos(photos: string[], settings: FilterSettings): string[] {
  const [filtered, setFiltered] = useState<string[]>(photos);

  useEffect(() => {
    if (photos.length === 0) return;
    
    let cancelled = false;
    setFiltered(photos); // Optimistically revert or show original while processing
    
    Promise.all(photos.map(p => applyFilter(p, settings))).then(results => {
      if (!cancelled) {
        setFiltered(results);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [photos, settings]);

  return filtered;
}
