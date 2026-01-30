// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
// const ROLE = {
//               ADMIN: 2,
//               INVESTOR: 1,
//             };

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/favicon.ico")
//   ) {
//     return NextResponse.next();
//   }

//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     const { payload } = await jwtVerify(token, secret);
//     const roleId = payload.roleId as number;
    
//     if (pathname.startsWith("/admin") && roleId !== ROLE.ADMIN) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     if (pathname.startsWith("/investor") && roleId !== ROLE.INVESTOR) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     return NextResponse.next();
//   } catch {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/admin/:path*", "/investor/:path*"],
// };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

const ROLE = {
  ADMIN: 2,
  INVESTOR: 1,
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // ✅ 1. ĐÃ LOGIN → KHÔNG ĐƯỢC VÀO /login
  if (pathname.startsWith("/login") && token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      const roleId = payload.roleId as number;

      if (roleId === ROLE.ADMIN) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }

      if (roleId === ROLE.INVESTOR) {
        return NextResponse.redirect(new URL("/investor", req.url));
      }
    } catch {
      // token lỗi thì cho vào login
      return NextResponse.next();
    }
  }

  // ✅ 2. CHƯA LOGIN → CHẶN ADMIN / INVESTOR
  if (pathname.startsWith("/admin") || pathname.startsWith("/investor")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      const roleId = payload.roleId as number;

      if (pathname.startsWith("/admin") && roleId !== ROLE.ADMIN) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      if (pathname.startsWith("/investor") && roleId !== ROLE.INVESTOR) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*", "/investor/:path*"],
};
