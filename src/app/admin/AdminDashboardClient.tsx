"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Eye, 
  Users, 
  Calendar, 
  TrendingUp, 
  Activity, 
  RefreshCw, 
  LogOut, 
  Globe, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Clock, 
  Link2,
  Navigation,
  Loader2,
  AlertCircle,
  Camera
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

// ──────────────────────────────────────────────────────────────
// Types for analytics API response
// ──────────────────────────────────────────────────────────────
interface AnalyticsData {
  summary: {
    totalViews: number;
    totalSessions: number;
    viewsToday: number;
    viewsThisWeek: number;
    avgViewsPerSession: string;
  };
  recentActivity: Array<{
    path: string;
    referrer: string | null;
    country: string | null;
    browser: string | null;
    device: string | null;
    createdAt: string;
  }>;
  topPages: Array<{ path: string; count: number }>;
  deviceBreakdown: Array<{ device: string; count: number }>;
  browserBreakdown: Array<{ browser: string; count: number }>;
  countryBreakdown: Array<{ country: string; count: number }>;
  dailyViews: Array<{ date: string; count: number }>;
}

const FLAG_MAP: Record<string, string> = {
  ID: "🇮🇩", US: "🇺🇸", MY: "🇲🇾", SG: "🇸🇬", JP: "🇯🇵",
  GB: "🇬🇧", AU: "🇦🇺", DE: "🇩🇪", IN: "🇮🇳", CA: "🇨🇦",
  FR: "🇫🇷", NL: "🇳🇱", BR: "🇧🇷", PH: "🇵🇭", TH: "🇹🇭",
  Unknown: "🌐",
};

function getFlag(code: string | null) {
  return FLAG_MAP[code ?? "Unknown"] ?? "🌐";
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

// ──────────────────────────────────────────────────────────────
// Stat Card Component
// ──────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon, label, value, sub,
}: {
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  value: string | number; 
  sub?: string;
}) {
  return (
    <div className="bg-white dark:bg-[#18181b] border border-[#e5e7eb] dark:border-[#2a2a2e] rounded-2xl p-6 shadow-xs transition-colors duration-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#a1a1aa]">
          {label}
        </span>
        <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] dark:bg-[#232327] flex items-center justify-center text-[#111111] dark:text-[#f4f4f5]">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-bold text-[#111111] dark:text-[#f4f4f5] tracking-tight">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {sub && (
        <p className="text-xs text-[#9ca3af] dark:text-[#71717a] mt-1">
          {sub}
        </p>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Bar Chart Component (Tailwind-only pure design)
// ──────────────────────────────────────────────────────────────
function BarChart({ data, type = "default" }: { data: Array<{ label: string; count: number }>; type?: string }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="space-y-3.5">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="w-24 text-xs font-medium text-[#6b7280] dark:text-[#a1a1aa] truncate">
            {type === "country" ? `${getFlag(item.label)} ${item.label}` : item.label}
          </span>
          <div className="flex-1 h-2 bg-[#f5f5f5] dark:bg-[#232327] rounded-full overflow-hidden">
            <div
              className="h-full bg-black dark:bg-[#f4f4f5] rounded-full transition-all duration-500"
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
          <span className="w-8 text-right text-xs font-semibold text-[#111111] dark:text-[#f4f4f5]">
            {item.count}
          </span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Sparkline (daily views SVG)
// ──────────────────────────────────────────────────────────────
function Sparkline({ data }: { data: Array<{ date: string; count: number }> }) {
  if (data.length === 0) return <p className="text-center py-6 text-xs text-[#9ca3af] dark:text-[#71717a]">No data yet</p>;
  const max = Math.max(...data.map((d) => d.count), 1);
  const W = 500, H = 100;
  const step = W / Math.max(data.length - 1, 1);
  const points = data
    .map((d, i) => `${i * step},${H - (d.count / max) * H}`)
    .join(" ");

  return (
    <div className="w-full">
      <div className="relative h-28 w-full">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="spGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points={`0,${H} ${points} ${(data.length - 1) * step},${H}`}
            fill="url(#spGrad)"
          />
          <polyline 
            points={points} 
            fill="none" 
            stroke="currentColor" 
            className="text-black dark:text-white"
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
      <div className="flex justify-between items-center text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af] dark:text-[#71717a] mt-3">
        <span>{new Date(data[0].date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}</span>
        <span>{new Date(data[data.length - 1].date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Main dashboard client component
// ──────────────────────────────────────────────────────────────
export default function AdminDashboardClient() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await fetch("/api/admin/analytics");
      if (res.status === 401) { router.replace("/admin/login"); return; }
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to load analytics data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  function getDeviceIcon(device: string | null) {
    if (device === "Mobile") return <Smartphone className="w-3.5 h-3.5" />;
    if (device === "Tablet") return <Tablet className="w-3.5 h-3.5" />;
    return <Monitor className="w-3.5 h-3.5" />;
  }

  return (
    <div className="flex-1 min-h-screen bg-[#fafafa] dark:bg-[#0d0d0f] text-[#111111] dark:text-[#f4f4f5] transition-colors duration-300 pb-16">
      
      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[rgba(250,250,250,0.85)] dark:bg-[rgba(13,13,15,0.85)] border-b border-[#e5e7eb] dark:border-[#2a2a2e] transition-colors duration-300">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-black dark:bg-[#f4f4f5] text-white dark:text-black rounded-lg flex items-center justify-center">
              <Camera className="w-4.5 h-4.5" />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight">PixelCam Analytics</h1>
              <span className="text-[10px] text-[#6b7280] dark:text-[#a1a1aa] font-medium uppercase tracking-wider">Console</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-full text-[10px] font-semibold text-green-600 dark:text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live
            </span>
            <ThemeToggle />
            <button
              id="admin-refresh-btn"
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="p-2 bg-white dark:bg-[#18181b] border border-[#e5e7eb] dark:border-[#2a2a2e] rounded-xl hover:bg-[#f5f5f5] dark:hover:bg-[#232327] transition-all duration-150 text-[#111111] dark:text-[#f4f4f5] disabled:opacity-50"
            >
              {refreshing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </button>
            <button 
              id="admin-logout-btn" 
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-150"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-[1200px] mx-auto px-6 mt-8">
        
        {/* Loading Screen */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-black dark:text-white" />
            <p className="text-sm text-[#6b7280] dark:text-[#a1a1aa]">Fetching stats...</p>
          </div>
        )}

        {/* Error Screen */}
        {!loading && error && (
          <div className="flex items-center gap-3 justify-center min-h-[50vh] text-red-500">
            <AlertCircle className="w-6 h-6" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Dashboard Grid */}
        {!loading && data && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <StatCard icon={Eye} label="Page Views" value={data.summary.totalViews} />
              <StatCard icon={Users} label="Unique Visitors" value={data.summary.totalSessions} />
              <StatCard icon={Calendar} label="Views Today" value={data.summary.viewsToday} />
              <StatCard icon={TrendingUp} label="Views This Week" value={data.summary.viewsThisWeek} />
              <StatCard 
                icon={Activity} 
                label="Views / Visitor" 
                value={data.summary.avgViewsPerSession} 
                sub="pages per session" 
              />
            </div>

            {/* Sparkline (30 Days Chart) */}
            <div className="bg-white dark:bg-[#18181b] border border-[#e5e7eb] dark:border-[#2a2a2e] rounded-2xl p-6 shadow-xs transition-colors duration-300">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#a1a1aa] mb-6">
                Daily Page Views (Last 30 Days)
              </h2>
              <Sparkline data={data.dailyViews} />
            </div>

            {/* Breakdowns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Top Pages */}
              <div className="bg-white dark:bg-[#18181b] border border-[#e5e7eb] dark:border-[#2a2a2e] rounded-2xl p-6 shadow-xs transition-colors duration-300">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#a1a1aa] mb-5">
                  Top Pages
                </h3>
                <BarChart data={data.topPages.map((p) => ({ label: p.path, count: p.count }))} />
              </div>

              {/* Devices */}
              <div className="bg-white dark:bg-[#18181b] border border-[#e5e7eb] dark:border-[#2a2a2e] rounded-2xl p-6 shadow-xs transition-colors duration-300">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#a1a1aa] mb-5">
                  Devices
                </h3>
                <BarChart data={data.deviceBreakdown.map((d) => ({ label: d.device, count: d.count }))} />
              </div>

              {/* Browsers */}
              <div className="bg-white dark:bg-[#18181b] border border-[#e5e7eb] dark:border-[#2a2a2e] rounded-2xl p-6 shadow-xs transition-colors duration-300">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#a1a1aa] mb-5">
                  Browsers
                </h3>
                <BarChart data={data.browserBreakdown.map((b) => ({ label: b.browser, count: b.count }))} />
              </div>

              {/* Countries */}
              <div className="bg-white dark:bg-[#18181b] border border-[#e5e7eb] dark:border-[#2a2a2e] rounded-2xl p-6 shadow-xs transition-colors duration-300">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#a1a1aa] mb-5">
                  Countries
                </h3>
                <BarChart data={data.countryBreakdown.map((c) => ({ label: c.country, count: c.count }))} type="country" />
              </div>

            </div>

            {/* Recent Activity Table */}
            <div className="bg-white dark:bg-[#18181b] border border-[#e5e7eb] dark:border-[#2a2a2e] rounded-2xl shadow-xs transition-colors duration-300 overflow-hidden">
              <div className="px-6 py-5 border-b border-[#e5e7eb] dark:border-[#2a2a2e] flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#a1a1aa]">
                  Latest Page Views
                </h3>
                <Clock className="w-4 h-4 text-[#9ca3af] dark:text-[#71717a]" />
              </div>
              
              <div className="overflow-x-auto">
                {data.recentActivity.length === 0 ? (
                  <p className="text-center py-12 text-sm text-[#9ca3af] dark:text-[#71717a]">No hits recorded yet.</p>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#e5e7eb] dark:border-[#2a2a2e] text-[10px] font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#a1a1aa] bg-[#fafafa] dark:bg-[#1d1d20]">
                        <th className="px-6 py-3.5">Path</th>
                        <th className="px-6 py-3.5">Country</th>
                        <th className="px-6 py-3.5">Browser</th>
                        <th className="px-6 py-3.5">Device</th>
                        <th className="px-6 py-3.5">Referrer</th>
                        <th className="px-6 py-3.5">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#2a2a2e] text-sm text-[#111111] dark:text-[#f4f4f5]">
                      {data.recentActivity.map((act, i) => (
                        <tr key={i} className="hover:bg-[#f5f5f5] dark:hover:bg-[#232327]/40 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-mono text-xs px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-[#4f46e5] dark:text-[#a5b4fc] border border-indigo-100 dark:border-indigo-900/30 rounded-md">
                              {act.path}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-medium">
                            <span className="inline-flex items-center gap-1.5">
                              <span>{getFlag(act.country)}</span>
                              <span>{act.country ?? "—"}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-[#6b7280] dark:text-[#a1a1aa]">
                            {act.browser ?? "—"}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f5f5f5] dark:bg-[#232327] border border-transparent rounded-full text-xs text-[#6b7280] dark:text-[#a1a1aa]">
                              {getDeviceIcon(act.device)}
                              <span className="capitalize">{act.device?.toLowerCase() ?? "—"}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 max-w-[200px] truncate text-xs text-[#6b7280] dark:text-[#a1a1aa]">
                            {act.referrer ? (
                              <span className="inline-flex items-center gap-1">
                                <Link2 className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{act.referrer}</span>
                              </span>
                            ) : (
                              <span className="opacity-45 italic">Direct</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-xs text-[#9ca3af] dark:text-[#71717a] font-medium whitespace-nowrap">
                            {formatTime(act.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
