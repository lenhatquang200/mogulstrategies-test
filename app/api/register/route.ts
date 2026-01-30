import { db } from "@/lib/db";
import { User } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export async function POST(req: Request) {
  try {
    const { name, email, password, accredited } = await req.json();

    // Check if user already exists
    const existing = await db
      .select({ id: User.id })
      .from(User)
      .where(eq(User.email, email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user (roleId = 1 for Investor)
    await db.insert(User).values({
      name,
      email,
      password: hashedPassword,
      roleId: 1,
      accreditationStatus: accredited || "individual",
      updatedAt: new Date(),
    });

    return NextResponse.json({
      message: "Registration successful. Please login.",
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
