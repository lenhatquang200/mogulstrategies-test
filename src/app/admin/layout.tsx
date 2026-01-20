'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: 'fa-tachometer-alt' },
        { name: 'User Management', href: '/admin/usermanage', icon: 'fa-users' },
        { name: 'KYC & Accreditation', href: '/admin/kycmanage', icon: 'fa-user-check' },
        { name: 'Investor Relations / CRM', href: '/admin/investorcrm', icon: 'fa-user-tie' },
        { name: 'Offerings & Syndications', href: '/admin/offeringssyndications', icon: 'fa-handshake' },
        { name: 'Documents & Reports', href: '/admin/documentmanager', icon: 'fa-file-alt' },
        { name: 'Distributions & Capital Calls', href: '/admin/callsdistributions', icon: 'fa-dollar-sign' },
        { name: 'Notifications', href: '/admin/notificationsmanager', icon: 'fa-bell' },
        { name: 'Secure Messaging', href: '/admin/messaging', icon: 'fa-envelope' },
        { name: 'Events & Webinars', href: '/admin/eventswebinars', icon: 'fa-calendar' },
        { name: 'Resource Library', href: '/admin/resourcemanager', icon: 'fa-book' },
        { name: 'Analytics & Reporting', href: '/admin/reporting', icon: 'fa-chart-bar' },
        { name: 'Compliance & Moderation', href: '/admin/moderation', icon: 'fa-shield-alt' },
        { name: 'System Settings', href: '/admin/settings', icon: 'fa-cog' },
    ];

    return (
        <div className="admin-portal-layout">
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                style={{
                    position: 'fixed', top: '1rem', left: '1rem', zIndex: 1100,
                    background: 'none', border: 'none', color: '#D4AF37', fontSize: '2rem',
                    display: isSidebarOpen ? 'none' : 'block'
                }}
                className="mobile-hamburger"
            >
                ☰
            </button>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`} style={{
                width: '280px', background: 'rgba(17, 34, 64, 0.9)', backdropFilter: 'blur(10px)',
                padding: '2rem 0', position: 'fixed', left: 0, top: 0, bottom: 0,
                overflowY: 'auto', zIndex: 1000, transition: 'transform 0.3s ease',
                transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                borderRight: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
                <div style={{ padding: '0 2rem', marginBottom: '1rem' }}>
                    <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '1.5rem', cursor: 'pointer', float: 'right' }}>✕</button>
                </div>
                <Link href="/admin" className="admin-logo" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', fontSize: '2.2rem', color: '#D4AF37', fontWeight: 'bold', marginBottom: '3rem' }}>
                    Mogul Admin
                </Link>
                <ul className="admin-nav">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className={pathname === item.href ? 'active' : ''}>
                                <i className={`fas ${item.icon}`} style={{ marginRight: '1rem', width: '20px', textAlign: 'center' }}></i>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            style={{
                                width: '100%',
                                background: 'none',
                                border: 'none',
                                color: '#E0E0E0',
                                padding: '1rem 2rem',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'all 0.3s'
                            }}
                            className="admin-logout-btn"
                        >
                            <i className="fas fa-sign-out-alt" style={{ marginRight: '1rem', width: '20px', textAlign: 'center' }}></i>
                            Logout
                        </button>
                    </li>

                </ul>
            </aside>

            {/* Main Content */}
            <main style={{
                marginLeft: isSidebarOpen ? '280px' : '0',
                padding: '2rem',
                width: isSidebarOpen ? 'calc(100% - 280px)' : '100%',
                transition: 'all 0.3s ease',
                minHeight: '100vh'
            }}>
                {children}
                <footer style={{ textAlign: 'center', padding: '3rem 0', fontSize: '0.9rem', color: '#AAAAAA' }}>
                    <p>&copy; 2025 Mogul Strategies Inc. | Admin Portal</p>
                </footer>
            </main>

            {/* Load FontAwesome for icons */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

            <style jsx>{`
        .admin-sidebar::-webkit-scrollbar { width: 5px; }
        .admin-sidebar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); }
        .admin-sidebar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.3); border-radius: 10px; }
        
        @media (max-width: 1024px) {
           .mobile-hamburger { display: block !important; }
        }
      `}</style>
        </div>
    );
}
