/* ============================================================
   PIXELCAM — Photo Session Utilities
   Session options, defaults and the sessionStorage bridge used
   to hand captured photos to the review route.
   ============================================================ */

/** Selectable number of photos per session. */
export const PHOTO_COUNT_OPTIONS = [2, 4, 6] as const;

/** Selectable countdown durations in seconds (0 = off). */
export const COUNTDOWN_OPTIONS = [0, 3, 5] as const;

export const DEFAULT_PHOTO_COUNT = 4;
export const DEFAULT_COUNTDOWN = 3;

/** Key under which the finished strip is stored for the review page. */
export const SESSION_PHOTOS_KEY = "pixelcam:session-photos";

/** Human label for a countdown option. */
export function countdownLabel(seconds: number): string {
  return seconds === 0 ? "Off" : `${seconds}s`;
}

/** Persist the captured strip so the review route can read it. */
export function saveSessionPhotos(photos: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_PHOTOS_KEY, JSON.stringify(photos));
  } catch {
    // Storage may be unavailable (private mode / quota) — fail silently.
  }
}

/** Read the captured strip persisted by the session. */
export function loadSessionPhotos(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(SESSION_PHOTOS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------
   useSyncExternalStore adapters (used by the review route to
   read the strip without a hydration-mismatching effect).
   ------------------------------------------------------------ */

const EMPTY_SESSION_PHOTOS: string[] = [];
let snapshotRaw: string | null = null;
let snapshotValue: string[] = EMPTY_SESSION_PHOTOS;

/** Subscribe to cross-tab session-storage changes. */
export function subscribeSessionPhotos(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

/** Stable client snapshot — only allocates a new array when storage changes. */
export function getSessionPhotosSnapshot(): string[] {
  const raw =
    typeof window === "undefined"
      ? null
      : window.sessionStorage.getItem(SESSION_PHOTOS_KEY);
  if (raw !== snapshotRaw) {
    snapshotRaw = raw;
    snapshotValue = loadSessionPhotos();
  }
  return snapshotValue;
}

/** Server snapshot — always empty (no storage during SSR). */
export function getSessionPhotosServerSnapshot(): string[] {
  return EMPTY_SESSION_PHOTOS;
}
