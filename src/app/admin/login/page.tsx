"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, Camera, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.replace("/admin");
      } else {
        const data = await res.json();
        setError(data.error ?? "Invalid password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-4rem)] px-6 py-12 bg-[#fafafa] dark:bg-[#0d0d0f] transition-colors duration-300 relative">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-[400px] bg-white dark:bg-[#18181b] border border-[#e5e7eb] dark:border-[#2a2a2e] rounded-2xl shadow-sm p-8 transition-colors duration-300">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 bg-black dark:bg-[#f4f4f5] text-white dark:text-black rounded-xl flex items-center justify-center mb-4 shadow-sm">
            <Camera className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold text-[#111111] dark:text-[#f4f4f5] tracking-tight">
            PixelCam Admin
          </h1>
          <p className="text-sm text-[#6b7280] dark:text-[#a1a1aa] mt-1.5">
            Enter password to access analytics console.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label 
              htmlFor="admin-password" 
              className="text-xs font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#a1a1aa]"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9ca3af] dark:text-[#71717a]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="admin-password"
                type="password"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f5f5f5] dark:bg-[#232327] border border-transparent focus:border-[#4f46e5] focus:bg-white dark:focus:bg-[#18181b] rounded-xl text-[15px] text-[#111111] dark:text-[#f4f4f5] placeholder-[#9ca3af] dark:placeholder-[#71717a] outline-none transition-all duration-150"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            id="admin-login-submit"
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#111111] dark:bg-[#f4f4f5] hover:bg-[#222222] dark:hover:bg-[#e4e4e7] text-white dark:text-[#111111] font-medium text-sm rounded-xl transition-all duration-150 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !password}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign in</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-[#9ca3af] dark:text-[#71717a] mt-6">
          Access restricted to authorized personnel only.
        </p>
      </div>
    </div>
  );
}
