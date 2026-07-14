"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { autosaveDraftMetadataAction, submitForReviewAction, createDraftAction } from "@/src/app/actions/publish/article";
import { Button } from "@/src/components/ui/button";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, FileText, CheckCircle, Loader2, AlertTriangle, Eye, Edit3, Terminal, Code2 } from "lucide-react";
import Link from "next/link";

export default function TutorialPublisherPage() {
    const router = useRouter();

    const [draftId, setDraftId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Next.js");
    const [environment, setEnvironment] = useState("Node.js v20");
    const [body, setBody] = useState("");

    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"synced" | "saving" | "error">("synced");
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [metrics, setMetrics] = useState({ words: 0, readingTime: 1 });
    const isInitialMount = useRef(true);

    // Phase 1 initialization: Check into Neon database automatically on mount using 'TUTORIAL'
    useEffect(() => {
        async function initializeDraftNode() {
            try {
                const result = await createDraftAction("TUTORIAL");
                if (result.success) {
                    setDraftId(result.draftId);
                }
            } catch (err) {
                setSaveStatus("error");
            }
        }
        initializeDraftNode();
    }, []);

    // Phase 2 & 3: Quietly execute autosave parameters when typing pauses
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        if (!draftId) return;

        setSaveStatus("saving");
        const saveTimer = setTimeout(async () => {
            const result = await autosaveDraftMetadataAction(draftId, {
                title,
                description,
                category, // Stores tutorial framework targets
                contentBody: body
            });

            if (result.success) {
                setSaveStatus("synced");
                setMetrics({
                    words: result.wordCount || 0,
                    readingTime: result.readingTime || 1
                });
            } else {
                setSaveStatus("error");
            }
        }, 1500); // 1.5 second debounced idle trigger threshold

        return () => clearTimeout(saveTimer);
    }, [title, description, category, body, draftId]);

    const handleReviewSubmission = async () => {
        if (!draftId) return;
        setValidationErrors([]);
        setIsSubmitting(true);

        const result = await submitForReviewAction(draftId, body);

        if (result.success) {
            router.push("/dashboard?message=tutorial_submitted_for_review");
            router.refresh();
        } else {
            setValidationErrors(result.errors || ["Submission rejected by validation gate."]);
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <main className="flex-1 bg-[#050506] text-white min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

                    {/* Editor Sub-header Navigation */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-6 mb-8 gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm" className="p-2 border border-border/40 bg-card text-muted-foreground hover:text-white">
                                    <ArrowLeft className="w-4 h-4" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                                    <Terminal className="w-5 h-5 text-accent" /> Tutorial Canvas Studio
                                </h1>
                                <p className="text-xs text-muted-foreground">Authoring hands-on code-along implementations and technical workflows.</p>
                            </div>
                        </div>

                        {/* Live Synchronicity Status Bar Indicators */}
                        <div className="flex items-center gap-3">
                            <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-card border border-border/40">
                                {saveStatus === "saving" && <><Loader2 className="w-3 h-3 animate-spin text-accent" /> Cloud Syncing...</>}
                                {saveStatus === "synced" && <><CheckCircle className="w-3 h-3 text-emerald-400" /> Changes Synced</>}
                                {saveStatus === "error" && <><AlertTriangle className="w-3 h-3 text-destructive" /> Local Sync Drop</>}
                            </div>

                            <Button variant="outline" size="sm" onClick={() => setIsPreviewMode(!isPreviewMode)} className="gap-2 border-border/40 text-white bg-card">
                                {isPreviewMode ? <><Edit3 className="w-4 h-4" /> Code Editor</> : <><Eye className="w-4 h-4" /> Live Preview</>}
                            </Button>

                            <Button size="sm" onClick={handleReviewSubmission} disabled={isSubmitting || !draftId} className="bg-primary text-primary-foreground hover:opacity-90">
                                {isSubmitting ? "Running Guard Validation..." : "Submit Tutorial for Review"}
                            </Button>
                        </div>
                    </div>

                    {/* Validation Failure Warning Banners */}
                    {validationErrors.length > 0 && (
                        <div className="mb-6 p-4 rounded-lg border border-destructive/20 bg-destructive/10 text-destructive text-sm space-y-1 animate-in fade-in duration-200">
                            <p className="font-bold flex items-center gap-2 mb-1"><AlertTriangle className="w-4 h-4" /> Phase 5 Quality Guard Rejections:</p>
                            {validationErrors.map((err, i) => <p key={i} className="pl-6 text-xs">• {err}</p>)}
                        </div>
                    )}

                    {/* Main Workspace split panel hub */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Multi-Column writing layout canvas sheets */}
                        <div className="lg:col-span-2 space-y-4">
                            {isPreviewMode ? (
                                <div className="p-8 rounded-lg border border-border/40 bg-card/40 backdrop-blur-sm min-h-[500px] prose prose-invert max-w-none">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-2 py-0.5 rounded">
                                            {category}
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono bg-muted border border-border/40 px-2 py-0.5 rounded">
                                            {environment}
                                        </span>
                                    </div>
                                    <h1 className="text-3xl font-black mb-4 capitalize">{title || "Untitled Practical Tutorial"}</h1>
                                    <p className="text-sm italic text-muted-foreground mb-6">{description || "No syntax abstract configuration specified."}</p>
                                    <hr className="border-border/30 mb-6" />
                                    <div className="text-sm text-foreground leading-relaxed">
                                        {body ? (
                                            <ReactMarkdown>{body}</ReactMarkdown>
                                        ) : (
                                            <p className="text-muted-foreground italic">
                                                Start assembling code snippets and logic execution narratives inside the canvas parameters to run compilation...
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Tutorial Execution Title (e.g., Building a Custom Redis Cache Manager)..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full h-12 px-4 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-lg font-bold text-white placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent"
                                    />
                                    <textarea
                                        rows={18}
                                        placeholder="Write step-by-step technical implementation text (Markdown code blocks are fully supported natively)..."
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        className="w-full p-4 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm font-mono text-white placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent resize-none leading-relaxed"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Right Configuration parameters metadata sidebar sheet */}
                        <div className="space-y-4">
                            <div className="p-5 rounded-lg border border-border/50 bg-card space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground font-mono flex items-center gap-1.5">
                                    <Code2 className="w-4 h-4 text-accent" /> Runtime Context
                                </h3>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">Target Language / Framework</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-9 px-3 rounded-md border border-border/50 bg-[#050506] text-xs text-white focus:outline-none focus:border-accent">
                                        <option value="Next.js">Next.js App Router</option>
                                        <option value="React Native">React Native / Expo</option>
                                        <option value="Rust">Rust Systems Programming</option>
                                        <option value="Python Scripting">Python Automation & Core</option>
                                        <option value="Docker Engine">Docker & Containerization</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">Target Execution Environment</label>
                                    <select value={environment} onChange={(e) => setEnvironment(e.target.value)} className="w-full h-9 px-3 rounded-md border border-border/50 bg-[#050506] text-xs text-white focus:outline-none focus:border-accent">
                                        <option value="Node.js v20">Node.js LTS Environment</option>
                                        <option value="Cargo / Rust Up">Rust Toolchain Runtime</option>
                                        <option value="Python 3.11">Python Virtual Environments</option>
                                        <option value="Linux Bash Shell">POSIX Shell Configurations</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">Short Abstract Summary</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Describe the final working build, tool stack, and code implementation milestones users will complete..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-2.5 rounded-md border border-border/50 bg-[#050506] text-xs text-white focus:outline-none focus:border-accent resize-none"
                                    />
                                </div>
                            </div>

                            {/* Dynamic Metric tracking tiles */}
                            <div className="p-5 rounded-lg border border-border/50 bg-card grid grid-cols-2 gap-4 font-mono">
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Code / Word Metric</p>
                                    <p className="text-2xl font-black text-white">{metrics.words}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Build Timeline</p>
                                    <p className="text-2xl font-black text-accent">~{metrics.readingTime} min</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}