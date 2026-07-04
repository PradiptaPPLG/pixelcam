"use client";

import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

/**
 * Reusable action button used for the PNG/JPG downloads. Shows a spinner
 * while its own export is in flight.
 */
export default function DownloadButton({
  onClick,
  children,
  icon,
  variant = "primary",
  disabled = false,
  loading = false,
  className,
}: DownloadButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className={cn(
        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-[14px] px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2",
        variant === "primary"
          ? "bg-[#111111] text-white hover:bg-[#222222] active:bg-[#333333]"
          : "border border-[#E5E7EB] bg-white text-[#111111] hover:bg-[#F5F5F5] active:bg-[#EEEEEE]",
        isDisabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {loading ? (
        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        icon
      )}
      {children}
    </motion.button>
  );
}
