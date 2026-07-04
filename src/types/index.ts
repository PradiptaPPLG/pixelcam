/* ============================================================
   PIXELCAM — Shared TypeScript Types
   ============================================================ */

// --------------- UI Primitives ---------------

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
export type ColorScheme = "light" | "dark" | "system";
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

// --------------- Navigation ---------------

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  isExternal?: boolean;
  badge?: string;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

// --------------- Site Metadata ---------------

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage?: string;
  links: {
    twitter?: string;
    github?: string;
    instagram?: string;
  };
}

// --------------- Photo / Media ---------------

export type PhotoFormat = "jpeg" | "png" | "webp";
export type FilterId = string;

export interface PhotoFrame {
  id: string;
  label: string;
  thumbnail?: string;
  slots: number; // number of photo slots
}

export interface CapturedPhoto {
  id: string;
  dataUrl: string;
  takenAt: Date;
  filterId?: FilterId;
}

// --------------- Component Props ---------------

export interface WithChildren {
  children: React.ReactNode;
}

export interface WithClassName {
  className?: string;
}

export interface BaseProps extends WithChildren, WithClassName {}
