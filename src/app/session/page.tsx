import type { Metadata } from "next";
import SessionExperience from "./SessionExperience";

export const metadata: Metadata = {
  title: "Photo Session",
  description:
    "Strike a pose. PixelCam captures your photobooth strip automatically.",
};

export default function SessionPage() {
  return <SessionExperience />;
}
