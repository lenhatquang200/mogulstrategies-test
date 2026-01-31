import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { EmailService } from '@/services/email.service';
import { CommonService } from '@/services/common.service';

export async function POST(request: Request) {
    try {
        CommonService.log("📝 Register Init API hit");

        const body = await request.json();
        const { email, password, name } = body;

        // Validate required fields
        const missingFields = CommonService.validateRequired(body, ['email', 'password', 'name']);
        if (missingFields.length > 0) {
            return NextResponse.json(
                CommonService.error(`Missing required fields: ${missingFields.join(', ')}`),
                { status: 400 }
            );
        }

        // Validate email format
        if (!CommonService.isValidEmail(email)) {
            return NextResponse.json(
                CommonService.error('Invalid email format'),
                { status: 400 }
            );
        }

        const sanitizedEmail = CommonService.sanitizeEmail(email);

        // Check if user already exists
        if (await AuthService.userExists(sanitizedEmail)) {
            return NextResponse.json(
                CommonService.error('User already exists'),
                { status: 400 }
            );
        }

        // Generate Registration OTP
        // Note: Ensure migration for RegistrationOtp table is run
        const { otp } = await AuthService.generateRegistrationOTP(sanitizedEmail);

        // Send OTP email (using same template as login OTP, or create a specific one if needed)
        // Using sendOTPEmail is generic enough "Verification Code"
        const emailSent = await EmailService.sendOTPEmail(sanitizedEmail, otp);

        if (!emailSent) {
            return NextResponse.json(CommonService.error('Failed to send verification email'), { status: 500 });
        }

        return NextResponse.json(
            CommonService.success('Verification code sent to email')
        );

    } catch (error: any) {
        CommonService.logError('Register Init Error', error);
        return NextResponse.json(
            CommonService.error('Internal server error', error.message),
            { status: 500 }
        );
    }
}
