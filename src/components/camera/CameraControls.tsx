"use client";

import { FlipHorizontal2, SwitchCamera } from "lucide-react";
import { cn } from "@/lib/utils";
import { type CameraDeviceInfo } from "@/utils/camera";
import CaptureButton from "./CaptureButton";
import UploadButton from "./UploadButton";
import CameraSelector from "./CameraSelector";

interface CameraControlsProps {
  onCapture: () => void;
  captureDisabled?: boolean;
  mirrored: boolean;
  onToggleMirror: () => void;
  onUpload: (dataUrl: string) => void;
  onUploadError?: (message: string) => void;
  onUploadClick?: () => void;
  devices: CameraDeviceInfo[];
  activeDeviceId: string | null;
  hasMultipleCameras: boolean;
  onSelectDevice: (deviceId: string) => void;
  onSwitchCamera: () => void;
}

/**
 * The control cluster shown beneath the live preview: the capture shutter,
 * plus upload, mirror toggle and camera switching/selection.
 */
export default function CameraControls({
  onCapture,
  captureDisabled = false,
  mirrored,
  onToggleMirror,
  onUpload,
  onUploadError,
  onUploadClick,
  devices,
  activeDeviceId,
  hasMultipleCameras,
  onSelectDevice,
  onSwitchCamera,
}: CameraControlsProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <CaptureButton onCapture={onCapture} disabled={captureDisabled} />

      <div className="flex flex-wrap items-center justify-center gap-3">
        <UploadButton
          onSelect={onUpload}
          onError={onUploadError}
          onClickOverride={onUploadClick}
        />

        <button
          type="button"
          onClick={onToggleMirror}
          aria-pressed={mirrored}
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-[14px] border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2",
            mirrored
              ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
              : "border-[#E5E7EB] bg-white text-[#111111] hover:bg-[#F5F5F5] active:bg-[#EEEEEE]",
          )}
        >
          <FlipHorizontal2 className="h-4 w-4" aria-hidden="true" />
          Mirror
        </button>

        {hasMultipleCameras && (
          <>
            <button
              type="button"
              onClick={onSwitchCamera}
              aria-label="Switch camera"
              className="inline-flex h-10 items-center gap-2 rounded-[14px] border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111111] transition-colors hover:bg-[#F5F5F5] active:bg-[#EEEEEE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
            >
              <SwitchCamera className="h-4 w-4" aria-hidden="true" />
              Flip
            </button>

            <CameraSelector
              devices={devices}
              activeDeviceId={activeDeviceId}
              onSelect={onSelectDevice}
            />
          </>
        )}
      </div>
    </div>
  );
}
