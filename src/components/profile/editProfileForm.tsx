"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateProfileDetailsAction } from "@/src/app/actions/dashboard/profile";
import { Button } from "@/src/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle, Save } from "lucide-react";

export function EditProfileForm({ initialData }: { initialData: any }) {
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
        language: initialData?.settings?.language || "en",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsPending(true);

        const result = await updateProfileDetailsAction(state);

        if (result.success) {
            // Instantly synchronize live client navigation bars context parameters
            await updateSession({ name: state.displayName, username: state.username });

            // Clear route state cache and push directly back to the workspace display view
            router.push("/dashboard/profile");
            router.refresh();
        } else {
            setErrorMessage(
                result.error === "USERNAME_TAKEN"
                    ? "This username identifier is already claimed by another engineer."
                    : "An unexpected transaction drop occurred. Please try again."
            );
            setIsPending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl pb-16">
            {errorMessage && (
                <div className="p-4 rounded-lg flex items-start gap-3 border border-destructive/20 bg-destructive/10 text-destructive text-sm animate-in fade-in duration-200">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Identity Configuration */}
            <div className="p-6 rounded-lg border border-border/50 bg-card space-y-4">
                <h3 className="text-lg font-bold text-white tracking-tight">Identity Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Display Name</label>
                        <input type="text" required value={state.displayName} onChange={(e) => setState({ ...state, displayName: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-white focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Username Handle</label>
                        <input type="text" required value={state.username} onChange={(e) => setState({ ...state, username: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-white focus:outline-none focus:border-accent" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">About Biography</label>
                    <textarea rows={3} value={state.bio} onChange={(e) => setState({ ...state, bio: e.target.value })} placeholder="Tell us about your developer context..." className="w-full p-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-white focus:outline-none focus:border-accent resize-none" />
                </div>
            </div>

            {/* Professional Details */}
            <div className="p-6 rounded-lg border border-border/50 bg-card space-y-4">
                <h3 className="text-lg font-bold text-white tracking-tight">Professional Position Context</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Occupation</label>
                        <input type="text" placeholder="Systems Engineer" value={state.occupation} onChange={(e) => setState({ ...state, occupation: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-white focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Company</label>
                        <input type="text" placeholder="Enterprise Labs" value={state.company} onChange={(e) => setState({ ...state, company: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-white focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Location</label>
                        <input type="text" placeholder="Toronto, ON" value={state.location} onChange={(e) => setState({ ...state, location: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-white focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Website</label>
                        <input type="url" placeholder="https://gs-tech-info.com" value={state.website} onChange={(e) => setState({ ...state, website: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-white focus:outline-none focus:border-accent" />
                    </div>
                </div>
            </div>

            {/* Social Hyperlinks */}
            <div className="p-6 rounded-lg border border-border/50 bg-card space-y-4">
                <h3 className="text-lg font-bold text-white tracking-tight">Social Networks Connectors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">GitHub Handle</label>
                        <input type="text" placeholder="GitHub user name" value={state.github} onChange={(e) => setState({ ...state, github: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-white focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">LinkedIn Handle</label>
                        <input type="text" placeholder="LinkedIn handle" value={state.linkedin} onChange={(e) => setState({ ...state, linkedin: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-white focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Twitter / X Handle</label>
                        <input type="text" placeholder="Twitter handle" value={state.twitter} onChange={(e) => setState({ ...state, twitter: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-white focus:outline-none focus:border-accent" />
                    </div>
                </div>
            </div>

            {/* Preference Controls Matrix */}
            <div className="p-6 rounded-lg border border-border/50 bg-card space-y-4">
                <h3 className="text-lg font-bold text-white tracking-tight">Preferences & Security</h3>
                <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input type="checkbox" checked={state.isPublic} onChange={(e) => setState({ ...state, isPublic: e.target.checked })} className="w-4 h-4 rounded border-border bg-[#0d0d11]/40 text-accent focus:ring-0" />
                        <div>
                            <span className="text-sm font-medium text-white block">Expose Public Portfolio Index</span>
                            <span className="text-xs text-muted-foreground">Allow public visitors to see reading logs, badges, and professional summaries.</span>
                        </div>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Application Theme</label>
                            <select value={state.theme} onChange={(e) => setState({ ...state, theme: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-white focus:outline-none focus:border-accent">
                                <option value="DARK">Deep Carbon Dark</option>
                                <option value="LIGHT">Classic Clean Light</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">System Interface Language</label>
                            <select value={state.language} onChange={(e) => setState({ ...state, language: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border/50 bg-[#0d0d11]/40 text-sm text-white focus:outline-none focus:border-accent">
                                <option value="en">English (US)</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button type="submit" disabled={isPending} className="gap-2 bg-primary text-primary-foreground hover:opacity-90">
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Profile Configurations
                </Button>
            </div>
        </form>
    );
}