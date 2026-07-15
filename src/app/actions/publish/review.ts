"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/pages/api/auth/[...nextauth]";
import prisma from "@/src/lib/prisma";
import { storageClient, BUCKET_NAME } from "@/src/lib/storage";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { ContentStatus } from "@/src/generated/prisma/enums";

// Automated GitHub Writer Engine Helper
async function commitToGitHub(path: string, content: string, commitMessage: string) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    throw new Error("Missing vital GITHUB repository environment configurations.");
  }

  // Convert raw text into a standard base64 chunk string for GitHub's API
  const base64Content = Buffer.from(content).toString("base64");
  const targetUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  // Fire a PUT request straight to GitHub's global source-control infrastructure
  const response = await fetch(targetUrl, {
    method: "PUT",
    headers: {
      "Authorization": `token ${token}`,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: commitMessage,
      content: base64Content,
      branch: "main", // Adjust this if your default tracking branch is named 'master'
    }),
  });

  if (!response.ok) {
    const errorLog = await response.text();
    console.error("GitHub API Write Error Response Log:", errorLog);
    throw new Error(`GitHub API push dropped with system code state status: ${response.status}`);
  }

  return true;
}

async function verifyReviewerAccess() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;
  const userRole = session.user.role;
  if (userRole !== "ADMIN" && userRole !== "MODERATOR") return null;
  return session;
}

export async function fetchReviewDataAction(draftId: string) {
  try {
    const session = await verifyReviewerAccess();
    if (!session) return { success: false, error: "UNAUTHORIZED" };

    const node = await prisma.contentNode.findUnique({
      where: { id: draftId },
      include: {
        author: { select: { name: true, profile: { select: { username: true } } } }
      }
    });

    if (!node || node.status !== "PENDING_REVIEW") {
      return { success: false, error: "DRAFT_NOT_FOUND" };
    }

    const targetStorageKey = `drafts/${node.authorId}/${node.id}.mdx`;
    const response = await storageClient.send(
      new GetObjectCommand({ Bucket: BUCKET_NAME, Key: targetStorageKey })
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

export async function executeReviewDecisionAction(
  draftId: string,
  decision: "APPROVE" | "CHANGES_REQUESTED" | "REJECTED"
) {
  try {
    const session = await verifyReviewerAccess();
    if (!session) return { success: false, error: "UNAUTHORIZED" };

    const node = await prisma.contentNode.findUnique({ where: { id: draftId } });
    if (!node) return { success: false, error: "DRAFT_NOT_FOUND" };

    const updatePayload: any = {};

    if (decision === "APPROVE") {
      // Pull the raw data string from Supabase one final time to commit it to your repository
      const targetStorageKey = `drafts/${node.authorId}/${node.id}.mdx`;
      const s3Response = await storageClient.send(
        new GetObjectCommand({ Bucket: BUCKET_NAME, Key: targetStorageKey })
      );
      const rawMarkdownBody = (await s3Response.Body?.transformToString()) || "";

      // 🏆 Build a clean, standard frontmatter block to insert back on top of the file
      const finalMdxStructure = `---
title: "${node.slug.replace(/-/g, " ")}"
description: "${node.description || ""}"
category: "${node.categoryId || "General"}"
date: "${new Date().toLocaleDateString()}"
---

${rawMarkdownBody}`;

      // 📁 Map out the file pathway string inside your repository tree structure
      const gitHubRepositoryPath = `src/content/${node.type.toLowerCase()}s/${node.slug}.mdx`;
      const commitMessage = `docs: publish ${node.type.toLowerCase()} "${node.slug}" via dashboard portal`;

      // 🔥 Trigger the automated live push to your active GitHub branch repository!
      await commitToGitHub(gitHubRepositoryPath, finalMdxStructure, commitMessage);
      
      // 🏆 FIXED: Target endpoint matches your new route pathway precisely
      try {
        const deploymentBaseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

        // Call your App Router endpoint silently using matching secret environment keys
        await fetch(
          `${deploymentBaseUrl}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}&slug=${node.slug}&type=${node.type.toLowerCase()}`,
          { method: "POST" }
        );
      } catch (cacheErr) {
        console.error("Cache purge call dropped, fallback safety timer will handle sync:", cacheErr);
      }

      // Once successfully committed to Git, flag your structural tables as live
      updatePayload.status = "PUBLISHED" as ContentStatus;
      updatePayload.publishedAt = new Date();
      updatePayload.mdxPath = gitHubRepositoryPath; // Update the record from 'drafts/' to your final git repository path

    } else if (decision === "CHANGES_REQUESTED") {
      updatePayload.status = "CHANGES_REQUESTED" as ContentStatus;
    } else if (decision === "REJECTED") {
      updatePayload.status = "REJECTED" as ContentStatus;
    }

    await prisma.contentNode.update({
      where: { id: draftId },
      data: updatePayload,
    });

    // Clear stale router cache points and revalidate pathways instantly
    revalidatePath("/dashboard");
    revalidatePath(`/${node.type.toLowerCase()}s`);

    return { success: true };
  } catch (error) {
    console.error("Critical error executing review transaction updates:", error);
    return { success: false, error: "TRANSACTION_FAILED" };
  }
}