import { Metadata } from "next";
import StickersExperience from "./StickersExperience";

export const metadata: Metadata = {
  title: "Stickers — PixelCam",
  description: "Decorate your photostrip with fun stickers.",
};

export default function StickersPage() {
  return <StickersExperience />;
}
