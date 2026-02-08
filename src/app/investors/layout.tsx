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
import NotificationsPopup from './components/NotificationsPopup';
import { Sidebar } from "./components/Sidebar";
import type { ProfileData } from "@/types/user";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { KycProvider } from "@/contexts/KycContext";
import Header from "./components/Header";

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

    const handleLogoutConfirm = async () => {
        await signOut({ callbackUrl: '/login' });
        setIsLogoutModalOpen(false);
    };

    type ActiveCard = "account" | "message" | "notification" | null;

    const [activeCard, setActiveCard] = useState<ActiveCard>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const userMenuRef = useRef<HTMLDivElement | null>(null);
    const userMenuItems = [
        { label: "Portfolio Overview", href: "/investors/portfoliosummary" },
        { label: "My Calendar", href: "/investors/events" },
        { label: "My Investments", href: "/investors/myinvestments" },
        { label: "Capital Calls", href: "/investors/capitalcalls" },
        { label: "Statements & Reports", href: "/investors/docsreports" },
        { label: "Distributions & Tax", href: "/investors/distributionstax" },
        { label: "Files & Media", href: "/investors/resourcelibrary" },
        { label: "Account Settings", href: "/investors/usersettings" },
    ];

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
            <ProfileProvider>
                <KycProvider>
            
                    <Header
                        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    />

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
                </KycProvider>
            </ProfileProvider>
        </div>
    );
}
