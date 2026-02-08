import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';
import { validateKycStep3 } from '@/lib/validators/kyc/step3';

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

    // check existing document step 3
    const existingDoc = await prisma.kycDocument.findFirst({
      where: {
        kycId: kyc.id,
        step: 3,
      },
    });

    // ===== VALIDATE =====
    let fileType: 'image' | 'pdf' | undefined;

    try {
      const result = validateKycStep3(
        {
          entityType,
          individualCriteria,
          entityName,
          entityLegalType,
          formationDate,
          jurisdiction,
          totalAssets,
          file,
        },
        Boolean(existingDoc)
      );

      fileType = result.fileType;
    } catch (err: any) {
      return NextResponse.json(
        { message: err.message },
        { status: 400 }
      );
    }

    // ===== Upload file =====
    if (file) {
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
          fileType: fileType!, // validator
          fileSize: file.size,
        },
      });
    }

    // ===== Update KYC =====
    await prisma.kyc.update({
      where: { id: kyc.id },
      data: {
        entityType,

        individualCriteria:
          entityType === 'individual' ? individualCriteria : null,

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

    return NextResponse.json({ success: true, nextStep: 4 });
  } catch (error) {
    console.error('KYC STEP 3 ERROR:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = Number(session.user.id);

    const kyc = await prisma.kyc.findUnique({
      where: { userId },
      include: {
        KycDocument: {
          where: { step: 3 },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!kyc) {
      return NextResponse.json(null, { status: 200 });
    }

    const doc = kyc.KycDocument[0];

    return NextResponse.json({
      entityType: kyc.entityType,
      individualCriteria: kyc.individualCriteria,

      entityName: kyc.entityName,
      entityLegalType: kyc.entityLegalType,
      formationDate: kyc.formationDate
        ? kyc.formationDate.toISOString().slice(0, 10)
        : null,
      jurisdiction: kyc.jurisdiction,
      totalAssets: kyc.totalAssets,

      fileName: doc?.fileName || null,
      fileUrl: doc?.fileUrl || null,
    });
  } catch (error) {
    console.error('GET KYC STEP 3 ERROR:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
