import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { CommonService } from '@/services/common.service';

export async function POST(request: Request) {
    try {
        CommonService.log(" Verify OTP API hit");
        const body = await request.json();
        CommonService.log(" Request body:", body);

        const { email, otp } = body;

        // Validate required fields
        const missingFields = CommonService.validateRequired(body, ['email', 'otp']);
        if (missingFields.length > 0) {
            CommonService.log(` Missing fields: ${missingFields.join(', ')}`);
            return NextResponse.json(
                CommonService.error(`Missing required fields: ${missingFields.join(', ')}`),
                { status: 400 }
            );
        }

        // Validate OTP format
        if (!/^\d{6}$/.test(otp)) {
            CommonService.log(" Invalid OTP format");
            return NextResponse.json(
                CommonService.error('Invalid verification code format'),
                { status: 400 }
            );
        }

        // Verify OTP
        const sanitizedEmail = CommonService.sanitizeEmail(email);
        CommonService.log(` Verifying OTP for: ${sanitizedEmail}`);
        
        await AuthService.verifyOTP(sanitizedEmail, otp);
        CommonService.log(" OTP verification successful");

        return NextResponse.json(
            CommonService.success('Verification successful', { verified: true }),
            { status: 200 }
        );

    } catch (error) {
        CommonService.logError('Verify OTP error', error);
        
        // Return specific error messages for OTP verification
        const errorMessage = error instanceof Error ? error.message : 'Invalid verification code';
        
        return NextResponse.json(
            CommonService.error(errorMessage),
            { status: 400 }
        );
    }
}
