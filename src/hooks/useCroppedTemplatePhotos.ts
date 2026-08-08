"use client";

import { useEffect, useState } from "react";
import { cropPhotoToCoverRatio } from "@/utils/editor/canvas";
import type { PhotoSlot } from "@/data/templatesData";

/**
 * Bakes a "cover" crop into each photo so it fills its template slot
 * without stretching, even when rendered by html2canvas (which ignores
 * `objectFit: "cover"` on img tags).
 *
 * ### Why we need templateAspectRatio
 * Slot dimensions are expressed as percentages of the template container.
 * The container itself has a non-square (usually portrait) aspect ratio, so
 * the raw `widthPct / heightPct` ratio is NOT the slot's actual pixel ratio.
 *
 * Correct formula:
 *   actualSlotRatio = (widthPct / heightPct) × templateAspectRatio
 *
 * Example — official5 (aspectRatio ≈ 0.444, slot widthPct 73, heightPct 22):
 *   Wrong:   73 / 22          = 3.32  → extreme zoom
 *   Correct: 3.32 × 0.444    = 1.47  → natural crop
 *
 * @param photos              - Raw photo data URLs (one per slot, or fewer).
 * @param slots               - Template slot definitions (percentage-based).
 * @param templateAspectRatio - Overall template aspect ratio (width / height).
 * @returns Array of data URLs with each photo pre-cropped to its slot ratio.
 */
export function useCroppedTemplatePhotos(
  photos: string[],
  slots: PhotoSlot[],
  templateAspectRatio: number,
): string[] {
  const [cropped, setCropped] = useState<string[]>(photos);

  useEffect(() => {
    if (photos.length === 0 || slots.length === 0 || templateAspectRatio <= 0) {
      setCropped(photos);
      return;
    }

    let cancelled = false;

    Promise.all(
      photos.map((src, i) => {
        const slot = slots[i];
        if (!slot || !src) return Promise.resolve(src);

        // Compute the TRUE pixel aspect ratio of this slot by factoring in
        // the template container's own aspect ratio.
        const actualSlotW = slot.widthPct * templateAspectRatio;
        const actualSlotH = slot.heightPct; // heightPct stays as reference
        return cropPhotoToCoverRatio(src, actualSlotW, actualSlotH);
      }),
    ).then((results) => {
      if (!cancelled) setCropped(results);
    });

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, slots, templateAspectRatio]);

  return cropped;
}
