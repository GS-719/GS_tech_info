"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/pages/api/auth/[...nextauth]";
import prisma from "@/src/lib/prisma";
import { storageClient, BUCKET_NAME } from "@/src/lib/storage";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

// Helper tool to verify administrative clearance
async function verifyReviewerAccess() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return null;

    const userRole = session.user.role;
    if (userRole !== "ADMIN" && userRole !== "MODERATOR") return null;

    return session;
}

// 1. Fetch draft metadata from Neon and raw text from Supabase
export async function fetchReviewDataAction(draftId: string) {
    try {
        const session = await verifyReviewerAccess();
        if (!session) return { success: false, error: "UNAUTHORIZED" };

        const node = await prisma.contentNode.findUnique({
            where: { id: draftId },
            include: {
                author: {
                    select: {
                        name: true,
                        profile: { select: { username: true } }
                    }
                }
            }
        });

        if (!node || node.status !== "PENDING_REVIEW") {
            return { success: false, error: "DRAFT_NOT_FOUND" };
        }

        // Pull the active text body out of Supabase Storage bucket stream
        const targetStorageKey = `drafts/${node.authorId}/${node.id}.mdx`;
        const response = await storageClient.send(
            new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: targetStorageKey,
            })
        );

        const contentBody = await response.Body?.transformToString();

        return {
            success: true,
            node: JSON.parse(JSON.stringify(node)),
            body: contentBody || ""
        };
    } catch (error) {
        console.error("Error fetching review data pipeline:", error);
        return { success: false, error: "INTERNAL_SERVER_ERROR" };
    }
}

// 2. Process Approval, Rejection, or Revision requests
export async function executeReviewDecisionAction(
    draftId: string,
    decision: "APPROVE" | "CHANGES_REQUESTED" | "REJECTED"
) {
    try {
        const session = await verifyReviewerAccess();
        if (!session) return { success: false, error: "UNAUTHORIZED" };

        let targetStatus: "PUBLISHED" | "CHANGES_REQUESTED" | "REJECTED";
        let publishedAtUpdate = undefined;

        if (decision === "APPROVE") {
            targetStatus = "PUBLISHED";
            publishedAtUpdate = new Date();

            // Note: Phase 8 & 9 (Commit code block asset out directly into GitHub main production repository)
            // would execute here via your Octokit wrapper script:
            // await pushToGitHubRepo(node.slug, rawMdxBody);
        } else if (decision === "CHANGES_REQUESTED") {
            targetStatus = "CHANGES_REQUESTED";
        } else {
            targetStatus = "REJECTED";
        }

        await prisma.contentNode.update({
            where: { id: draftId },
            data: {
                status: targetStatus,
                publishedAt: publishedAtUpdate,
            }
        });

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to execute editorial decision:", error);
        return { success: false, error: "TRANSACTION_FAILED" };
    }
}