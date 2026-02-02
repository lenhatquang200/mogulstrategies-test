import { NextResponse } from "next/server";
import { auth } from "@/auth"; 
import { AuthService } from "@/services/auth.service";
import { mapAccreditation, formatDate } from "@/lib/utils";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await AuthService.findUserByEmail(session.user.email);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      role: user.role.name,
      investorType: mapAccreditation(user.accreditationStatus),
      joined: formatDate(user.createdAt),
      lastLogin: user.updatedAt
        ? formatDate(user.updatedAt)
        : null,
    });
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
