"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

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

// ──────────────────────────────────────────────────────────────
// Color palette helpers
// ──────────────────────────────────────────────────────────────
const CHART_COLORS = [
  "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b",
  "#ef4444", "#ec4899", "#3b82f6",
];

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
// Stat Card
// ──────────────────────────────────────────────────────────────
function StatCard({
  icon, label, value, sub, color,
}: {
  icon: string; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: `${color}22`, color }}>{icon}</div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value.toLocaleString()}</p>
        {sub && <p className="stat-sub">{sub}</p>}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Bar chart (pure CSS)
// ──────────────────────────────────────────────────────────────
function BarChart({ data, color = "#6366f1" }: { data: Array<{ label: string; count: number }>; color?: string }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="bar-chart">
      {data.map((item, i) => (
        <div key={i} className="bar-row">
          <span className="bar-label">{item.label}</span>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{
                width: `${(item.count / max) * 100}%`,
                background: color,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          </div>
          <span className="bar-count">{item.count}</span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Sparkline (daily views)
// ──────────────────────────────────────────────────────────────
function Sparkline({ data }: { data: Array<{ date: string; count: number }> }) {
  if (data.length === 0) return <p className="no-data">No data yet</p>;
  const max = Math.max(...data.map((d) => d.count), 1);
  const W = 100, H = 50;
  const step = W / Math.max(data.length - 1, 1);
  const points = data
    .map((d, i) => `${i * step},${H - (d.count / max) * H}`)
    .join(" ");

  return (
    <div className="sparkline-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="sparkline-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="spGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,${H} ${points} ${(data.length - 1) * step},${H}`}
          fill="url(#spGrad)"
        />
        <polyline points={points} fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="sparkline-labels">
        {data.length > 0 && (
          <>
            <span>{new Date(data[0].date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}</span>
            <span>{new Date(data[data.length - 1].date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}</span>
          </>
        )}
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }
        .admin-root {
          min-height: 100vh;
          background: #080b14;
          font-family: 'Inter', sans-serif;
          color: #e2e8f0;
        }

        /* ── Top Bar ── */
        .admin-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .topbar-brand {
          display: flex; align-items: center; gap: 10px;
        }
        .brand-dot {
          width: 36px; height: 36px;
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          box-shadow: 0 4px 12px rgba(99,102,241,0.4);
        }
        .brand-title {
          font-size: 1rem; font-weight: 700; color: #fff; letter-spacing: -0.02em;
        }
        .brand-tag {
          font-size: 0.65rem; color: rgba(255,255,255,0.35);
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .topbar-actions {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .refresh-btn, .logout-btn {
          padding: 0.45rem 1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .refresh-btn {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .refresh-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
        .logout-btn {
          background: rgba(239,68,68,0.15);
          color: #f87171;
          border: 1px solid rgba(239,68,68,0.25);
        }
        .logout-btn:hover { background: rgba(239,68,68,0.25); }
        .live-badge {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.72rem; color: #10b981;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          padding: 0.35rem 0.75rem;
          border-radius: 100px;
        }
        .live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10b981;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }

        /* ── Main Layout ── */
        .admin-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2rem;
        }

        .section-title {
          font-size: 0.72rem;
          font-weight: 600;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 1rem;
        }

        /* ── Stat Cards Grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.25rem 1.4rem;
          transition: border-color 0.2s, background 0.2s;
          animation: fadeIn 0.4s ease both;
        }
        .stat-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.14);
        }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }
        .stat-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .stat-label { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin: 0 0 2px; }
        .stat-value { font-size: 1.6rem; font-weight: 700; color: #fff; letter-spacing: -0.03em; margin: 0; }
        .stat-sub { font-size: 0.72rem; color: rgba(255,255,255,0.3); margin: 2px 0 0; }

        /* ── Chart Grid ── */
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .chart-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.4rem;
          animation: fadeIn 0.5s ease both;
        }
        .chart-card h3 {
          font-size: 0.85rem; font-weight: 600;
          color: rgba(255,255,255,0.7);
          margin: 0 0 1.25rem;
        }

        /* Sparkline */
        .sparkline-wrap { }
        .sparkline-svg { width: 100%; height: 80px; display: block; }
        .sparkline-labels {
          display: flex; justify-content: space-between;
          font-size: 0.68rem; color: rgba(255,255,255,0.25);
          margin-top: 0.5rem;
        }

        /* Bar chart */
        .bar-chart { display: flex; flex-direction: column; gap: 0.6rem; }
        .bar-row { display: flex; align-items: center; gap: 0.6rem; }
        .bar-label { width: 90px; font-size: 0.75rem; color: rgba(255,255,255,0.5); flex-shrink: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bar-track { flex: 1; height: 8px; background: rgba(255,255,255,0.06); border-radius: 100px; overflow: hidden; }
        .bar-fill {
          height: 100%; border-radius: 100px;
          animation: growBar 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes growBar { from{width:0!important;} }
        .bar-count { font-size: 0.72rem; color: rgba(255,255,255,0.4); width: 28px; text-align: right; flex-shrink: 0; }

        /* Full-width chart card */
        .chart-card-wide {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.4rem;
          margin-bottom: 1rem;
          animation: fadeIn 0.5s ease both;
        }
        .chart-card-wide h3 { font-size: 0.85rem; font-weight: 600; color: rgba(255,255,255,0.7); margin: 0 0 1rem; }

        /* ── Activity Feed ── */
        .activity-table { width: 100%; border-collapse: collapse; }
        .activity-table th {
          font-size: 0.68rem; font-weight: 500;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase; letter-spacing: 0.08em;
          text-align: left; padding: 0 0.75rem 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .activity-table td {
          font-size: 0.8rem; color: rgba(255,255,255,0.65);
          padding: 0.6rem 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          vertical-align: middle;
        }
        .activity-table tr:last-child td { border-bottom: none; }
        .activity-table tr:hover td { background: rgba(255,255,255,0.03); }
        .path-badge {
          font-family: monospace;
          background: rgba(99,102,241,0.15);
          color: #a5b4fc;
          padding: 2px 8px; border-radius: 6px;
          font-size: 0.78rem;
        }
        .device-chip {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.06);
          padding: 2px 8px; border-radius: 100px;
        }

        /* ── Loading / Error states ── */
        .loading-screen {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          min-height: 60vh; gap: 1rem;
        }
        .loading-spinner {
          width: 40px; height: 40px;
          border: 3px solid rgba(99,102,241,0.2);
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to{transform:rotate(360deg);} }
        .loading-text { color: rgba(255,255,255,0.3); font-size: 0.875rem; }
        .error-msg {
          color: #f87171; text-align: center;
          padding: 2rem; font-size: 0.875rem;
        }
        .no-data { color: rgba(255,255,255,0.25); font-size: 0.8rem; text-align: center; padding: 1rem 0; }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .admin-topbar { padding: 0.75rem 1rem; }
          .admin-main { padding: 1rem; }
          .stat-value { font-size: 1.3rem; }
          .activity-table { display: none; }
        }
      `}</style>

      <div className="admin-root">
        {/* ── Top Bar ── */}
        <header className="admin-topbar">
          <div className="topbar-brand">
            <div className="brand-dot">📸</div>
            <div>
              <div className="brand-title">PixelCam Analytics</div>
              <div className="brand-tag">Admin Dashboard</div>
            </div>
          </div>
          <div className="topbar-actions">
            <span className="live-badge">
              <span className="live-dot" />
              Live
            </span>
            <button
              id="admin-refresh-btn"
              className="refresh-btn"
              onClick={() => fetchData(true)}
              disabled={refreshing}
            >
              {refreshing ? "↻ Refreshing…" : "↻ Refresh"}
            </button>
            <button id="admin-logout-btn" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* ── Loading ── */}
        {loading && (
          <div className="loading-screen">
            <div className="loading-spinner" />
            <p className="loading-text">Loading analytics data…</p>
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && <p className="error-msg">{error}</p>}

        {/* ── Dashboard ── */}
        {!loading && data && (
          <main className="admin-main">
            {/* Summary Stats */}
            <p className="section-title">Overview</p>
            <div className="stats-grid">
              <StatCard icon="👁️" label="Total Page Views" value={data.summary.totalViews} color="#6366f1" />
              <StatCard icon="👤" label="Unique Visitors" value={data.summary.totalSessions} color="#8b5cf6" />
              <StatCard icon="📅" label="Views Today" value={data.summary.viewsToday} color="#06b6d4" />
              <StatCard icon="📈" label="Views This Week" value={data.summary.viewsThisWeek} color="#10b981" />
              <StatCard
                icon="🔁"
                label="Avg Views / Visitor"
                value={data.summary.avgViewsPerSession}
                color="#f59e0b"
                sub="pages per session"
              />
            </div>

            {/* Daily Views Sparkline */}
            <p className="section-title">Views – Last 30 Days</p>
            <div className="chart-card-wide">
              <h3>📊 Daily Page Views</h3>
              <Sparkline data={data.dailyViews} />
            </div>

            {/* Charts Grid */}
            <p className="section-title">Breakdowns</p>
            <div className="charts-grid">
              {/* Top Pages */}
              <div className="chart-card">
                <h3>🔥 Top Pages</h3>
                <BarChart
                  data={data.topPages.map((p) => ({ label: p.path, count: p.count }))}
                  color="#6366f1"
                />
              </div>

              {/* Device */}
              <div className="chart-card">
                <h3>📱 Device Type</h3>
                <BarChart
                  data={data.deviceBreakdown.map((d, i) => ({
                    label: d.device,
                    count: d.count,
                    color: CHART_COLORS[i],
                  }))}
                  color="#06b6d4"
                />
              </div>

              {/* Browser */}
              <div className="chart-card">
                <h3>🌐 Browser</h3>
                <BarChart
                  data={data.browserBreakdown.map((b) => ({ label: b.browser, count: b.count }))}
                  color="#8b5cf6"
                />
              </div>

              {/* Country */}
              <div className="chart-card">
                <h3>🌍 Country</h3>
                <div className="bar-chart">
                  {data.countryBreakdown.map((c, i) => {
                    const max = Math.max(...data.countryBreakdown.map((x) => x.count), 1);
                    return (
                      <div key={i} className="bar-row">
                        <span className="bar-label">{getFlag(c.country)} {c.country}</span>
                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{
                              width: `${(c.count / max) * 100}%`,
                              background: "#10b981",
                              animationDelay: `${i * 0.05}s`,
                            }}
                          />
                        </div>
                        <span className="bar-count">{c.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <p className="section-title">Recent Activity</p>
            <div className="chart-card-wide">
              <h3>🕐 Latest Page Views</h3>
              {data.recentActivity.length === 0 ? (
                <p className="no-data">No activity recorded yet.</p>
              ) : (
                <table className="activity-table">
                  <thead>
                    <tr>
                      <th>Path</th>
                      <th>Country</th>
                      <th>Browser</th>
                      <th>Device</th>
                      <th>Referrer</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentActivity.map((act, i) => (
                      <tr key={i}>
                        <td><span className="path-badge">{act.path}</span></td>
                        <td>{getFlag(act.country)} {act.country ?? "—"}</td>
                        <td>{act.browser ?? "—"}</td>
                        <td>
                          <span className="device-chip">
                            {act.device === "Mobile" ? "📱" : act.device === "Tablet" ? "📟" : "🖥️"}
                            {" "}{act.device ?? "—"}
                          </span>
                        </td>
                        <td style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {act.referrer || <span style={{ opacity: 0.3 }}>direct</span>}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>{formatTime(act.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </main>
        )}
      </div>
    </>
  );
}
