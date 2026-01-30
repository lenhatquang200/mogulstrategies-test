import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Enable 2FA for all existing users
    const result = await prisma.user.updateMany({
      where: {
        twoFactorEnabled: false
      },
      data: {
        twoFactorEnabled: true
      }
    });

    return NextResponse.json({
      success: true,
      message: `Enabled 2FA for ${result.count} users`,
      updatedCount: result.count
    });

  } catch (error) {
    console.error('Error enabling 2FA:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
