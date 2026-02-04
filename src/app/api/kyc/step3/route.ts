import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = Number(session.user.id);
    const formData = await req.formData();

    const entityType = formData.get('entityType') as string | null;
    const individualCriteria = formData.get('individualCriteria') as string | null;
    const file = formData.get('file') as File | null;
    const entityName = formData.get('entityName') as string | null;
    const entityLegalType = formData.get('entityLegalType') as string | null;
    const formationDateRaw = formData.get('formationDate') as string | null;
    const jurisdiction = formData.get('jurisdiction') as string | null;
    const totalAssets = formData.get('totalAssets') as string | null;
    const formationDate = formationDateRaw ? new Date(formationDateRaw) : null;
    
    if (!entityType) {
      return NextResponse.json(
        { message: 'Entity type is required' },
        { status: 400 }
      );
    }

    if (entityType !== 'individual') {
      if (!entityName || !formationDate || !jurisdiction || !totalAssets) {
        return NextResponse.json(
          { message: 'Missing entity information' },
          { status: 400 }
        );
      }
    }

    if (!file) {
      return NextResponse.json(
        { message: 'Supporting document is required' },
        { status: 400 }
      );
    }

    const kyc = await prisma.kyc.findUnique({
      where: { userId },
    });

    if (!kyc) {
      return NextResponse.json({ message: 'KYC not found' }, { status: 404 });
    }

    if (kyc.status === 'approved') {
      return NextResponse.json(
        { message: 'KYC already approved' },
        { status: 400 }
      );
    }

    // ===== Upload file =====
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public/uploads/kyc');
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${kyc.id}-step3-${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/kyc/${fileName}`;

    await prisma.kycDocument.create({
      data: {
        kycId: kyc.id,
        step: 3,
        fileName: file.name,
        fileUrl,
        fileType: file.type.includes('pdf') ? 'pdf' : 'image',
        fileSize: file.size,
      },
    });

    // ===== Update KYC =====
    await prisma.kyc.update({
      where: { id: kyc.id },
      data: {
        entityType,
        // Individual only
        individualCriteria: entityType === 'individual' ? individualCriteria : null,

        // Entity only
        entityName: entityType !== 'individual' ? entityName : null,
        entityLegalType: entityType !== 'individual' ? entityLegalType : null,
        formationDate: entityType !== 'individual' ? formationDate : null,
        jurisdiction: entityType !== 'individual' ? jurisdiction : null,
        totalAssets: entityType !== 'individual' ? totalAssets : null,

        accreditationStatus: 'under_review',
        currentStep: 4,
        status: 'in_review',
      },
    });

    return NextResponse.json({
      success: true,
      nextStep: 4,
    });
  } catch (error) {
    console.error('KYC STEP 3 ERROR:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
