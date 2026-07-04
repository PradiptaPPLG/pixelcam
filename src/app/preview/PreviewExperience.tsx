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

const EXPORT_SCALE = 2;
const PREVIEW_GRADIENT =
  "radial-gradient(120% 120% at 50% 0%, #FFFFFF 0%, #F1F1F4 100%)";

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

  const theme = getThemeById(themeState.themeId);
  const filter = getFilterById(filterState.filterId);
  const { customization } = themeState;

  const canvasRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<ExportDimensions>({ width: 0, height: 0 });
  const [isExporting, setIsExporting] = useState(false);
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
      if (!node || isExporting) return;
      setIsExporting(true);
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
    [isExporting, theme.style.paper],
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
              style={{ background: PREVIEW_GRADIENT }}
            >
              <LoadingOverlay show={isExporting} />
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ filter: isExporting ? "blur(4px)" : "none" }}
                className="transition-[filter] duration-300"
              >
                <PreviewCanvas
                  ref={canvasRef}
                  theme={theme}
                  customization={customization}
                  filter={filter}
                  photos={photos}
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
              isExporting={isExporting}
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
          loading={isExporting}
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
