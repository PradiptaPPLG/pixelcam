import type { Metadata } from "next";
import ThemeStudioExperience from "./ThemeStudioExperience";

export const metadata: Metadata = {
  title: "Theme Studio",
  description:
    "Preview your photostrip and restyle it in real time with premium PixelCam themes.",
};

export default function ThemePage() {
  return <ThemeStudioExperience />;
}
