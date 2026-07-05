"use client";

import { useEffect, useState } from "react";
import { FILTER_PRESETS } from "@/data/filterPresets";
import { applyFilter } from "@/lib/filterEngine";

/** Resize a photo to a small square for use as a thumbnail. */
async function makeThumbnail(src: string, size = 64): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(src);

      // Center-crop to square
      const s = Math.min(img.naturalWidth, img.naturalHeight);
      const ox = (img.naturalWidth - s) / 2;
      const oy = (img.naturalHeight - s) / 2;
      ctx.drawImage(img, ox, oy, s, s, 0, 0, size, size);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

/**
 * Returns a map of filterId → processed thumbnail data URL.
 * Falls back to `null` for each filter while processing.
 */
export function useFilterThumbnails(
  photo: string | null,
): Record<string, string | null> {
  const [thumbs, setThumbs] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(FILTER_PRESETS.map((p) => [p.id, null])),
  );

  useEffect(() => {
    if (!photo) return;
    let cancelled = false;

    async function generate() {
      if (!photo) return;
      // Step 1: Make a tiny thumbnail first
      const tiny = await makeThumbnail(photo, 64);
      if (cancelled) return;

      // Step 2: Apply each filter in parallel
      const entries = await Promise.all(
        FILTER_PRESETS.map(async (preset) => {
          const result = await applyFilter(tiny, preset.settings);
          return [preset.id, result] as [string, string];
        }),
      );
      if (!cancelled) {
        setThumbs(Object.fromEntries(entries));
      }
    }

    void generate();
    return () => {
      cancelled = true;
    };
  }, [photo]);

  return thumbs;
}
