import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { UserService } from "@/services/user.service";
import { validateSettingsUpdate } from "@/lib/validators/profile/setting";
import { prisma } from "@/lib/prisma";
export function mapUserToSettings(user: any) {
  return (
    user.settings ?? {
      notifications: {
        emailNotifications: false,
        smsAlerts: false,
        events: {
          capitalCalls: false,
          distributions: false,
          documents: false,
          kyc: false,
          marketCommentary: false,
          eventReminders: false,
        },
      },
    }
  );
}

function getDefaultSettings() {
  return {
    notifications: {
      emailNotifications: false,
      smsAlerts: false,
      events: {
        capitalCalls: false,
        distributions: false,
        documents: false,
        kyc: false,
        marketCommentary: false,
        eventReminders: false,
      },
    },
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

    const settings = await prisma.user.findUnique({
  where: { id: Number(session.user.id) },
  select: { settings: true },
});

return NextResponse.json(
  settings?.settings ?? getDefaultSettings()
);

  } catch (error) {
    console.error("GET /api/settings error:", error);
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

    try {
      validateSettingsUpdate(body);
    } catch (err: any) {
      return NextResponse.json(
        { message: err.message },
        { status: 400 }
      );
    }

    const updatedUser =  await prisma.user.update({
      where: { id: Number(session?.user?.id) },
      data: {
        settings: body,
      },
    });

    return NextResponse.json(mapUserToSettings(updatedUser));
  } catch (error) {
    console.error("PATCH /api/settings error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
