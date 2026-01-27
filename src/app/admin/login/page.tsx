'use client';
import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function AdminLoginPage() {
    const router = useRouter();
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
    const otpInputs = useMemo(() => Array(6).fill(null), []);

    // Handle admin login - Step 1: Check credentials and 2FA status
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            // First, check if 2FA is enabled and send OTP
            const otpRes = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: loginData.email,
                    password: loginData.password,
                    role: 'ADMIN' // Specify admin role
                }),
            });

            const otpData = await otpRes.json();

            if (!otpRes.ok) {
                throw new Error(otpData.error || otpData.message || 'Login failed');
            }

            if (otpData.twoFactorRequired) {
                setShowOtpForm(true);
                setStatus({ type: 'success', message: 'Verification code sent to your email' });
            } else {
                // Direct login if 2FA not enabled (should not happen for admin)
                const result = await signIn('credentials', {
                    redirect: false,
                    email: loginData.email,
                    password: loginData.password,
                    role: 'ADMIN'
                });

                if (result?.error) {
                    throw new Error('Invalid credentials');
                }

                setStatus({ type: 'success', message: 'Login successful' });
                router.push('/admin/dashboard');
            }
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    // Handle OTP input changes
    const handleOtpChange = useCallback((index: number, value: string) => {
        if (value.length > 1) return;
        
        const newOtp = [...otpCode];
        newOtp[index] = value;
        setOtpCode(newOtp);
        
        if (value && index < 5) {
            otpInputs[index + 1]?.focus();
        }
    }, [otpCode, otpInputs]);
    
    const handleOtpKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
            otpInputs[index - 1]?.focus();
        }
    }, [otpCode, otpInputs]);

    const handleOtpPaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        const digits = pastedData.split('').filter(char => /\d/.test(char));
        
        const newOtp = [...otpCode];
        digits.forEach((digit, index) => {
            if (index < 6) {
                newOtp[index] = digit;
            }
        });
        setOtpCode(newOtp);
        
        const lastFilledIndex = Math.min(digits.length - 1, 5);
        otpInputs[lastFilledIndex]?.focus();
    }, [otpCode, otpInputs]);

    // Handle OTP verification - Step 2: Complete admin login
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const otpString = otpCode.join('');
            if (otpString.length !== 6) {
                setStatus({ type: 'error', message: 'Please enter complete verification code' });
                return;
            }

            // Verify OTP first
            const verifyRes = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: loginData.email,
                    otp: otpString
                }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
                throw new Error(verifyData.error || verifyData.message || 'Invalid verification code');
            }

            // If OTP verified, proceed with login
            const result = await signIn('credentials', {
                redirect: false,
                email: loginData.email,
                password: loginData.password,
                role: 'ADMIN'
            });

            if (result?.error) {
                throw new Error('Login failed after verification');
            }

            setStatus({ type: 'success', message: 'Login successful!' });
            router.push('/admin/dashboard');
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Header />
            <main style={{ 
                minHeight: '100vh', 
                background: 'linear-gradient(135deg, #0a192f 0%, #112240 50%, #0a192f 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <div style={{
                    background: 'rgba(17, 34, 64, 0.95)',
                    padding: '3rem',
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    width: '100%',
                    maxWidth: '450px',
                    border: '1px solid rgba(212, 175, 55, 0.2)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ 
                            color: '#D4AF37', 
                            fontSize: '2rem', 
                            fontWeight: 'bold',
                            marginBottom: '0.5rem'
                        }}>
                            Admin Portal
                        </h1>
                        <p style={{ color: '#8892b0', fontSize: '1rem' }}>
                            Secure administrator access
                        </p>
                    </div>

                    {status && (
                        <div style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            backgroundColor: status.type === 'error' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(74, 222, 128, 0.1)',
                            border: `1px solid ${status.type === 'error' ? '#ff6b6b' : '#4ade80'}`,
                            color: status.type === 'error' ? '#ff6b6b' : '#4ade80'
                        }}>
                            {status.message}
                        </div>
                    )}

                    {!showOtpForm ? (
                        <form onSubmit={handleLogin}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ 
                                    display: 'block', 
                                    color: '#ccd6f6', 
                                    marginBottom: '0.5rem',
                                    fontSize: '0.9rem',
                                    fontWeight: '500'
                                }}>
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required
                                    placeholder="admin@mogulstrategies.com"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        backgroundColor: '#0a192f',
                                        border: '1px solid rgba(100, 116, 139, 0.3)',
                                        borderRadius: '8px',
                                        color: '#e6f1ff',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ 
                                    display: 'block', 
                                    color: '#ccd6f6', 
                                    marginBottom: '0.5rem',
                                    fontSize: '0.9rem',
                                    fontWeight: '500'
                                }}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                    placeholder="Enter admin password"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        backgroundColor: '#0a192f',
                                        border: '1px solid rgba(100, 116, 139, 0.3)',
                                        borderRadius: '8px',
                                        color: '#e6f1ff',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    backgroundColor: loading ? '#4a5568' : '#D4AF37',
                                    color: '#0a192f',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    marginBottom: '1rem'
                                }}
                            >
                                {loading ? 'Authenticating...' : 'Sign In as Admin'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp}>
                            <div style={{ marginBottom: '2rem' }}>
                                <p style={{ 
                                    color: '#ccd6f6', 
                                    textAlign: 'center',
                                    marginBottom: '1.5rem',
                                    fontSize: '1rem'
                                }}>
                                    Enter the 6-digit code sent to<br />
                                    <strong style={{ color: '#D4AF37' }}>{loginData.email}</strong>
                                </p>
                                
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '0.5rem', 
                                    justifyContent: 'center', 
                                    marginBottom: '1.5rem' 
                                }}>
                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={1}
                                            ref={(el) => { otpInputs[index] = el; }}
                                            value={otpCode[index]}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            onPaste={index === 0 ? handleOtpPaste : undefined}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                textAlign: 'center',
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                                backgroundColor: '#0a192f',
                                                border: '1px solid rgba(212, 175, 55, 0.3)',
                                                borderRadius: '8px',
                                                color: '#D4AF37',
                                                transition: 'all 0.3s ease'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    backgroundColor: loading ? '#4a5568' : '#D4AF37',
                                    color: '#0a192f',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    marginBottom: '1rem'
                                }}
                            >
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowOtpForm(false);
                                    setOtpCode(['', '', '', '', '', '']);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: 'transparent',
                                    color: '#8892b0',
                                    border: '1px solid rgba(136, 146, 176, 0.3)',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                ← Back to Login
                            </button>
                        </form>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Link 
                            href="/login"
                            style={{ 
                                color: '#8892b0', 
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                transition: 'color 0.3s ease'
                            }}
                        >
                            ← Investor Portal
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
