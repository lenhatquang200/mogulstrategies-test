'use client';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            router.push('/admin/login');
            return;
        }

        // Verify admin role (you might want to add this to session)
        setLoading(false);
    }, [session, status, router]);

    if (status === 'loading' || loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#0a192f',
                color: '#D4AF37'
            }}>
                <div>Loading admin dashboard...</div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0a192f 0%, #112240 50%, #0a192f 100%)',
                padding: '2rem'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Admin Header */}
                    <div style={{
                        background: 'rgba(17, 34, 64, 0.95)',
                        padding: '2rem',
                        borderRadius: '16px',
                        marginBottom: '2rem',
                        border: '1px solid rgba(212, 175, 55, 0.2)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}>
                            <div>
                                <h1 style={{
                                    color: '#D4AF37',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem'
                                }}>
                                    Admin Dashboard
                                </h1>
                                <p style={{ color: '#8892b0', fontSize: '1rem' }}>
                                    Welcome back, {session?.user?.name || 'Administrator'}
                                </p>
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: 'transparent',
                                    color: '#ff6b6b',
                                    border: '1px solid #ff6b6b',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Admin Stats */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <div style={{
                            background: 'rgba(17, 34, 64, 0.95)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                            textAlign: 'center'
                        }}>
                            <h3 style={{
                                color: '#D4AF37',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem'
                            }}>
                                24
                            </h3>
                            <p style={{ color: '#8892b0' }}>Total Investors</p>
                        </div>

                        <div style={{
                            background: 'rgba(17, 34, 64, 0.95)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                            textAlign: 'center'
                        }}>
                            <h3 style={{
                                color: '#D4AF37',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem'
                            }}>
                                $2.4M
                            </h3>
                            <p style={{ color: '#8892b0' }}>Assets Under Management</p>
                        </div>

                        <div style={{
                            background: 'rgba(17, 34, 64, 0.95)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                            textAlign: 'center'
                        }}>
                            <h3 style={{
                                color: '#D4AF37',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem'
                            }}>
                                18.5%
                            </h3>
                            <p style={{ color: '#8892b0' }}>Average Returns</p>
                        </div>

                        <div style={{
                            background: 'rgba(17, 34, 64, 0.95)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                            textAlign: 'center'
                        }}>
                            <h3 style={{
                                color: '#D4AF37',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem'
                            }}>
                                3
                            </h3>
                            <p style={{ color: '#8892b0' }}>Active Funds</p>
                        </div>
                    </div>

                    {/* Admin Actions */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        <div style={{
                            background: 'rgba(17, 34, 64, 0.95)',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(212, 175, 55, 0.2)'
                        }}>
                            <h3 style={{
                                color: '#D4AF37',
                                fontSize: '1.3rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem'
                            }}>
                                User Management
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <button style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#D4AF37',
                                    color: '#0a192f',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}>
                                    View All Investors
                                </button>
                                <button style={{
                                    padding: '0.75rem',
                                    backgroundColor: 'transparent',
                                    color: '#D4AF37',
                                    border: '1px solid #D4AF37',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}>
                                    Create Admin Account
                                </button>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(17, 34, 64, 0.95)',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(212, 175, 55, 0.2)'
                        }}>
                            <h3 style={{
                                color: '#D4AF37',
                                fontSize: '1.3rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem'
                            }}>
                                Fund Management
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <button style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#D4AF37',
                                    color: '#0a192f',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}>
                                    Manage Funds
                                </button>
                                <button style={{
                                    padding: '0.75rem',
                                    backgroundColor: 'transparent',
                                    color: '#D4AF37',
                                    border: '1px solid #D4AF37',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}>
                                    Performance Reports
                                </button>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(17, 34, 64, 0.95)',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(212, 175, 55, 0.2)'
                        }}>
                            <h3 style={{
                                color: '#D4AF37',
                                fontSize: '1.3rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem'
                            }}>
                                System Settings
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <button style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#D4AF37',
                                    color: '#0a192f',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}>
                                    Email Configuration
                                </button>
                                <button style={{
                                    padding: '0.75rem',
                                    backgroundColor: 'transparent',
                                    color: '#D4AF37',
                                    border: '1px solid #D4AF37',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}>
                                    Security Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
