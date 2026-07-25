import type { Metadata } from "next";
import TemplatePickerExperience from "./TemplatePickerExperience";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Choose a photo-strip template to decorate your PixelCam memories.",
};

export default function TemplatePage() {
  return <TemplatePickerExperience />;
}
