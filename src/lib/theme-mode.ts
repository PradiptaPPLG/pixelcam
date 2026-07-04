/* ============================================================
   PIXELCAM — Color mode (light / dark / system)
   Tiny external store so the navbar toggle stays in sync and
   SSR/CSR markup matches (via useSyncExternalStore).
   ============================================================ */

export type ThemeMode = "light" | "dark" | "system";

export const THEME_MODE_KEY = "pixelcam:theme-mode";

const listeners = new Set<() => void>();
let cached: ThemeMode | null = null;

function readStored(): ThemeMode {
  try {
    const stored = window.localStorage.getItem(THEME_MODE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // ignore
  }
  return "system";
}

/** Current mode (stable reference for useSyncExternalStore). */
export function getThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  if (cached === null) cached = readStored();
  return cached;
}

export function getServerThemeMode(): ThemeMode {
  return "system";
}

export function subscribeThemeMode(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function systemPrefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/** Whether the given mode currently resolves to a dark appearance. */
export function isDark(mode: ThemeMode): boolean {
  return mode === "dark" || (mode === "system" && systemPrefersDark());
}

/** Apply the resolved appearance to <html>. */
export function applyThemeMode(mode: ThemeMode): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const dark = isDark(mode);
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

/** Persist + apply a new mode and notify subscribers. */
export function setThemeMode(mode: ThemeMode): void {
  cached = mode;
  try {
    window.localStorage.setItem(THEME_MODE_KEY, mode);
  } catch {
    // ignore
  }
  applyThemeMode(mode);
  listeners.forEach((listener) => listener());
}
