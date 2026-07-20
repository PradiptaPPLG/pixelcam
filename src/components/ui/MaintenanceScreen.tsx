"use client";

import { useState } from "react";
import Logo from "@/components/ui/Logo";
import { MAINTENANCE_CONFIG } from "@/config/maintenance";
import { Check, Copy, Mail, ShieldAlert, Sparkles } from "lucide-react";

export default function MaintenanceScreen() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(MAINTENANCE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center overflow-hidden bg-[#0A0D14] px-4 font-sans text-white select-none">
      {/* Dynamic Dark Ambient Lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 sm:p-10 backdrop-blur-2xl shadow-[0_32px_64px_rgba(0,0,0,0.6)] text-center">
        
        {/* Header Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <span>UNDER MAINTENANCE</span>
        </div>

        {/* Brand Logo & Name */}
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <Logo size={32} />
          <span className="text-2xl font-bold tracking-tight text-white">
            PixelCam
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-xl sm:text-2xl font-semibold text-white/90">
          {MAINTENANCE_CONFIG.title}
        </h1>

        {/* Message */}
        <p className="mb-8 text-sm sm:text-base leading-relaxed text-gray-300/90 font-normal">
          {MAINTENANCE_CONFIG.message}
        </p>

        {/* Founder Signature Box */}
        <div className="mb-8 rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-left backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-base shadow-md">
              P
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                — {MAINTENANCE_CONFIG.author}
              </p>
              <p className="text-xs text-indigo-300/80 font-medium">
                {MAINTENANCE_CONFIG.role}
              </p>
            </div>
          </div>
        </div>

        {/* Email Contact Action */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={`mailto:${MAINTENANCE_CONFIG.email}`}
            className="flex h-11 w-full sm:flex-1 items-center justify-center gap-2 rounded-xl bg-white text-black font-medium text-sm transition-all hover:bg-gray-100 active:scale-[0.98]"
          >
            <Mail className="h-4 w-4" />
            Send Email
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition-all hover:bg-white/10 active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-gray-400" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <p className="mt-8 text-xs text-gray-500 font-medium">
        &copy; {new Date().getFullYear()} PixelCam. All rights reserved.
      </p>
    </div>
  );
}
