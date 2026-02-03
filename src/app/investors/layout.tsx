'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import "./investor.css";
import Footer from './components/Footer';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import AccountInfoPopup from "./components/AccountInfoPopup";
import SecureMessagingPopup from "./components/SecureMessagingPopup";
import { Sidebar } from "./components/Sidebar";

const LogoutConfirmationModal = dynamic(
  () => import('@/components/LogoutConfirmationModal'),
  { ssr: false, loading: () => null }
);

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
        { name: 'KYC & Accreditation', href: '/investors/kyc1', match: (pathname: string) => pathname.startsWith('/investors/kyc'),},
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

    type ActiveCard = "account" | "message" | null;

    const [activeCard, setActiveCard] = useState<ActiveCard>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const userMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;

            // close account/message popup
            if ( popupRef.current && !popupRef.current.contains(target) ) {
                setActiveCard(null);
            }

            // close user menu
            if ( userMenuRef.current && !userMenuRef.current.contains(target) ) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="portal-layout">
            <header>
                <div className="header-container">
                    <div className="header-left">
                        <button className="hamburger" aria-label="Menu" onClick={toggleSidebar}>☰</button>
                        <Link href="/" className="logo">Mogul Strategies</Link>
                    </div>
                    <div className="user-menu" ref={userMenuRef}>
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

                        <div className="header-icons flex items-bottom gap-x-4" ref={popupRef}>
                            {/* Notification */}
                            <button
                                title="Support"
                                className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300"
                            >
                                <Image
                                src="/imgs/notification_icon.png"
                                alt="Notification"
                                width={32}
                                height={32}
                                className="object-cover"
                                />
                            </button>

                            <div className="relative">
                                <button onClick={() => setActiveCard("message")}
                                    title="Support"
                                    className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300"
                                >
                                    <Image
                                        src="/imgs/sp_icon.png"
                                        alt="Support"
                                        width={32}
                                        height={32}
                                        className="object-cover"
                                    />
                                </button>

                                {/* Message popup */}
                                {activeCard === "message" && (
                                    <section className="absolute right-0 top-full pt-4 w-max z-50">
                                        <div className="transition-all duration-300 ease-out opacity-100 translate-y-0">
                                            <SecureMessagingPopup />
                                        </div>
                                    </section>
                                )}
                                                                
                            </div>

                            <div className="relative">
                                <button
                                    title="User menu"
                                    onClick={() => setActiveCard("account")}
                                    className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300"
                                >
                                    <Image
                                        src="/imgs/no_user_icon.png"
                                        alt="User"
                                        width={32}
                                        height={32}
                                        className="object-cover"
                                    />
                                </button>

                                {/* Account popup */}
                                {activeCard === "account" && (
                                    <section className="absolute right-0 top-full pt-4 w-max z-50">
                                        <div className="transition-all duration-300 ease-out opacity-100 translate-y-0">
                                            <AccountInfoPopup />
                                        </div>
                                    </section>
                                )}

                            </div>

                            
                        </div>
                    

                    </div>
                </div>
                
            </header>
            

            {/* Sidebar Navigation */}
            <Sidebar isSidebarOpen={isSidebarOpen} />
            
            <main id="main-content" className={isSidebarOpen ? '' : 'expanded'}>
                {children}
            </main>
            <Footer />
            <LogoutConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
            />
            
        </div>
    );
}
