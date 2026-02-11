import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (
    !session?.user?.id ||
    session.user.role !== "ADMIN"
  ) {
    return NextResponse.json(
      { message: "Forbidden" },
      { status: 403 }
    );
  }

  const [totalInvestors, verifiedInvestors] =
    await Promise.all([

      // Total Investors
      prisma.user.count({
        where: {
            roleId: 1, // 1 = INVESTOR
        },
      }),

      // Verified Investors (KYC approved)
      prisma.user.count({
        where: {
          roleId: 1,
          kyc: {
            status: "approved",
          },
        },
      }),
    ]);

  return NextResponse.json({
    totalInvestors,
    verifiedInvestors,
  });
}
