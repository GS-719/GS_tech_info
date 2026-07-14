"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { executeReviewDecisionAction } from "@/src/app/actions/publish/review";
import { Button } from "@/src/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react";

export function ReviewClientForm({ draftId }: { draftId: string }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDecision = async (decision: "APPROVE" | "CHANGES_REQUESTED" | "REJECTED") => {
        setIsPending(true);
        setError(null);

        const result = await executeReviewDecisionAction(draftId, decision);

        if (result.success) {
            router.push("/dashboard?message=review_complete");
            router.refresh();
        } else {
            setError("Failed to push choice parameters down to database layers.");
            setIsPending(false);
        }
    };

    return (
        <div className="p-5 rounded-lg border border-border/50 bg-card space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground font-mono">
                Editorial Decision Matrix
            </h3>

            {error && (
                <p className="text-xs text-destructive bg-destructive/10 p-2.5 rounded border border-destructive/20 font-mono">
                    ⚠️ {error}
                </p>
            )}

            <div className="flex flex-col gap-2.5">
                <Button
                    disabled={isPending}
                    onClick={() => handleDecision("APPROVE")}
                    className="w-full gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    Approve & Publish Live
                </Button>

                <Button
                    disabled={isPending}
                    onClick={() => handleDecision("CHANGES_REQUESTED")}
                    className="w-full gap-2 bg-amber-600 hover:bg-amber-500 text-white font-medium"
                    variant="outline"
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <AlertTriangle className="w-4 h-4" />}
                    Request Revision Changes
                </Button>

                <Button
                    disabled={isPending}
                    onClick={() => handleDecision("REJECTED")}
                    className="w-full gap-2 bg-destructive hover:opacity-90 text-white font-medium"
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                    Reject Submission
                </Button>
            </div>
        </div>
    );
}