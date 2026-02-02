'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import LogoutConfirmationModal from '@/components/LogoutConfirmationModal';
import "./investor.css";

export default function InvestorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

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

    const handleLogoutConfirm = async () => {
        await signOut({ callbackUrl: '/login' });
        setIsLogoutModalOpen(false);
    };

    return (
        <div className="portal-layout">
            <header>
                <div className="header-container">
                    <div className="header-left">
                        <button className="hamburger" aria-label="Menu" onClick={toggleSidebar}>☰</button>
                        <Link href="/investors/portfoliosummary" className="logo">Mogul Strategies</Link>
                    </div>
                    <div className="user-menu">
                        <span>Welcome, {session?.user?.name || 'Investor'}</span>
                        <button className="user-menu-btn" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>▼</button>
                        {isUserMenuOpen && (
                            <div className="dropdown" style={{ display: 'block' }}>
                                <Link href="/investors/usersettings">Account Settings</Link>
                                <button
                                    onClick={() => {
                                        setIsUserMenuOpen(false);
                                        setIsLogoutModalOpen(true);
                                    }}
                                    className="logout"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Sidebar Navigation */}
            <nav className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`} id="sidebar">
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

            <main id="main-content" className={isSidebarOpen ? '' : 'expanded'}>
                {children}
            </main>

            <LogoutConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
            />

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
