import type { Metadata } from "next";
import PreviewExperience from "./PreviewExperience";

export const metadata: Metadata = {
  title: "Preview & Export",
  description:
    "Preview your finished PixelCam photostrip and download it in high resolution.",
};

export default function PreviewPage() {
  return <PreviewExperience />;
}
