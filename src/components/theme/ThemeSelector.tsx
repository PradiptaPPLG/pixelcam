"use client";

import ThemeCard from "./ThemeCard";
import { THEMES } from "@/utils/theme";

interface ThemeSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

/**
 * Vertical, scrollable list of theme cards. Selecting one updates the preview
 * instantly.
 */
export default function ThemeSelector({
  selectedId,
  onSelect,
}: ThemeSelectorProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {THEMES.map((theme) => (
        <ThemeCard
          key={theme.id}
          theme={theme}
          selected={theme.id === selectedId}
          onSelect={() => onSelect(theme.id)}
        />
      ))}
    </div>
  );
}
