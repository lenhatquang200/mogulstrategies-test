import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    console.log("🔍 Login API called");
    
    // Check environment variables
    console.log("🔍 Environment check:");
    console.log("DB_HOST:", process.env.DB_HOST ? "✓" : "✗");
    console.log("DB_USER:", process.env.DB_USER ? "✓" : "✗");
    console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "✓" : "✗");
    console.log("DB_NAME:", process.env.DB_NAME ? "✓" : "✗");
    console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✓" : "✗");
    
    const { email, password } = await req.json();
    console.log("🔍 Login attempt for email:", email);

    console.log("🔍 Executing database query...");
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true
      }
    });

    console.log("🔍 Query result:", user ? "User found" : "User not found");

    if (!user) {
      return NextResponse.json(
        { message: "These credentials do not match our records." },
        { status: 401 }
      );
    }

    console.log("🔍 Comparing password...");
    const ok = await bcrypt.compare(password, user.password);
    console.log("🔍 Password match:", ok ? "✓" : "✗");

    if (!ok) {
      return NextResponse.json(
        { message: "These credentials do not match our records." },
        { status: 401 }
      );
    }

    console.log("🔍 Creating JWT token...");
     const token = jwt.sign(
      { id: user.id, role: user.role?.name || 'INVESTOR', roleId: user.roleId, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
    console.log("🔍 JWT token created successfully");

    const res = NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role?.name || 'INVESTOR',
      roleId: user.roleId
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;

  } catch (err) {
    console.error("❌ Login API Error:");
    console.error("Error type:", err?.constructor?.name);
    console.error("Error message:", (err as any)?.message);
    console.error("Error stack:", (err as any)?.stack);
    console.error("Full error:", err);
    
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
