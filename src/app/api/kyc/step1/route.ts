import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { validateKycStep1 } from "@/lib/validators/kyc/step1";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = Number(session.user.id);
    const body = await req.json();

    const validation = validateKycStep1(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          field: validation.field,
          message: validation.message,
        },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      nationality,
      country,
      address,
      city,
      state,
      postalCode,
      phone,
    } = body;

    // update or insert KYC 
    const kyc = await prisma.kyc.upsert({
      where: { userId },
      update: {
        firstName,
        lastName,
        middleName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        nationality,
        country,
        address,
        city,
        state,
        postalCode,
        phone,
        currentStep: 2,
        status: 'draft',
      },
      create: {
        userId,
        firstName,
        lastName,
        middleName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        nationality,
        country,
        address,
        city,
        state,
        postalCode,
        phone,
        currentStep: 2,
        status: 'draft',
      },
    });

    return NextResponse.json({
      success: true,
      nextStep: kyc.currentStep,
    });
  } catch (err) {
    console.error('KYC STEP 1 ERROR:', err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
