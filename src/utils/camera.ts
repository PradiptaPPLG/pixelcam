/* ============================================================
   PIXELCAM — Camera Utilities
   Framework-agnostic MediaDevices helpers (no React).
   Keeps camera business logic separate from UI (PROJECT_RULES).
   ============================================================ */

export type FacingMode = "user" | "environment";

export interface CameraDeviceInfo {
  deviceId: string;
  label: string;
}

/** Image formats accepted by the upload control. */
export const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
] as const;

/** `accept` attribute value for the upload <input>. */
export const ACCEPTED_IMAGE_EXTENSIONS = ".png,.jpg,.jpeg,.webp";

/** Whether the current environment supports camera capture. */
export function isCameraSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function"
  );
}

/** Request a video-only media stream for the given camera. */
export function requestCameraStream(options: {
  facingMode?: FacingMode;
  deviceId?: string;
}): Promise<MediaStream> {
  const { facingMode = "user", deviceId } = options;
  const video: MediaTrackConstraints = deviceId
    ? { deviceId: { exact: deviceId } }
    : { facingMode };
  return navigator.mediaDevices.getUserMedia({ video, audio: false });
}

/** Stop every track on a stream and release the camera. */
export function stopStream(stream: MediaStream | null): void {
  stream?.getTracks().forEach((track) => track.stop());
}

/**
 * List available video input devices. Labels are only populated once the
 * user has granted permission, so this is best called after a stream opens.
 */
export async function listVideoInputDevices(): Promise<CameraDeviceInfo[]> {
  if (!isCameraSupported() || !navigator.mediaDevices.enumerateDevices) return [];
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices
    .filter((device) => device.kind === "videoinput")
    .map((device, index) => ({
      deviceId: device.deviceId,
      label: device.label || `Camera ${index + 1}`,
    }));
}

/**
 * Draw the current video frame to a canvas and return a data URL.
 * When `mirrored` is true the frame is flipped horizontally so the saved
 * image matches the mirrored preview the user sees.
 */
export function captureStillFromVideo(
  video: HTMLVideoElement,
  options: { mirrored?: boolean; type?: string; quality?: number } = {},
): string | null {
  const { mirrored = false, type = "image/png", quality = 0.95 } = options;
  const width = video.videoWidth;
  const height = video.videoHeight;
  if (!width || !height) return null;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  if (mirrored) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(video, 0, 0, width, height);
  return canvas.toDataURL(type, quality);
}

/** Whether a picked file is an accepted image type. */
export function isAcceptedImageFile(file: File): boolean {
  return (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type);
}

/** Read a file into a base64 data URL. */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () =>
      reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/** Whether an error represents a user/browser permission denial. */
export function isPermissionDeniedError(error: unknown): boolean {
  return (
    error instanceof DOMException &&
    (error.name === "NotAllowedError" ||
      error.name === "SecurityError" ||
      error.name === "PermissionDeniedError")
  );
}

/** Map a camera error to a friendly, user-facing message. */
export function describeCameraError(error: unknown): string {
  if (error instanceof DOMException) {
    switch (error.name) {
      case "NotAllowedError":
      case "SecurityError":
      case "PermissionDeniedError":
        return "Camera access was denied. Allow permission to continue.";
      case "NotFoundError":
      case "DevicesNotFoundError":
        return "No camera was found on this device.";
      case "NotReadableError":
      case "TrackStartError":
        return "Your camera is being used by another application.";
      case "OverconstrainedError":
        return "The selected camera isn't available right now.";
      default:
        return "We couldn't access your camera. Please try again.";
    }
  }
  return "We couldn't access your camera. Please try again.";
}
