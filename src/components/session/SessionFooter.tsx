"use client";

import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import CaptureButton from "../camera/CaptureButton";
import {
  COUNTDOWN_OPTIONS,
  PHOTO_COUNT_OPTIONS,
  countdownLabel,
} from "@/utils/session";
import type { SessionPhase } from "@/hooks/useSession";

interface SessionFooterProps {
  phase: SessionPhase;
  photoCount: number;
  countdownSeconds: number;
  onPhotoCount: (count: number) => void;
  onCountdownSeconds: (seconds: number) => void;
  onStart: () => void;
  canStart: boolean;
  isTemplateActive?: boolean;
  showStartButton?: boolean;
}

/** Segmented option control. */
function Segmented<T extends number>({
  label,
  options,
  value,
  format,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  format: (option: T) => string;
  onChange: (option: T) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
        {label}
      </span>
      <div className="inline-flex gap-1 rounded-[14px] border border-[#E5E7EB] bg-white p-1">
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={active}
              className={cn(
                "h-9 min-w-11 rounded-[10px] px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2",
                active
                  ? "bg-[#111111] text-white"
                  : "text-[#6B7280] hover:text-[#111111]",
              )}
            >
              {format(option)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Session setup controls (photo count + countdown + Start). Once the session
 * is running these are replaced by a hint, keeping controls out of reach.
 */
export default function SessionFooter({
  phase,
  photoCount,
  countdownSeconds,
  onPhotoCount,
  onCountdownSeconds,
  onStart,
  canStart,
  isTemplateActive,
  showStartButton = true,
}: SessionFooterProps) {
  if (phase !== "setup") {
    return (
      <p className="text-center text-[15px] font-medium text-[#6B7280]">
        {phase === "running"
          ? "Hold still, capturing your shots…"
          : "All done! Taking you to review…"}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-1">
        {isTemplateActive ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
              Photos
            </span>
            <div className="inline-flex h-11 items-center justify-center rounded-[14px] border border-[#E5E7EB] bg-white px-5 text-sm font-medium text-[#111111]">
              {photoCount} Photos (Locked by Template)
            </div>
          </div>
        ) : (
          <Segmented
            label="Photos"
            options={PHOTO_COUNT_OPTIONS}
            value={photoCount as (typeof PHOTO_COUNT_OPTIONS)[number]}
            format={(option) => String(option)}
            onChange={onPhotoCount}
          />
        )}
        <Segmented
          label="Countdown"
          options={COUNTDOWN_OPTIONS}
          value={countdownSeconds as (typeof COUNTDOWN_OPTIONS)[number]}
          format={countdownLabel}
          onChange={onCountdownSeconds}
        />
      </div>

      {showStartButton && (
        <CaptureButton onCapture={onStart} disabled={!canStart} />
      )}
    </div>
  );
}
