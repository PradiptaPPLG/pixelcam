"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type ThemeMode,
  applyThemeMode,
  getServerThemeMode,
  getThemeMode,
  setThemeMode,
  subscribeThemeMode,
} from "@/lib/theme-mode";

const OPTIONS: { mode: ThemeMode; label: string; Icon: typeof Sun }[] = [
  { mode: "light", label: "Light", Icon: Sun },
  { mode: "dark", label: "Dark", Icon: Moon },
  { mode: "system", label: "System", Icon: Monitor },
];

/** Segmented light / dark / system color-mode control for the navbar. */
export default function ThemeToggle() {
  const mode = useSyncExternalStore(
    subscribeThemeMode,
    getThemeMode,
    getServerThemeMode,
  );

  // Keep the DOM in sync, and re-resolve "system" when the OS preference flips.
  useEffect(() => {
    applyThemeMode(mode);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyThemeMode(getThemeMode());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [mode]);

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="inline-flex items-center gap-0.5 rounded-full border border-[#e5e7eb] bg-white p-0.5"
    >
      {OPTIONS.map(({ mode: value, label, Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={mode === value}
          aria-label={label}
          title={label}
          onClick={() => setThemeMode(value)}
          className={cn(
            "grid h-7 w-7 place-items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5]",
            mode === value
              ? "bg-[#111111] text-white"
              : "text-[#6b7280] hover:text-[#111111]",
          )}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
