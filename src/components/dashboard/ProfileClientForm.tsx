"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateProfileDataAction } from "@/src/app/actions/dashboard/profile";
import { Button } from "@/src/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle, Award } from "lucide-react";

export function ProfileClientForm({ initialData }: { initialData: any }) {
    const router = useRouter();
    const { update: updateSession } = useSession();

    const [state, setState] = useState({
        displayName: initialData?.profile?.displayName || initialData?.name || "",
        username: initialData?.profile?.username || "",
        bio: initialData?.profile?.bio || "",
        website: initialData?.profile?.website || "",
        occupation: initialData?.profile?.occupation || "",
        company: initialData?.profile?.company || "",
        location: initialData?.profile?.location || "",
        github: initialData?.profile?.github || "",
        twitter: initialData?.profile?.twitter || "",
        linkedin: initialData?.profile?.linkedin || "",
        isPublic: initialData?.profile?.isPublic ?? true,
        theme: initialData?.settings?.theme || "DARK",
        language: initialData?.settings?.language || "en", // 👈 Initialized setting state
    });

    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [isPending, setIsPending] = useState(false);

    const badges = initialData?.earnedBadges || [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);
        setIsPending(true);

        const result = await updateProfileDataAction(state);

        if (result.success) {
            setStatus({ type: "success", message: "Developer configurations synchronized successfully!" });
            await updateSession({ name: state.displayName, username: state.username });
            router.refresh();
        } else {
            setStatus({
                type: "error",
                message: result.error === "USERNAME_TAKEN" ? "Username handle is already taken." : "Failed to update configurations.",
            });
        }
        setIsPending(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl pb-16">
            {status && (
                <div className={`p-4 rounded-lg flex items-start gap-3 border text-sm animate-in fade-in duration-200 ${status.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-destructive/10 border-destructive/20 text-destructive"
                    }`}>
                    {status.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                    <span>{status.message}</span>
                </div>
            )}

            {/* 🏅 Unlocked Platform Achievements Show Wall */}
            <div className="p-6 rounded-lg border border-border/50 bg-card">
                <h3 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" /> Unlocked Developer Badges
                </h3>
                <p className="text-xs text-muted-foreground border-b border-border/40 pb-3 mb-4">Gamified honors earned via quiz completions and technical milestones.</p>

                {badges.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">Complete challenge quizzes to unlock special portfolio badges.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {badges.map((b: any) => (
                            <div key={b.id} className="p-3 rounded-lg border border-border/40 bg-[#0d0d11]/40 flex flex-col items-center text-center justify-center gap-1">
                                <Award className="w-8 h-8 text-accent drop-shadow-[0_0_8px_rgba(var(--accent),0.2)]" />
                                <span className="text-xs font-semibold text-foreground mt-1 truncate max-w-full capitalize">
                                    {b.badgeId.replace(/_/g, " ")}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    {new Date(b.earnedAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Identity Context */}
            <div className="space-y-4 p-6 rounded-lg border border-border/50 bg-card">
                <h3 className="text-lg font-bold tracking-tight text-foreground">Identity Context</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Display Name</label>
                        <input type="text" required value={state.displayName} onChange={(e) => setState({ ...state, displayName: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Username Handle</label>
                        <input type="text" required value={state.username} onChange={(e) => setState({ ...state, username: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground focus:outline-none focus:border-accent" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Short Bio</label>
                    <textarea rows={2} value={state.bio} onChange={(e) => setState({ ...state, bio: e.target.value })} className="w-full p-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground focus:outline-none focus:border-accent resize-none" />
                </div>
            </div>

            {/* Professional Details */}
            <div className="space-y-4 p-6 rounded-lg border border-border/50 bg-card">
                <h3 className="text-lg font-bold tracking-tight text-foreground">Professional Profile Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Occupation</label>
                        <input type="text" placeholder="Full Stack Engineer" value={state.occupation} onChange={(e) => setState({ ...state, occupation: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Company</label>
                        <input type="text" placeholder="Acme Corp" value={state.company} onChange={(e) => setState({ ...state, company: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Location</label>
                        <input type="text" placeholder="San Francisco, CA" value={state.location} onChange={(e) => setState({ ...state, location: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Personal Website</label>
                        <input type="url" placeholder="https://example.com" value={state.website} onChange={(e) => setState({ ...state, website: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground focus:outline-none focus:border-accent" />
                    </div>
                </div>
            </div>

            {/* Social Synchronization Handles */}
            <div className="space-y-4 p-6 rounded-lg border border-border/50 bg-card">
                <h3 className="text-lg font-bold tracking-tight text-foreground">Social Synchronization Handles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">GitHub Handle</label>
                        <input type="text" placeholder="username" value={state.github} onChange={(e) => setState({ ...state, github: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Twitter / X Handle</label>
                        <input type="text" placeholder="username" value={state.twitter} onChange={(e) => setState({ ...state, twitter: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">LinkedIn Handle</label>
                        <input type="text" placeholder="in/username" value={state.linkedin} onChange={(e) => setState({ ...state, linkedin: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground focus:outline-none focus:border-accent" />
                    </div>
                </div>
            </div>

            {/* Visibility, Theme & Language Settings */}
            <div className="space-y-4 p-6 rounded-lg border border-border/50 bg-card">
                <h3 className="text-lg font-bold tracking-tight text-foreground">Visibility & Preferences</h3>
                <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input type="checkbox" checked={state.isPublic} onChange={(e) => setState({ ...state, isPublic: e.target.checked })} className="w-4 h-4 rounded border-border text-accent bg-[#0d0d11]/40" />
                        <div>
                            <span className="text-sm font-medium text-foreground block">Public Profile Directory Visibility</span>
                            <span className="text-xs text-muted-foreground">Allow other engineers on the platform to search and look up your technical profile map.</span>
                        </div>
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Platform Theme Layout</label>
                            <select value={state.theme} onChange={(e) => setState({ ...state, theme: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground focus:outline-none focus:border-accent">
                                <option value="DARK">Deep Carbon Dark</option>
                                <option value="LIGHT">Classic Clean Light</option>
                            </select>
                        </div>

                        {/* Language Selector Dropdown Element Node */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Interface Language</label>
                            <select value={state.language} onChange={(e) => setState({ ...state, language: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-foreground focus:outline-none focus:border-accent">
                                <option value="en">English (US)</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <Button type="submit" disabled={isPending} className="w-full sm:w-auto px-6 h-10 gap-2 bg-primary text-primary-foreground hover:opacity-90">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Save Portfolio Profile Matrix
            </Button>
        </form>
    );
}