import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "A complete guide on how to use PixelCam — from opening the booth to downloading your photo strip.",
};

/* ─── Tutorial steps ────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    title: "Open the Booth",
    description:
      'Click the "Start Session" or "Open Booth" button on the homepage. No account needed, nothing to install — it runs directly in your browser.',
  },
  {
    number: "02",
    title: "Allow Camera Access",
    description:
      'Your browser will ask for camera permission. Click "Allow". If you have multiple cameras, you can choose which one to use.',
  },
  {
    number: "03",
    title: "Choose a Theme",
    description:
      "Before shooting, pick a theme for your photo strip. There are various aesthetic options — from minimalist and vintage to modern. Themes control the frame color and strip layout.",
  },
  {
    number: "04",
    title: "Pick a Filter",
    description:
      "Apply a cinematic filter that matches your mood. Filters are previewed on the camera feed in real-time before you shoot.",
  },
  {
    number: "05",
    title: "Take Your Photos",
    description:
      "Press the capture button. PixelCam will start an automatic countdown and take a series of photos to form your strip. Make sure you have good lighting for the best results.",
  },
  {
    number: "06",
    title: "Edit in Studio",
    description:
      "After the photos are taken, head to the editor to adjust brightness, contrast, and saturation. You can also add stickers or text.",
  },
  {
    number: "07",
    title: "Download Your Strip",
    description:
      "When you&apos;re happy with the result, click the download button. Your photo strip will be saved directly to your device in high quality.",
  },
] as const;

/* ─── Tips ──────────────────────────────────────────────────── */
const TIPS = [
  "Use front-facing light (face a window) to brighten your face and get the most out of the filters.",
  "Try different filters in the preview before shooting — the effect can vary a lot depending on lighting.",
  "For group shots, step back a little to make sure everyone fits in the frame.",
  "PixelCam works best on the latest version of Chrome or Edge.",
] as const;

/* ─── Page ──────────────────────────────────────────────────── */
export default function BlogPage() {
  return (
    <section className="section">
      <Container size="sm">

        {/* ── Label ── */}
        <p className="text-label text-[var(--color-accent)] mb-4">Guide</p>

        {/* ── Headline ── */}
        <h1 className="text-heading mb-4">How to Use PixelCam</h1>

        <p className="text-body mb-14">
          Follow these steps to get the best photos from PixelCam —
          everything runs directly in your browser.
        </p>

        {/* ── Steps ── */}
        <ol className="flex flex-col gap-6" role="list">
          {STEPS.map(({ number, title, description }) => (
            <li
              key={number}
              className="flex gap-5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-0)] p-6 transition-all duration-200 hover:bg-[var(--color-surface-2)]"
            >
              <span className="shrink-0 w-10 h-10 rounded-full bg-[var(--color-accent-50)] text-[var(--color-accent)] text-[13px] font-bold flex items-center justify-center">
                {number}
              </span>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[16px] font-semibold text-[var(--fg)]">
                  {title}
                </h2>
                <p className="text-caption">{description}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* ── Divider ── */}
        <div className="h-px bg-[var(--color-border)] my-12" />

        {/* ── Tips ── */}
        <div className="rounded-[var(--radius-card)] bg-[var(--color-accent-50)] border border-[var(--color-accent-100)] p-6">
          <h2 className="text-section-title mb-4">Tips &amp; Tricks</h2>
          <ul className="flex flex-col gap-3" role="list">
            {TIPS.map((tip) => (
              <li key={tip} className="flex gap-3 text-caption">
                <span className="shrink-0 mt-0.5 text-[var(--color-accent)]">✦</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

      </Container>
    </section>
  );
}
