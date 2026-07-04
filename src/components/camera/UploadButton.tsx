"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import {
  ACCEPTED_IMAGE_EXTENSIONS,
  isAcceptedImageFile,
  readFileAsDataURL,
} from "@/utils/camera";

interface UploadButtonProps {
  onSelect: (dataUrl: string) => void;
  onError?: (message: string) => void;
  /** When set, the button opens this handler (e.g. the multi-photo upload
   *  flow) instead of the single-file picker. */
  onClickOverride?: () => void;
}

/**
 * File-upload control. By default reads a single image as a data URL; when
 * `onClickOverride` is provided it defers to that handler instead.
 */
export default function UploadButton({
  onSelect,
  onError,
  onClickOverride,
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // allow re-selecting the same file
    if (!file) return;

    if (!isAcceptedImageFile(file)) {
      onError?.("Unsupported file. Use PNG, JPG, JPEG or WEBP.");
      return;
    }

    try {
      onSelect(await readFileAsDataURL(file));
    } catch {
      onError?.("Couldn't read that image. Please try another file.");
    }
  };

  return (
    <>
      {!onClickOverride && (
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_EXTENSIONS}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={handleChange}
        />
      )}
      <button
        type="button"
        onClick={() =>
          onClickOverride ? onClickOverride() : inputRef.current?.click()
        }
        className="inline-flex h-10 items-center gap-2 rounded-[14px] border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111111] transition-colors hover:bg-[#F5F5F5] active:bg-[#EEEEEE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
      >
        <Upload className="h-4 w-4" aria-hidden="true" />
        Upload
      </button>
    </>
  );
}
