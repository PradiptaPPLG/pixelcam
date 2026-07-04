"use client";

import { Download, FileImage } from "lucide-react";
import DownloadButton from "./DownloadButton";
import type { FilterPreset } from "@/utils/filter";
import type { ThemePreset } from "@/utils/theme";

export interface ExportDimensions {
  width: number;
  height: number;
}

interface ExportPanelProps {
  theme: ThemePreset;
  filter: FilterPreset;
  photoCount: number;
  size: ExportDimensions;
  scale: number;
  isExporting: boolean;
  onDownloadPng: () => void;
  onDownloadJpg: () => void;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-[13px] text-[#6B7280]">{label}</span>
      <span className="text-right text-[13px] font-semibold text-[#111111]">
        {value}
      </span>
    </div>
  );
}

/**
 * Right-hand export card: a summary of the strip's settings plus the PNG/JPG
 * download actions.
 */
export default function ExportPanel({
  theme,
  filter,
  photoCount,
  size,
  scale,
  isExporting,
  onDownloadPng,
  onDownloadJpg,
}: ExportPanelProps) {
  const measured = size.width > 0 && size.height > 0;
  const stripSize = measured ? `${size.width} × ${size.height} px` : "-";
  const resolution = measured
    ? `${size.width * scale} × ${size.height * scale} px`
    : "-";

  return (
    <div className="flex flex-col gap-5 rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div>
        <h2 className="text-[15px] font-semibold text-[#111111]">Export</h2>
        <p className="mt-0.5 text-[13px] text-[#6B7280]">
          Your photostrip, ready to download.
        </p>
      </div>

      <div className="divide-y divide-[#F0F0F0] rounded-[16px] bg-[#FAFAFA] px-4">
        <InfoRow label="Theme" value={`${theme.emoji} ${theme.name}`} />
        <InfoRow label="Filter" value={filter.name} />
        <InfoRow label="Photos" value={String(photoCount)} />
        <InfoRow label="Strip size" value={stripSize} />
        <InfoRow label="Est. resolution" value={resolution} />
      </div>

      <div className="flex flex-col gap-2.5">
        <DownloadButton
          onClick={onDownloadPng}
          variant="primary"
          loading={isExporting}
          icon={<Download className="h-4 w-4" aria-hidden="true" />}
        >
          Download PNG
        </DownloadButton>
        <DownloadButton
          onClick={onDownloadJpg}
          variant="secondary"
          disabled={isExporting}
          icon={<FileImage className="h-4 w-4" aria-hidden="true" />}
        >
          Download JPG
        </DownloadButton>
      </div>
    </div>
  );
}
