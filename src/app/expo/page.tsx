"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExpoPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("expoMode", "true");
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] dark:bg-[#0D0D0F]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
        <p className="text-sm font-medium text-[#6B7280] dark:text-[#a1a1aa]">Activating Expo Mode...</p>
      </div>
    </div>
  );
}
