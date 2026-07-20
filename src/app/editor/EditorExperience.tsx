"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  FileImage,
  Trash2,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { DownloadButton, LoadingOverlay, SuccessToast } from "@/components/preview";
import {
  AdjustmentPanel,
  EditorCanvas,
  FramePanel,
  HistoryControls,
  StickerPanel,
  TextPanel,
  Toolbar,
  type EditorTab,
} from "@/components/editor";
import { useEditor } from "@/hooks/useEditor";
import { useAdjustedPhotos } from "@/hooks/useAdjustedPhotos";
import {
  buildExportFilename,
  downloadDataUrl,
  exportNodeToImage,
  type ExportFormat,
} from "@/utils/export";
import { DEFAULT_ADJUSTMENTS } from "@/utils/editor/canvas";
import {
  getFilterById,
  getFilterStateServerSnapshot,
  getFilterStateSnapshot,
  saveFilterState,
  subscribeFilterState,
} from "@/utils/filter";
import { AIAssistant } from "@/components/ai";
import {
  getSessionPhotosServerSnapshot,
  getSessionPhotosSnapshot,
  subscribeSessionPhotos,
} from "@/utils/session";
import {
  getThemeById,
  getThemeStateServerSnapshot,
  getThemeStateSnapshot,
  saveThemeState,
  subscribeThemeState,
} from "@/utils/theme";

const EXPORT_SCALE = 2;
const WORKSPACE_GRADIENT =
  "radial-gradient(120% 120% at 50% 0%, #FFFFFF 0%, #F4F4F6 100%)";

const iconButtonClass =
  "grid h-9 w-9 place-items-center rounded-[10px] border border-[#E5E7EB] bg-white text-[#111111] transition-colors hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2";

/**
 * Creative Studio — decorate the photostrip with stickers, text, frames and
 * adjustments, then export it (all decorations included) as PNG/JPG. Reads the
 * preserved photos/theme/filter state; owns decoration state via useEditor.
 */
export default function EditorExperience() {
  const photos = useSyncExternalStore(
    subscribeSessionPhotos,
    getSessionPhotosSnapshot,
    getSessionPhotosServerSnapshot,
  );
  const themeState = useSyncExternalStore(
    subscribeThemeState,
    getThemeStateSnapshot,
    getThemeStateServerSnapshot,
  );
  const filterState = useSyncExternalStore(
    subscribeFilterState,
    getFilterStateSnapshot,
    getFilterStateServerSnapshot,
  );

  // AI suggestions can override the stored theme/filter live (same-tab
  // storage writes don't fire the store's "storage" listener).
  const [themeOverride, setThemeOverride] = useState<string | null>(null);
  const [filterOverride, setFilterOverride] = useState<string | null>(null);

  const themeId = themeOverride ?? themeState.themeId;
  const filterId = filterOverride ?? filterState.filterId;
  const filterIntensity = filterState.intensity ?? 100;
  const theme = getThemeById(themeId);
  const filter = getFilterById(filterId, filterIntensity);
  const { customization } = themeState;

  const editor = useEditor();
  const {
    doc,
    selected,
    selectedId,
    select,
    addSticker,
    addText,
    removeItem,
    duplicateItem,
    bringForward,
    sendBackward,
    patchItem,
    patchItemLive,
    setAdjustmentsLive,
    setAdjustments,
    setFrame,
    beginTransaction,
    endTransaction,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = editor;

  const adjustedPhotos = useAdjustedPhotos(photos, doc.adjustments);

  const [tab, setTab] = useState<EditorTab>("stickers");
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const hasPhotos = photos.length > 0;

  // Keyboard: delete, arrow-nudge, undo/redo.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const inField =
        !!target &&
        (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) ||
          target.isContentEditable);
      const meta = event.ctrlKey || event.metaKey;

      if (meta && (event.key === "z" || event.key === "Z")) {
        event.preventDefault();
        if (event.shiftKey) redo();
        else undo();
        return;
      }
      if (meta && (event.key === "y" || event.key === "Y")) {
        event.preventDefault();
        redo();
        return;
      }

      if (inField || !selected) return;

      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        removeItem(selected.id);
        return;
      }

      const step = event.shiftKey ? 0.05 : 0.01;
      if (event.key === "ArrowLeft") {
        patchItem(selected.id, { x: Math.max(0, selected.x - step) });
      } else if (event.key === "ArrowRight") {
        patchItem(selected.id, { x: Math.min(1, selected.x + step) });
      } else if (event.key === "ArrowUp") {
        patchItem(selected.id, { y: Math.max(0, selected.y - step) });
      } else if (event.key === "ArrowDown") {
        patchItem(selected.id, { y: Math.min(1, selected.y + step) });
      } else {
        return;
      }
      event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, removeItem, patchItem, undo, redo]);

  useEffect(() => {
    if (!errorToast) return;
    const timer = window.setTimeout(() => setErrorToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [errorToast]);

  const handleExport = useCallback(
    async (format: ExportFormat) => {
      const node = canvasRef.current;
      if (!node || isExporting) return;
      select(null);
      setIsExporting(true);
      // Let deselect + blur overlay paint before capturing.
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
      try {
        const dataUrl = await exportNodeToImage(node, format, {
          scale: EXPORT_SCALE,
          background: theme.style.paper,
          quality: 0.95,
        });
        downloadDataUrl(dataUrl, buildExportFilename(format));
        setShowSuccess(true);
      } catch {
        setErrorToast("Export failed. Please try again.");
      } finally {
        setIsExporting(false);
      }
    },
    [isExporting, select, theme.style.paper],
  );

  const applyTheme = useCallback(
    (id: string) => {
      setThemeOverride(id);
      saveThemeState({ themeId: id, customization });
    },
    [customization],
  );

  const applyFilter = useCallback((id: string) => {
    setFilterOverride(id);
    saveFilterState({ filterId: id });
  }, []);

  if (!hasPhotos) {
    return (
      <section className="flex-1 bg-[#FAFAFA] py-16">
        <Container size="sm" className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111] sm:text-[32px]">
            Nothing to decorate yet
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-[#6B7280]">
            Capture a photostrip first, then come back to add stickers, text and
            frames.
          </p>
          <Link
            href="/session"
            className="inline-flex h-11 items-center gap-2 rounded-[14px] bg-[#111111] px-5 text-sm font-medium text-white transition-colors hover:bg-[#222222] active:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
          >
            <Camera className="h-4 w-4" aria-hidden="true" />
            Start a session
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="flex-1 bg-[#FAFAFA] py-8 pb-28 sm:py-12 lg:pb-12">
      <Container size="xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start">
          {/* Left — editable workspace */}
          <div
            className="relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5 sm:p-12"
            style={{ background: WORKSPACE_GRADIENT }}
          >
            <LoadingOverlay show={isExporting} />
            <div
              style={{ filter: isExporting ? "blur(4px)" : "none" }}
              className="transition-[filter] duration-300"
            >
              <EditorCanvas
                ref={canvasRef}
                theme={theme}
                filter={filter}
                customization={customization}
                photos={adjustedPhotos}
                doc={doc}
                selectedId={selectedId}
                exporting={isExporting}
                onSelect={select}
                onLive={patchItemLive}
                beginTransaction={beginTransaction}
                endTransaction={endTransaction}
              />
            </div>
          </div>

          {/* Right — tools */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]">
            <AIAssistant
              photos={photos}
              currentThemeId={themeId}
              currentFilterId={filterId}
              onApplyTheme={applyTheme}
              onApplyFilter={applyFilter}
              onEnhance={setAdjustments}
            />

            <HistoryControls
              onUndo={undo}
              onRedo={redo}
              onReset={reset}
              canUndo={canUndo}
              canRedo={canRedo}
            />

            <AnimatePresence initial={false}>
              {selected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 overflow-hidden"
                >
                  <span className="mr-auto text-[12px] font-semibold uppercase tracking-[0.06em] text-[#6B7280]">
                    Selected
                  </span>
                  <button
                    type="button"
                    onClick={() => bringForward(selected.id)}
                    aria-label="Bring forward"
                    className={iconButtonClass}
                  >
                    <ChevronUp className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => sendBackward(selected.id)}
                    aria-label="Send backward"
                    className={iconButtonClass}
                  >
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateItem(selected.id)}
                    aria-label="Duplicate"
                    className={iconButtonClass}
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(selected.id)}
                    aria-label="Delete"
                    className="grid h-9 w-9 place-items-center rounded-[10px] border border-[#FECACA] bg-white text-[#EF4444] transition-colors hover:bg-[#FEF2F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <Toolbar active={tab} onChange={setTab} />

            <div className="min-h-0 flex-1 overflow-y-auto rounded-[20px] border border-[#E5E7EB] bg-white p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {tab === "stickers" && <StickerPanel onAdd={addSticker} />}
                  {tab === "text" && (
                    <TextPanel
                      selected={selected}
                      onAdd={addText}
                      patchItem={patchItem}
                      patchItemLive={patchItemLive}
                      beginTransaction={beginTransaction}
                      endTransaction={endTransaction}
                    />
                  )}
                  {tab === "frames" && (
                    <FramePanel frameId={doc.frameId} onSelect={setFrame} />
                  )}
                  {tab === "adjustments" && (
                    <AdjustmentPanel
                      adjustments={doc.adjustments}
                      onLive={setAdjustmentsLive}
                      onReset={() => setAdjustments(DEFAULT_ADJUSTMENTS)}
                      beginTransaction={beginTransaction}
                      endTransaction={endTransaction}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Export */}
            <div className="hidden grid-cols-2 gap-2 lg:grid">
              <DownloadButton
                onClick={() => handleExport("png")}
                loading={isExporting}
                icon={<Download className="h-4 w-4" aria-hidden="true" />}
              >
                PNG
              </DownloadButton>
              <DownloadButton
                onClick={() => handleExport("jpeg")}
                loading={isExporting}
                variant="secondary"
                icon={<FileImage className="h-4 w-4" aria-hidden="true" />}
              >
                JPG
              </DownloadButton>
            </div>
          </div>
        </div>
      </Container>

      {/* Sticky download — mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-[#E5E7EB] bg-white/90 p-3 backdrop-blur-md lg:hidden">
        <DownloadButton
          onClick={() => handleExport("png")}
          loading={isExporting}
          icon={<Download className="h-4 w-4" aria-hidden="true" />}
        >
          PNG
        </DownloadButton>
        <DownloadButton
          onClick={() => handleExport("jpeg")}
          loading={isExporting}
          variant="secondary"
          icon={<FileImage className="h-4 w-4" aria-hidden="true" />}
        >
          JPG
        </DownloadButton>
      </div>

      <SuccessToast show={showSuccess} onDone={() => setShowSuccess(false)} />

      <AnimatePresence>
        {errorToast && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-20 z-50 mx-auto w-fit max-w-[90vw] rounded-[14px] bg-[#EF4444] px-4 py-2.5 text-center text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] lg:bottom-6"
          >
            {errorToast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
