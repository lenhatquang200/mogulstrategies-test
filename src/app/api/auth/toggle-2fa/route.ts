import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(request: Request) {
    try {
        const session = await auth();
        
        if (!session?.user?.email) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { enabled } = await request.json();

        // Update user's 2FA status
        const user = await prisma.user.update({
            where: { email: session.user.email },
            data: { twoFactorEnabled: enabled },
        });

        return NextResponse.json(
            { 
                message: enabled ? '2FA enabled successfully' : '2FA disabled successfully',
                twoFactorEnabled: user.twoFactorEnabled 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Toggle 2FA error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await auth();
        
        if (!session?.user?.email) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { twoFactorEnabled: true },
        });

        return NextResponse.json(
            { twoFactorEnabled: user?.twoFactorEnabled ?? false },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get 2FA status error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
