import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminSession } from "@/lib/adminAuth";

// ──────────────────────────────────────────────────────────────
// GET /api/admin/analytics
// Returns aggregated analytics data for the admin dashboard.
// Protected: requires valid admin session cookie.
// ──────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // Verify admin cookie first
  const isAuthorized = await verifyAdminSession(req);
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Run all queries in parallel for speed
    const [
      totalViews,
      totalSessions,
      viewsToday,
      viewsThisWeek,
      recentPageViews,
      topPages,
      deviceBreakdown,
      browserBreakdown,
      countryBreakdown,
      dailyViews,
    ] = await Promise.all([
      // Total page views ever
      db.pageView.count(),

      // Total unique sessions (visitors)
      db.session.count(),

      // Page views in the last 24 hours
      db.pageView.count({ where: { createdAt: { gte: oneDayAgo } } }),

      // Page views in the last 7 days
      db.pageView.count({ where: { createdAt: { gte: sevenDaysAgo } } }),

      // Recent 20 page view events
      db.pageView.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { session: { select: { country: true, browser: true, device: true } } },
      }),

      // Top pages by view count (last 30 days)
      db.pageView.groupBy({
        by: ["path"],
        _count: { path: true },
        where: { createdAt: { gte: thirtyDaysAgo } },
        orderBy: { _count: { path: "desc" } },
        take: 10,
      }),

      // Device distribution
      db.session.groupBy({
        by: ["device"],
        _count: { device: true },
      }),

      // Browser distribution
      db.session.groupBy({
        by: ["browser"],
        _count: { browser: true },
        orderBy: { _count: { browser: "desc" } },
        take: 6,
      }),

      // Country distribution (top 10)
      db.session.groupBy({
        by: ["country"],
        _count: { country: true },
        orderBy: { _count: { country: "desc" } },
        take: 10,
      }),

      // Daily view counts for the last 30 days
      db.$queryRaw<{ date: string; count: bigint }[]>`
        SELECT
          DATE_TRUNC('day', "createdAt") AS date,
          COUNT(*) AS count
        FROM "PageView"
        WHERE "createdAt" >= ${thirtyDaysAgo}
        GROUP BY DATE_TRUNC('day', "createdAt")
        ORDER BY date ASC
      `,
    ]);

    // Build a map of dates from query results (using YYYY-MM-DD string keys)
    const dailyViewsMap = new Map<string, number>();
    for (const d of dailyViews) {
      if (d.date) {
        const dateStr = new Date(d.date).toISOString().split("T")[0];
        dailyViewsMap.set(dateStr, Number(d.count));
      }
    }

    // Zero-fill all 30 days up to today
    const dailyViewsFilled = [];
    for (let i = 29; i >= 0; i--) {
      const targetDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = targetDate.toISOString().split("T")[0];
      dailyViewsFilled.push({
        date: dateStr,
        count: dailyViewsMap.get(dateStr) ?? 0,
      });
    }

    return NextResponse.json({
      summary: {
        totalViews,
        totalSessions,
        viewsToday,
        viewsThisWeek,
        avgViewsPerSession: totalSessions > 0 ? (totalViews / totalSessions).toFixed(1) : "0",
      },
      recentActivity: recentPageViews.map((v: typeof recentPageViews[0]) => ({
        path: v.path,
        referrer: v.referrer,
        country: v.session.country,
        browser: v.session.browser,
        device: v.session.device,
        createdAt: v.createdAt.toISOString(),
      })),
      topPages: topPages.map((p: typeof topPages[0]) => ({ path: p.path, count: p._count.path })),
      deviceBreakdown: deviceBreakdown.map((d: typeof deviceBreakdown[0]) => ({ device: d.device ?? "Unknown", count: d._count.device })),
      browserBreakdown: browserBreakdown.map((b: typeof browserBreakdown[0]) => ({ browser: b.browser ?? "Unknown", count: b._count.browser })),
      countryBreakdown: countryBreakdown.map((c: typeof countryBreakdown[0]) => ({ country: c.country ?? "Unknown", count: c._count.country })),
      dailyViews: dailyViewsFilled,
    });
  } catch (err) {
    console.error("[/api/admin/analytics] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
