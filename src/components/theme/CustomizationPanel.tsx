"use client";

import { motion } from "framer-motion";
import {
  AlignLeft,
  CalendarDays,
  Droplet,
  LayoutGrid,
  Sparkles,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { StripCustomization } from "@/utils/theme";

interface CustomizationPanelProps {
  customization: StripCustomization;
  onChange: (patch: Partial<StripCustomization>) => void;
}

/* --- Small building blocks --------------------------------------------- */

function Field({
  label,
  icon,
  value,
  placeholder,
  maxLength,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  placeholder: string;
  maxLength: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#6B7280]">
        {icon}
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-[12px] border border-[#E5E7EB] bg-white px-3 text-[14px] text-[#111111] transition-colors placeholder:text-[#9CA3AF] focus-visible:border-[#4F46E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/30"
      />
    </label>
  );
}

function Toggle({
  label,
  icon,
  checked,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-[12px] px-2 py-2 text-left transition-colors hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
    >
      <span className="flex items-center gap-2.5 text-[14px] font-medium text-[#111111]">
        {icon}
        {label}
      </span>
      <span
        className={cn(
          "relative h-6 w-10 shrink-0 rounded-full transition-colors",
          checked ? "bg-[#4F46E5]" : "bg-[#E5E7EB]",
        )}
      >
        <motion.span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
          animate={{ left: checked ? 18 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
      </span>
    </button>
  );
}

/* --- Panel -------------------------------------------------------------- */

/**
 * Controls for the strip: title, footer text, date/logo/shadow toggles and
 * corner style. Every change flows straight to the live preview.
 */
export default function CustomizationPanel({
  customization,
  onChange,
}: CustomizationPanelProps) {
  const cornerOptions = [
    { value: true, label: "Rounded" },
    { value: false, label: "Square" },
  ];

  return (
    <div className="flex flex-col gap-5 rounded-[24px] border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
        Customize
      </h2>

      <Field
        label="Strip title"
        icon={<Type className="h-3.5 w-3.5" aria-hidden="true" />}
        value={customization.title}
        placeholder="Add a title"
        maxLength={24}
        onChange={(title) => onChange({ title })}
      />

      <Field
        label="Footer text"
        icon={<AlignLeft className="h-3.5 w-3.5" aria-hidden="true" />}
        value={customization.footerText}
        placeholder="Add footer text"
        maxLength={40}
        onChange={(footerText) => onChange({ footerText })}
      />

      {/* Corners */}
      <div className="flex flex-col gap-1.5">
        <span className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#6B7280]">
          <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
          Corners
        </span>
        <div className="inline-flex gap-1 rounded-[12px] border border-[#E5E7EB] bg-white p-1">
          {cornerOptions.map((option) => {
            const active = customization.rounded === option.value;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => onChange({ rounded: option.value })}
                aria-pressed={active}
                className={cn(
                  "h-9 flex-1 rounded-[9px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2",
                  active
                    ? "bg-[#111111] text-white"
                    : "text-[#6B7280] hover:text-[#111111]",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-0.5">
        <Toggle
          label="Show date"
          icon={<CalendarDays className="h-4 w-4 text-[#6B7280]" aria-hidden="true" />}
          checked={customization.showDate}
          onChange={(showDate) => onChange({ showDate })}
        />
        <Toggle
          label="Show logo"
          icon={<Sparkles className="h-4 w-4 text-[#6B7280]" aria-hidden="true" />}
          checked={customization.showLogo}
          onChange={(showLogo) => onChange({ showLogo })}
        />
        <Toggle
          label="Frame shadow"
          icon={<Droplet className="h-4 w-4 text-[#6B7280]" aria-hidden="true" />}
          checked={customization.showShadow}
          onChange={(showShadow) => onChange({ showShadow })}
        />
      </div>
    </div>
  );
}
