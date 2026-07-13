"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { autosaveDraftMetadataAction, submitForReviewAction, createDraftAction } from "@/src/app/actions/publish/article";
import { Button } from "@/src/components/ui/button";
import ReactMarkdown from "react-markdown"
import { ArrowLeft, Save, FileText, CheckCircle, Loader2, AlertTriangle, Eye, Edit3 } from "lucide-react";
import Link from "next/link";

export default function DocumentPublisherPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const contentType = (searchParams?.get("type") || "ARTICLE").toUpperCase();

    const [draftId, setDraftId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("TypeScript");
    const [body, setBody] = useState("");

    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"synced" | "saving" | "error">("synced");
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [metrics, setMetrics] = useState({ words: 0, readingTime: 1 });
    const isInitialMount = useRef(true);

    // Phase 1 initialization: Check into Neon database automatically on mount
    useEffect(() => {
        async function initializeDraftNode() {
            try {
                const result = await createDraftAction(contentType as any);
                if (result.success) {
                    setDraftId(result.draftId);
                }
            } catch (err) {
                setSaveStatus("error");
            }
        }
        initializeDraftNode();
    }, [contentType]);

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
                category,
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
            router.push("/dashboard?message=submitted_for_review");
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
                                    <FileText className="w-5 h-5 text-accent" /> Editor Studio
                                </h1>
                                <p className="text-xs text-muted-foreground">Composing production {contentType.toLowerCase()} assets.</p>
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
                                {isPreviewMode ? <><Edit3 className="w-4 h-4" /> Code Canvas</> : <><Eye className="w-4 h-4" /> View Preview</>}
                            </Button>

                            <Button size="sm" onClick={handleReviewSubmission} disabled={isSubmitting || !draftId} className="bg-primary text-primary-foreground hover:opacity-90">
                                {isSubmitting ? "Processing Verification..." : "Submit for Review"}
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
                                    <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono block mb-2">{category}</span>
                                    <h1 className="text-3xl font-black mb-4 capitalize">{title || "Untitled Document Workspace"}</h1>
                                    <p className="text-sm italic text-muted-foreground mb-6">{description || "No description configuration summarized."}</p>
                                    <hr className="border-border/30 mb-6" />
                                    <div className="text-sm text-foreground leading-relaxed">
                                        {body ? (
                                            <ReactMarkdown>{body}</ReactMarkdown>
                                        ) : (
                                            <p className="text-muted-foreground italic">
                                                Start drafting content inside the workspace canvas parameters to run a dynamic compilation...
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Document Master Title..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full h-12 px-4 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-lg font-bold text-white placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent"
                                    />
                                    <textarea
                                        rows={18}
                                        placeholder="Compose raw documentation text components (Markdown supported natively)..."
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
                                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground font-mono">Metadata Settings</h3>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">Catalog Category</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-9 px-3 rounded-md border border-border/50 bg-[#050506] text-xs text-white focus:outline-none focus:border-accent">
                                        <option value="TypeScript">TypeScript Engineering</option>
                                        <option value="Architecture">Backend Systems Architecture</option>
                                        <option value="Database">Database Query Optimization</option>
                                        <option value="Security">Application Security Hardening</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">Brief Abstract Summary</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Summarize content footprint parameters for search indexing feeds..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-2.5 rounded-md border border-border/50 bg-[#050506] text-xs text-white focus:outline-none focus:border-accent resize-none"
                                    />
                                </div>
                            </div>

                            {/* Dynamic Metric tracking tiles */}
                            <div className="p-5 rounded-lg border border-border/50 bg-card grid grid-cols-2 gap-4 font-mono">
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Word Metrics</p>
                                    <p className="text-2xl font-black text-white">{metrics.words}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Read Sequence</p>
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