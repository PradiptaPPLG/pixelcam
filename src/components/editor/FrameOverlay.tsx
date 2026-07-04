"use client";

interface FrameOverlayProps {
  frameId: string;
  radius: number;
}

const SPROCKETS = Array.from({ length: 9 });

/**
 * Decorative frame drawn on top of the strip (non-interactive). All variants
 * are plain DOM/box styles so they capture cleanly on export.
 */
export default function FrameOverlay({ frameId, radius }: FrameOverlayProps) {
  const base = "pointer-events-none absolute inset-0";

  switch (frameId) {
    case "classic":
      return (
        <div
          className={base}
          style={{
            border: "2px solid rgba(17,17,17,0.85)",
            borderRadius: radius,
          }}
        />
      );

    case "minimal":
      return (
        <div
          className={base}
          style={{
            border: "1px solid rgba(17,17,17,0.18)",
            borderRadius: radius,
          }}
        />
      );

    case "rounded":
      return (
        <div
          className={base}
          style={{
            border: "4px solid #ffffff",
            borderRadius: Math.max(radius, 18),
            boxShadow: "inset 0 0 0 1px rgba(17,17,17,0.08)",
          }}
        />
      );

    case "vintage":
      return (
        <div
          className={base}
          style={{
            border: "3px solid #B08D57",
            borderRadius: radius,
            boxShadow: "inset 0 0 0 6px rgba(176,141,87,0.25)",
          }}
        />
      );

    case "polaroid":
      return (
        <div
          className={base}
          style={{
            borderStyle: "solid",
            borderColor: "#ffffff",
            borderTopWidth: 10,
            borderLeftWidth: 10,
            borderRightWidth: 10,
            borderBottomWidth: 42,
            borderRadius: 4,
            boxShadow: "inset 0 0 0 1px rgba(17,17,17,0.06)",
          }}
        />
      );

    case "filmstrip":
      return (
        <div className={base} style={{ borderRadius: radius, overflow: "hidden" }}>
          {(["left", "right"] as const).map((side) => (
            <div
              key={side}
              className="absolute bottom-0 top-0 flex flex-col items-center justify-around"
              style={{
                width: 14,
                background: "#111111",
                ...(side === "left" ? { left: 0 } : { right: 0 }),
              }}
            >
              {SPROCKETS.map((_, index) => (
                <span
                  key={index}
                  style={{
                    width: 6,
                    height: 7,
                    borderRadius: 1.5,
                    background: "#FAFAFA",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
