# PixelCam Project Rules

## Project

PixelCam is a premium online photobooth web application.

The goal is to build a portfolio-quality product with clean code, excellent UX, and beautiful UI.

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- TailwindCSS
- Framer Motion
- Lucide React
- html2canvas
- react-webcam
- react-dropzone
- shadcn/ui

---

## Design Philosophy

Inspired by:

- Apple
- Linear
- Arc Browser
- Notion
- Vercel

The interface should feel premium, minimal, modern, and polished.

Avoid colorful gradients everywhere.

Use whitespace generously.

Animations should be subtle.

---

## Color Palette

Background

#FAFAFA

Foreground

#111111

Primary

#111111

Secondary

#6B7280

Border

#E5E7EB

Accent

#4F46E5

Success

#22C55E

Danger

#EF4444

---

## Border Radius

Cards

16px

Buttons

14px

Inputs

14px

Large Components

24px

---

## Shadows

Very soft.

Avoid heavy shadows.

Example:

shadow-lg/5

or

shadow-black/5

---

## Typography

Use Geist Font.

Large Hero

64-72px

Heading

40px

Section Title

28px

Body

16px

Caption

14px

Small

12px

---

## Layout

Desktop max width

1280px

Centered

Responsive

Large spacing

Section padding

96px

Container padding

24px

---

## Coding Rules

Always use TypeScript.

Never use "any".

Use reusable components.

Separate business logic from UI.

Keep components under 200 lines.

Split complex components.

Use server components whenever possible.

Use client components only if required.

---

## Folder Structure

app/

components/

components/ui/

components/layout/

components/photobooth/

components/common/

hooks/

lib/

utils/

types/

public/

---

## Animations

Use Framer Motion.

Animation duration:

0.2–0.5s

Use:

fade

slide

scale

Never overanimate.

---

## Responsiveness

Support:

Desktop

Tablet

Mobile

Do not hide important content.

---

## Accessibility

Buttons must have hover state.

Keyboard accessible.

Use semantic HTML.

Proper aria labels.

---

## Performance

Lazy load images.

Optimize components.

Avoid unnecessary rerenders.

---

## Code Quality

Use clean naming.

No duplicated code.

No inline styles.

No magic numbers.

Everything must be production-ready.

IMPORTANT VERY IMPORTANT:
# UI PROTECTION RULES

The current UI is considered production-ready.

DO NOT redesign.

DO NOT refactor.

DO NOT change spacing.

DO NOT change typography.

DO NOT change font sizes.

DO NOT change margins.

DO NOT change paddings.

DO NOT change layout hierarchy.

DO NOT replace sections.

DO NOT reorder sections.

DO NOT remove animations.

DO NOT rewrite existing components.

DO NOT rename components.

DO NOT replace Tailwind classes.

DO NOT optimize existing UI.

DO NOT improve the design.

Treat the current UI as LOCKED.

Only modify files that are explicitly requested.

If a requested feature requires changing the UI,
append new elements instead of replacing existing ones.

Preserve pixel-perfect appearance.