import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        console.log("📝 Register API hit");
        const body = await request.json();
        console.log("📦 Request body:", JSON.stringify({ ...body, password: "***" }, null, 2));

        const { email, password, name, accreditationStatus } = body;

        if (!email || !password) {
            console.warn("⚠️ Missing email or password");
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        console.log(`🔍 Checking existing user: ${email}`);
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        console.log("👤 Existing user result:", existingUser ? "Found" : "Not Found");

        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        console.log("🔐 Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        console.log("💾 Creating user in DB...");
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                accreditationStatus,
            },
        });
        console.log("✅ User created successfully:", user.id);

        return NextResponse.json(
            { message: 'User created successfully', userId: user.id },
            { status: 201 }
        );
    } catch (error) {
        console.error('❌ Registration error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
