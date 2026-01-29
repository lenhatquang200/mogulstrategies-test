import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
      user: {
        id: payload.id,
        role: payload.role,
        email: payload.email,
        name: payload.name
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
