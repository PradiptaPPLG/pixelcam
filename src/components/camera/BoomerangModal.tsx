"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, LoaderCircle, X } from "lucide-react";
import { GIFEncoder, quantize, applyPalette } from "gifenc";

interface BoomerangModalProps {
  open: boolean;
  onClose: () => void;
  photos: string[];
}

export function BoomerangModal({ open, onClose, photos }: BoomerangModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!open || photos.length === 0) return;

    // Create the boomerang sequence: 1 -> 2 -> 3 -> 4 -> 3 -> 2
    const sequence: number[] = [];
    for (let i = 0; i < photos.length; i++) sequence.push(i);
    for (let i = photos.length - 2; i > 0; i--) sequence.push(i);

    let tick = 0;
    const interval = setInterval(() => {
      setCurrentIndex(sequence[tick % sequence.length]);
      tick++;
    }, 200);

    return () => clearInterval(interval);
  }, [open, photos]);

  const handleDownload = async () => {
    if (photos.length === 0) return;
    setIsDownloading(true);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("No 2D context");

      // Load all images
      const loadedImages = await Promise.all(
        photos.map((src) => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
          });
        })
      );

      // Set canvas size (we can scale it down slightly to optimize GIF size if needed, 
      // but let's keep original size or max 800px width for performance)
      const MAX_WIDTH = 800;
      let targetWidth = loadedImages[0].naturalWidth;
      let targetHeight = loadedImages[0].naturalHeight;
      
      if (targetWidth > MAX_WIDTH) {
        const ratio = MAX_WIDTH / targetWidth;
        targetWidth = MAX_WIDTH;
        targetHeight = targetHeight * ratio;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // The sequence for the boomerang
      const sequence: number[] = [];
      for (let i = 0; i < loadedImages.length; i++) sequence.push(i);
      for (let i = loadedImages.length - 2; i > 0; i--) sequence.push(i);

      // We need to wait a tiny bit to allow UI to show loading state
      await new Promise(r => setTimeout(r, 50));

      const gif = GIFEncoder();
      const FRAME_DELAY_MS = 200;

      // Process frames (1 loop is enough for a GIF since it repeats infinitely)
      for (let i = 0; i < sequence.length; i++) {
        const img = loadedImages[sequence[i]];
        
        ctx.fillStyle = "#111111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Quantize colors and apply palette (rgb565 is fast and usually sufficient for photos)
        const palette = quantize(data, 256, { format: 'rgb565' });
        const index = applyPalette(data, palette, 'rgb565');
        
        gif.writeFrame(index, width, height, { palette, delay: FRAME_DELAY_MS });
      }

      gif.finish();
      const buffer = gif.bytes();
      const blob = new Blob([buffer], { type: "image/gif" });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pixelcam-boomerang.gif`;
      a.click();
      URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error(err);
      alert("Oops! Gagal bikin GIF. Coba lagi ya.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={!isDownloading ? onClose : undefined}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[24px] bg-[#111111] border border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-sm font-semibold text-white tracking-wide">
                Boomerang Preview 🎞️
              </h2>
              <button
                onClick={onClose}
                disabled={isDownloading}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content: Fix Aspect Ratio & stretch */}
            <div className="relative w-full aspect-[4/3] sm:aspect-video bg-black flex items-center justify-center overflow-hidden">
              {photos.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photos[currentIndex]}
                  alt="Boomerang frame"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-white/50 text-sm">No photos available</p>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#111] border-t border-white/5 flex justify-center">
              <button
                disabled={isDownloading}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[14px] bg-white text-[#111111] font-semibold text-sm transition-all hover:bg-gray-100 disabled:bg-white/20 disabled:text-white disabled:cursor-not-allowed"
                onClick={handleDownload}
              >
                {isDownloading ? (
                  <>
                    <LoaderCircle className="w-4 h-4 animate-spin text-white" />
                    <span className="text-white">Menyiapkan Video...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Save Video
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
