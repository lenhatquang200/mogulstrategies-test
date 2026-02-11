import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);
  const search = searchParams.get("search") || "";

  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            action: {
              contains: search.toUpperCase(),
            },
          },
          {
            user: {
              name: {
                contains: search,
              },
            },
          },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.activityLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            userCode: true,
            role: {
              select: { name: true },
            },
          },
        },
      },
    }),
    prisma.activityLog.count({ where }),
  ]);

  return NextResponse.json({
    data: items, // 👈 TRẢ NGUYÊN MODEL
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
