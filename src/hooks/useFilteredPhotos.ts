"use client";

import { useEffect, useRef, useState } from "react";
import { applyFilter } from "@/lib/filterEngine";
import type { FilterSettings } from "@/types/filter";

export function useFilteredPhotos(photos: string[], settings: FilterSettings): string[] {
  const [filtered, setFiltered] = useState<string[]>(photos);
  // Track the raw photos so we only reset the display on an actual photo change,
  // NOT when just the intensity (settings) changes.
  const prevPhotosRef = useRef<string[]>(photos);

  useEffect(() => {
    if (photos.length === 0) return;

    let cancelled = false;

    // If the source photos themselves changed (e.g. new capture), reset immediately
    // so we don't flash the old set. But if only settings changed, keep the previous
    // filtered result visible until the new one is ready.
    if (prevPhotosRef.current !== photos) {
      prevPhotosRef.current = photos;
      setFiltered(photos);
    }

    Promise.all(photos.map((p) => applyFilter(p, settings))).then((results) => {
      if (!cancelled) {
        setFiltered(results);
      }
    });

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, settings]);

  return filtered;
}
