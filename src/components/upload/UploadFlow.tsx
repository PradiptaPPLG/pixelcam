"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ImagePlus, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCEPTED_IMAGE_EXTENSIONS, isAcceptedImageFile } from "@/utils/camera";
import { PHOTO_COUNT_OPTIONS, saveSessionPhotos } from "@/utils/session";
import ImageCropper from "./ImageCropper";

interface UploadFlowProps {
  open: boolean;
  onClose: () => void;
}

type Phase = "count" | "crop";

/**
 * Upload path: choose how many photos, pick that many images, crop each to the
 * photobooth ratio, then hand the set to the Theme Studio.
 */
export default function UploadFlow({ open, onClose }: UploadFlowProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const urlsRef = useRef<string[]>([]);

  const [phase, setPhase] = useState<Phase>("count");
  const [count, setCount] = useState(4);
  const [urls, setUrls] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [cropped, setCropped] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const revokeUrls = () => {
    urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    urlsRef.current = [];
  };

  // Reset state when the modal opens (render-phase, not an effect).
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setPhase("count");
      setCount(4);
      setUrls([]);
      setIndex(0);
      setCropped([]);
      setError(null);
    }
  }

  // Revoke any object URLs when unmounting.
  useEffect(() => () => revokeUrls(), []);

  // Escape + scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const files = Array.from(fileList).filter(isAcceptedImageFile);
    if (files.length === 0) {
      setError("Please choose PNG, JPG, JPEG or WEBP images.");
      return;
    }
    revokeUrls();
    const selected = files.slice(0, count);
    const objectUrls = selected.map((file) => URL.createObjectURL(file));
    urlsRef.current = objectUrls;
    setUrls(objectUrls);
    setCropped([]);
    setIndex(0);
    setError(null);
    setPhase("crop");
  };

  const finish = (all: string[]) => {
    saveSessionPhotos(all);
    revokeUrls();
    onClose();
    router.push("/theme");
  };

  const handleCropped = (dataUrl: string) => {
    const next = [...cropped, dataUrl];
    if (index + 1 < urls.length) {
      setCropped(next);
      setIndex(index + 1);
    } else {
      finish(next);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Upload photos"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.35)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close upload"
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-[#6b7280] transition-colors hover:bg-[#f5f5f5] hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_IMAGE_EXTENSIONS}
              multiple
              className="sr-only"
              onChange={(event) => {
                handleFiles(event.target.files);
                event.target.value = "";
              }}
            />

            {phase === "count" ? (
              <div className="flex flex-col items-center gap-6 pt-2 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-[18px] bg-[#EEF2FF] text-[#4F46E5]">
                  <Upload className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[#111111]">
                    Upload your photos
                  </h2>
                  <p className="text-[14px] leading-relaxed text-[#6B7280]">
                    Choose how many photos your strip should have, then pick your
                    images to crop.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                    Photos
                  </span>
                  <div className="inline-flex gap-1 rounded-[14px] border border-[#E5E7EB] bg-white p-1">
                    {PHOTO_COUNT_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setCount(option)}
                        aria-pressed={count === option}
                        className={cn(
                          "h-9 min-w-11 rounded-[10px] px-3 text-sm font-medium transition-colors",
                          count === option
                            ? "bg-[#111111] text-white"
                            : "text-[#6B7280] hover:text-[#111111]",
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex h-11 items-center gap-2 rounded-[14px] bg-[#111111] px-5 text-sm font-medium text-white transition-colors hover:bg-[#222222] active:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
                >
                  <ImagePlus className="h-4 w-4" aria-hidden="true" />
                  Choose {count} photos
                </button>

                {error && (
                  <p className="text-[13px] text-[#EF4444]">{error}</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 pt-2">
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                    Crop · {index + 1} / {urls.length}
                  </span>
                  <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-[#111111]">
                    Frame your photo
                  </h2>
                </div>

                {urls[index] && (
                  <ImageCropper
                    key={urls[index]}
                    src={urls[index]}
                    confirmLabel={
                      index + 1 < urls.length ? "Next photo" : "Finish"
                    }
                    onCropped={handleCropped}
                  />
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
