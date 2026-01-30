'use client';
import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function LoginPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '', accreditationStatus: '' });
    const [status, setStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
    const otpInputs = useMemo(() => Array(6).fill(null), []);

    // Login Handler - Step 1: Check credentials and 2FA status
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            console.log('🔍 Starting login process for:', loginData.email);
            
            // First, check if 2FA is enabled and send OTP
            const otpRes = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: loginData.email,
                    password: loginData.password,
                }),
            });

            console.log('📡 Send OTP response status:', otpRes.status);
            const otpData = await otpRes.json();
            console.log('📦 Send OTP response data:', otpData);

            if (!otpRes.ok) {
                console.log('❌ Send OTP failed:', otpData);
                setStatus({ type: 'error', message: otpData.message || 'Invalid email or password.' });
                return;
            }

            // Always show OTP form for security
            setShowOtpForm(true);
            setStatus({ type: 'success', message: 'Verification code sent to your email.' });
        } catch (error) {
            console.error('💥 Login process error:', error);
            setStatus({ type: 'error', message: 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    // Handle OTP input changes
    const handleOtpChange = useCallback((index: number, value: string) => {
        if (value.length > 1) return; // Only allow single digit
        
        const newOtp = [...otpCode];
        newOtp[index] = value;
        setOtpCode(newOtp);
        
        // Auto focus next input
        if (value && index < 5) {
            otpInputs[index + 1]?.focus();
        }
    }, [otpCode]);
    
    // Handle OTP key down
    const handleOtpKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
            otpInputs[index - 1]?.focus();
        }
    }, [otpCode]);

    // Handle OTP paste
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
        
        // Focus last filled input
        const lastFilledIndex = Math.min(digits.length - 1, 5);
        otpInputs[lastFilledIndex]?.focus();
    }, [otpCode]);

    // Login Handler - Step 2: Verify OTP and complete login
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const otpString = otpCode.join('');
            console.log('🔍 Starting OTP verification for:', loginData.email);
            console.log('🔢 OTP entered:', otpString);
            
            if (otpString.length !== 6) {
                setStatus({ type: 'error', message: 'Please enter all 6 digits.' });
                return;
            }

            // Verify OTP
            const verifyRes = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: loginData.email,
                    otp: otpString,
                }),
            });

            console.log('📡 Verify OTP response status:', verifyRes.status);
            const verifyData = await verifyRes.json();
            console.log('📦 Verify OTP response data:', verifyData);

            if (!verifyRes.ok) {
                setStatus({ type: 'error', message: verifyData.message || 'Invalid verification code.' });
                return;
            }

            // OTP verified, proceed with login
            const res = await signIn('credentials', {
                redirect: false,
                email: loginData.email,
                password: loginData.password,
            });

            if (res?.error) {
                console.log('❌ NextAuth login failed:', res.error);
                setStatus({ type: 'error', message: 'Login failed. Please try again.' });
            } else {
                console.log('✅ Login successful, redirecting...');
                router.push('/investors/portfoliosummary');
            }
        } catch (error) {
            console.error('💥 OTP verification error:', error);
            setStatus({ type: 'error', message: 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    // Register Handler
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (registerData.password !== registerData.confirmPassword) {
            setStatus({ type: 'error', message: 'Passwords do not match.' });
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: registerData.name,
                    email: registerData.email,
                    password: registerData.password,
                    accreditationStatus: registerData.accreditationStatus,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setStatus({ type: 'success', message: 'Registration successful! Please check your email for confirmation.' });
            setActiveTab('login');
            setLoginData({ email: registerData.email, password: '' }); // Pre-fill email
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Header />
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                paddingTop: '100px'
            }}>
            <div className="portal-container">
                <div className="logo">
                    <Link href="/" style={{ color: '#D4AF37', textDecoration: 'none' }}>Mogul Strategies</Link>
                </div>
                <p className="tagline">Secure Investors Portal</p>

                <div className="tab-buttons">
                    <button
                        className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('login'); setStatus(null); }}
                    >
                        Login
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('register'); setStatus(null); }}
                    >
                        Register
                    </button>
                </div>

                {status && (
                    <div style={{
                        padding: '1rem',
                        marginBottom: '1rem',
                        borderRadius: '4px',
                        background: status.type === 'error' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)',
                        color: status.type === 'error' ? '#ff6b6b' : '#4ade80',
                        border: `1px solid ${status.type === 'error' ? '#ff6b6b' : '#4ade80'}`
                    }}>
                        {status.message}
                    </div>
                )}

                {/* Login Tab */}
                {activeTab === 'login' && !showOtpForm && (
                    <div id="login" className="tab-content active">
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="login-email">Email Address</label>
                                <input
                                    type="email"
                                    id="login-email"
                                    name="email"
                                    required
                                    placeholder="your@email.com"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="login-password">Password</label>
                                <input
                                    type="password"
                                    id="login-password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                />
                            </div>
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'Logging in...' : 'Secure Login'}
                            </button>
                        </form>
                        <a href="#" className="switch-link">Forgot password?</a>
                    </div>
                )}

                {/* OTP Verification Form */}
                {activeTab === 'login' && showOtpForm && (
                    <div id="otp-verify" className="tab-content active">
                        <form onSubmit={handleVerifyOtp}>
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <p style={{ color: '#e0e0e0', fontSize: '0.95rem' }}>
                                    Enter the 6-digit verification code sent to<br />
                                    <strong style={{ color: '#D4AF37' }}>{loginData.email}</strong>
                                </p>
                            </div>
                            <div className="form-group">
                                <label>Verification Code</label>
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '0.5rem', 
                                    justifyContent: 'center', 
                                    marginBottom: '1rem' 
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
                                                background: '#0A1A2F',
                                                border: '2px solid #D4AF37',
                                                borderRadius: '8px',
                                                color: '#E0E0E0',
                                                outline: 'none',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#FFD700'}
                                            onBlur={(e) => e.target.style.borderColor = '#D4AF37'}
                                        />
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>
                        </form>
                        <button
                            onClick={() => { 
                                setShowOtpForm(false); 
                                setOtpCode(['', '', '', '', '', '']); 
                                setStatus(null); 
                            }}
                            className="switch-link"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', marginTop: '1rem' }}
                        >
                            ← Back to Login
                        </button>
                        <button
                            onClick={handleLogin}
                            className="switch-link"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', marginTop: '0.5rem' }}
                            disabled={loading}
                        >
                            Resend Code
                        </button>
                    </div>
                )}

                {/* Registration Tab */}
                {activeTab === 'register' && (
                    <div id="register" className="tab-content active">
                        <form onSubmit={handleRegister}>
                            <div className="form-group">
                                <label htmlFor="reg-name">Full Name</label>
                                <input
                                    type="text"
                                    id="reg-name"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-email">Email Address</label>
                                <input
                                    type="email"
                                    id="reg-email"
                                    name="email"
                                    required
                                    placeholder="your@email.com"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-password">Password</label>
                                <input
                                    type="password"
                                    id="reg-password"
                                    name="password"
                                    required
                                    placeholder="Create strong password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-confirm">Confirm Password</label>
                                <input
                                    type="password"
                                    id="reg-confirm"
                                    name="confirmPassword"
                                    required
                                    placeholder="Confirm password"
                                    value={registerData.confirmPassword}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-accredited">Accreditation Status *</label>
                                <select
                                    id="reg-accredited"
                                    name="accreditationStatus"
                                    required
                                    style={{ width: '100%' }}
                                    value={registerData.accreditationStatus}
                                    onChange={handleRegisterChange}
                                >
                                    <option value="">Select your status...</option>
                                    <option value="individual">Accredited Individual Investor</option>
                                    <option value="family">Family Office</option>
                                    <option value="institution">Institutional Investor</option>
                                    <option value="advisor">Registered Investment Advisor</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'Registering...' : 'Request Access'}
                            </button>
                        </form>
                        <p className="disclaimer">
                            Registration is subject to verification of accredited investor status per SEC guidelines.
                            You will receive an approval email upon successful verification.
                        </p>
                    </div>
                )}

                <p className="disclaimer" style={{ marginTop: '3rem' }}>
                    For Accredited Investors Only<br />
                    Investments involve risk. Past performance is not indicative of future results.
                </p>
            </div>
        </div>
        </>
    );
}
