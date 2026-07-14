"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/pages/api/auth/[...nextauth]";
import prisma from "@/src/lib/prisma";
import { storageClient, BUCKET_NAME } from "@/src/lib/storage";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

// Custom type definitions mirroring your workflow rules
export type ValidationResult = {
    isValid: boolean;
    errors: string[];
};

// 1. PHASE 1: Initialize Database metadata Row & Seed empty document in Supabase
export async function createDraftAction(contentType: "ARTICLE" | "GUIDE" | "RESOURCE" | "TUTORIAL") {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) throw new Error("UNAUTHORIZED");

    const userId = session.user.id;

    // A. Create the row context in Neon first to fetch our unique database ID
    const newDraft = await prisma.contentNode.create({
        data: {
            slug: `temp-draft-${Math.random().toString(36).substring(7)}`,
            type: contentType,
            status: "DRAFT",
            authorId: userId,
            mdxPath: "PENDING_INITIALIZATION", 
        },
    });

    // B. Build our absolute path tracking key using the generated database ID
    const alignedStorageKey = `drafts/${userId}/${newDraft.id}.mdx`;

    // C. Update Neon so the database points to the future file location path
    const finalDraft = await prisma.contentNode.update({
        where: { id: newDraft.id },
        data: { mdxPath: alignedStorageKey },
    });

    // 💡 FIXED: Supabase upload command removed completely from here.
    // We return an empty initial body string directly to your editor state loop instead.
    return {
        success: true,
        draftId: finalDraft.id,
        mdxPath: finalDraft.mdxPath,
        initialBody: "" 
    };
}

// 2. PHASE 2 & 3: Autosave handles creation automatically on the very first typing sequence
export async function autosaveDraftMetadataAction(
    draftId: string,
    data: { title: string; description: string; category: string; contentBody: string }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) return { success: false, error: "UNAUTHORIZED" };

        const userId = session.user.id;
        const cleanSlug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

        const wordCount = data.contentBody.trim().split(/\s+/).filter(Boolean).length;
        const readingTime = Math.max(1, Math.ceil(wordCount / 225));

        const targetStorageKey = `drafts/${userId}/${draftId}.mdx`;

        // 🏆 S3 PutObject handles file creation and overwrites identically.
        // The first time this fires, it creates the file automatically!
        await storageClient.send(
            new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: targetStorageKey,
                Body: data.contentBody,
                ContentType: "text/markdown",
            })
        );

        await prisma.contentNode.update({
            where: { id: draftId, authorId: userId },
            data: {
                slug: cleanSlug || `draft-${draftId}`,
                wordCount,
                readingTime,
            },
        });

        return { success: true, wordCount, readingTime };
    } catch (error) {
        console.error("Supabase Storage Pipeline Save Failure:", error);
        return { success: false, error: "AUTOSAVE_FAILED" };
    }
}

// 3. READ EXTRACTOR: Pulls raw text out of Supabase back into the editor if the page refreshes
export async function getDraftBodyAction(draftId: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) throw new Error("UNAUTHORIZED");

        const targetStorageKey = `drafts/${session.user.id}/${draftId}.mdx`;

        const response = await storageClient.send(
            new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: targetStorageKey,
            })
        );

        // Convert the incoming S3 stream object back into an editable string cleanly
        const contentBody = await response.Body?.transformToString();
        return { success: true, body: contentBody || "" };
    } catch (error) {
        console.error("Failed to pull draft from Supabase Storage:", error);
        return { success: false, body: "" };
    }
}

// 4. Review State: Execute structural quality checks and submit
export async function submitForReviewAction(draftId: string, currentContentBody: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) return { success: false, errors: ["UNAUTHORIZED"] };

        const node = await prisma.contentNode.findUnique({
            where: { id: draftId, authorId: session.user.id }
        });

        if (!node) return { success: false, errors: ["DRAFT_NOT_FOUND"] };

        // Run Automated Phase 5 Quality Validation Pipeline
        const errors: string[] = [];
        const wordCount = currentContentBody.trim().split(/\s+/).filter(Boolean).length;

        if (!node.slug || node.slug.includes("untitled")) errors.push("Article must have a valid title.");
        if (wordCount < 100) errors.push(`Content too short (${wordCount} words). Minimum required is 100 words.`);
        if (!currentContentBody.includes("# ")) errors.push("Content structure requires at least one primary Markdown heading (# Header).");

        if (errors.length > 0) {
            return { success: false, errors };
        }

        // Handshake cleared: Transition state to review queue
        await prisma.contentNode.update({
            where: { id: draftId },
            data: { status: "PENDING_REVIEW" }
        });

        revalidatePath("/dashboard");
        return { success: true, errors: [] };

    } catch (error) {
        return { success: false, errors: ["CRITICAL_SUBMISSION_FAULT"] };
    }
}