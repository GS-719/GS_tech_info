"use server";

import prisma from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { UserRole, Theme } from "@/src/generated/prisma/enums";

// Define a clean type for what the action returns
type ActionResponse = {
    success: boolean;
    message: string;
    error?: string;
    userId?: string;
};

export async function registerUserAction(formData: Record<string, string>): Promise<ActionResponse> {
    try {
        const { email, password, username, displayName } = formData;

        // 1. Structural Validation
        if (!email || !password || !username) {
            return { success: false, message: "Validation Failed", error: "Missing required parameters." };
        }

        const normalizedEmail = email.toLowerCase().trim();
        const cleanUsername = username.toLowerCase().trim();

        // 2. Email Collision Guard
        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (existingUser) {
            return { success: false, message: "Conflict Error", error: "This email address is already registered." };
        }

        // 3. Username Collision Guard
        const existingUsername = await prisma.userProfile.findUnique({
            where: { username: cleanUsername },
        });

        if (existingUsername) {
            return { success: false, message: "Conflict Error", error: "This username handle is already taken." };
        }

        // 4. Secure Password Hashing
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Atomic Transaction Engine
        const newUser = await prisma.$transaction(async (tx) => {
            // Core User node
            const user = await tx.user.create({
                data: {
                    email: normalizedEmail,
                    hashedPassword,
                    role: UserRole.USER,
                },
            });

            // UserProfile mapping
            await tx.userProfile.create({
                data: {
                    userId: user.id,
                    username: cleanUsername,
                    displayName: displayName?.trim() || username.trim(),
                    isPublic: true,
                },
            });

            // UserSettings mapping
            await tx.userSettings.create({
                data: {
                    userId: user.id,
                    theme: Theme.DARK,
                    language: "en",
                },
            });

            // Notification Preference mapping
            await tx.notificationPreference.create({
                data: {
                    userId: user.id,
                    emailMarketing: true,
                    emailSecurity: true,
                    inAppComments: true,
                },
            });

            return user;
        });

        return {
            success: true,
            userId: newUser.id,
            message: "Developer account initialized cleanly.",
        };

    } catch (error) {
        console.error("Server Action Failure - Registration Engine:", error);
        return {
            success: false,
            message: "Server Error",
            error: "An internal database crash or server error occurred."
        };
    }
}