"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Download } from "lucide-react";
import Container from "@/components/ui/Container";
import {
  DownloadButton,
  ExportPanel,
  LoadingOverlay,
  PreviewCanvas,
  PreviewToolbar,
  SuccessToast,
  type ExportDimensions,
} from "@/components/preview";
import {
  buildExportFilename,
  downloadDataUrl,
  exportNodeToImage,
  type ExportFormat,
} from "@/utils/export";
import {
  getFilterById,
  getFilterStateServerSnapshot,
  getFilterStateSnapshot,
  subscribeFilterState,
} from "@/utils/filter";
import {
  getSessionPhotosServerSnapshot,
  getSessionPhotosSnapshot,
  subscribeSessionPhotos,
} from "@/utils/session";
import {
  getThemeById,
  getThemeStateServerSnapshot,
  getThemeStateSnapshot,
  subscribeThemeState,
} from "@/utils/theme";
import { getFilterPreset } from "@/data/filterPresets";
import { interpolateFilterSettings } from "@/lib/filterEngine";
import { useFilteredPhotos } from "@/hooks/useFilteredPhotos";

const EXPORT_SCALE = 2;
const PREVIEW_GRADIENT =
  "radial-gradient(120% 120% at 50% 0%, #FFFFFF 0%, #F1F1F4 100%)";

/** Full-screen "printing" animation — shown while export is in progress. */
function PrintAnimation({
  visible,
  stripSnapshot,
}: {
  visible: boolean;
  stripSnapshot: string | null;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="print-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-black/80 backdrop-blur-md"
        >
          {/* Ambient glow behind printer */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
          </div>

          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: -5, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 26 }}
            className="relative flex flex-col items-center"
          >
            {/* ── Printer body ── */}
            <div className="relative w-72 sm:w-80 rounded-3xl bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1c] px-7 py-6 shadow-[0_40px_80px_rgba(0,0,0,0.7)] ring-1 ring-white/8">
              
              {/* Top bar: dots + brand */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff453a]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ffd60a]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#30d158]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/30">
                  PixelCam Print
                </span>
                {/* Blinking status LED */}
                <motion.div
                  animate={{ opacity: [1, 0.15, 1], scale: [1, 0.85, 1] }}
                  transition={{ duration: 0.75, repeat: Infinity }}
                  className="h-3 w-3 rounded-full bg-[#30d158] shadow-[0_0_8px_#30d158,0_0_16px_#30d15860]"
                />
              </div>

              {/* Fake display panel */}
              <div className="mb-4 h-10 rounded-xl bg-[#0d0d0f] px-4 flex items-center justify-between ring-1 ring-white/5">
                <div className="flex gap-1.5 items-center">
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                    className="h-1.5 w-1.5 rounded-full bg-[#4ade80]"
                  />
                  <span className="text-[10px] font-mono text-[#4ade80]/80 tracking-widest">
                    PRINTING...
                  </span>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scaleY: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      style={{ transformOrigin: "bottom" }}
                      className="h-3 w-0.5 rounded-full bg-[#4ade80]/60"
                    />
                  ))}
                </div>
              </div>

              {/* Control buttons row */}
              <div className="mb-5 flex gap-2 justify-center">
                {["", "", ""].map((_, i) => (
                  <div
                    key={i}
                    className="h-7 flex-1 rounded-lg bg-[#0a0a0c] ring-1 ring-white/5"
                  />
                ))}
              </div>

              {/* ── Paper exit slot ── */}
              <div className="relative h-4 overflow-visible rounded-md bg-[#06060a] ring-1 ring-white/5">
                {/* Scanner glow bar sweeping across slot */}
                <motion.div
                  animate={{ x: ["-110%", "210%"] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                />
              </div>
            </div>

            {/* ── Strip sliding out ── */}
            <motion.div
              initial={{ y: -16, clipPath: "inset(0 0 100% 0)" }}
              animate={{ y: 0, clipPath: "inset(0 0 0% 0)" }}
              transition={{
                delay: 0.45,
                duration: 1.8,
                ease: [0.33, 1, 0.68, 1],
                clipPath: { duration: 1.8, ease: [0.33, 1, 0.68, 1] },
              }}
              className="relative mx-auto w-52 sm:w-60 overflow-hidden rounded-b-2xl bg-white shadow-[0_30px_70px_-10px_rgba(0,0,0,0.7)]"
            >
              {/* Top film perforations */}
              <div className="flex justify-between bg-[#0f0f0f] px-3 py-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-2 w-2 rounded-[3px] bg-[#2a2a2a]" />
                ))}
              </div>

              {/* Actual photo or placeholder */}
              {stripSnapshot ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={stripSnapshot}
                  alt="Photostrip preview"
                  className="block w-full"
                  style={{ display: "block" }}
                />
              ) : (
                /* Fallback gradient slots while snapshot not ready */
                <div className="bg-white px-3 py-2 flex flex-col gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-16 rounded-md bg-gradient-to-br from-[#dcc9a8] via-[#e0b07a] to-[#8fa8c0]"
                      style={{ opacity: 0.6 + i * 0.15 }}
                    />
                  ))}
                </div>
              )}

              {/* Bottom film perforations */}
              <div className="flex justify-between bg-[#0f0f0f] px-3 py-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-2 w-2 rounded-[3px] bg-[#2a2a2a]" />
                ))}
              </div>

              {/* Sheen overlay — simulates fresh-print glossy */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.35, 0] }}
                transition={{ delay: 1.0, duration: 1.0 }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent"
              />
            </motion.div>

            {/* Status text */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-center"
            >
              <p className="text-[15px] font-semibold text-white">Mencetak foto…</p>
              <p className="mt-1.5 text-[12px] text-white/45">
                Photostrip sedang diproses, sebentar lagi selesai
              </p>
            </motion.div>

            {/* Animated dots */}
            <div className="mt-5 flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.75, 1.15, 0.75] }}
                  transition={{ duration: 1.0, repeat: Infinity, delay: i * 0.22 }}
                  className="h-2 w-2 rounded-full bg-white/60"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


/**
 * Preview & Export Studio — renders the final photostrip from the preserved
 * session/theme/filter state and exports it as a high-resolution PNG or JPG,
 * fully client-side.
 */
export default function PreviewExperience() {
  const router = useRouter();

  // Preserved state from earlier stages (hydration-safe external stores).
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

  const filterIntensity = filterState.intensity ?? 100;
  const theme = getThemeById(themeState.themeId);
  const filter = getFilterById(filterState.filterId, filterIntensity);
  const filterPreset = getFilterPreset(filterState.filterId);
  const { customization } = themeState;

  const filterSettings = interpolateFilterSettings(filterPreset.settings, filterIntensity);
  const filteredPhotos = useFilteredPhotos(photos, filterSettings);

  const canvasRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<ExportDimensions>({ width: 0, height: 0 });
  const [isPrinting, setIsPrinting] = useState(false);
  const [stripSnapshot, setStripSnapshot] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const hasPhotos = photos.length > 0;

  // Measure the export node so the panel can show real dimensions.
  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const observer = new ResizeObserver(() => {
      const rect = node.getBoundingClientRect();
      setSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasPhotos]);

  // Auto-dismiss the error toast.
  useEffect(() => {
    if (!errorToast) return;
    const timer = window.setTimeout(() => setErrorToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [errorToast]);

  const handleDownload = useCallback(
    async (format: ExportFormat) => {
      const node = canvasRef.current;
      if (!node || isPrinting) return;

      // 1. Capture a quick snapshot of the strip to display inside the animation
      try {
        const { default: html2canvas } = await import("html2canvas");
        const snap = await html2canvas(node, {
          scale: 1,
          backgroundColor: theme.style.paper,
          useCORS: true,
          logging: false,
        });
        setStripSnapshot(snap.toDataURL("image/jpeg", 0.8));
      } catch {
        setStripSnapshot(null);
      }

      // 2. Show the printing animation
      setIsPrinting(true);

      // 3. Render the full-res export in the background
      let dataUrl: string | null = null;
      try {
        dataUrl = await exportNodeToImage(node, format, {
          scale: EXPORT_SCALE,
          background: theme.style.paper,
          quality: 0.95,
        });
      } catch {
        setIsPrinting(false);
        setErrorToast("Export failed. Please try again.");
        return;
      }

      // 4. Keep animation visible for at least 2.5s
      await new Promise<void>((res) => setTimeout(res, 2500));

      // 5. Dismiss and download
      setIsPrinting(false);
      setStripSnapshot(null);
      if (dataUrl) {
        downloadDataUrl(dataUrl, buildExportFilename(format));
      }
      setShowSuccess(true);
    },
    [isPrinting, theme.style.paper],
  );

  if (!hasPhotos) {
    return (
      <section className="flex-1 bg-[#FAFAFA] py-16">
        <Container size="sm" className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111] sm:text-[32px]">
            No photos to preview
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-[#6B7280]">
            Capture a photostrip first, then come back to preview and export it.
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
      {/* Printing overlay */}
      <PrintAnimation visible={isPrinting} stripSnapshot={stripSnapshot} />

      <Container size="xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start">
          {/* Left — preview */}
          <div className="flex flex-col gap-4">
            <PreviewToolbar
              onRetake={() => router.push("/session")}
              onBackToThemes={() => router.push("/theme")}
              onBackToFilters={() => router.push("/filter")}
            />

            <div
              className="relative flex min-h-[420px] items-center justify-center rounded-[24px] p-8 ring-1 ring-black/5 sm:p-12"
              style={{ background: theme.style.canvasPattern ?? theme.style.canvas }}
            >
              <LoadingOverlay show={false} />
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <PreviewCanvas
                  ref={canvasRef}
                  theme={theme}
                  customization={customization}
                  filter={filter}
                  photos={filteredPhotos}
                />
              </motion.div>
            </div>
          </div>

          {/* Right — export panel */}
          <div className="lg:sticky lg:top-24">
            <ExportPanel
              theme={theme}
              filter={filter}
              photoCount={photos.length}
              size={size}
              scale={EXPORT_SCALE}
              isExporting={isPrinting}
              onDownloadPng={() => handleDownload("png")}
              onDownloadJpg={() => handleDownload("jpeg")}
            />
          </div>
        </div>
      </Container>

      {/* Sticky download — mobile only */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E7EB] bg-white/90 p-3 backdrop-blur-md lg:hidden">
        <DownloadButton
          onClick={() => handleDownload("png")}
          loading={isPrinting}
          icon={<Download className="h-4 w-4" aria-hidden="true" />}
        >
          Download PNG
        </DownloadButton>
      </div>

      <SuccessToast show={showSuccess} onDone={() => setShowSuccess(false)} />

      {/* Error toast */}
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
