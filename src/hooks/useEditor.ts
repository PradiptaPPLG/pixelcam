"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { uid } from "@/lib/utils";
import {
  type History,
  canRedo,
  canUndo,
  commit,
  commitSnapshot,
  initHistory,
  redo,
  undo,
} from "@/utils/editor/history";
import { createSticker } from "@/utils/editor/stickers";
import { createText } from "@/utils/editor/text";
import { saveEditorDoc, EMPTY_EDITOR_DOC } from "@/utils/editor/storage";
import type {
  Adjustments,
  Decoration,
  EditorDoc,
} from "@/utils/editor/types";

export interface UseEditorResult {
  doc: EditorDoc;
  selectedId: string | null;
  selected: Decoration | null;
  select: (id: string | null) => void;
  addSticker: (stickerId: string) => void;
  addText: (text: string) => void;
  removeItem: (id: string) => void;
  duplicateItem: (id: string) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  /** Commit a decoration change to history. */
  patchItem: (id: string, patch: Partial<Decoration>) => void;
  /** Live (no-history) decoration change during a transaction. */
  patchItemLive: (id: string, patch: Partial<Decoration>) => void;
  setAdjustments: (patch: Partial<Adjustments>) => void;
  setAdjustmentsLive: (patch: Partial<Adjustments>) => void;
  setFrame: (frameId: string) => void;
  beginTransaction: () => void;
  endTransaction: () => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

function updateDecoration(
  doc: EditorDoc,
  id: string,
  patch: Partial<Decoration>,
): EditorDoc {
  return {
    ...doc,
    decorations: doc.decorations.map((decoration) =>
      decoration.id === id
        ? ({ ...decoration, ...patch } as Decoration)
        : decoration,
    ),
  };
}

function swap(list: Decoration[], a: number, b: number): Decoration[] {
  const next = [...list];
  [next[a], next[b]] = [next[b], next[a]];
  return next;
}

/**
 * Editor state: an undoable document plus a current selection. Continuous
 * gestures (drag/resize/rotate/sliders) run as a single transaction so they
 * collapse to one history entry.
 */
export function useEditor(): UseEditorResult {
  const [history, setHistory] = useState<History<EditorDoc>>(() =>
    initHistory(EMPTY_EDITOR_DOC),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const txnActive = useRef(false);
  const txnStart = useRef<EditorDoc | null>(null);

  const doc = history.present;

  // Persist so decorations are preserved / ready for export.
  useEffect(() => {
    saveEditorDoc(doc);
  }, [doc]);

  const setDocLive = useCallback((next: EditorDoc) => {
    setHistory((h) => {
      if (txnActive.current && txnStart.current === null) {
        txnStart.current = h.present;
      }
      return { ...h, present: next };
    });
  }, []);

  const addSticker = useCallback(
    (stickerId: string) => {
      const sticker = createSticker(stickerId);
      setHistory((h) =>
        commit(h, {
          ...h.present,
          decorations: [...h.present.decorations, sticker],
        }),
      );
      setSelectedId(sticker.id);
    },
    [],
  );

  const addText = useCallback((text: string) => {
    const item = createText(text);
    setHistory((h) =>
      commit(h, { ...h.present, decorations: [...h.present.decorations, item] }),
    );
    setSelectedId(item.id);
  }, []);

  const removeItem = useCallback((id: string) => {
    setHistory((h) =>
      commit(h, {
        ...h.present,
        decorations: h.present.decorations.filter((d) => d.id !== id),
      }),
    );
    setSelectedId((current) => (current === id ? null : current));
  }, []);

  const duplicateItem = useCallback((id: string) => {
    setHistory((h) => {
      const source = h.present.decorations.find((d) => d.id === id);
      if (!source) return h;
      const copy: Decoration = {
        ...source,
        id: uid("dec"),
        x: Math.min(source.x + 0.05, 0.95),
        y: Math.min(source.y + 0.05, 0.95),
      };
      const index = h.present.decorations.findIndex((d) => d.id === id);
      const decorations = [...h.present.decorations];
      decorations.splice(index + 1, 0, copy);
      setSelectedId(copy.id);
      return commit(h, { ...h.present, decorations });
    });
  }, []);

  const bringForward = useCallback((id: string) => {
    setHistory((h) => {
      const index = h.present.decorations.findIndex((d) => d.id === id);
      if (index < 0 || index >= h.present.decorations.length - 1) return h;
      return commit(h, {
        ...h.present,
        decorations: swap(h.present.decorations, index, index + 1),
      });
    });
  }, []);

  const sendBackward = useCallback((id: string) => {
    setHistory((h) => {
      const index = h.present.decorations.findIndex((d) => d.id === id);
      if (index <= 0) return h;
      return commit(h, {
        ...h.present,
        decorations: swap(h.present.decorations, index, index - 1),
      });
    });
  }, []);

  const patchItem = useCallback(
    (id: string, patch: Partial<Decoration>) => {
      setHistory((h) => commit(h, updateDecoration(h.present, id, patch)));
    },
    [],
  );

  const patchItemLive = useCallback(
    (id: string, patch: Partial<Decoration>) => {
      setDocLive(updateDecoration(doc, id, patch));
    },
    [doc, setDocLive],
  );

  const setAdjustments = useCallback((patch: Partial<Adjustments>) => {
    setHistory((h) =>
      commit(h, {
        ...h.present,
        adjustments: { ...h.present.adjustments, ...patch },
      }),
    );
  }, []);

  const setAdjustmentsLive = useCallback(
    (patch: Partial<Adjustments>) => {
      setDocLive({ ...doc, adjustments: { ...doc.adjustments, ...patch } });
    },
    [doc, setDocLive],
  );

  const setFrame = useCallback((frameId: string) => {
    setHistory((h) => commit(h, { ...h.present, frameId }));
  }, []);

  const beginTransaction = useCallback(() => {
    txnActive.current = true;
    txnStart.current = null;
  }, []);

  const endTransaction = useCallback(() => {
    const snapshot = txnStart.current;
    txnActive.current = false;
    txnStart.current = null;
    if (snapshot === null) return;
    setHistory((h) => commitSnapshot(h, snapshot));
  }, []);

  const doUndo = useCallback(() => setHistory((h) => undo(h)), []);
  const doRedo = useCallback(() => setHistory((h) => redo(h)), []);
  const reset = useCallback(() => {
    setHistory((h) => commit(h, EMPTY_EDITOR_DOC));
    setSelectedId(null);
  }, []);

  const selected = useMemo(
    () => doc.decorations.find((d) => d.id === selectedId) ?? null,
    [doc.decorations, selectedId],
  );

  return {
    doc,
    selectedId,
    selected,
    select: setSelectedId,
    addSticker,
    addText,
    removeItem,
    duplicateItem,
    bringForward,
    sendBackward,
    patchItem,
    patchItemLive,
    setAdjustments,
    setAdjustmentsLive,
    setFrame,
    beginTransaction,
    endTransaction,
    undo: doUndo,
    redo: doRedo,
    reset,
    canUndo: canUndo(history),
    canRedo: canRedo(history),
  };
}
