/* ============================================================
   PIXELCAM — Creative Studio History Manager
   Generic, immutable undo/redo over a present value.
   ============================================================ */

export interface History<T> {
  past: T[];
  present: T;
  future: T[];
}

const MAX_DEPTH = 100;

export function initHistory<T>(present: T): History<T> {
  return { past: [], present, future: [] };
}

/** Record a new committed value, clearing the redo stack. */
export function commit<T>(history: History<T>, next: T): History<T> {
  return {
    past: [...history.past, history.present].slice(-MAX_DEPTH),
    present: next,
    future: [],
  };
}

/** Record `snapshot` as the prior state for the current present (drag end). */
export function commitSnapshot<T>(
  history: History<T>,
  snapshot: T,
): History<T> {
  return {
    past: [...history.past, snapshot].slice(-MAX_DEPTH),
    present: history.present,
    future: [],
  };
}

export function undo<T>(history: History<T>): History<T> {
  if (history.past.length === 0) return history;
  const previous = history.past[history.past.length - 1];
  return {
    past: history.past.slice(0, -1),
    present: previous,
    future: [history.present, ...history.future],
  };
}

export function redo<T>(history: History<T>): History<T> {
  if (history.future.length === 0) return history;
  const next = history.future[0];
  return {
    past: [...history.past, history.present],
    present: next,
    future: history.future.slice(1),
  };
}

export function canUndo<T>(history: History<T>): boolean {
  return history.past.length > 0;
}

export function canRedo<T>(history: History<T>): boolean {
  return history.future.length > 0;
}
