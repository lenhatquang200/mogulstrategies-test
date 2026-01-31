'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import LogoutConfirmationModal from '@/components/LogoutConfirmationModal';
import {
    FaTachometerAlt,
    FaUsers,
    FaUserCheck,
    FaUserTie,
    FaHandshake,
    FaFileAlt,
    FaDollarSign,
    FaBell,
    FaEnvelope,
    FaCalendar,
    FaBook,
    FaChartBar,
    FaShieldAlt,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes,
} from 'react-icons/fa';

interface NavItem {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}

const navItems: NavItem[] = [
    { href: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
    { href: '/admin/users', icon: FaUsers, label: 'User Management' },
    { href: '/admin/kyc', icon: FaUserCheck, label: 'KYC & Accreditation' },
    { href: '/admin/crm', icon: FaUserTie, label: 'Investor Relations / CRM' },
    { href: '/admin/offerings', icon: FaHandshake, label: 'Offerings & Syndications' },
    { href: '/admin/documents', icon: FaFileAlt, label: 'Documents & Reports' },
    { href: '/admin/distributions', icon: FaDollarSign, label: 'Distributions & Capital Calls' },
    { href: '/admin/notifications', icon: FaBell, label: 'Notifications' },
    { href: '/admin/messaging', icon: FaEnvelope, label: 'Secure Messaging' },
    { href: '/admin/events', icon: FaCalendar, label: 'Events & Webinars' },
    { href: '/admin/resources', icon: FaBook, label: 'Resource Library' },
    { href: '/admin/analytics', icon: FaChartBar, label: 'Analytics & Reporting' },
    { href: '/admin/compliance', icon: FaShieldAlt, label: 'Compliance & Moderation' },
    { href: '/admin/settings', icon: FaCog, label: 'System Settings' },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === '/admin';
        }
        return pathname?.startsWith(href);
    };

    const handleLogoutConfirm = async () => {
        await signOut({ callbackUrl: '/login' });
        setIsLogoutModalOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-[1001] text-mogul-gold text-3xl bg-mogul-darker/90 backdrop-blur-md p-2 rounded-lg"
                aria-label="Toggle menu"
            >
                {isMobileOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <aside
                className={`
          fixed left-0 top-0 bottom-0 w-[280px] 
          bg-mogul-blue/90 backdrop-blur-md
          z-[1000] overflow-y-auto
          transition-transform duration-300 ease-in-out
          animate-pulse-glow
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Logo */}
                <Link
                    href="/admin"
                    className="block text-center py-8 text-3xl font-display font-bold text-mogul-gold hover:text-white transition-colors"
                >
                    Mogul Admin
                </Link>

                {/* Navigation */}
                <nav>
                    <ul className="space-y-2 px-0">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`
                      flex items-center gap-4 px-8 py-4
                      font-medium transition-all duration-300
                      ${active
                                                ? 'bg-mogul-gold/20 text-mogul-gold border-l-4 border-mogul-gold'
                                                : 'text-gray-300 hover:bg-mogul-gold/20 hover:text-mogul-gold hover:border-l-4 hover:border-mogul-gold'
                                            }
                    `}
                                        onClick={() => setIsMobileOpen(false)}
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}

                        {/* Logout */}
                        <li>
                            <button
                                onClick={() => {
                                    setIsMobileOpen(false);
                                    setIsLogoutModalOpen(true);
                                }}
                                className="w-full flex items-center gap-4 px-8 py-4 text-gray-300 hover:bg-red-500/20 hover:text-red-400 font-medium transition-all duration-300 text-left"
                            >
                                <FaSignOutAlt className="w-5 h-5 flex-shrink-0" />
                                <span className="text-base">Logout</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-[999]"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <LogoutConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
            />
        </>
    );
}
