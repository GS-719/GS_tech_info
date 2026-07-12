"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/pages/api/auth/[...nextauth]";
import prisma from "@/src/lib/prisma";
import { Theme } from "@/src/generated/prisma/enums";

export async function fetchProfileFullData() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return null;

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            profile: true,
            settings: true,
            notificationPrefs: true,
            earnedBadges: true, // 👈 Dynamically fetches all unlocked user badges
        },
    });

    if (!user) return null;
    return JSON.parse(JSON.stringify(user));
}

export async function updateProfileDataAction(formData: {
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
    language: string; // 👈 New Parameter
    privacySettings?: any;
}) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return { success: false, error: "UNAUTHORIZED" };
        }

        const userId = session.user.id;
        const cleanUsername = formData.username.toLowerCase().trim();

        const existingOwner = await prisma.userProfile.findUnique({
            where: { username: cleanUsername },
        });

        if (existingOwner && existingOwner.userId !== userId) {
            return { success: false, error: "USERNAME_TAKEN" };
        }

        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: userId },
                data: { name: formData.displayName },
            });

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

            // Synchronize theme and language preferences
            await tx.userSettings.update({
                where: { userId },
                data: {
                    theme: formData.theme as Theme,
                    language: formData.language,
                    privacySettings: formData.privacySettings || {},
                },
            });
        });

        return { success: true };
    } catch (error) {
        console.error("Profile Transaction Settings Error:", error);
        return { success: false, error: "SERVER_ERROR" };
    }
}