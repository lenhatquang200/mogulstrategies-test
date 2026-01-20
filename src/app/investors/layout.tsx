'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function InvestorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const navItems = [
        { name: 'KYC & Accreditation', href: '/investors/kyc1' },
        { name: 'Active Offerings', href: '/investors/activeofferings' },
        { name: 'Syndications', href: '/investors/syndications' },
        { name: 'Subscription Center', href: '/investors/subscriptioncenter' },
        { name: 'My Investments', href: '/investors/myinvestments' },
        { name: 'Portfolio Summary', href: '/investors/portfoliosummary' },
        { name: 'Performance Analytics', href: '/investors/performanceanalytics' },
        { name: 'Documents & Reports', href: '/investors/docsreports' },
        { name: 'Distributions & Tax', href: '/investors/distributionstax' },
        { name: 'Capital Calls', href: '/investors/capitalcalls' },
        { name: 'Notifications', href: '/investors/notifications' },
        { name: 'Secure Messaging', href: '/investors/securemessaging' },
        { name: 'Webinars & Events', href: '/investors/events' },
        { name: 'Resource Library', href: '/investors/resourcelibrary' },
        { name: 'Support & FAQ', href: '/investors/supportfaq' },
    ];

    return (
        <div className="portal-layout">
            {/* Header */}
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)', zIndex: 1000, borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '1.5rem', cursor: 'pointer' }}>☰</button>
                        <Link href="/investors/portfoliosummary" className="logo" style={{ fontSize: '1.8rem' }}>Mogul Strategies</Link>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
                        <span style={{ color: '#E0E0E0' }}>Welcome, John Doe</span>
                        <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} style={{ background: 'none', border: 'none', color: '#E0E0E0', cursor: 'pointer' }}>▼</button>
                        {isUserMenuOpen && (
                            <div style={{ position: 'absolute', right: 0, top: '100%', background: 'rgba(17, 34, 64, 0.95)', borderRadius: '8px', padding: '1rem', minWidth: '200px', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
                                <Link href="/investors/usersettings" style={{ display: 'block', padding: '0.5rem 0', color: '#E0E0E0' }}>Account Settings</Link>
                                <Link href="/login" className="logout" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Logout</Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <nav className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`} style={{
                position: 'fixed', top: '80px', left: 0, bottom: 0, width: '280px',
                background: 'rgba(17, 34, 64, 0.8)', backdropFilter: 'blur(10px)',
                padding: '1.5rem 0', overflowY: 'auto', zIndex: 900, transition: 'transform 0.3s ease',
                transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
            }}>
                <ul className="nav-menu">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className={pathname === item.href ? 'active' : ''}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Main Content */}
            <main style={{
                marginLeft: isSidebarOpen ? '280px' : '0',
                paddingTop: '100px',
                padding: '2rem',
                transition: 'margin-left 0.3s ease',
                minHeight: '100vh'
            }}>
                {children}
                <footer style={{ textAlign: 'center', padding: '3rem 0', marginTop: '6rem', fontSize: '0.9rem', color: '#AAAAAA' }}>
                    <p>&copy; 2025 Mogul Strategies Inc. | For Accredited Investors Only</p>
                    <p><small>Investments involve risk. Past performance is not indicative of future results.</small></p>
                </footer>
            </main>

            <style jsx>{`
        .sidebar::-webkit-scrollbar {
          width: 5px;
        }
        .sidebar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        .sidebar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 10px;
        }
      `}</style>
        </div>
    );
}
