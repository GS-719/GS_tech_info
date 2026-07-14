import { redirect } from "next/navigation";
import { fetchReviewDataAction } from "@/src/app/actions/publish/review";
import { ReviewClientForm } from "@/src/components/dashboard/reviewClientForm";
import { Button } from "@/src/components/ui/button";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, Calendar, User, FileText, BarChart2, Clock } from "lucide-react";

interface ReviewPageProps {
    params: Promise<{ id: string }>;
}

export default async function DocumentReviewPage({ params }: ReviewPageProps) {
    const resolvedParams = await params;
    const result = await fetchReviewDataAction(resolvedParams.id);

    if (!result.success || !result.node) {
        redirect("/dashboard?error=unauthorized_or_missing");
    }

    const { node, body } = result;

    return (
        <main className="flex-1 bg-[#050506] text-white min-h-screen pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

                {/* Navigation Breadcrumbs Row */}
                <div className="mb-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-white border-none bg-transparent hover:bg-white/5">
                            <ArrowLeft className="w-4 h-4" /> Cancel and Return to Queue
                        </Button>
                    </Link>
                </div>

                {/* Section Split Layout Grid Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: Live Rendered Compiled Content View Canvas Layer */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm prose prose-invert max-w-none min-h-[600px]">
                            <div className="flex items-center gap-2 mb-3 font-mono">
                                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                                    {node.type}
                                </span>
                                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                                    ⚠️ Awaiting Moderator Review
                                </span>
                            </div>

                            <h1 className="text-3xl font-black text-white mb-2 capitalize">
                                {node.slug ? node.slug.replace(/-/g, " ") : "Untitled Content Asset"}
                            </h1>

                            <p className="text-sm italic text-muted-foreground leading-relaxed mb-6">
                                {node.description || "No dynamic catalog summary sheet detailed for this layout."}
                            </p>

                            <hr className="border-border/30 mb-6" />

                            {/* Live Rendered Markdown Canvas Block */}
                            <div className="text-sm text-foreground leading-relaxed">
                                {body ? (
                                    <ReactMarkdown>{body}</ReactMarkdown>
                                ) : (
                                    <p className="text-muted-foreground italic">Document submission has an empty string text layout body.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Metadata Summary Indicators and Action Buttons Sidebar */}
                    <div className="space-y-4">

                        {/* Document Details Block */}
                        <div className="p-5 rounded-lg border border-border/50 bg-card space-y-4 font-sans text-sm">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground font-mono flex items-center gap-1.5">
                                <BarChart2 className="w-4 h-4 text-accent" /> Submission Statistics
                            </h3>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-2.5 text-muted-foreground">
                                    <User className="w-4 h-4 text-accent" />
                                    <span>Author:</span>
                                    <span className="text-white font-medium ml-auto">
                                        @{node.author?.profile?.username || node.author?.name || "anonymous"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2.5 text-muted-foreground">
                                    <FileText className="w-4 h-4 text-accent" />
                                    <span>Length:</span>
                                    <span className="text-white font-mono font-bold ml-auto">{node.wordCount || 0} words</span>
                                </div>

                                <div className="flex items-center gap-2.5 text-muted-foreground">
                                    <Clock className="w-4 h-4 text-accent" />
                                    <span>Est. Duration:</span>
                                    <span className="text-accent font-mono font-bold ml-auto">{node.readingTime || 1} min read</span>
                                </div>

                                <div className="flex items-center gap-2.5 text-muted-foreground">
                                    <Calendar className="w-4 h-4 text-accent" />
                                    <span>Submitted:</span>
                                    <span className="text-white font-medium ml-auto">
                                        {new Date(node.updatedAt).toLocaleDateString(undefined, { dateStyle: "medium" })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* The Interactive Form Buttons */}
                        <ReviewClientForm draftId={node.id} />

                    </div>
                </div>

            </div>
        </main>
    );
}