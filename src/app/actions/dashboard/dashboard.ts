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
    adminStats: {
        totalVisitors: number;
        publishedArticles: number;
        avgReadingMinutes: string;
    };
};

export async function fetchDashboardDataAction(): Promise<DashboardDataPayload> {
    try {
        // 1. Internal Session Check
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return {
                success: false,
                error: "UNAUTHORIZED",
                isAdminOrMod: false,
                bookmarks: [],
                featuredResources: [],
                adminStats: { totalVisitors: 0, publishedArticles: 0, avgReadingMinutes: "0.0" }
            };
        }

        const userId = session.user.id;
        const userRole = session.user.role;
        const isAdminOrMod = userRole === "ADMIN" || userRole === "MODERATOR";

        // 2. High-Performance Parallel Query Execution
        const [dbBookmarks, adminMetrics, dbResources] = await Promise.all([
            // FIXED: Standardized valid Prisma runtime query sort syntax ('desc')
            prisma.bookmark.findMany({
                where: { userId },
                include: { contentNode: true },
                orderBy: { createdAt: "desc" },
                take: 3,
            }),

            // Fetch dynamic administrative logging matrices (Only executes if clearance matches)
            isAdminOrMod
                ? Promise.all([
                    prisma.viewLog.count(),
                    prisma.contentNode.count({ where: { status: "PUBLISHED" } }),
                    prisma.viewLog.aggregate({ _avg: { duration: true } }),
                ])
                : Promise.resolve([0, 0, { _avg: { duration: 0 } }]),

            // FIXED: Standardized valid Prisma runtime query sort syntax ('desc')
            prisma.contentNode.findMany({
                where: { type: "RESOURCE", status: "PUBLISHED", isFeatured: true },
                orderBy: { publishedAt: "desc" },
                take: 3,
            }),
        ]);

        // 3. Process and format query outputs into plain, wire-safe objects
        const [totalVisitors, publishedArticles, avgReadingTimeData] = adminMetrics;
        const avgReadingMinutes = avgReadingTimeData._avg?.duration
            ? (avgReadingTimeData._avg.duration / 60).toFixed(1)
            : "0.0";

        return {
            success: true,
            userRole,
            userName: session.user.name || "Developer",
            isAdminOrMod,
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
            adminStats: { totalVisitors: 0, publishedArticles: 0, avgReadingMinutes: "0.0" }
        };
    }
}