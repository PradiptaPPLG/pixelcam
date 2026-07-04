/* ============================================================
   PIXELCAM — Creative Studio Persistence
   Persists the editor document so decorations survive within the
   session and are ready for export.
   ============================================================ */

import { DEFAULT_ADJUSTMENTS } from "./canvas";
import { DEFAULT_FRAME_ID } from "./frames";
import type { EditorDoc } from "./types";

export const EDITOR_STATE_KEY = "pixelcam:editor-state";

export const EMPTY_EDITOR_DOC: EditorDoc = {
  decorations: [],
  adjustments: DEFAULT_ADJUSTMENTS,
  frameId: DEFAULT_FRAME_ID,
};

export function saveEditorDoc(doc: EditorDoc): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(EDITOR_STATE_KEY, JSON.stringify(doc));
  } catch {
    // Storage may be unavailable — fail silently.
  }
}
