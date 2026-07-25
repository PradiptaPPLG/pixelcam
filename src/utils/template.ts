/* ============================================================
   PIXELCAM — Template State Utilities
   Persists the selected template ID to sessionStorage so it
   survives page navigation without React context.
   ============================================================ */

export const TEMPLATE_STATE_KEY = "pixelcam:template-id";

/** Save selected template ID (or null to clear). */
export function saveTemplateId(id: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (id === null) {
      window.sessionStorage.removeItem(TEMPLATE_STATE_KEY);
    } else {
      window.sessionStorage.setItem(TEMPLATE_STATE_KEY, id);
    }
    // Dispatch storage event so useSyncExternalStore updates other tabs.
    window.dispatchEvent(new Event("storage"));
  } catch {
    // Fail silently in private mode / quota exceeded.
  }
}

/** Load the saved template ID, or null if none. */
export function loadTemplateId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(TEMPLATE_STATE_KEY);
  } catch {
    return null;
  }
}

/* ── useSyncExternalStore adapters ─────────────────────────── */

let _snapshot: string | null | undefined = undefined;

export function subscribeTemplateState(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function getTemplateStateSnapshot(): string | null {
  const raw =
    typeof window === "undefined"
      ? null
      : window.sessionStorage.getItem(TEMPLATE_STATE_KEY);
  if (_snapshot !== raw) _snapshot = raw;
  return _snapshot ?? null;
}

export function getTemplateStateServerSnapshot(): string | null {
  return null;
}
