"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/pages/api/auth/[...nextauth]";
import prisma from "@/src/lib/prisma";

export type DashboardDataPayload = {
    success: boolean;
    error?: string;
    userRole?: string;
    userName?: string;
    isAdminOrMod: boolean;
    bookmarks: any[];
    featuredResources: any[];
    userSettings: any | null; // 👈 Added settings reference payload slot
    earnedBadges: any[];     // 👈 Added achievements array slot
    adminStats: {
        totalVisitors: number;
        publishedArticles: number;
        avgReadingMinutes: string;
    };
};

export async function fetchDashboardDataAction(): Promise<DashboardDataPayload> {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return {
                success: false,
                error: "UNAUTHORIZED",
                isAdminOrMod: false,
                bookmarks: [],
                featuredResources: [],
                userSettings: null,
                earnedBadges: [],
                adminStats: { totalVisitors: 0, publishedArticles: 0, avgReadingMinutes: "0.0" }
            };
        }

        const userId = session.user.id;
        const userRole = session.user.role;
        const isAdminOrMod = userRole === "ADMIN" || userRole === "MODERATOR";

        // High-Performance Parallel Query Execution
        const [dbBookmarks, adminMetrics, dbResources, userAccountData] = await Promise.all([
            prisma.bookmark.findMany({
                where: { userId },
                include: { contentNode: true },
                orderBy: { createdAt: "desc" },
                take: 3,
            }),

            isAdminOrMod
                ? Promise.all([
                    prisma.viewLog.count(),
                    prisma.contentNode.count({ where: { status: "PUBLISHED" } }),
                    prisma.viewLog.aggregate({ _avg: { duration: true } }),
                ])
                : Promise.resolve([0, 0, { _avg: { duration: 0 } }]),

            prisma.contentNode.findMany({
                where: { type: "RESOURCE", status: "PUBLISHED", isFeatured: true },
                orderBy: { publishedAt: "desc" },
                take: 3,
            }),

            // 👈 Concurrently fetch sub-tables linked to the user account context
            prisma.user.findUnique({
                where: { id: userId },
                select: {
                    settings: true,
                    earnedBadges: {
                        orderBy: { earnedAt: "desc" }
                    }
                }
            })
        ]);

        const [totalVisitors, publishedArticles, avgReadingTimeData] = adminMetrics;
        const avgReadingMinutes = avgReadingTimeData._avg?.duration
            ? (avgReadingTimeData._avg.duration / 60).toFixed(1)
            : "0.0";

        return {
            success: true,
            userRole,
            userName: session.user.name || "Developer",
            isAdminOrMod,
            userSettings: userAccountData?.settings ? JSON.parse(JSON.stringify(userAccountData.settings)) : null,
            earnedBadges: userAccountData?.earnedBadges ? JSON.parse(JSON.stringify(userAccountData.earnedBadges)) : [],
            bookmarks: JSON.parse(JSON.stringify(dbBookmarks)),
            featuredResources: JSON.parse(JSON.stringify(dbResources)),
            adminStats: {
                totalVisitors,
                publishedArticles,
                avgReadingMinutes,
            },
        };

    } catch (error) {
        console.error("Critical Failure inside fetchDashboardDataAction:", error);
        return {
            success: false,
            error: "INTERNAL_SERVER_ERROR",
            isAdminOrMod: false,
            bookmarks: [],
            featuredResources: [],
            userSettings: null,
            earnedBadges: [],
            adminStats: { totalVisitors: 0, publishedArticles: 0, avgReadingMinutes: "0.0" }
        };
    }
}