"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FlipHorizontal2, Upload, SwitchCamera } from "lucide-react";
import Container from "@/components/ui/Container";
import { PermissionCard, CameraSelector, CaptureButton } from "@/components/camera";
import {
  Countdown,
  LiveCamera,
  PreviewStrip,
  SessionFooter,
} from "@/components/session";
import UploadFlow from "@/components/upload/UploadFlow";
import { useCamera } from "@/hooks/useCamera";
import { useSession } from "@/hooks/useSession";
import { saveSessionPhotos } from "@/utils/session";
import { cn } from "@/lib/utils";
import {
  getTemplateStateServerSnapshot,
  getTemplateStateSnapshot,
  subscribeTemplateState,
  loadTemplateId,
} from "@/utils/template";
import { getTemplateById } from "@/data/templatesData";

/**
 * Merged Camera + Session experience.
 *
 * Previously the app had two separate pages:
 *  1. /camera  — single test shot → review → continue
 *  2. /session — actual multi-photo session
 *
 * Those have been unified here:  the user lands straight on the
 * full-session view (live camera left, strip slots right, controls
 * bottom) and presses "Start Session" once to begin capturing.
 * The redundant single-shot review step has been removed entirely.
 */
export default function CameraExperience() {
  const {
    videoRef,
    status,
    errorMessage,
    devices,
    activeDeviceId,
    hasMultipleCameras,
    start,
    retry,
    switchCamera,
    selectDevice,
    capture,
  } = useCamera();

  const router = useRouter();
  const [mirrored, setMirrored] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const templateId = useSyncExternalStore(
    subscribeTemplateState,
    getTemplateStateSnapshot,
    getTemplateStateServerSnapshot,
  );

  const activeTemplate = templateId ? getTemplateById(templateId) : null;
  const initialPhotoCount = activeTemplate ? activeTemplate.slots.length : undefined;

  const handleComplete = useCallback(
    (photos: string[]) => {
      saveSessionPhotos(photos);
      const activeId = loadTemplateId();
      router.push(activeId ? "/film-lab" : "/review");
    },
    [router],
  );

  const session = useSession({
    capture,
    mirrored,
    onComplete: handleComplete,
    initialPhotoCount,
  });

  // Request camera access on mount.
  useEffect(() => {
    void start();
  }, [start]);

  // Auto-dismiss toasts.
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  const showPermissionCard =
    status === "denied" || status === "error" || status === "unsupported";
  const isLoadingCamera = status === "idle" || status === "requesting";
  const canStart = status === "ready";
  return (
    <section className="flex-1 bg-[#FAFAFA] dark:bg-[#0D0D0F] py-4 sm:py-6">
      <Container size="xl" className="flex flex-col gap-4 sm:gap-5">
        <header className="flex flex-col items-center text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B7280] dark:text-[#a1a1aa]">
            Camera Booth
          </span>
          <h1 className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.02em] text-[#111111] dark:text-[#f4f4f5] leading-tight">
            Take your shot
          </h1>
        </header>

        {showPermissionCard ? (
          <PermissionCard
            denied={status === "denied"}
            message={errorMessage}
            onEnable={retry}
            onRetry={retry}
          />
        ) : (
          <>
            {/* ── Camera + strip side-by-side ───────────────── */}
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-center lg:gap-6">

              {/* Live camera */}
              <div className="w-full max-w-3xl">
                <LiveCamera
                  videoRef={videoRef}
                  mirrored={mirrored}
                  isFlashing={session.isFlashing}
                  isLoading={isLoadingCamera}
                >
                  <Countdown value={session.countdownValue} />
                </LiveCamera>
              </div>

              {/* Photo strip preview slots */}
              <PreviewStrip
                photos={session.photos}
                total={session.photoCount}
              />
            </div>

            {/* ── Bottom controls ───────────────────────────── */}
            <div className="flex flex-col items-center gap-2 -mt-2">
              {/* Circular Shutter/Start Button */}
              {session.phase === "setup" && (
                <div className="flex justify-center">
                  <CaptureButton onCapture={session.start} disabled={!canStart} />
                </div>
              )}

              {/* Secondary controls: Upload + Mirror + Camera switch */}
              {session.phase === "setup" && (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {/* Upload */}
                  <button
                    type="button"
                    onClick={() => setUploadOpen(true)}
                    className="inline-flex h-10 items-center gap-2 rounded-[14px] border border-[#E5E7EB] dark:border-[#2a2a2e] bg-white dark:bg-[#18181b] px-4 text-sm font-medium text-[#111111] dark:text-[#f4f4f5] transition-colors hover:bg-[#F5F5F5] dark:hover:bg-[#232327] active:bg-[#EEEEEE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
                  >
                    <Upload className="h-4 w-4" aria-hidden="true" />
                    Upload
                  </button>

                  {/* Mirror toggle */}
                  <button
                    type="button"
                    onClick={() => setMirrored((v) => !v)}
                    aria-pressed={mirrored}
                    className={cn(
                      "inline-flex h-10 items-center gap-2 rounded-[14px] border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2",
                      mirrored
                        ? "border-[#4F46E5] bg-[#EEF2FF] dark:bg-[#1e1b3a] text-[#4F46E5]"
                        : "border-[#E5E7EB] dark:border-[#2a2a2e] bg-white dark:bg-[#18181b] text-[#111111] dark:text-[#f4f4f5] hover:bg-[#F5F5F5] dark:hover:bg-[#232327] active:bg-[#EEEEEE]",
                    )}
                  >
                    <FlipHorizontal2 className="h-4 w-4" aria-hidden="true" />
                    Mirror
                  </button>

                  {/* Camera switch (mobile / multi-cam) */}
                  {hasMultipleCameras && (
                    <>
                      <button
                        type="button"
                        onClick={switchCamera}
                        aria-label="Switch camera"
                        className="inline-flex h-10 items-center gap-2 rounded-[14px] border border-[#E5E7EB] dark:border-[#2a2a2e] bg-white dark:bg-[#18181b] px-4 text-sm font-medium text-[#111111] dark:text-[#f4f4f5] transition-colors hover:bg-[#F5F5F5] dark:hover:bg-[#232327] active:bg-[#EEEEEE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
                      >
                        <SwitchCamera className="h-4 w-4" aria-hidden="true" />
                        Flip
                      </button>

                      <CameraSelector
                        devices={devices}
                        activeDeviceId={activeDeviceId}
                        onSelect={selectDevice}
                      />
                    </>
                  )}
                </div>
              )}

              {/* Primary controls: photo count + countdown */}
              <SessionFooter
                phase={session.phase}
                photoCount={session.photoCount}
                countdownSeconds={session.countdownSeconds}
                onPhotoCount={session.setPhotoCount}
                onCountdownSeconds={session.setCountdownSeconds}
                onStart={session.start}
                canStart={canStart}
                isTemplateActive={!!templateId}
                showStartButton={false}
              />
            </div>
          </>
        )}
      </Container>

      {/* ── Toast notification ────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-6 z-50 mx-auto w-fit max-w-[90vw] rounded-[14px] bg-[#111111] px-4 py-2.5 text-center text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Upload multi-photo modal ──────────────────────── */}
      <UploadFlow
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        fixedCount={activeTemplate ? activeTemplate.slots.length : undefined}
        onFinish={
          activeTemplate
            ? (all) => {
                saveSessionPhotos(all);
                router.push("/film-lab");
              }
            : undefined
        }
      />
    </section>
  );
}
