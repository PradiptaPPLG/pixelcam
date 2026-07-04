import type { Metadata } from "next";
import CameraExperience from "./CameraExperience";

export const metadata: Metadata = {
  title: "Camera",
  description:
    "Capture your moment with the PixelCam camera booth, or upload a photo to get started.",
};

export default function CameraPage() {
  return <CameraExperience />;
}
