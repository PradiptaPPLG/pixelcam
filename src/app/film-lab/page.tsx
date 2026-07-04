import type { Metadata } from "next";
import FilmLabExperience from "./FilmLabExperience";

export const metadata: Metadata = {
  title: "Film Lab",
  description:
    "Choose the look of your memories. Pick a film-inspired filter for your PixelCam photostrip.",
};

export default function FilmLabPage() {
  return <FilmLabExperience />;
}
