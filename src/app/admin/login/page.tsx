'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaUserShield, FaLock, FaUser, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const loginToast = toast.loading('Verifying credentials...');

        try {
            console.log('🔍 Starting admin login for:', email);
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            console.log('📡 Admin login result:', result);

            if (result?.error) {
                console.error('❌ Admin login failed:', result.error);
                setError('Invalid email or password');
                toast.error('Invalid email or password', { id: loginToast });
                setIsLoading(false);
            } else {
                console.log('✅ Admin login successful, redirecting...');
                toast.success('Login successful! Redirecting...', { id: loginToast });
                setIsLoading(false); // Stop loading before redirect
                router.push('/admin');
            }
        } catch (err) {
            console.error('💥 Admin login exception:', err);
            setError('Something went wrong. Please try again.');
            toast.error('An unexpected error occurred', { id: loginToast });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* Back to Site Link */}
            <Link
                href="/"
                className="fixed top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-mogul-gold transition-colors duration-300"
            >
                <FaArrowLeft /> Back to Website
            </Link>

            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-mogul-gold/10 border border-mogul-gold/30 mb-4 animate-pulse-glow">
                        <FaUserShield className="text-4xl text-mogul-gold" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-mogul-gold mb-2">Admin Portal</h1>
                    <p className="text-gray-400">Secure Access for Mogul Strategies Administrators</p>
                </div>

                {/* Login Card */}
                <div className="bg-mogul-darker/80 backdrop-blur-xl border border-mogul-gold/20 rounded-2xl p-8 shadow-2xl animate-pulse-glow">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Admin Email</label>
                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-mogul-gold/50" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@mogulstrategies.com"
                                    className="w-full pl-12 pr-4 py-4 bg-black/50 border border-mogul-gold/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-mogul-gold focus:ring-1 focus:ring-mogul-gold transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <Link href="#" className="text-xs text-mogul-gold hover:text-white transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-mogul-gold/50" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-black/50 border border-mogul-gold/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-mogul-gold focus:ring-1 focus:ring-mogul-gold transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-2 ml-1">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded border-mogul-gold/20 bg-black text-mogul-gold focus:ring-mogul-gold"
                            />
                            <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer select-none">
                                Remember this device for 30 days
                            </label>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`
                w-full py-4 rounded-xl font-bold text-lg transition-all duration-500
                ${isLoading
                                    ? 'bg-mogul-gold/50 text-mogul-dark cursor-not-allowed'
                                    : 'bg-mogul-gold text-mogul-dark hover:bg-white hover:scale-[1.02] shadow-[0_0_20px_rgba(212,175,55,0.3)]'}
              `}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-mogul-dark border-t-transparent rounded-full animate-spin"></div>
                                    Verifying...
                                </div>
                            ) : (
                                'Sign In to Dashboard'
                            )}
                        </button>
                    </form>

                    {/* Security Notice */}
                    <div className="mt-8 pt-6 border-t border-mogul-gold/10 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
                            Authorized Personnel Only<br />
                            Internal IP Whitelisting Active
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
