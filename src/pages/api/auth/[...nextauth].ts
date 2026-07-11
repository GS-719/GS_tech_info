import NextAuth from "next-auth";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/src/lib/prisma";
import bcrypt from "bcryptjs";

// ========================================================
// NEXTAUTH TYPE AUGMENTATIONS (Type-Safe Client Autocomplete)
// ========================================================
declare module "next-auth" {
    interface User {
        id: string;
        role: string;
        username?: string | null;
        emailVerified: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }

    interface Session {
        user: {
            id: string;
            role: string;
            username?: string | null;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        role?: string;
        username?: string | null;
        emailVerified?: Date | null;
        createdAt?: Date;
        updatedAt?: Date;
    }
}

// ========================================================
// CORE NEXTAUTH FRAMEWORK ROUTING DEFINITION
// ========================================================
export const authOptions: NextAuthOptions = {
    debug: process.env.NODE_ENV === "development",

    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "jwt", // Stateless cryptographic session token pattern
    },

    providers: [
        // 1. GITHUB OAUTH PROVIDER
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),

        // 2. GOOGLE OAUTH PROVIDER
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),

        // 3. CLASSIC CREDENTIALS (EMAIL / PASSWORD) PROVIDER
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                // Fetch user along with profile sub-tables concurrently
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email.toLowerCase().trim() },
                    include: { profile: true }
                });

                // Security Guard: Fail if user doesn't exist, has been soft-deleted, or lacks a local password
                if (!user || user.deletedAt || !user.hashedPassword) return null;

                // Evaluate credential validity using bcrypt matches
                const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!isPasswordValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.profile?.displayName || user.profile?.username || "Developer",
                    role: user.role,
                    username: user.profile?.username,
                    emailVerified: user.emailVerified,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            },
        }),
    ],

    callbacks: {
        // Pipeline Callback: Fired whenever a JWT token payload is generated or updated
        async jwt({ token, user, account, session, trigger }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
                token.emailVerified = user.emailVerified;
                token.createdAt = user.createdAt;
                token.updatedAt = user.updatedAt;

                // Data Anchor: If logging in via OAuth, pull the generated sub-profile details from the DB
                if (account && account.provider !== "credentials") {
                    const dbProfile = await prisma.userProfile.findUnique({
                        where: { userId: user.id }
                    });
                    token.name = dbProfile?.displayName || user.name;
                    token.username = dbProfile?.username;
                } else {
                    // Fallback parsing context directly from Credentials authorize schema payload
                    token.name = user.name;
                    token.username = (user as any).username;
                }
            }

            // Dynamic profile update trigger handling (e.g., changes made inside user dashboard options panels)
            if (trigger === "update" && session) {
                const newName = session.name || session?.user?.name;
                const newEmail = session.email || session?.user?.email;
                const newUsername = session.username || session?.user?.username;
                const newUpdatedAt = session.updatedAt || session?.user?.updatedAt;

                if (newName) token.name = newName;
                if (newEmail) token.email = newEmail;
                if (newUsername) token.username = newUsername;
                if (newUpdatedAt) token.updatedAt = newUpdatedAt;
            }
            return token;
        },

        // Pipeline Callback: Exposes the secure internal token payloads cleanly to frontend useSession() hooks
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.role = token.role as string;
                session.user.username = token.username;
                session.user.emailVerified = token.emailVerified as Date | null;
                session.user.createdAt = token.createdAt as Date;
                session.user.updatedAt = token.updatedAt as Date;
            }
            return session;
        },
    },

    events: {
        // ====================================================================
        // DATA INTEGRITY HOOK: Automatically seeds required subprofiles for OAuth signups
        // ====================================================================
        async createUser({ user }) {
            await prisma.$transaction(async (tx) => {
                // Construct a safe fallback unique username handle directly from their email payload prefix
                const baseUsername = user.email ? user.email.split("@")[0] : `dev_${user.id.substring(0, 8)}`;

                let uniqueUsername = baseUsername;
                const usernameCollisionCheck = await tx.userProfile.findUnique({
                    where: { username: uniqueUsername }
                });

                // Loop collision defense stub
                if (usernameCollisionCheck) {
                    uniqueUsername = `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`;
                }

                // Initialize UserProfile
                await tx.userProfile.create({
                    data: {
                        userId: user.id,
                        username: uniqueUsername,
                        displayName: user.name || uniqueUsername,
                        avatarUrl: user.image,
                        isPublic: true,
                    },
                });

                // Initialize UserSettings
                await tx.userSettings.create({
                    data: {
                        userId: user.id,
                        theme: "DARK",
                        language: "en",
                    },
                });

                // Initialize NotificationPreference
                await tx.notificationPreference.create({
                    data: {
                        userId: user.id,
                        emailMarketing: true,
                        emailSecurity: true,
                        inAppComments: true,
                    },
                });
            });
        }
    },

    pages: {
        signIn: "/login", // Maps standard routing fallbacks directly to your custom page views
    }
};

export default NextAuth(authOptions);