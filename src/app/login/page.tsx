'use client';
import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Header from '@/components/Header';
import SocialAuth from './SocialAuth';

export default function LoginPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '', accreditationStatus: '' });
    const [status, setStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    // OTP State
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [otpAction, setOtpAction] = useState<'login' | 'register'>('login');
    const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
    const otpInputs = useMemo(() => Array(6).fill(null), []);

    // Helper: Initiate Login Flow (Step 1)
    const initiateLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setLoading(true);
        setStatus(null);
        const currentToast = toast.loading('Checking credentials...');

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

            if (!otpRes.ok) {
                console.log('❌ Send OTP failed:', otpData);
                setStatus({ type: 'error', message: otpData.message || 'Invalid email or password.' });
                toast.error(otpData.message || 'Invalid email or password', { id: currentToast });
                return;
            }

            // If OTP is not required (e.g. for Admin or disabled 2FA), login directly
            if (otpData.data?.twoFactorRequired === false) {
                console.log('✅ OTP not required, logging in directly...');
                toast.loading('Redirecting...', { id: currentToast });
                const res = await signIn('credentials', {
                    redirect: false,
                    email: loginData.email,
                    password: loginData.password,
                });

                if (res?.error) {
                    console.log('❌ Direct login failed:', res.error);
                    setStatus({ type: 'error', message: 'Login failed. Please try again.' });
                    toast.error('Login failed', { id: currentToast });
                } else {
                    console.log('✅ Direct login successful, redirecting...');
                    toast.success('Welcome back!', { id: currentToast });
                    router.push('/investors/kyc1');
                }
                return;
            }

            // OTP is required
            setOtpAction('login');
            setShowOtpForm(true);
            setStatus({ type: 'success', message: 'Verification code sent to your email.' });
            toast.success('Verification code sent!', { id: currentToast });
        } catch (error) {
            console.error('💥 Login process error:', error);
            setStatus({ type: 'error', message: 'An unexpected error occurred.' });
            toast.error('Connection error. Please try again.', { id: currentToast });
        } finally {
            setLoading(false);
        }
    };

    const getDeviceInfo = () => {
        if (typeof window === 'undefined') return 'Unknown';
        return navigator.userAgent;
    };

    const logLoginActivity = async () => {
        try {
            await fetch("/api/activity-log", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "LOGIN",
                    details: getDeviceInfo(),
                }),
            });
        } catch (err) {
            console.warn('Failed to log activity', err);
        }
    };

    // Helper: Verify OTP (Step 2 for both Login and Register)
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        const otpString = otpCode.join('');
        if (otpString.length !== 6) {
            setStatus({ type: 'error', message: 'Please enter all 6 digits.' });
            return;
        }

        const verifyToast = toast.loading(otpAction === 'register' ? 'Verifying & Creating Account...' : 'Verifying code...');

        try {
            if (otpAction === 'login') {
                // --- LOGIN FLOW ---
                const verifyRes = await fetch('/api/auth/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: loginData.email,
                        otp: otpString,
                    }),
                });

                const verifyData = await verifyRes.json();
                if (!verifyRes.ok) {
                    setStatus({ type: 'error', message: verifyData.message || 'Invalid verification code.' });
                    toast.error(verifyData.message || 'Invalid code', { id: verifyToast });
                    return;
                }

                // OTP Verified, now sign in
                const res = await signIn('credentials', {
                    redirect: false,
                    email: loginData.email,
                    password: loginData.password,
                });

                if (res?.error) {
                    setStatus({ type: 'error', message: 'Login failed.' });
                    toast.error('Login failed', { id: verifyToast });
                } else {
                    toast.success('Login successful!', { id: verifyToast });
                    await logLoginActivity();
                    router.push('/investors/kyc1');
                }

            } else {
                // --- REGISTER FLOW ---
                // Call the final register endpoint which verifies OTP and creates user
                const regRes = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        // Send all registration data + OTP
                        name: registerData.name,
                        email: registerData.email,
                        password: registerData.password,
                        accreditationStatus: registerData.accreditationStatus,
                        otp: otpString
                    }),
                });

                const regData = await regRes.json();

                if (!regRes.ok) {
                    setStatus({ type: 'error', message: regData.message || 'Verification failed.' });
                    toast.error(regData.message || 'Verification failed', { id: verifyToast });
                    return;
                }

                toast.success('Account created! Logging in...', { id: verifyToast });

                // Auto Login
                const res = await signIn('credentials', {
                    redirect: false,
                    email: registerData.email,
                    password: registerData.password,
                });

                if (res?.error) {
                    // Account created but auto-login failed (rare)
                    setStatus({ type: 'success', message: 'Account created. Please login.' });
                    setActiveTab('login');
                    setShowOtpForm(false);
                    setOtpAction('login');
                } else {
                    await logLoginActivity();
                    router.push('/investors/kyc1');
                }
            }
        } catch (error) {
            console.error('💥 OTP verification error:', error);
            setStatus({ type: 'error', message: 'An unexpected error occurred.' });
            toast.error('Error occurred', { id: verifyToast });
        } finally {
            setLoading(false);
        }
    };

    // Helper: Initiate Registration (Step 1)
    const handleRegisterInit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (registerData.password !== registerData.confirmPassword) {
            setStatus({ type: 'error', message: 'Passwords do not match.' });
            return;
        }

        setLoading(true);
        setStatus(null);
        const regToast = toast.loading('Sending verification code...');

        try {
            const res = await fetch('/api/auth/register-init', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: registerData.name,
                    email: registerData.email,
                    password: registerData.password, // Sent for validation, not stored yet ideally, or handled securely
                    accreditationStatus: registerData.accreditationStatus
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            toast.success('Verification code sent!', { id: regToast });

            // Switch to OTP Form for Registration
            setOtpAction('register');
            setShowOtpForm(true);
            setStatus({ type: 'success', message: 'Please check your email for the verification code.' });
            setOtpCode(['', '', '', '', '', '']); // Clear OTP input

        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
            toast.error(error.message, { id: regToast });
        } finally {
            setLoading(false);
        }
    };

    // --- Input Handlers ---
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleOtpChange = useCallback((index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otpCode];
        newOtp[index] = value;
        setOtpCode(newOtp);
        if (value && index < 5) otpInputs[index + 1]?.focus();
    }, [otpCode]);

    const handleOtpKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otpCode[index] && index > 0) otpInputs[index - 1]?.focus();
    }, [otpCode]);

    const handleOtpPaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        const digits = pastedData.split('').filter(char => /\d/.test(char));
        const newOtp = [...otpCode];
        digits.forEach((digit, index) => { if (index < 6) newOtp[index] = digit; });
        setOtpCode(newOtp);
        const lastFilledIndex = Math.min(digits.length - 1, 5);
        otpInputs[lastFilledIndex]?.focus();
    }, [otpCode]);

    const handleSocialAuth = (provider: string) => {
        if(provider == 'google') {
            signIn(provider, {
                callbackUrl: `/login/social-success?provider=${provider}`, //callbackUrl: "/investors/kyc1",
            })
        } else {
            alert(`Social login (${provider}) is developing...`);
        }
    }

    // --- Render ---
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
                            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('register'); setShowOtpForm(false); setStatus(null); }}
                        >
                            Register
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('login'); setShowOtpForm(false); setStatus(null); }}
                        >
                            Login
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

                    {/* Shared OTP Verification Form (Used for both Login 2FA and Registration Verify) */}
                    {showOtpForm && (
                        <div className="tab-content active">
                            <form onSubmit={handleVerifyOtp}>
                                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                    <p style={{ color: '#e0e0e0', fontSize: '0.95rem' }}>
                                        Enter the 6-digit verification code sent to<br />
                                        <strong style={{ color: '#D4AF37' }}>
                                            {otpAction === 'login' ? loginData.email : registerData.email}
                                        </strong>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label>Verification Code</label>
                                    <div style={{
                                        display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem'
                                    }}>
                                        {[0, 1, 2, 3, 4, 5].map((index) => (
                                            <input
                                                key={index} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={1}
                                                ref={(el) => { otpInputs[index] = el; }}
                                                value={otpCode[index]}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                onPaste={index === 0 ? handleOtpPaste : undefined}
                                                style={{
                                                    width: '50px', height: '50px', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold',
                                                    background: '#0A1A2F', border: '2px solid #D4AF37', borderRadius: '8px',
                                                    color: '#E0E0E0', outline: 'none', transition: 'all 0.2s ease'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#FFD700'}
                                                onBlur={(e) => e.target.style.borderColor = '#D4AF37'}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? (otpAction === 'register' ? 'Creating Account...' : 'Verifying...') : (otpAction === 'register' ? 'Verify & Create Account' : 'Verify & Login')}
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
                                ← Back
                            </button>
                            <button
                                onClick={() => otpAction === 'login' ? initiateLogin() : handleRegisterInit()}
                                className="switch-link"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', marginTop: '0.5rem' }}
                                disabled={loading}
                            >
                                Resend Code
                            </button>
                        </div>
                    )}

                    {/* Login Form */}
                    {activeTab === 'login' && !showOtpForm && (
                        <div id="login" className="tab-content active">
                            <form onSubmit={initiateLogin}>
                                <div className="form-group">
                                    <label htmlFor="login-email">Email Address</label>
                                    <input
                                        type="email" id="login-email" name="email" required placeholder="your@email.com"
                                        value={loginData.email} onChange={handleLoginChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="login-password">Password</label>
                                    <input
                                        type="password" id="login-password" name="password" required placeholder="••••••••"
                                        value={loginData.password} onChange={handleLoginChange}
                                    />
                                </div>
                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Secure Login'}
                                </button>
                            </form>
                            <a href="#" className="switch-link">Forgot password?</a>
                            <SocialAuth onAuth={handleSocialAuth} />
                        </div>
                    )}

                    {/* Registration Form */}
                    {activeTab === 'register' && !showOtpForm && (
                        <div id="register" className="tab-content active">
                            <form onSubmit={handleRegisterInit}>
                                <div className="form-group">
                                    <label htmlFor="reg-name">Full Name</label>
                                    <input
                                        type="text" id="reg-name" name="name" required placeholder="John Doe"
                                        value={registerData.name} onChange={handleRegisterChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reg-email">Email Address</label>
                                    <input
                                        type="email" id="reg-email" name="email" required placeholder="your@email.com"
                                        value={registerData.email} onChange={handleRegisterChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reg-password">Password</label>
                                    <input
                                        type="password" id="reg-password" name="password" required placeholder="Create strong password"
                                        value={registerData.password} onChange={handleRegisterChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reg-confirm">Confirm Password</label>
                                    <input
                                        type="password" id="reg-confirm" name="confirmPassword" required placeholder="Confirm password"
                                        value={registerData.confirmPassword} onChange={handleRegisterChange}
                                    />
                                    {registerData.confirmPassword && registerData.password !== registerData.confirmPassword && (
                                        <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                            Passwords do not match.
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reg-accredited">Accreditation Status *</label>
                                    <select
                                        id="reg-accredited" name="accreditationStatus" required style={{ width: '100%' }}
                                        value={registerData.accreditationStatus} onChange={handleRegisterChange}
                                    >
                                        <option value="">Select your status...</option>
                                        <option value="individual">Accredited Individual Investor</option>
                                        <option value="family">Family Office</option>
                                        <option value="institution">Institutional Investor</option>
                                        <option value="advisor">Registered Investment Advisor</option>
                                    </select>
                                </div>
                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? 'Processing...' : 'Request Access'}
                                </button>
                            </form>
                            
                            <SocialAuth onAuth={handleSocialAuth} />

                            <p className="disclaimer">
                                Registration is subject to verification of accredited investor status per SEC guidelines.
                                You will receive a verification code to complete your registration.
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
