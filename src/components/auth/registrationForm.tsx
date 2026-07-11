"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { registerUserAction } from "@/src/app/actions/auth";

export function RegisterForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        displayName: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // 1. Call the Server Action just like a normal JavaScript function
            const result = await registerUserAction(formData);

            if (!result.success) {
                throw new Error(result.error || "An unexpected error occurred.");
            }

            // 2. Auto-Login using NextAuth via credentials provider
            const autoLoginResult = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (autoLoginResult?.error) {
                router.push("/login?message=account_created");
                return;
            }

            // 3. Forward straight to workspace dashboard
            router.push("/dashboard");
            router.refresh();

        } catch (err: any) {
            setError(err.message || "Network operation processing timeout.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 rounded-xl border border-white/[0.06] bg-[#0d0d11]/60 backdrop-blur-md shadow-lg">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Create your developer account</h2>
                <p className="text-sm text-muted-foreground">Start tracking progress and managing technical tutorials.</p>
            </div>

            {error && (
                <div className="p-3 mb-6 rounded-lg bg-destructive/10 border border-destructive/20 text-xs font-medium text-destructive animate-in fade-in duration-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Username Handle *</label>
                    <input
                        type="text"
                        name="username"
                        required
                        disabled={isLoading}
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 rounded-lg border border-white/10 bg-[#050506] text-sm text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Display Name</label>
                    <input
                        type="text"
                        name="displayName"
                        disabled={isLoading}
                        placeholder="John Doe (Optional)"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 rounded-lg border border-white/10 bg-[#050506] text-sm text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Email Address *</label>
                    <input
                        type="email"
                        name="email"
                        required
                        disabled={isLoading}
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 rounded-lg border border-white/10 bg-[#050506] text-sm text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Password *</label>
                    <input
                        type="password"
                        name="password"
                        required
                        disabled={isLoading}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 rounded-lg border border-white/10 bg-[#050506] text-sm text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
                    />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full h-10 gap-2 font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity border-none mt-2">
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Initializing Account...
                        </>
                    ) : (
                        <>
                            Register Platform Identity <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </Button>
            </form>

            <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.06]"></div></div>
                <span className="relative px-3 text-xs uppercase tracking-widest text-muted-foreground bg-[#0d0d11]">Or register via</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn("github", { callbackUrl: "/dashboard" })} className="h-10 border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs gap-2">
                    GitHub
                </Button>
                <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="h-10 border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs gap-2">
                    Google
                </Button>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
                Already have a profile identity?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                    Sign In
                </Link>
            </p>
        </div>
    );
}