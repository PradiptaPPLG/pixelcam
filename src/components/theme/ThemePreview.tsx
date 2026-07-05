"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import Logo from "@/components/ui/Logo";
import type { StripCustomization, ThemePreset } from "@/utils/theme";

interface ThemePreviewProps {
  theme: ThemePreset;
  customization: StripCustomization;
  photos: string[];
}

const TRANSITION = { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const };
const MONO_STACK =
  '"Geist Mono", ui-monospace, SFMono-Regular, "SF Mono", monospace';

/** Number of empty slots to show when no photos were captured. */
const PLACEHOLDER_COUNT = 4;

/**
 * Live photostrip preview. Theme colors, shadow and spacing tween via Framer
 * Motion so switching themes crossfades instantly with no reload.
 */
export default function ThemePreview({
  theme,
  customization,
  photos,
}: ThemePreviewProps) {
  const { style } = theme;
  const { rounded, showShadow, showDate, showLogo, title, footerText } =
    customization;

  const stripRadius = rounded ? style.radius : 4;
  const photoRadius = rounded ? Math.max(style.radius - 4, 6) : 2;
  const frames = photos.length > 0 ? photos : Array<null>(PLACEHOLDER_COUNT).fill(null);

  const dateLabel = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    [],
  );

  return (
    <motion.div
      animate={{
        boxShadow: showShadow ? style.shadow : "0 0 0 0 rgba(0,0,0,0)",
        borderRadius: stripRadius,
        paddingTop: style.padding,
        paddingBottom: style.padding,
        paddingLeft: style.padding,
        paddingRight: style.padding,
      }}
      transition={TRANSITION}
      style={{
        background: style.paperPattern ?? style.paper,
        fontFamily: style.mono ? MONO_STACK : undefined,
      }}
      className="flex w-full max-w-[300px] flex-col"
    >
      {/* Title */}
      {title.trim() && (
        <motion.p
          animate={{ color: style.topLabel }}
          transition={TRANSITION}
          className="mb-3 text-center text-[15px] font-semibold tracking-tight"
          style={style.mono ? { letterSpacing: "0.12em", textTransform: "uppercase" } : undefined}
        >
          {title}
        </motion.p>
      )}

      {/* Photos */}
      <div className="flex flex-col" style={{ gap: style.gap }}>
        {frames.map((src, index) => (
          <motion.div
            key={index}
            animate={{
              borderColor: style.photoBorder,
              borderWidth: style.photoBorderWidth,
              borderRadius: photoRadius,
            }}
            transition={TRANSITION}
            className="relative overflow-hidden border-solid"
            style={{ backgroundColor: style.dark ? "#000000" : "#111111" }}
          >
            <div className="relative aspect-[4/3] w-full">
              {src ? (
                <Image
                  src={src}
                  alt={`Photo ${index + 1}`}
                  fill
                  unoptimized
                  sizes="300px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="grid h-full w-full place-items-center"
                  style={{ backgroundColor: style.dark ? "#232327" : "#E9E9EC" }}
                >
                  <ImageIcon
                    className="h-6 w-6"
                    style={{ color: style.dark ? "#4B4B52" : "#C4C4CC" }}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col items-center gap-1.5">
        {showDate && (
          <motion.span
            suppressHydrationWarning
            animate={{ color: style.accent }}
            transition={TRANSITION}
            className="text-[11px] font-semibold tracking-[0.14em] uppercase"
          >
            {dateLabel}
          </motion.span>
        )}

        {footerText.trim() && (
          <motion.p
            animate={{ color: style.bottomLabel }}
            transition={TRANSITION}
            className="text-center text-[12px] font-medium"
          >
            {footerText}
          </motion.p>
        )}

        {showLogo && (
          <div className="mt-1 flex items-center gap-1.5">
            <Logo size={16} showWordmark={false} />
            <motion.span
              animate={{ color: style.bottomLabel }}
              transition={TRANSITION}
              className="text-[12px] font-semibold tracking-tight"
            >
              PixelCam
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
