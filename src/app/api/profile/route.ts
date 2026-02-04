import { NextResponse } from "next/server";
import { auth } from "@/auth"; 
import { UserService } from "@/services/user.service";
import { mapAccreditation, formatDate } from "@/lib/utils";

function mapUserToProfile(user: any) {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
    timezone: user.timezone,
    userCode: user.userCode,
    role: user.role?.name,
    investorType: mapAccreditation(user.accreditationStatus),
    joined: formatDate(user.createdAt),
    lastLogin: user.updatedAt
      ? formatDate(user.updatedAt)
      : null,
  };
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await UserService.getByEmail(session.user.email);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(mapUserToProfile(user));
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const updatedUser = await UserService.updateByEmail(
      session.user.email,
      body
    );

    return NextResponse.json(mapUserToProfile(updatedUser));
  } catch (error) {
    console.error("PATCH /api/profile error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
