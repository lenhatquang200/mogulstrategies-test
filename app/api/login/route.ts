import { db } from "@/lib/db";
import { User, Role } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const result = await db
      .select({
        id: User.id,
        email: User.email,
        name: User.name,
        password: User.password,
        roleId: User.roleId,
        roleName: Role.name,
      })
      .from(User)
      .innerJoin(Role, eq(User.roleId, Role.id))
      .where(eq(User.email, email))
      .limit(1);

    const user = result[0];

    if (!user) {
      return NextResponse.json(
        { message: "These credentials do not match our records." },
        { status: 401 }
      );
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return NextResponse.json(
        { message: "These credentials do not match our records." },
        { status: 401 }
      );
    }

     const token = jwt.sign(
      { id: user.id, role: user.roleName, roleId: user.roleId, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.roleName,
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
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
