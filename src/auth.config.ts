import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub as string;
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdmin = auth?.user?.role === 'admin';
            const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
            const isPublicRoute = ["/", "/about", "/contact", "/funds", "/insights", "/strategies"].includes(nextUrl.pathname);
            const isAuthRoute = nextUrl.pathname === "/login";
            const isAdminRoute = nextUrl.pathname.startsWith("/admin");
            const isInvestorRoute = nextUrl.pathname.startsWith("/investors");

            if (isApiAuthRoute) return true;

            if (isAuthRoute) {
                if (isLoggedIn) {
                    return Response.redirect(new URL("/investors/portfoliosummary", nextUrl));
                }
                return true;
            }

            if (isInvestorRoute && !isLoggedIn) {
                return false; // Redirect to login
            }

            if (isAdminRoute && !isAdmin) {
                return Response.redirect(new URL("/investors/portfoliosummary", nextUrl));
            }

            if (!isLoggedIn && !isPublicRoute) {
                return false; // Redirect to login
            }

            return true;
        },
    },
    providers: [], // Add providers in auth.ts
} satisfies NextAuthConfig;
