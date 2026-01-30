import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { EmailService } from '@/services/email.service';
import { CommonService } from '@/services/common.service';

export async function POST(request: Request) {
    try {
        CommonService.log(" Send OTP API hit");
        const body = await request.json();
        CommonService.log(" Request body:", { ...body, password: "***" });

        const { email, password, role } = body;

        // Validate required fields
        const missingFields = CommonService.validateRequired(body, ['email', 'password']);
        if (missingFields.length > 0) {
            CommonService.log(` Missing fields: ${missingFields.join(', ')}`);
            return NextResponse.json(
                CommonService.error(`Missing required fields: ${missingFields.join(', ')}`),
                { status: 400 }
            );
        }

        // Validate role if provided
        if (role && !['INVESTOR', 'ADMIN'].includes(role)) {
            CommonService.log(" Invalid role");
            return NextResponse.json(
                CommonService.error('Invalid role'),
                { status: 400 }
            );
        }

        // Validate credentials with role check
        const sanitizedEmail = CommonService.sanitizeEmail(email);
        CommonService.log(` Validating credentials for: ${sanitizedEmail}${role ? ` (${role})` : ''}`);
        
        const user = await AuthService.validateCredentials({ 
            email: sanitizedEmail, 
            password,
            role: role as 'INVESTOR' | 'ADMIN' | undefined
        });
        CommonService.log(` Credentials valid for user: ${user.id} (${user.role.name})`);

        // Always require OTP for all users
        CommonService.log(" Always requiring OTP for security");

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
