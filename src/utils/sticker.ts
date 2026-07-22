export const STICKERS_STATE_KEY = "pixelcam:stickers-state";

export interface StickerPlacement {
  id: string; // Unique ID for this specific sticker instance on the canvas
  url: string; // The image source
  x: number; // Center X position (relative to canvas width, e.g., 0.5 is center)
  y: number; // Center Y position (relative to canvas height)
  scale: number; // 1.0 is default size
  rotation: number; // degrees
}

export function saveStickerState(placements: StickerPlacement[]): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STICKERS_STATE_KEY, JSON.stringify(placements));
  } catch {
    // Storage may be unavailable — fail silently.
  }
}

export function loadStickerState(): StickerPlacement[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STICKERS_STATE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as StickerPlacement[];
    }
    return [];
  } catch {
    return [];
  }
}

let stickerSnapRaw: string | null = null;
let stickerSnapValue: StickerPlacement[] = [];

export function subscribeStickerState(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function getStickerStateSnapshot(): StickerPlacement[] {
  const raw =
    typeof window === "undefined"
      ? null
      : window.sessionStorage.getItem(STICKERS_STATE_KEY);
  if (raw !== stickerSnapRaw) {
    stickerSnapRaw = raw;
    stickerSnapValue = loadStickerState();
  }
  return stickerSnapValue;
}

export function getStickerStateServerSnapshot(): StickerPlacement[] {
  return [];
}
