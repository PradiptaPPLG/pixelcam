import type { Metadata } from "next";
import EditorExperience from "./EditorExperience";

export const metadata: Metadata = {
  title: "Creative Studio",
  description:
    "Decorate your PixelCam photostrip with stickers, captions, frames and adjustments, then export it.",
};

export default function EditorPage() {
  return <EditorExperience />;
}
