"use client";

import { forwardRef } from "react";
import Logo from "@/components/ui/Logo";
import type { FilterPreset } from "@/utils/filter";
import type { StripCustomization, ThemePreset } from "@/utils/theme";
import type { StickerPlacement } from "@/utils/sticker";
import { getTemplateById } from "@/data/templatesData";
import { loadTemplateId } from "@/utils/template";
import { useCroppedTemplatePhotos } from "@/hooks/useCroppedTemplatePhotos";

interface PreviewCanvasProps {
  theme: ThemePreset;
  customization: StripCustomization;
  filter: FilterPreset;
  photos: string[];
  placements?: StickerPlacement[];
  /** Base strip width in CSS px. */
  width?: number;
  templateId?: string | null;
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
    { theme, customization, filter, photos, placements, width = DEFAULT_WIDTH, templateId },
    ref,
  ) {
    const { style } = theme;
    const { rounded, showShadow, showDate, showLogo, title, footerText } =
      customization;

    const resolvedTemplateId = templateId !== undefined ? templateId : loadTemplateId();
    const template = resolvedTemplateId ? getTemplateById(resolvedTemplateId) : null;

    // Pre-crop each photo to the true pixel aspect ratio of its slot so that
    // html2canvas renders it correctly without stretching. Must be called
    // unconditionally (Rules of Hooks). No-op when there is no template.
    const croppedPhotos = useCroppedTemplatePhotos(
      photos,
      template?.slots ?? [],
      template?.aspectRatio ?? 1,
    );

    if (template) {
      const contentHeight = Math.round(width / template.aspectRatio);

      return (
        <div
          ref={ref}
          style={{
            width,
            height: contentHeight,
            position: "relative",
            boxSizing: "border-box",
            borderRadius: rounded ? 16 : 4,
            boxShadow: showShadow ? style.shadow : "none",
            overflow: "hidden",
            backgroundColor: "#000000",
          }}
        >
          {/* Photo slots — sit beneath the overlay */}
          {/* Pre-cropped photos (via useCroppedTemplatePhotos) are rendered with
              explicit pixel dimensions so html2canvas captures them faithfully.
              objectFit is retained as a visual CSS fallback only. */}
          {template.slots.map((slot, i) => {
            const src = croppedPhotos[i];
            const slotPxW = Math.round((slot.widthPct  / 100) * width);
            const slotPxH = Math.round((slot.heightPct / 100) * contentHeight);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${slot.xPct}%`,
                  top: `${slot.yPct}%`,
                  width: `${slot.widthPct}%`,
                  height: `${slot.heightPct}%`,
                  overflow: "hidden",
                  backgroundColor: "#000000",
                }}
              >
                {src ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={src}
                    alt={`Photo ${i + 1}`}
                    style={{
                      display: "block",
                      width: slotPxW + 2,
                      height: slotPxH + 2,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%" }} />
                )}
              </div>
            );
          })}

          {/* Template overlay — sits on top of photos */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={template.overlaySrc}
            alt={template.name}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "fill",
              pointerEvents: "none",
              ...template.overlayStyle,
            }}
            onContextMenu={(e) => e.preventDefault()}
            draggable="false"
          />

          {/* Render Stickers */}
          {placements && placements.length > 0 && (
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}>
              {placements.map((p) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={p.id}
                  src={p.url}
                  alt="Sticker"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 100,
                    height: 100,
                    marginLeft: -50,
                    marginTop: -50,
                    transform: `translate(${p.x}px, ${p.y}px) scale(${p.scale}) rotate(${p.rotation}deg)`,
                    objectFit: "contain",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

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
          position: "relative",
          boxSizing: "border-box",
          background: style.paperPattern ?? style.paper,
          borderRadius: stripRadius,
          padding: style.padding,
          boxShadow: showShadow ? style.shadow : "none",
          fontFamily: style.mono ? MONO_STACK : undefined,
          overflow: "hidden", // Ensure stickers don't bleed out of the rounded corners
        }}
      >
        {/* Render Stickers */}
        {placements && placements.length > 0 && (
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}>
            {placements.map((p) => (
              <img
                key={p.id}
                src={p.url}
                alt="Sticker"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 100,
                  height: 100,
                  marginLeft: -50,
                  marginTop: -50,
                  transform: `translate(${p.x}px, ${p.y}px) scale(${p.scale}) rotate(${p.rotation}deg)`,
                  objectFit: "contain",
                }}
              />
            ))}
          </div>
        )}
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
