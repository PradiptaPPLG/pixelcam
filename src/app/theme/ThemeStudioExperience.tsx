"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import {
  CustomizationPanel,
  ThemePreview,
  ThemeSelector,
} from "@/components/theme";
import { useThemeStudio } from "@/hooks/useThemeStudio";
import {
  getSessionPhotosServerSnapshot,
  getSessionPhotosSnapshot,
  subscribeSessionPhotos,
} from "@/utils/session";

import { Palette } from "lucide-react";

/**
 * Theme Studio — preview the captured photostrip and restyle it in real time.
 * Photos come from the session (via storage); theme + customization state is
 * owned by useThemeStudio and persisted for the next stage.
 */
export default function ThemeStudioExperience() {
  const router = useRouter();
  const { theme, customization, themeId, selectTheme, updateCustomization } =
    useThemeStudio();

  const photos = useSyncExternalStore(
    subscribeSessionPhotos,
    getSessionPhotosSnapshot,
    getSessionPhotosServerSnapshot,
  );

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // Continue advances to Film Lab (filter selection) before Preview.
  const handleContinue = () => router.push("/film-lab");

  return (
    <section className="flex-1 bg-[#FAFAFA] py-8 sm:py-12">
      <Container size="xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start">
          {/* Left — live preview + customization */}
          <div className="flex flex-col gap-6">
            <motion.div
              animate={{ backgroundColor: theme.style.canvas }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{
                background: theme.style.canvasPattern ?? theme.style.canvas,
              }}
              className="flex justify-center rounded-[24px] p-8 ring-1 ring-black/5 sm:p-12"
            >
              <ThemePreview
                theme={theme}
                customization={customization}
                photos={photos}
              />
            </motion.div>

            <CustomizationPanel
              customization={customization}
              onChange={updateCustomization}
            />
          </div>

          {/* Right — theme selector (scrollable) + Footer */}
          <div className="lg:sticky lg:top-24 flex flex-col lg:max-h-[calc(100vh-7rem)] justify-between h-full">
            <div className="flex flex-col min-h-0">
              {/* Header inside the sidebar */}
              <div className="flex flex-col gap-1 mb-5">
                <span className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B7280] dark:text-[#a1a1aa]">
                  <Palette className="h-3.5 w-3.5" aria-hidden="true" />
                  Theme Studio
                </span>
                <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111] dark:text-[#f4f4f5] sm:text-[30px]">
                  Theme Studio
                </h1>
                <p className="text-[14px] leading-relaxed text-[#6B7280] dark:text-[#a1a1aa]">
                  Style your photostrip frame.
                </p>
              </div>

              <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                Themes
              </h2>
              <div className="-mr-1 pr-1 lg:max-h-[calc(100vh-17rem)] lg:overflow-y-auto">
                <ThemeSelector selectedId={themeId} onSelect={selectTheme} />
              </div>
            </div>

            {/* Consistent Footer for Theme */}
            <div className="mt-6 flex items-center justify-between bg-white dark:bg-[#18181b] rounded-[24px] p-5 shadow-sm border border-[#E5E7EB] dark:border-[#2a2a2e] w-full gap-3">
              <button
                onClick={() => router.push("/review")}
                className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#2a2a2e] text-[13px] font-semibold text-[#111111] dark:text-[#f4f4f5] bg-white dark:bg-[#18181b] hover:bg-gray-50 dark:hover:bg-[#232327] transition-colors whitespace-nowrap"
              >
                Back
              </button>
              <button
                onClick={handleContinue}
                className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-[13px] font-semibold text-white transition-colors shadow-sm min-w-[80px] text-center whitespace-nowrap"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-6 z-50 mx-auto w-fit max-w-[90vw] rounded-[14px] bg-[#111111] px-4 py-2.5 text-center text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
