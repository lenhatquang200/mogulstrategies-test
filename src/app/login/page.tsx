'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [status, setStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    // Login Handler
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: loginData.email,
                password: loginData.password,
            });

            if (res?.error) {
                setStatus({ type: 'error', message: 'Invalid email or password.' });
            } else {
                // Successful login
                router.push('/investors/portfoliosummary');
            }
        } catch (error) {
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
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setStatus({ type: 'success', message: 'Registration successful! Please login.' });
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

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
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
                {activeTab === 'login' && (
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
                                <select id="reg-accredited" name="reg-accredited" required style={{ width: '100%' }}>
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
    );
}
