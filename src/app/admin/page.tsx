import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import AdminDashboardClient from "./AdminDashboardClient";
import { verifyAdminSession } from "@/lib/adminAuth";
import { NextRequest } from "next/server";

// ──────────────────────────────────────────────────────────────
// /admin — Server Component
// Verifies auth on the server before rendering anything.
// If not authenticated → redirect to /admin/login.
// ──────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic"; // Always re-fetch on every request

export default async function AdminPage() {
  // Build a minimal NextRequest-like object from server headers/cookies
  // to reuse the same verifyAdminSession helper
  const cookieStore = await cookies();
  const allHeaders = await headers();
  const cookieHeader = cookieStore.toString();

  const mockReq = new NextRequest("http://localhost/admin", {
    headers: {
      cookie: cookieHeader,
      ...Object.fromEntries(allHeaders.entries()),
    },
  });

  const authorized = await verifyAdminSession(mockReq);
  if (!authorized) {
    redirect("/admin/login");
  }

  return <AdminDashboardClient />;
}
