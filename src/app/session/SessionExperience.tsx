"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import { PermissionCard } from "@/components/camera";
import {
  Countdown,
  LiveCamera,
  PreviewStrip,
  SessionFooter,
  SessionHeader,
} from "@/components/session";
import { useCamera } from "@/hooks/useCamera";
import { useSession } from "@/hooks/useSession";
import { saveSessionPhotos } from "@/utils/session";
import {
  getTemplateStateServerSnapshot,
  getTemplateStateSnapshot,
  subscribeTemplateState,
  loadTemplateId,
} from "@/utils/template";
import { getTemplateById } from "@/data/templatesData";

const MIRRORED = true;

/**
 * Photo Session experience — a real photobooth run. The user chooses how many
 * shots and the countdown, then the session captures automatically and hands
 * the finished strip to the review route.
 */
export default function SessionExperience() {
  const router = useRouter();
  const { videoRef, status, errorMessage, start, retry, capture } = useCamera();

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
      if (activeId) {
        router.push("/film-lab");
      } else {
        router.push("/review");
      }
    },
    [router],
  );

  const session = useSession({
    capture,
    mirrored: MIRRORED,
    onComplete: handleComplete,
    initialPhotoCount,
  });

  // Ask for camera permission as soon as the page is entered.
  useEffect(() => {
    void start();
  }, [start]);

  const showPermissionCard =
    status === "denied" || status === "error" || status === "unsupported";
  const isLoadingCamera = status === "idle" || status === "requesting";
  const canStart = status === "ready";

  return (
    <section className="flex-1 bg-[#FAFAFA] py-8 sm:py-12">
      <Container size="xl" className="flex flex-col gap-8 sm:gap-10">
        <SessionHeader
          total={session.photoCount}
          completed={session.photos.length}
          activeIndex={session.currentShot}
          isRunning={session.isRunning}
        />

        {showPermissionCard ? (
          <PermissionCard
            denied={status === "denied"}
            message={errorMessage}
            onEnable={retry}
            onRetry={retry}
          />
        ) : (
          <>
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-8">
              <div className="flex w-full max-w-3xl flex-col items-center gap-6">
                <LiveCamera
                  videoRef={videoRef}
                  mirrored={MIRRORED}
                  isFlashing={session.isFlashing}
                  isLoading={isLoadingCamera}
                >
                  <Countdown value={session.countdownValue} />
                </LiveCamera>

                <SessionFooter
                  phase={session.phase}
                  photoCount={session.photoCount}
                  countdownSeconds={session.countdownSeconds}
                  onPhotoCount={session.setPhotoCount}
                  onCountdownSeconds={session.setCountdownSeconds}
                  onStart={session.start}
                  canStart={canStart}
                  isTemplateActive={!!templateId}
                />
              </div>

              <PreviewStrip
                photos={session.photos}
                total={session.photoCount}
              />
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
