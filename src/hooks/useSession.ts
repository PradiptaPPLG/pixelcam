"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sleep } from "@/lib/utils";
import { DEFAULT_COUNTDOWN, DEFAULT_PHOTO_COUNT } from "@/utils/session";

export type SessionPhase = "setup" | "running" | "complete";

interface UseSessionParams {
  /** Grabs the current frame as a data URL (from useCamera). */
  capture: (mirrored: boolean) => string | null;
  /** Whether captures should be mirrored to match the preview. */
  mirrored: boolean;
  /** Called once the final shot is taken, with the full strip. */
  onComplete: (photos: string[]) => void;
  initialPhotoCount?: number;
}

export interface UseSessionResult {
  phase: SessionPhase;
  photoCount: number;
  countdownSeconds: number;
  /** Zero-based index of the shot currently being taken. */
  currentShot: number;
  /** Live countdown number, or null when not counting. */
  countdownValue: number | null;
  isFlashing: boolean;
  photos: string[];
  isRunning: boolean;
  setPhotoCount: (count: number) => void;
  setCountdownSeconds: (seconds: number) => void;
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
  start: () => Promise<void>;
}

/**
 * Drives the automated photobooth capture loop: countdown → flash → capture,
 * repeated for the chosen number of shots with no button presses in between.
 * The camera feed itself is owned by useCamera; this hook only sequences it.
 */
export function useSession({
  capture,
  mirrored,
  onComplete,
  initialPhotoCount,
}: UseSessionParams): UseSessionResult {
  const [phase, setPhase] = useState<SessionPhase>("setup");
  const [photoCount, setPhotoCount] = useState(initialPhotoCount ?? DEFAULT_PHOTO_COUNT);
  const [countdownSeconds, setCountdownSeconds] = useState(DEFAULT_COUNTDOWN);
  const [currentShot, setCurrentShot] = useState(0);
  const [countdownValue, setCountdownValue] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    if (initialPhotoCount !== undefined) {
      setPhotoCount(initialPhotoCount);
    }
  }, [initialPhotoCount]);

  // Reset phase to setup if the user deletes a photo, allowing them to retake
  useEffect(() => {
    if (photos.length < photoCount && phase === "complete") {
      setPhase("setup");
    }
  }, [photos.length, photoCount, phase]);

  const runningRef = useRef(false);
  const cancelledRef = useRef(false);

  // Abort the loop if the user leaves the page mid-session.
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const start = useCallback(async () => {
    if (runningRef.current) return;
    if (photos.length >= photoCount) return;

    runningRef.current = true;
    cancelledRef.current = false;

    setPhase("running");

    const collected: string[] = [...photos];

    for (let shot = collected.length; shot < photoCount; shot++) {
      if (cancelledRef.current) return;
      setCurrentShot(shot);

      // Countdown (skipped entirely when set to "Off").
      if (countdownSeconds > 0) {
        for (let n = countdownSeconds; n >= 1; n--) {
          if (cancelledRef.current) return;
          setCountdownValue(n);
          await sleep(1000);
        }
        setCountdownValue(null);
      }
      if (cancelledRef.current) return;

      // Flash + capture.
      setIsFlashing(true);
      const shotData = capture(mirrored);
      await sleep(220);
      setIsFlashing(false);

      if (shotData) {
        collected.push(shotData);
        setPhotos([...collected]);
      }

      // Let the new photo settle into the strip before the next shot.
      await sleep(700);
    }

    if (cancelledRef.current) return;
    runningRef.current = false;
    setPhase("complete");
  }, [photoCount, countdownSeconds, capture, mirrored, photos]);

  return {
    phase,
    photoCount,
    countdownSeconds,
    currentShot,
    countdownValue,
    isFlashing,
    photos,
    isRunning: phase === "running",
    setPhotoCount,
    setCountdownSeconds,
    setPhotos,
    start,
  };
}
