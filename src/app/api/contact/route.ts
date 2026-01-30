import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Contact } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      type,
      accredited,
      message,
    } = await req.json();

    if (!name || !email || !type || !accredited || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.insert(Contact).values({
      name,
      email,
      phone: phone || null,
      type,
      accredited,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
