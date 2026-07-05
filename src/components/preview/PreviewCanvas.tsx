"use client";

import { forwardRef } from "react";
import Logo from "@/components/ui/Logo";
import type { FilterPreset } from "@/utils/filter";
import type { StripCustomization, ThemePreset } from "@/utils/theme";

interface PreviewCanvasProps {
  theme: ThemePreset;
  customization: StripCustomization;
  filter: FilterPreset;
  photos: string[];
  /** Base strip width in CSS px. */
  width?: number;
}

const MONO_STACK =
  '"Geist Mono", ui-monospace, SFMono-Regular, "SF Mono", monospace';
const DEFAULT_WIDTH = 320;
const PHOTO_ASPECT = 3 / 4; // height / width (4:3 landscape frames)

/**
 * The final photostrip, rendered exactly as it will be exported. Uses only
 * explicit hex/px values and plain <img> tags with fixed dimensions so
 * html2canvas captures it faithfully. Ref points at the export node.
 */
const PreviewCanvas = forwardRef<HTMLDivElement, PreviewCanvasProps>(
  function PreviewCanvas(
    { theme, customization, filter, photos, width = DEFAULT_WIDTH },
    ref,
  ) {
    const { style } = theme;
    const { rounded, showShadow, showDate, showLogo, title, footerText } =
      customization;

    const stripRadius = rounded ? style.radius : 4;
    const photoRadius = rounded ? Math.max(style.radius - 4, 6) : 2;

    // Concrete pixel sizing (html2canvas 1.x does not honour aspect-ratio).
    const contentWidth = width - style.padding * 2;
    const imgWidth = contentWidth - style.photoBorderWidth * 2;
    const imgHeight = Math.round(imgWidth * PHOTO_ASPECT);

    const dateLabel = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return (
      <div
        ref={ref}
        style={{
          width,
          boxSizing: "border-box",
          background: style.paperPattern ?? style.paper,
          borderRadius: stripRadius,
          padding: style.padding,
          boxShadow: showShadow ? style.shadow : "none",
          fontFamily: style.mono ? MONO_STACK : undefined,
        }}
      >
        {title.trim() && (
          <p
            style={{
              margin: 0,
              marginBottom: 12,
              textAlign: "center",
              color: style.topLabel,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: style.mono ? "0.12em" : "-0.01em",
              textTransform: style.mono ? "uppercase" : "none",
            }}
          >
            {title}
          </p>
        )}

        <div
          style={{ display: "flex", flexDirection: "column", gap: style.gap }}
        >
          {photos.map((src, index) => (
            <div
              key={index}
              style={{
                border: `${style.photoBorderWidth}px solid ${style.photoBorder}`,
                borderRadius: photoRadius,
                overflow: "hidden",
                lineHeight: 0,
                backgroundColor: style.dark ? "#000000" : "#111111",
              }}
            >
              {/* Plain img (not next/image) so html2canvas captures it reliably. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Photo ${index + 1}`}
                style={{
                  display: "block",
                  width: imgWidth,
                  height: imgHeight,
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          {showDate && (
            <span
              suppressHydrationWarning
              style={{
                color: style.accent,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {dateLabel}
            </span>
          )}

          {footerText.trim() && (
            <p
              style={{
                margin: 0,
                textAlign: "center",
                color: style.bottomLabel,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {footerText}
            </p>
          )}

          {showLogo && (
            <div
              style={{
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Logo size={16} showWordmark={false} />
              <span
                style={{ color: style.bottomLabel, fontSize: 12, fontWeight: 600 }}
              >
                PixelCam
              </span>
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default PreviewCanvas;
