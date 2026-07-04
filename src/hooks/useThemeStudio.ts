"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_CUSTOMIZATION,
  DEFAULT_THEME_ID,
  getThemeById,
  saveThemeState,
  type StripCustomization,
  type ThemePreset,
} from "@/utils/theme";

export interface UseThemeStudioResult {
  themeId: string;
  theme: ThemePreset;
  customization: StripCustomization;
  selectTheme: (id: string) => void;
  updateCustomization: (patch: Partial<StripCustomization>) => void;
}

/**
 * Owns the Theme Studio state — the selected preset and the strip
 * customization — and persists it so the next stage can pick it up.
 * Starts from deterministic defaults to keep SSR/CSR markup identical.
 */
export function useThemeStudio(): UseThemeStudioResult {
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);
  const [customization, setCustomization] =
    useState<StripCustomization>(DEFAULT_CUSTOMIZATION);

  // Persist to session storage whenever the look changes (external sync).
  useEffect(() => {
    saveThemeState({ themeId, customization });
  }, [themeId, customization]);

  const selectTheme = useCallback((id: string) => setThemeId(id), []);

  const updateCustomization = useCallback(
    (patch: Partial<StripCustomization>) =>
      setCustomization((current) => ({ ...current, ...patch })),
    [],
  );

  const theme = useMemo(() => getThemeById(themeId), [themeId]);

  return { themeId, theme, customization, selectTheme, updateCustomization };
}
