"use client";

import { useEffect, useMemo, useState } from "react";
import {
  adjustmentsToFilter,
  bakeAdjustedPhotos,
  isTonalIdentity,
} from "@/utils/editor/canvas";
import type { Adjustments } from "@/utils/editor/types";

/**
 * Returns the photos with tonal adjustments baked in, so the change is
 * reflected in both the live preview and the html2canvas export. Baking is
 * debounced; the original photos are used while neutral or mid-bake.
 */
export function useAdjustedPhotos(
  photos: string[],
  adjustments: Adjustments,
): string[] {
  const identity = isTonalIdentity(adjustments);
  const filter = useMemo(
    () => adjustmentsToFilter(adjustments),
    [adjustments],
  );
  const [baked, setBaked] = useState<string[] | null>(null);

  useEffect(() => {
    if (identity || photos.length === 0) return;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      void bakeAdjustedPhotos(photos, filter).then((result) => {
        if (!cancelled) setBaked(result);
      });
    }, 100);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [identity, filter, photos]);

  if (identity) return photos;
  if (baked && baked.length === photos.length) return baked;
  return photos;
}
