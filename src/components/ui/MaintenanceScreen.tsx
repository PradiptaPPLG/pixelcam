"use client";

import { useState } from "react";
import Logo from "@/components/ui/Logo";
import { MAINTENANCE_CONFIG } from "@/config/maintenance";
import { Check, Copy, Mail } from "lucide-react";

export default function MaintenanceScreen() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(MAINTENANCE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#0A0D14] px-5 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.05] px-7 py-9 text-center backdrop-blur-xl">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-amber-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
          </span>
          Under Maintenance
        </div>

        {/* Logo — already includes wordmark, no extra text */}
        <div className="mb-5 flex justify-center">
          <Logo size={28} showWordmark />
        </div>

        {/* Title */}
        <h1 className="mb-3 text-lg font-semibold leading-snug text-white/90 sm:text-xl">
          {MAINTENANCE_CONFIG.title}
        </h1>

        {/* Message */}
        <p className="mb-6 text-sm leading-relaxed text-gray-400">
          {MAINTENANCE_CONFIG.message}
        </p>

        {/* Simple italic signature */}
        <p className="mb-7 text-sm italic text-gray-500">
          — {MAINTENANCE_CONFIG.author}, {MAINTENANCE_CONFIG.role}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={`mailto:${MAINTENANCE_CONFIG.email}`}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-white text-[13px] font-medium text-black transition hover:bg-gray-100 active:scale-[0.98]"
          >
            <Mail className="h-3.5 w-3.5" />
            Send Email
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 text-[13px] font-medium text-white transition hover:bg-white/10 active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-gray-400" />
                Copy Email
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-gray-600">
        &copy; {new Date().getFullYear()} PixelCam. All rights reserved.
      </p>
    </div>
  );
}
