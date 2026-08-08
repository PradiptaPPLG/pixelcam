"use client";

import { useEffect, useState } from "react";
import { cropPhotoToCoverRatio } from "@/utils/editor/canvas";
import type { PhotoSlot } from "@/data/templatesData";

/**
 * Bakes a "cover" crop into each photo so it fills its template slot
 * without stretching, even when rendered by html2canvas (which ignores
 * `objectFit: "cover"`).
 *
 * Each photo is cropped to the aspect ratio of its corresponding slot.
 * If photos or slots change, the crops are re-computed.
 *
 * @param photos - Raw photo data URLs (one per slot, or fewer).
 * @param slots  - Template slot definitions (percentage-based, but we only
 *                 need the widthPct / heightPct ratio for the crop calculation).
 * @returns A new array of data URLs where each image has been pre-cropped.
 */
export function useCroppedTemplatePhotos(
  photos: string[],
  slots: PhotoSlot[],
): string[] {
  const [cropped, setCropped] = useState<string[]>(photos);

  useEffect(() => {
    if (photos.length === 0 || slots.length === 0) {
      setCropped(photos);
      return;
    }

    let cancelled = false;

    Promise.all(
      photos.map((src, i) => {
        const slot = slots[i];
        if (!slot || !src) return Promise.resolve(src);
        // Use widthPct / heightPct as the aspect ratio — the absolute pixel
        // values don't matter, only the ratio.
        return cropPhotoToCoverRatio(src, slot.widthPct, slot.heightPct);
      }),
    ).then((results) => {
      if (!cancelled) setCropped(results);
    });

    return () => {
      cancelled = true;
    };
  }, [photos, slots]);

  return cropped;
}
