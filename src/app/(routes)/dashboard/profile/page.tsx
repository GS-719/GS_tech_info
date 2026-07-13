import { redirect } from "next/navigation";
import { fetchFullPortfolioAction } from "@/src/app/actions/dashboard/profile";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import {
    ArrowLeft, Bookmark, BookOpen, Clock, Zap, TrendingUp,
    Award, Globe, MessageSquare, ShieldAlert, ExternalLink, Calendar, MapPin, Briefcase, Building
} from 'lucide-react';

export default async function UnifiedProfilePage() {
    const result = await fetchFullPortfolioAction();

    if (!result.success || result.error === "USER_NOT_FOUND") {
        redirect("/login");
    }

    const { isOwner, isPublic, profile, stats, publishedContent, readingHistory, badges, collections, comments, quizStats } = result;

    return (
        <>
            <main className="flex-1 bg-[#050506] text-white min-h-screen pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">

                    {/* Back Navigation Row Control */}
                    <div className="mb-8">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-white border-none bg-transparent hover:bg-white/5">
                                <ArrowLeft className="w-4 h-4" /> Return to Workspace Dashboard
                            </Button>
                        </Link>
                    </div>

                    {/* ========================================================
              🧑 HERO SECTION
             ======================================================== */}
                    <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                            {/* Profile Frame Avatar */}
                            <div className="w-24 h-24 rounded-xl border border-border/60 bg-muted flex items-center justify-center overflow-hidden shrink-0 shadow-lg relative group">
                                {profile.avatarUrl ? (
                                    <img src={profile.avatarUrl} alt={profile.displayName} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl font-bold text-muted-foreground uppercase">{profile.username?.[0]}</span>
                                )}
                            </div>

                            {/* Identity Detail Information Bundle */}
                            <div className="space-y-1">
                                <div className="flex items-center flex-wrap gap-2">
                                    <h1 className="text-3xl font-bold tracking-tight text-white">{profile.displayName || "Developer"}</h1>
                                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-extrabold tracking-widest uppercase rounded border border-accent/30 bg-accent/10 text-accent">
                                        {profile.role || "USER"}
                                    </span>
                                    {!isPublic && (
                                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-extrabold tracking-widest uppercase rounded border border-white/10 bg-white/5 text-muted-foreground">
                                            🔒 Private Visibility
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-accent font-medium">@{profile.username || "anonymous"}</p>
                                <p className="text-sm text-muted-foreground max-w-xl pt-1.5 leading-relaxed">{profile.bio || "No professional biography sheet written yet."}</p>

                                {/* Meta Row Anchors */}
                                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground pt-2">
                                    {profile.createdAt && (
                                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Dev since {new Date(profile.createdAt).getFullYear()}</span>
                                    )}
                                    {profile.location && (
                                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {profile.location}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Social Media Connectivity Hyperlinks */}
                        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
                            {profile.github && (
                                <a href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-border/50 bg-card text-muted-foreground hover:text-white hover:border-border transition-colors">
                                    GitHub
                                </a>
                            )}
                            {profile.linkedin && (
                                <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-border/50 bg-card text-muted-foreground hover:text-white hover:border-border transition-colors">
                                    Linkedin
                                </a>
                            )}
                            {profile.twitter && (
                                <a href={`https://x.com/${profile.twitter}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-border/50 bg-card text-muted-foreground hover:text-white hover:border-border transition-colors">
                                    Twitter (x)
                                </a>
                            )}
                            {profile.website && (
                                <a href={profile.website} target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-border/50 bg-card text-accent hover:opacity-80 transition-opacity">
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            {isOwner && (
                                <Link href="/dashboard/profile/edit">
                                    <Button size="sm" variant="outline" className="text-xs border-white/10 bg-white/5 hover:bg-white/10 text-white">Edit Profile</Button>
                                </Link>
                            )}
                        </div>
                    </section>

                    <hr className="border-border/40" />

                    {/* ========================================================
              📊 STATISTICS SCORECARDS MATRIX
             ======================================================== */}
                    <section className="py-12">
                        <h2 className="text-xl font-bold tracking-tight mb-6 uppercase text-muted-foreground text-xs tracking-widest font-mono">Platform Metrics Grid</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {[
                                { label: 'Read Index', value: stats?.articlesRead, icon: BookOpen },
                                { label: 'Bookmarks', value: stats?.bookmarks, icon: Bookmark },
                                { label: 'Collections', value: stats?.collections, icon: Globe },
                                { label: 'Comments', value: stats?.comments, icon: MessageSquare },
                                { label: 'Badges', value: stats?.badges, icon: Award },
                                { label: 'Quizzes', value: stats?.quizzes, icon: Zap },
                                { label: 'Published', value: stats?.published, icon: TrendingUp },
                            ].map((card) => {
                                const Icon = card.icon;
                                return (
                                    <div key={card.label} className="p-4 rounded-lg border border-border/40 bg-card flex flex-col justify-between group hover:border-accent/40 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground truncate">{card.label}</p>
                                            <Icon className="w-3.5 h-3.5 text-accent opacity-70 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <p className="text-2xl font-black text-white">{card.value}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <hr className="border-border/40" />

                    {/* ========================================================
              ✍️ PUBLISHED CONTENT blueprnt block
             ======================================================== */}
                    <section className="py-12">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-white">Published Documentation Assets</h2>
                                <p className="text-sm text-muted-foreground">Technical tutorial guides authored and deployed by this developer identity.</p>
                            </div>
                        </div>

                        {publishedContent.length === 0 ? (
                            <div className="py-8 text-center text-xs text-muted-foreground border border-dashed border-border/40 rounded-xl bg-card/10">
                                No active published assets authored under this profile footprint.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {publishedContent.map((node: any) => (
                                    <Link key={node.id} href={`/${node.type.toLowerCase()}s/${node.slug}`} className="group p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:bg-white/[0.01] transition-all block">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-accent/10 text-accent">
                                                {node.type}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground font-mono">{node.readingTime || 12} min read</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors line-clamp-2 capitalize">
                                            {node.slug.replace(/-/g, " ")}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>

                    <hr className="border-border/40" />

                    {/* ========================================================
              📈 RECENT ACTIVITY TIMELINE HUB
             ======================================================== */}
                    {profile.isPublic || isOwner ? (
                        <section className="py-12">
                            <h2 className="text-2xl font-bold tracking-tight mb-8 text-white">Learning Timeline Feed</h2>
                            {readingHistory.length === 0 ? (
                                <p className="text-xs text-muted-foreground italic">No historical learning log activities captured yet.</p>
                            ) : (
                                <div className="relative border-l border-border/50 ml-3 space-y-6">
                                    {readingHistory.map((history: any, idx: number) => (
                                        <div key={history.id || idx} className="relative pl-6 group">
                                            {/* Timeline Dot Icon */}
                                            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border border-accent bg-[#050506] group-hover:bg-accent transition-colors" />
                                            <div className="text-xs font-mono text-muted-foreground mb-0.5">{formatTimeAgo(history.viewedAt || history.createdAt)}</div>
                                            <p className="text-sm font-medium text-white capitalize">
                                                Accessed {history.contentNode?.type?.toLowerCase() || 'document'}:{" "}
                                                <Link href={`/${history.contentNode?.type?.toLowerCase()}s/${history.contentNode?.slug}`} className="text-accent hover:underline">
                                                    {history.contentNode?.slug?.replace(/-/g, " ") || "Technical Node Assets"}
                                                </Link>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    ) : null}

                    <hr className="border-border/40" />

                    {/* ========================================================
              📚 PUBLIC LEARNING COLLECTIONS
             ======================================================== */}
                    <section className="py-12">
                        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Curated Learning Paths</h2>
                        {collections.length === 0 ? (
                            <div className="py-6 text-xs text-muted-foreground border border-dashed border-border/40 rounded-xl text-center">
                                No active learning collection folders built public right now.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {collections.map((folder: any) => (
                                    <div key={folder.id} className="p-5 rounded-lg border border-border/40 bg-card hover:border-border transition-colors">
                                        <span className="text-[10px] font-bold text-muted-foreground block uppercase mb-1">📁 Collection Path</span>
                                        <h4 className="text-base font-bold text-white tracking-tight capitalize truncate">{folder.name || folder.title}</h4>
                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5">{folder.description || "Curated reference learning sequence tracker layout folder."}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <hr className="border-border/40" />

                    {/* ========================================================
              🏅 SYSTEM AWARD BADGES MATRIX GRID
             ======================================================== */}
                    <section className="py-12">
                        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Badges Earned</h2>
                        {badges.length === 0 ? (
                            <p className="text-xs text-muted-foreground italic">No system challenge awards or badges unlocked yet under this namespace.</p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                                {badges.map((badge: any) => (
                                    <div key={badge.id} className="p-4 rounded-xl border border-border/40 bg-card/50 flex flex-col items-center text-center justify-center gap-1 group">
                                        <Award className="w-8 h-8 text-accent drop-shadow-[0_0_8px_rgba(var(--accent),0.2)] group-hover:scale-110 transition-transform duration-200" />
                                        <span className="text-xs font-bold text-white mt-2 capitalize tracking-tight truncate max-w-full">
                                            {badge.badgeId.replace(/_/g, " ")}
                                        </span>
                                        <span className="text-[10px] font-mono text-muted-foreground">
                                            {new Date(badge.earnedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <hr className="border-border/40" />

                    {/* ========================================================
              🧠 QUIZ PERFORMANCE METRICS
             ======================================================== */}
                    <section className="py-12">
                        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Quiz Challenge Performance</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            {[
                                { label: "Total Challenges Run", value: quizStats?.attempted },
                                { label: "Milestones Cleared", value: quizStats?.passed },
                                { label: "Average Grade Score", value: `${quizStats?.avgScore}%` },
                                { label: "Highest Execution Score", value: `${quizStats?.highestScore}%` },
                            ].map((stat, idx) => (
                                <div key={idx} className="p-5 rounded-lg border border-border/40 bg-[#0d0d11]/40 backdrop-blur-md">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                                    <p className="text-3xl font-black text-accent">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <hr className="border-border/40" />

                    {/* ========================================================
              📊 ACTIVITY CONTRIBUTION GRAPH (GitHub Style Grid Matrix)
             ======================================================== */}
                    <section className="py-12">
                        <h2 className="text-2xl font-bold tracking-tight mb-2 text-white">Platform Activity Contributions</h2>
                        <p className="text-sm text-muted-foreground mb-6">
                            Real-time synchronization tracking your historical reading sessions, submitted comments, bookmarks, and quiz completions over the past year.
                        </p>

                        <div className="p-6 rounded-xl border border-border/40 bg-card overflow-x-auto min-w-full">
                            <div className="flex gap-1 w-max mx-auto md:mx-0">
                                {(() => {
                                    // 1. Initialize contribution matrix tracking parameters
                                    const columns = 53;
                                    const daysPerWeek = 7;
                                    const totalDaysToShow = columns * daysPerWeek;

                                    // Compute start target tracking back exactly 370 days from today
                                    const endDate = new Date();
                                    const startDate = new Date();
                                    startDate.setDate(endDate.getDate() - (totalDaysToShow - 1));

                                    const mapData = result.contributionMap || {};
                                    const weeksArray = [];

                                    // 2. Loop through weeks and fill with actual daily log counters
                                    for (let w = 0; w < columns; w++) {
                                        const daysInThisWeek = [];
                                        for (let d = 0; d < daysPerWeek; d++) {
                                            const currentDay = new Date(startDate);
                                            currentDay.setDate(startDate.getDate() + (w * daysPerWeek + d));

                                            const dateKey = currentDay.toISOString().split("T")[0];
                                            const activityCount = mapData[dateKey] || 0;

                                            // Dynamic color tier logic reflecting database interaction densities
                                            let colorClass = "bg-white/[0.02] border border-white/[0.01]"; // 0 activities
                                            if (activityCount >= 1 && activityCount <= 2) {
                                                colorClass = "bg-accent/20 border border-accent/10";
                                            } else if (activityCount >= 3 && activityCount <= 4) {
                                                colorClass = "bg-accent/50 border border-accent/20";
                                            } else if (activityCount >= 5) {
                                                colorClass = "bg-accent border border-accent/30";
                                            }

                                            daysInThisWeek.push(
                                                <div
                                                    key={dateKey}
                                                    className={`w-3 h-3 rounded-[2px] transition-all hover:scale-110 duration-100 ${colorClass}`}
                                                    title={`${activityCount} platform interaction${activityCount === 1 ? '' : 's'} logged on ${currentDay.toLocaleDateString(undefined, { dateStyle: 'medium' })}`}
                                                />
                                            );
                                        }
                                        weeksArray.push(
                                            <div key={w} className="flex flex-col gap-1">
                                                {daysInThisWeek}
                                            </div>
                                        );
                                    }
                                    return weeksArray;
                                })()}
                            </div>

                            {/* Grid Context Index Metadata Label Legend */}
                            <div className="flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground mt-4 font-mono select-none">
                                <span>Less</span>
                                <div className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.02] border border-white/[0.01]" />
                                <div className="w-2.5 h-2.5 rounded-[2px] bg-accent/20 border border-accent/10" />
                                <div className="w-2.5 h-2.5 rounded-[2px] bg-accent/50 border border-accent/20" />
                                <div className="w-2.5 h-2.5 rounded-[2px] bg-accent border border-accent/30" />
                                <span>More</span>
                            </div>
                        </div>
                    </section>

                    <hr className="border-border/40" />

                    {/* ========================================================
              📝 DETAILED ABOUT & PROFESSIONAL SPECIFICATIONS
             ======================================================== */}
                    <section className="py-12">
                        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">About & Engineering Context</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-xl border border-border/40 bg-[#0d0d11]/20">

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Professional Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Briefcase className="w-4 h-4 text-accent shrink-0" />
                                        <span className="text-muted-foreground w-24">Occupation:</span>
                                        <span className="text-white font-medium">{profile.occupation || "Independent Software Engineer"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Building className="w-4 h-4 text-accent shrink-0" />
                                        <span className="text-muted-foreground w-24">Company:</span>
                                        <span className="text-white font-medium">{profile.company || "Open Source Contributor"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Identity Contact Nodes</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Globe className="w-4 h-4 text-accent shrink-0" />
                                        <span className="text-muted-foreground w-24">Portfolio URL:</span>
                                        {profile.website ? (
                                            <a href={profile.website} target="_blank" rel="noreferrer" className="text-accent hover:underline font-medium truncate">{profile.website}</a>
                                        ) : (
                                            <span className="text-white font-medium">None linked</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                </div>
            </main>
        </>
    );
}

// Global lightweight timing function parsing runtime dates
function formatTimeAgo(dateInput: Date | string): string {
    const date = new Date(dateInput);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return "just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
}