"use server";

import prisma from "@/src/lib/prisma";

// 1. Fetch all public production tutorials ordered by release date
export async function getPublishedTutorialsAction() {
    try {
        const tutorials = await prisma.contentNode.findMany({
            where: {
                type: "TUTORIAL",
                status: "PUBLISHED",
            },
            orderBy: {
                publishedAt: "desc",
            },
        });
        return { success: true, tutorials: JSON.parse(JSON.stringify(tutorials)) };
    } catch (error) {
        console.error("Failed to query published tutorials from Neon:", error);
        return { success: false, tutorials: [] };
    }
}

// 2. Fetch specific single tutorial metadata profile matching the active routing slug
export async function getTutorialMetadataAction(slug: string) {
    try {
        const tutorialNode = await prisma.contentNode.findFirst({
            where: {
                slug: slug,
                type: "TUTORIAL",
                status: "PUBLISHED",
            },
        });
        return tutorialNode ? JSON.parse(JSON.stringify(tutorialNode)) : null;
    } catch (error) {
        console.error("Failed to extract target tutorial metadata structure:", error);
        return null;
    }
}