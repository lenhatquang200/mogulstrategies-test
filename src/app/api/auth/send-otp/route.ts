import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { EmailService } from '@/services/email.service';
import { CommonService } from '@/services/common.service';

export async function POST(request: Request) {
    try {
        CommonService.log(" Send OTP API hit");
        const body = await request.json();
        CommonService.log(" Request body:", { ...body, password: "***" });

        const { email, password } = body;

        // Validate required fields
        const missingFields = CommonService.validateRequired(body, ['email', 'password']);
        if (missingFields.length > 0) {
            CommonService.log(` Missing fields: ${missingFields.join(', ')}`);
            return NextResponse.json(
                CommonService.error(`Missing required fields: ${missingFields.join(', ')}`),
                { status: 400 }
            );
        }

        // Validate credentials
        const sanitizedEmail = CommonService.sanitizeEmail(email);
        CommonService.log(` Validating credentials for: ${sanitizedEmail}`);
        
        const user = await AuthService.validateCredentials({ email: sanitizedEmail, password });
        CommonService.log(` Credentials valid for user: ${user.id}`);

        // Check if 2FA is enabled
        if (!user.twoFactorEnabled) {
            CommonService.log(" 2FA not enabled for this user");
            return NextResponse.json(
                CommonService.success('Login successful', { twoFactorRequired: false }),
                { status: 200 }
            );
        }

        // Generate and send OTP
        CommonService.log(" Generating OTP...");
        const { otp, expiry } = await AuthService.generateOTP(user.id);
        CommonService.log(` OTP generated, expires at: ${expiry}`);

        // Send OTP email
        CommonService.log(" Sending OTP email...");
        const [emailSent, emailError] = await CommonService.handleAsync(
            () => EmailService.sendOTPEmail(sanitizedEmail, otp),
            'Failed to send OTP email'
        );

        if (emailError) {
            CommonService.logError("OTP email sending failed", emailError);
            return NextResponse.json(
                CommonService.error('Failed to send verification code'),
                { status: 500 }
            );
        }

        CommonService.log(" OTP email sent successfully");
        return NextResponse.json(
            CommonService.success('Verification code sent to your email', { 
                twoFactorRequired: true,
                email: sanitizedEmail
            }),
            { status: 200 }
        );

    } catch (error) {
        CommonService.logError('Send OTP error', error);
        
        // Don't reveal specific errors for security
        return NextResponse.json(
            CommonService.error('Invalid credentials'),
            { status: 401 }
        );
    }
}
