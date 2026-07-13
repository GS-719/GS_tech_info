"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/pages/api/auth/[...nextauth]";
import prisma from "@/src/lib/prisma";
import { Theme } from "@/src/generated/prisma/enums";

export async function fetchFullPortfolioAction(targetUsername?: string) {
    try {
        const session = await getServerSession(authOptions);
        const currentUserId = session?.user?.id;

        let targetUser = null;
        if (targetUsername) {
            targetUser = await prisma.user.findFirst({
                where: { profile: { username: targetUsername.toLowerCase().trim() } },
                include: { profile: true }
            });
        } else if (currentUserId) {
            targetUser = await prisma.user.findUnique({
                where: { id: currentUserId },
                include: { profile: true }
            });
        }

        if (!targetUser) return { success: false, error: "USER_NOT_FOUND" };

        const targetUserId = targetUser.id;
        const isOwner = currentUserId === targetUserId;
        const isPublicProfile = targetUser.profile?.isPublic ?? true;

        if (!isPublicProfile && !isOwner) {
            return {
                success: true,
                isOwner: false,
                isPublic: false,
                profile: { username: targetUser.profile?.username, displayName: targetUser.profile?.displayName, avatarUrl: targetUser.profile?.avatarUrl, role: targetUser.role },
                stats: { articlesRead: 0, bookmarks: 0, collections: 0, comments: 0, badges: 0, quizzes: 0, published: 0 },
                publishedContent: [], readingHistory: [], badges: [], collections: [], comments: [], contributionMap: {},
                quizStats: { attempted: 0, passed: 0, avgScore: "0", highestScore: 0 }
            };
        }

        // Set trailing 365 days timeline boundary
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        // High-Performance Parallel Aggregate Pipeline Queries
        const [
            statsCounts,
            publishedContent,
            readingHistory,
            badges,
            quizAttempts,
            collections,
            recentComments,
            // 💥 NEW: Aggregating all platform activity timestamps over the past year
            activityLogs
        ] = await Promise.all([
            Promise.all([
                prisma.readingHistory.count({ where: { userId: targetUserId } }),
                prisma.bookmark.count({ where: { userId: targetUserId } }),
                prisma.collection.count({ where: { userId: targetUserId, ...(!isOwner ? { isPublic: true } : {}) } }),
                prisma.comment.count({ where: { userId: targetUserId } }),
                prisma.userBadge.count({ where: { userId: targetUserId } }),
                prisma.quizAttempt.count({ where: { userId: targetUserId } }),
                prisma.contentNode.count({ where: { authorId: targetUserId, status: "PUBLISHED" } }),
            ]),
            prisma.contentNode.findMany({ where: { authorId: targetUserId, status: "PUBLISHED" }, orderBy: { publishedAt: "desc" } }),
            prisma.readingHistory.findMany({ where: { userId: targetUserId }, include: { contentNode: true }, orderBy: { viewedAt: "desc" }, take: 12 }),
            prisma.userBadge.findMany({ where: { userId: targetUserId }, orderBy: { earnedAt: "desc" } }),
            prisma.quizAttempt.findMany({ where: { userId: targetUserId }, include: { quiz: true }, orderBy: { createdAt: "desc" } }),
            prisma.collection.findMany({ where: { userId: targetUserId, ...(!isOwner ? { isPublic: true } : {}) }, orderBy: { createdAt: "desc" } }),
            prisma.comment.findMany({ where: { userId: targetUserId }, orderBy: { createdAt: "desc" }, take: 5 }),

            // Multi-table timestamp selectors
            Promise.all([
                prisma.readingHistory.findMany({ where: { userId: targetUserId, viewedAt: { gte: oneYearAgo } }, select: { viewedAt: true } }),
                prisma.comment.findMany({ where: { userId: targetUserId, createdAt: { gte: oneYearAgo } }, select: { createdAt: true } }),
                prisma.quizAttempt.findMany({ where: { userId: targetUserId, createdAt: { gte: oneYearAgo } }, select: { createdAt: true } }),
                prisma.contentNode.findMany({ where: { authorId: targetUserId, createdAt: { gte: oneYearAgo } }, select: { createdAt: true } }),
                prisma.bookmark.findMany({ where: { userId: targetUserId, createdAt: { gte: oneYearAgo } }, select: { createdAt: true } }),
            ])
        ]);

        // Compute contribution graph coordinates map block
        const contributionMap: Record<string, number> = {};
        const processDate = (dateObj: Date | string) => {
            const isoString = new Date(dateObj).toISOString().split("T")[0]; // Output formats to 'YYYY-MM-DD'
            contributionMap[isoString] = (contributionMap[isoString] || 0) + 1;
        };

        const [rhRows, cmRows, qaRows, cnRows, bmRows] = activityLogs;
        rhRows.forEach(r => processDate(r.viewedAt));
        cmRows.forEach(c => processDate(c.createdAt));
        qaRows.forEach(q => processDate(q.createdAt));
        cnRows.forEach(n => processDate(n.createdAt));
        bmRows.forEach(b => processDate(b.createdAt));

        const [readCount, bookmarkCount, collectionCount, commentCount, badgeCount, quizCount, publishedCount] = statsCounts;
        const totalQuizzesAttempted = quizAttempts.length;
        const totalQuizzesPassed = quizAttempts.filter(q => q.passed).length;
        const highestQuizScore = quizAttempts.reduce((max, q) => q.score > max ? q.score : max, 0);
        const averageQuizScore = totalQuizzesAttempted > 0 ? (quizAttempts.reduce((sum, q) => sum + q.score, 0) / totalQuizzesAttempted).toFixed(0) : "0";

        return {
            success: true,
            isOwner,
            isPublic: isPublicProfile,
            profile: JSON.parse(JSON.stringify({ ...targetUser.profile, role: targetUser.role, createdAt: targetUser.createdAt })),
            stats: { articlesRead: readCount, bookmarks: bookmarkCount, collections: collectionCount, comments: commentCount, badges: badgeCount, quizzes: quizCount, published: publishedCount },
            publishedContent: JSON.parse(JSON.stringify(publishedContent)),
            readingHistory: isOwner || isPublicProfile ? JSON.parse(JSON.stringify(readingHistory)) : [],
            badges: JSON.parse(JSON.stringify(badges)),
            collections: JSON.parse(JSON.stringify(collections)),
            comments: JSON.parse(JSON.stringify(recentComments)),
            contributionMap, // 👈 Wire-safe dictionary containing active logs
            quizStats: { attempted: totalQuizzesAttempted, passed: totalQuizzesPassed, avgScore: averageQuizScore, highestScore: highestQuizScore }
        };

    } catch (error) {
        console.error("Critical Failure inside fetchFullPortfolioAction:", error);
        return { success: false, error: "INTERNAL_SERVER_ERROR" };
    }
}



export async function fetchProfileEditorData() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return null;

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            profile: true,
            settings: true,
        },
    });

    if (!user) return null;
    return JSON.parse(JSON.stringify(user));
}

export async function updateProfileDetailsAction(formData: {
    displayName: string;
    username: string;
    bio: string;
    website: string;
    occupation: string;
    company: string;
    location: string;
    github: string;
    twitter: string;
    linkedin: string;
    isPublic: boolean;
    theme: string;
    language: string;
}) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return { success: false, error: "UNAUTHORIZED" };
        }

        const userId = session.user.id;
        const cleanUsername = formData.username.toLowerCase().trim();

        // Username Unique Constraints Check
        const existingOwner = await prisma.userProfile.findUnique({
            where: { username: cleanUsername },
        });

        if (existingOwner && existingOwner.userId !== userId) {
            return { success: false, error: "USERNAME_TAKEN" };
        }

        // Run Concurrent Multi-Table Update Transaction
        await prisma.$transaction(async (tx) => {
            // 1. Update Core User Row
            await tx.user.update({
                where: { id: userId },
                data: { name: formData.displayName },
            });

            // 2. Synchronize Portfolio Columns
            await tx.userProfile.update({
                where: { userId },
                data: {
                    username: cleanUsername,
                    displayName: formData.displayName,
                    bio: formData.bio,
                    website: formData.website.trim(),
                    occupation: formData.occupation.trim(),
                    company: formData.company.trim(),
                    location: formData.location.trim(),
                    github: formData.github.trim(),
                    twitter: formData.twitter.trim(),
                    linkedin: formData.linkedin.trim(),
                    isPublic: formData.isPublic,
                },
            });

            // 3. Update System Configuration Settings Row
            await tx.userSettings.update({
                where: { userId },
                data: {
                    theme: formData.theme as Theme,
                    language: formData.language,
                },
            });
        });

        return { success: true };
    } catch (error) {
        console.error("Profile Modification Fault:", error);
        return { success: false, error: "SERVER_ERROR" };
    }
}