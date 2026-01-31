import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { EmailService } from '@/services/email.service';
import { CommonService } from '@/services/common.service';

export async function POST(request: Request) {
    try {
        CommonService.log("📝 Register Finalize API hit");

        const body = await request.json();
        const { email, password, name, accreditationStatus, otp } = body;

        // Validate required fields
        const missingFields = CommonService.validateRequired(body, ['email', 'password', 'otp']);
        if (missingFields.length > 0) {
            return NextResponse.json(
                CommonService.error(`Missing required fields: ${missingFields.join(', ')}`),
                { status: 400 }
            );
        }

        const sanitizedEmail = CommonService.sanitizeEmail(email);

        // Verify OTP first
        try {
            await AuthService.verifyRegistrationOTP(sanitizedEmail, otp);
        } catch (otpError: any) {
            return NextResponse.json(
                CommonService.error(otpError.message || 'Invalid or expired verification code'),
                { status: 400 }
            );
        }

        // Check if user exists just in case
        if (await AuthService.userExists(sanitizedEmail)) {
            return NextResponse.json(
                CommonService.error('User already exists'),
                { status: 400 }
            );
        }

        // Create user
        CommonService.log("💾 Creating user in DB...");

        let user;
        try {
            user = await AuthService.createUser({
                email: sanitizedEmail,
                password,
                name,
                accreditationStatus,
            });
            CommonService.log(`✅ User created successfully: ${user.id}`);
        } catch (createError) {
            console.error('💥 User creation error:', createError);
            throw createError;
        }

        // Send welcome email
        // We do not await this to return faster response, or await depending on requirement. 
        // User flow: Register -> Success -> Auto Login.
        CommonService.handleAsync(
            () => EmailService.sendWelcomeEmail(sanitizedEmail, name || 'Investor'),
            'Failed to send welcome email'
        );

        return NextResponse.json(
            CommonService.success(
                'Registration successful!',
                { userId: user.id }
            ),
            { status: 201 }
        );
    } catch (error: any) {
        CommonService.logError('Registration error', error);
        return NextResponse.json(
            CommonService.error('Internal server error', error.message),
            { status: 500 }
        );
    }
}
