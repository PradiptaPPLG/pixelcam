"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import {
  CameraControls,
  CameraView,
  PermissionCard,
  PreviewCard,
} from "@/components/camera";
import UploadFlow from "@/components/upload/UploadFlow";
import { useCamera } from "@/hooks/useCamera";

/**
 * Camera booth experience — orchestrates the useCamera hook with the local
 * capture / preview state. Ask for permission on entry, capture with a shutter
 * flash, or upload an image to replace the live feed.
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
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [mirrored, setMirrored] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  // Ask for camera permission as soon as the page is entered.
  useEffect(() => {
    void start();
  }, [start]);

  // Auto-dismiss transient toasts.
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleCapture = () => {
    const shot = capture(mirrored);
    setIsFlashing(true);
    window.setTimeout(() => setIsFlashing(false), 200);
    if (shot) {
      window.setTimeout(() => setCapturedImage(shot), 120);
    }
  };

  // Continue leaves the single-shot preview and enters the photo session.
  const handleContinue = () => router.push("/session");

  const showPermissionCard =
    status === "denied" || status === "error" || status === "unsupported";
  const isLoadingCamera = status === "idle" || status === "requesting";

  return (
    <section className="flex-1 bg-[#FAFAFA] py-12 sm:py-16">
      <Container size="lg" className="flex flex-col items-center gap-8 sm:gap-10">
        <header className="flex flex-col items-center gap-2 text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
            Camera Booth
          </span>
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111] sm:text-[32px]">
            Take your shot
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-[#6B7280]">
            Line yourself up in frame and capture the moment, or upload a photo
            you already have.
          </p>
        </header>

        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            {capturedImage ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <PreviewCard
                  imageSrc={capturedImage}
                  onRetake={() => setCapturedImage(null)}
                  onContinue={handleContinue}
                />
              </motion.div>
            ) : showPermissionCard ? (
              <motion.div
                key="permission"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <PermissionCard
                  denied={status === "denied"}
                  message={errorMessage}
                  onEnable={retry}
                  onRetry={retry}
                />
              </motion.div>
            ) : (
              <motion.div
                key="live"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-8"
              >
                <CameraView
                  videoRef={videoRef}
                  mirrored={mirrored}
                  isFlashing={isFlashing}
                  isLoading={isLoadingCamera}
                />
                <CameraControls
                  onCapture={handleCapture}
                  captureDisabled={status !== "ready"}
                  mirrored={mirrored}
                  onToggleMirror={() => setMirrored((value) => !value)}
                  onUpload={setCapturedImage}
                  onUploadError={setToast}
                  onUploadClick={() => setUploadOpen(true)}
                  devices={devices}
                  activeDeviceId={activeDeviceId}
                  hasMultipleCameras={hasMultipleCameras}
                  onSelectDevice={selectDevice}
                  onSwitchCamera={switchCamera}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>

      {/* Toast */}
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

      <UploadFlow open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </section>
  );
}
