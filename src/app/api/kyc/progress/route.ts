import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const kyc = await prisma.kyc.findUnique({
    where: { userId: Number(session.user.id) },
    select: {
      // ===== progress =====
      currentStep: true,
      status: true,
      identityStatus: true,
      accreditationStatus: true,

      // ===== step 1 fields =====
      firstName: true,
      lastName: true,
      middleName: true,
      dateOfBirth: true,
      nationality: true,
      country: true,
      address: true,
      city: true,
      state: true,
      postalCode: true,
      phone: true,

      updatedAt: true,
    },
  });

  if (!kyc) {
    return NextResponse.json({ step: 1, status: 'draft' });
  }

  return NextResponse.json(kyc);
}

