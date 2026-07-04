"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  type CameraDeviceInfo,
  type FacingMode,
  captureStillFromVideo,
  describeCameraError,
  isCameraSupported,
  isPermissionDeniedError,
  listVideoInputDevices,
  requestCameraStream,
  stopStream,
} from "@/utils/camera";

export type CameraStatus =
  | "idle"
  | "requesting"
  | "ready"
  | "denied"
  | "error"
  | "unsupported";

interface OpenOptions {
  deviceId?: string;
  facingMode?: FacingMode;
}

export interface UseCameraResult {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  status: CameraStatus;
  errorMessage: string | null;
  devices: CameraDeviceInfo[];
  activeDeviceId: string | null;
  facingMode: FacingMode;
  hasMultipleCameras: boolean;
  /** Open the camera (called on entering the page). */
  start: () => Promise<void>;
  /** Release the camera stream. */
  stop: () => void;
  /** Retry after a denial or error. */
  retry: () => Promise<void>;
  /** Cycle to the next camera / flip facing mode. */
  switchCamera: () => Promise<void>;
  /** Open a specific device by id. */
  selectDevice: (deviceId: string) => Promise<void>;
  /** Capture the current frame as a data URL. */
  capture: (mirrored: boolean) => string | null;
}

/**
 * Manages the full lifecycle of a camera preview: permission, stream,
 * device switching and still capture. All DOM/MediaDevices work lives in
 * `utils/camera` — this hook only orchestrates React state.
 */
export function useCamera(): UseCameraResult {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const facingModeRef = useRef<FacingMode>("user");
  const activeDeviceIdRef = useRef<string | null>(null);

  const [status, setStatus] = useState<CameraStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [devices, setDevices] = useState<CameraDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>("user");

  const attachStream = useCallback((stream: MediaStream) => {
    streamRef.current = stream;
    const video = videoRef.current;
    if (video) {
      video.srcObject = stream;
      // Some browsers need an explicit play() after assigning srcObject.
      void video.play().catch(() => {});
    }
  }, []);

  const open = useCallback(
    async (options: OpenOptions = {}) => {
      if (!isCameraSupported()) {
        setStatus("unsupported");
        setErrorMessage("Your browser doesn't support camera access.");
        return;
      }

      setStatus("requesting");
      setErrorMessage(null);
      stopStream(streamRef.current);
      streamRef.current = null;

      try {
        const facing = options.facingMode ?? facingModeRef.current;
        const stream = await requestCameraStream({
          facingMode: facing,
          deviceId: options.deviceId,
        });
        attachStream(stream);

        const settings = stream.getVideoTracks()[0]?.getSettings();
        const resolvedDeviceId = options.deviceId ?? settings?.deviceId ?? null;
        activeDeviceIdRef.current = resolvedDeviceId;
        facingModeRef.current = facing;
        setActiveDeviceId(resolvedDeviceId);
        setFacingMode(facing);

        setDevices(await listVideoInputDevices());
        setStatus("ready");
      } catch (error) {
        stopStream(streamRef.current);
        streamRef.current = null;
        setStatus(isPermissionDeniedError(error) ? "denied" : "error");
        setErrorMessage(describeCameraError(error));
      }
    },
    [attachStream],
  );

  const stop = useCallback(() => {
    stopStream(streamRef.current);
    streamRef.current = null;
    const video = videoRef.current;
    if (video) video.srcObject = null;
  }, []);

  const start = useCallback(() => open(), [open]);
  const retry = useCallback(() => open(), [open]);
  const selectDevice = useCallback(
    (deviceId: string) => open({ deviceId }),
    [open],
  );

  const switchCamera = useCallback(() => {
    // Prefer cycling through enumerated devices when more than one exists;
    // otherwise flip the facing mode (front/rear on mobile).
    if (devices.length > 1) {
      const currentIndex = devices.findIndex(
        (device) => device.deviceId === activeDeviceIdRef.current,
      );
      const next = devices[(currentIndex + 1) % devices.length];
      return open({ deviceId: next.deviceId });
    }
    const nextFacing: FacingMode =
      facingModeRef.current === "user" ? "environment" : "user";
    return open({ facingMode: nextFacing });
  }, [devices, open]);

  const capture = useCallback(
    (mirrored: boolean) => {
      const video = videoRef.current;
      if (!video || status !== "ready") return null;
      return captureStillFromVideo(video, { mirrored, type: "image/png" });
    },
    [status],
  );

  // Release the camera when the component unmounts.
  useEffect(() => {
    return () => {
      stopStream(streamRef.current);
      streamRef.current = null;
    };
  }, []);

  return {
    videoRef,
    status,
    errorMessage,
    devices,
    activeDeviceId,
    facingMode,
    hasMultipleCameras: devices.length > 1,
    start,
    stop,
    retry,
    switchCamera,
    selectDevice,
    capture,
  };
}
