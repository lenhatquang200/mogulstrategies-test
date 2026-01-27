import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Mogul Strategies" <noreply@mogulstrategies.com>',
            to: email,
            subject: 'Your Login Verification Code - Mogul Strategies',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a192f; color: #e0e0e0;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #D4AF37; margin: 0;">Mogul Strategies</h1>
                    </div>
                    <div style="background: #112240; padding: 30px; border-radius: 12px; text-align: center;">
                        <h2 style="color: #D4AF37; margin-top: 0;">Verification Code</h2>
                        <p style="font-size: 16px; color: #e0e0e0;">Use the following code to complete your login:</p>
                        <div style="background: #0a192f; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #D4AF37;">${otp}</span>
                        </div>
                        <p style="font-size: 14px; color: #888;">This code will expire in 5 minutes.</p>
                        <p style="font-size: 14px; color: #888;">If you didn't request this code, please ignore this email.</p>
                    </div>
                    <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
                        <p>© 2026 Mogul Strategies. All rights reserved.</p>
                    </div>
                </div>
            `,
        });
        return true;
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        return false;
    }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Mogul Strategies" <kendev2021@gmail.com>',
            to: email,
            subject: 'Welcome to Mogul Strategies - Registration Successful',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a192f; color: #e0e0e0;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #D4AF37; margin: 0;">Mogul Strategies</h1>
                        <p style="color: #888; margin: 5px 0;">Elite Investment Management</p>
                    </div>
                    <div style="background: #112240; padding: 30px; border-radius: 12px; text-align: center;">
                        <h2 style="color: #D4AF37; margin-top: 0;">Welcome, ${name}!</h2>
                        <p style="font-size: 16px; color: #e0e0e0; margin-bottom: 20px;">
                            Thank you for registering with Mogul Strategies. Your account has been successfully created.
                        </p>
                        <div style="background: #0a192f; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #D4AF37; margin-top: 0;">Account Details</h3>
                            <p style="color: #e0e0e0; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                            <p style="color: #e0e0e0; margin: 5px 0;"><strong>Status:</strong> Registered</p>
                            <p style="color: #e0e0e0; margin: 5px 0;"><strong>2FA:</strong> Enabled (Email OTP)</p>
                        </div>
                        <div style="margin: 30px 0;">
                            <a href="http://localhost:3000/login" 
                               style="background: #D4AF37; color: #0a192f; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                                Login to Your Account
                            </a>
                        </div>
                        <p style="font-size: 14px; color: #888; margin-top: 20px;">
                            For security, you'll receive a verification code via email when logging in.
                        </p>
                    </div>
                    <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
                        <p>© 2026 Mogul Strategies. All rights reserved.</p>
                        <p>This is an automated message. Please do not reply to this email.</p>
                    </div>
                </div>
            `,
        });
        return true;
    } catch (error) {
        console.error('Failed to send welcome email:', error);
        return false;
    }
}

export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
