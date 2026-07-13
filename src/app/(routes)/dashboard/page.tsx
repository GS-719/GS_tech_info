import { redirect } from "next/navigation";
import { fetchDashboardDataAction } from "@/src/app/actions/dashboard/dashboard";
import { DashboardActions } from '@/src/components/dashboard/dashboardAction';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bookmark, BookOpen, Clock, Zap, TrendingUp, Award, Globe } from 'lucide-react';

function formatTimeAgo(dateInput: Date | string): string {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} days ago`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString();
}

export default async function DashboardPage() {
  const data = await fetchDashboardDataAction();

  if (!data.success && data.error === "UNAUTHORIZED") {
    redirect("/login");
  }

  const articlesReadCount = data.bookmarks?.length || 0;
  const hoursLearnedCount = Math.round(Number(data.adminStats?.avgReadingMinutes || 0) * 1.5) || 0;
  const currentStreakDays = articlesReadCount > 0 ? 5 : 0;
  const topicsMasteredCount = data.featuredResources?.length || 0;

  const statItems = [
    { icon: BookOpen, label: 'Articles Read', value: articlesReadCount.toString() },
    { icon: Clock, label: 'Hours Learned', value: `${hoursLearnedCount} hrs` },
    { icon: Zap, label: 'Current Streak', value: `${currentStreakDays} days` },
    { icon: TrendingUp, label: 'Topics Mastered', value: topicsMasteredCount.toString() },
  ];

  const dynamicActivities = data.bookmarks?.map((bookmark: any) => ({
    title: `Saved "${bookmark.contentNode?.slug ? bookmark.contentNode.slug.replace(/-/g, " ") : "Untitled Content"}" to reading backlog`,
    date: formatTimeAgo(bookmark.createdAt),
    readTime: `${bookmark.contentNode?.readingTime || 12} min read`,
  })) || [];

  return (
    <>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="py-12 border-b border-border/40 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold tracking-tight">Learning Dashboard</h1>
                {/* 🌍 Active Interface Language Indicator Badge */}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-muted border border-border/60 text-muted-foreground mt-1">
                  <Globe className="w-3 h-3" /> Lang: {data.userSettings?.language || "en"}
                </span>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Welcome back, {data.userName || "Developer"}. Track your progress, bookmarks, and continue where you left off.
              </p>
            </div>

            <DashboardActions />
          </div>

          {/* Your Learning Progress Section */}
          <section className="py-12">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Your Learning Progress</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-3xl font-bold text-accent">{item.value}</p>
                  </div>
                );
              })}
            </div>

            {/* ========================================================
                🏅 UNLOCKED PORTFOLIO ACHIEVEMENTS FEED (New Added Section)
               ======================================================== */}
            <div className="mt-12 p-6 rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm">
              <h3 className="text-xl font-semibold tracking-tight mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" /> Earned Milestones & Badges
              </h3>
              <p className="text-sm text-muted-foreground border-b border-border/30 pb-3 mb-4">Achievements unlocked through engineering quizzes and deep-dive technical readings.</p>

              {!data.earnedBadges || data.earnedBadges.length === 0 ? (
                <p className="text-xs text-muted-foreground italic py-2">Complete interactive platform challenges to unlock your first custom achievement badge.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {data.earnedBadges.map((badge: any) => (
                    <div
                      key={badge.id}
                      className="p-3 rounded-lg border border-border/40 bg-[#0d0d11]/50 hover:border-accent/30 transition-colors flex flex-col items-center text-center justify-center gap-1 group"
                    >
                      <Award className="w-7 h-7 text-accent drop-shadow-[0_0_6px_rgba(var(--accent),0.15)] group-hover:scale-105 transition-transform" />
                      <span className="text-[11px] font-semibold text-foreground mt-1 truncate max-w-full capitalize">
                        {badge.badgeId.replace(/_/g, " ")}
                      </span>
                      <span className="text-[9px] text-muted-foreground">
                        {new Date(badge.earnedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold tracking-tight mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {dynamicActivities.length === 0 ? (
                  <div className="p-8 text-center text-sm text-muted-foreground border border-dashed border-border/40 rounded-lg">
                    No recent reading or bookmarking activity logged. Explore platform resources to start!
                  </div>
                ) : (
                  dynamicActivities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-border/40 bg-muted/20 hover:border-accent/30 transition-all"
                    >
                      <p className="font-medium mb-1 capitalize">{activity.title}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{activity.date}</span>
                        <span className="text-accent">{activity.readTime}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Bookmarks Section */}
          <section className="py-12 border-t border-border/40">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Saved Articles</h2>
                <p className="text-muted-foreground">Your bookmarked content for later reading</p>
              </div>
              <Link href="/resources">
                <Button variant="outline" size="sm" className="gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.bookmarks && data.bookmarks.length === 0 ? (
                <div className="col-span-full py-12 text-center text-sm text-muted-foreground border border-dashed border-border/40 rounded-lg">
                  You haven't bookmarked any articles yet.
                </div>
              ) : (
                data.bookmarks?.map((bookmark: any, idx: number) => (
                  <div
                    key={bookmark.id || idx}
                    className="group p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-accent/10 text-accent">
                        {bookmark.contentNode?.type || "ARTICLE"}
                      </span>
                      <Bookmark className="w-5 h-5 text-accent fill-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2 capitalize">
                      {bookmark.contentNode?.slug ? bookmark.contentNode.slug.replace(/-/g, " ") : "Untitled Technical Content"}
                    </h3>
                    <div className="flex items-center justify-between pt-4 border-t border-border/30 text-sm text-muted-foreground">
                      <span>{bookmark.contentNode?.readingTime || 15} min read</span>
                      <span>Saved {formatTimeAgo(bookmark.createdAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Admin Dashboard Preview */}
          {data.isAdminOrMod && (
            <section className="py-12 border-t border-border/40">
              <h2 className="text-2xl font-bold tracking-tight mb-8">Admin Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Total Visitors',
                    value: data.adminStats?.totalVisitors?.toLocaleString() || "0",
                    change: 'Live unique logging views count',
                  },
                  {
                    title: 'Articles Published',
                    value: data.adminStats?.publishedArticles?.toString() || "0",
                    change: 'Synchronized production nodes',
                  },
                  {
                    title: 'Avg. Reading Time',
                    value: `${data.adminStats?.avgReadingMinutes || "0.0"} min`,
                    change: 'Calculated view duration index',
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-lg border border-border/50 bg-card"
                  >
                    <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
                    <p className="text-3xl font-bold mb-2">{stat.value}</p>
                    <p className="text-sm text-accent">{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Admin Actions */}
              <div className="mt-8 p-6 rounded-lg border border-border/50 bg-muted/20">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Link href="/cms">
                    <Button className="w-full gap-2" variant="outline">
                      <ArrowRight className="w-4 h-4" /> Create Article
                    </Button>
                  </Link>
                  <Link href="/dashboard/manage">
                    <Button className="w-full gap-2" variant="outline">
                      Manage Content
                    </Button>
                  </Link>
                  <Link href="/dashboard/analytics">
                    <Button className="w-full gap-2" variant="outline">
                      View Analytics
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Featured Resources */}
          <section className="py-12 border-t border-border/40">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.featuredResources && data.featuredResources.length === 0 ? (
                <div className="col-span-full py-12 text-center text-sm text-muted-foreground border border-dashed border-border/40 rounded-lg">
                  No featured reference roadmaps or assets loaded yet.
                </div>
              ) : (
                data.featuredResources?.map((resource: any, idx: number) => (
                  <Link
                    key={resource.id || idx}
                    href={`/resources/${resource.slug}`}
                    className="group p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-muted/30 transition-all block"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-accent/10 text-accent">
                      {resource.type || "RESOURCE"}
                    </span>
                    <h3 className="text-lg font-semibold mt-3 mb-2 group-hover:text-accent transition-colors capitalize">
                      {resource.slug ? resource.slug.replace(/-/g, " ") : "Untitled Resource"}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                      Access live resource files and documentation assets securely anchored at filesystem index pathway location: {resource.mdxPath}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}