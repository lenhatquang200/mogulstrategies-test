import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { EmailService } from '@/services/email.service';
import { CommonService } from '@/services/common.service';

export async function POST(request: Request) {
    try {
        CommonService.log("📝 Register API hit");
        
        // Check environment variables
        CommonService.log("🔍 Environment check:");
        CommonService.log("DATABASE_URL:", process.env.DATABASE_URL ? "✓ Set" : "✗ Missing");
        CommonService.log("SMTP_HOST:", process.env.SMTP_HOST ? "✓ Set" : "✗ Missing");
        CommonService.log("SMTP_USER:", process.env.SMTP_USER ? "✓ Set" : "✗ Missing");
        CommonService.log("SMTP_PASS:", process.env.SMTP_PASS ? "✓ Set" : "✗ Missing");
        CommonService.log("JWT_SECRET:", process.env.JWT_SECRET ? "✓ Set" : "✗ Missing");
        
        const body = await request.json();
        CommonService.log("📦 Request body:", { ...body, password: "***" });

        const { email, password, name, accreditationStatus } = body;

        // Validate required fields
        const missingFields = CommonService.validateRequired(body, ['email', 'password']);
        if (missingFields.length > 0) {
            CommonService.log(`⚠️ Missing fields: ${missingFields.join(', ')}`);
            return NextResponse.json(
                CommonService.error(`Missing required fields: ${missingFields.join(', ')}`),
                { status: 400 }
            );
        }

        // Validate email format
        if (!CommonService.isValidEmail(email)) {
            CommonService.log("⚠️ Invalid email format");
            return NextResponse.json(
                CommonService.error('Invalid email format'),
                { status: 400 }
            );
        }

        // Check if user already exists
        const sanitizedEmail = CommonService.sanitizeEmail(email);
        CommonService.log(`🔍 Checking existing user: ${sanitizedEmail}`);
        
        if (await AuthService.userExists(sanitizedEmail)) {
            CommonService.log("👤 User already exists");
            return NextResponse.json(
                CommonService.error('User already exists'),
                { status: 400 }
            );
        }

        // Create user
        CommonService.log("💾 Creating user in DB...");
        CommonService.log("🔍 User data to create:", {
            email: sanitizedEmail,
            password: "***",
            name,
            accreditationStatus
        });
        
        let user;
        try {
            user = await AuthService.createUser({
                email: sanitizedEmail,
                password,
                name,
                accreditationStatus,
            });
            CommonService.log(`✅ User created successfully: ${user.id}`);
            CommonService.log("👤 Created user details:", {
                id: user.id,
                email: user.email,
                name: user.name,
                roleId: user.roleId,
                twoFactorEnabled: user.twoFactorEnabled
            });
        } catch (createError) {
            console.error('💥 User creation error:', createError);
            throw createError;
        }

        // Send welcome email
        CommonService.log("📧 Sending welcome email...");
        const [emailSent, emailError] = await CommonService.handleAsync(
            () => EmailService.sendWelcomeEmail(sanitizedEmail, name || 'Investor'),
            'Failed to send welcome email'
        );

        if (emailError) {
            CommonService.logError("Email sending failed", emailError);
        } else {
            CommonService.log("✅ Welcome email sent successfully");
        }

        return NextResponse.json(
            CommonService.success(
                'Registration successful! Please check your email for confirmation.',
                { userId: user.id, emailSent: !!emailSent }
            ),
            { status: 201 }
        );
    } catch (error) {
        CommonService.logError('Registration error', error);
        console.error('💥 Full registration error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            name: error instanceof Error ? error.name : undefined,
            raw: error
        });
        
        // Check for specific database errors
        if (error instanceof Error) {
            if (error.message.includes('Database') || error.message.includes('prisma')) {
                console.error('🗄️ Database connection error - check DATABASE_URL');
            }
            if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
                console.error('🌐 Network error - check database host');
            }
        }
        
        return NextResponse.json(
            CommonService.error('Internal server error'),
            { status: 500 }
        );
    }
}
