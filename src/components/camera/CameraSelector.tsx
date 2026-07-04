"use client";

import { SwitchCamera } from "lucide-react";
import { type CameraDeviceInfo } from "@/utils/camera";

interface CameraSelectorProps {
  devices: CameraDeviceInfo[];
  activeDeviceId: string | null;
  onSelect: (deviceId: string) => void;
}

/**
 * Dropdown for choosing between available cameras. Renders nothing when
 * only a single camera is present.
 */
export default function CameraSelector({
  devices,
  activeDeviceId,
  onSelect,
}: CameraSelectorProps) {
  if (devices.length <= 1) return null;

  return (
    <div className="relative inline-flex items-center">
      <SwitchCamera
        className="pointer-events-none absolute left-3 h-4 w-4 text-[#6B7280]"
        aria-hidden="true"
      />
      <select
        aria-label="Select camera"
        value={activeDeviceId ?? ""}
        onChange={(event) => onSelect(event.target.value)}
        className="h-10 max-w-[180px] cursor-pointer appearance-none truncate rounded-[14px] border border-[#E5E7EB] bg-white pl-9 pr-9 text-sm font-medium text-[#111111] transition-colors hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 h-4 w-4 text-[#6B7280]"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 8l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
