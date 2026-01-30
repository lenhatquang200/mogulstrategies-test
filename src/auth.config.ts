export const authConfig = {
    pages: {
        // Remove default signIn to avoid automatic fallback
    },
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            if (token && session.user) {
                session.user.id = token.sub as string;
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.role = (user as any).role?.name || 'INVESTOR'; // Use role.name from database
            }
            return token;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdmin = auth?.user?.role === 'ADMIN';
            const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
            const isPublicRoute = ["/", "/about", "/contact", "/funds", "/insights", "/strategies"].includes(nextUrl.pathname);
            const isAuthRoute = nextUrl.pathname === "/login";
            const isAdminLoginRoute = nextUrl.pathname === "/admin/login";
            const isAdminRoute = nextUrl.pathname.startsWith("/admin");
            const isInvestorRoute = nextUrl.pathname.startsWith("/investors");

            if (isApiAuthRoute) return true;

            // Handle admin login route
            if (isAdminLoginRoute) {
                if (isLoggedIn && isAdmin) {
                    return Response.redirect(new URL("/admin/dashboard", nextUrl));
                }
                return true; // Allow access to admin login
            }

            // Handle investor login route
            if (isAuthRoute) {
                if (isLoggedIn) {
                    if (isAdmin) {
                        return Response.redirect(new URL("/admin/dashboard", nextUrl));
                    }
                    return Response.redirect(new URL("/investors/portfoliosummary", nextUrl));
                }
                return true;
            }

            // Protect investor routes
            if (isInvestorRoute && !isLoggedIn) {
                return false; // Redirect to login
            }

            // Protect admin routes
            if (isAdminRoute && !isAdmin) {
                return Response.redirect(new URL("/admin/login", nextUrl));
            }

            // Redirect unauthenticated users to login
            if (!isLoggedIn && !isPublicRoute) {
                return false; // Redirect to login
            }

            return true;
        },
    },
    providers: [], // Add providers in auth.ts
};
