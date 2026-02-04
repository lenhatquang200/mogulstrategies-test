import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = Number(session.user.id);
    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "Invalid user id" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { action, entityType } = body;

    if (!action) {
      return NextResponse.json(
        { message: "Action is required" },
        { status: 400 }
      );
    }

    const forwardedFor = req.headers.get("x-forwarded-for");
    const rawIp = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : req.headers.get("x-real-ip");

    let ipAddress: string | null = null;

    if (rawIp) {
        if (rawIp === "::1") {
            ipAddress = "127.0.0.1";
        } else if (rawIp.startsWith("::ffff:")) {
            ipAddress = rawIp.replace("::ffff:", "");
        } else if (rawIp.includes(":")) {
            ipAddress = "0.0.0.0"; // IPv6 
        } else {
            ipAddress = rawIp; // IPv4
        }
    }

    const country =
    req.headers.get("cf-ipcountry") ||
    req.headers.get("x-vercel-ip-country");

    const city =
    req.headers.get("cf-ipcity") ||
    req.headers.get("x-vercel-ip-city");

    const location =
    country && city
        ? `${city}, ${country}`
        : country || "";

    const userAgent = req.headers.get("user-agent") || "";

    await prisma.activityLog.create({
      data: {
        userId,
        action,
        entityType,
        details: parseDevice(userAgent),
        location,
        ipAddress,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/activity-log error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = Number(session.user.id);
    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "Invalid user id" },
        { status: 400 }
      );
    }

    // pagination params
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.activityLog.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          action: true,
          details: true,
          entityType: true,
          ipAddress: true,
          location: true,
          createdAt: true,
        },
      }),
      prisma.activityLog.count({
        where: { userId },
      }),
    ]);

    return NextResponse.json({
      data: items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/activity-log error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

function parseDevice(ua?: string) {
  if (!ua) return "Unknown";

  const isMobile = /Mobile|iPhone|Android/i.test(ua);
  const os =
    /Windows NT/i.test(ua)
      ? "Windows"
      : /Mac OS X/i.test(ua)
      ? "macOS"
      : /Android/i.test(ua)
      ? "Android"
      : /iPhone|iPad/i.test(ua)
      ? "iOS"
      : "Unknown OS";

  const browser =
    /Chrome\/\d+/i.test(ua)
      ? "Chrome"
      : /Firefox\/\d+/i.test(ua)
      ? "Firefox"
      : /Safari\/\d+/i.test(ua) && !/Chrome/i.test(ua)
      ? "Safari"
      : /Edge\/\d+/i.test(ua)
      ? "Edge"
      : "Browser";

  return `${browser} on ${os}${isMobile ? " (Mobile)" : ""}`;
}
