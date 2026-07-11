"use client";

import React, { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Captures automated messages (e.g., redirect parameters after registration)
    const incomingMessage = searchParams?.get("message");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(
        incomingMessage === "account_created"
            ? "Account initialized successfully. Please sign in."
            : null
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Executes NextAuth credentials validation routing
            const result = await signIn("credentials", {
                redirect: false, // Prevents full page hard-reload crashes
                email: formData.email.toLowerCase().trim(),
                password: formData.password,
            });

            if (result?.error) {
                // Obfuscate explicit failures to protect username tracking enumeration vectors
                throw new Error("Invalid email or password configuration.");
            }

            // Handshake cleared: forward user directly to their protected panel
            router.push("/dashboard");
            router.refresh();

        } catch (err: any) {
            setError(err.message || "Authentication transmission failure.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 rounded-xl border border-white/[0.06] bg-[#0d0d11]/60 backdrop-blur-md shadow-lg">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Welcome Back</h2>
                <p className="text-sm text-muted-foreground">Sign in to sync your documentation reading milestones.</p>
            </div>

            {/* Dynamic Network / Success Alert Banner */}
            {error && (
                <div className={`p-3 mb-6 rounded-lg text-xs font-medium border animate-in fade-in duration-200 ${incomingMessage === "account_created"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-destructive/10 border-destructive/20 text-destructive"
                    }`}>
                    {error}
                </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Email Address</label>
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
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
                        <Link href="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                            Forgot?
                        </Link>
                    </div>
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
                            <Loader2 className="w-4 h-4 animate-spin" /> Verifying Credentials...
                        </>
                    ) : (
                        <>
                            Sign In Identity <LogIn className="w-4 h-4" />
                        </>
                    )}
                </Button>
            </form>

            <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.06]"></div></div>
                <span className="relative px-3 text-xs uppercase tracking-widest text-muted-foreground bg-[#0d0d11]">Or continue with</span>
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
                New to the platform?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                    Create an Account
                </Link>
            </p>
        </div>
    );
}