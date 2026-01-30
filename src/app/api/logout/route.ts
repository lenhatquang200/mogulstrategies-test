import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";

export async function POST() {
  try {
    const session = await auth();
    if (session) {
      const res = NextResponse.json({ success: true });
      
      res.cookies.set("next-auth.session-token", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      });
      
      res.cookies.set("token", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      });

      return res;
    }

    // Fallback for non-NextAuth sessions
    const res = NextResponse.json({ success: true });
    res.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}
