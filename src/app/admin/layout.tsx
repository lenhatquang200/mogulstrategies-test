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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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
        <div className="portal-layout">
            <header>
                <div className="header-container">
                    <div className="header-left">
                        <button className="hamburger" aria-label="Menu" onClick={toggleSidebar}>☰</button>
                        <Link href="/admin" className="logo">Mogul Admin</Link>
                    </div>
                </div>
            </header>

            {/* Sidebar Navigation */}
            <aside className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`} id="sidebar">
                <ul className="nav-menu">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className={pathname === item.href ? 'active' : ''}>
                                <i className={`fas ${item.icon}`} style={{ marginRight: '0.8rem', width: '20px', textAlign: 'center' }}></i>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="logout"
                            style={{
                                width: '100%',
                                background: 'none',
                                border: 'none',
                                color: '#D4AF37',
                                padding: '0.9rem 2rem',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                                transition: 'all 0.3s',
                                fontWeight: 500
                            }}
                        >
                            <i className="fas fa-sign-out-alt" style={{ marginRight: '0.8rem', width: '20px', textAlign: 'center' }}></i>
                            Logout
                        </button>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main id="main-content" className={isSidebarOpen ? '' : 'expanded'}>
                {children}
                <footer style={{ textAlign: 'center', padding: '3rem 0', marginTop: '4rem', fontSize: '0.9rem', color: '#AAAAAA' }}>
                    <p>&copy; 2025 Mogul Strategies Inc. | Admin Portal</p>
                </footer>
            </main>

            {/* Load FontAwesome for icons */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

            <style jsx>{`
                .sidebar::-webkit-scrollbar { width: 5px; }
                .sidebar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); }
                .sidebar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.3); border-radius: 10px; }
            `}</style>
        </div>
    );
}

