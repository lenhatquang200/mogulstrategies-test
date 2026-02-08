import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';
import { validateKycStep2 } from '@/lib/validators/kyc/step2';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = Number(session.user.id);
    const formData = await req.formData();

    const documentType = formData.get('documentType') as string;
    const file = formData.get('file') as File | null;

    if (!documentType || !file) {
      return NextResponse.json(
        { message: 'Document type and file are required' },
        { status: 400 }
      );
    }

    let validation;
    try {
      validation = validateKycStep2(documentType, file);
    } catch (err: any) {
      return NextResponse.json(
        { message: err.message },
        { status: 400 }
      );
    }


    const kyc = await prisma.kyc.findUnique({ where: { userId } });
    if (!kyc) {
      return NextResponse.json({ message: 'KYC not found' }, { status: 404 });
    }

    if (kyc.status === 'approved') {
      return NextResponse.json(
        { message: 'KYC already approved' },
        { status: 400 }
      );
    }

    if (
      kyc.identityStatus === 'under_review' ||
      kyc.identityStatus === 'verified'
    ) {
      return NextResponse.json(
        { message: 'Identity document already submitted' },
        { status: 400 }
      );
    }

    // ===== Upload file =====
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public/uploads/kyc');
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${kyc.id}-step2-${Date.now()}-${file.name}`;
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    const fileUrl = `/uploads/kyc/${fileName}`;

    await prisma.kycDocument.create({
      data: {
        kycId: kyc.id,
        step: 2,
        fileName: file.name,
        fileUrl,
        fileType: validation.fileType,
        fileSize: file.size,
      },
    });

    // ===== Update KYC =====
    await prisma.kyc.update({
      where: { id: kyc.id },
      data: {
        documentType,
        identityStatus: 'under_review',
        currentStep: 3,
      },
    });

    return NextResponse.json({ success: true, nextStep: 3 });
  } catch (error) {
    console.error('KYC STEP 2 ERROR:', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
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
          where: { step: 2 },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!kyc || kyc.KycDocument.length === 0) {
      return NextResponse.json({ hasUploaded: false });
    }

    const doc = kyc.KycDocument[0];

    return NextResponse.json({
      hasUploaded: true,
      documentType: kyc.documentType,
      fileName: doc.fileName,
      fileUrl: doc.fileUrl,
      fileType: doc.fileType,
      uploadedAt: doc.createdAt,
      identityStatus: kyc.identityStatus,
    });
  } catch (error) {
    console.error('KYC STEP 2 GET ERROR:', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
