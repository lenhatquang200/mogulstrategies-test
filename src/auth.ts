import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        // ===== EMAIL / PASSWORD =====
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                const user = await prisma.user.findUnique({
                    where: { email },
                    include: {
                        role: true
                    }
                });

                if (!user) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (!passwordsMatch) {
                    return null;
                }

                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        lastLoginAt: new Date(),
                    },
                });

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                    role: (user.role as any).name, // Type assertion to fix TypeScript
                };
            },
        }),
        // ===== GOOGLE =====
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            const provider = account?.provider ?? "credentials"
            const providerId = account?.providerAccountId
            let dbUser

            if (account?.provider === "google") {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                    include: { role: true },
                })

                if (!existingUser) {
                    const randomPassword = Math.random().toString(36).slice(-10)
                    const hashedPassword = await bcrypt.hash(randomPassword, 10)

                    dbUser = await prisma.user.create({
                        data: {
                            email: user.email!,
                            name: user.name,
                            roleId: 2, // INVESTOR
                            password: hashedPassword,
                            provider: "google",
                            providerId,          // google id
                            lastLoginAt: new Date(),
                        },
                    })

                    ;(user as any).id = dbUser.id.toString()
                    ;(user as any).role = "INVESTOR"
                } else {
                    // update login info
                    dbUser = await prisma.user.update({
                        where: { id: existingUser.id },
                        data: {
                            lastLoginAt: new Date(),
                            provider: "google",
                            providerId,
                        },
                    })

                    ;(user as any).id = existingUser.id.toString()
                    ;(user as any).role = existingUser.role.name
                }
            }

            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role
            }
            return token
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        },
    },
});
