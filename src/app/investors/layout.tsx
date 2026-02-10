'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import "./investor.css";
import Footer from './components/Footer';
import dynamic from 'next/dynamic';
import { Sidebar } from "./components/Sidebar";
import type { ProfileData } from "@/types/user";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { KycProvider } from "@/contexts/KycContext";
import Header from "./components/Header";
import { InvestorKycGuard } from './components/InvestorKycGuard';

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

    return (
        <div className="portal-layout">
            <ProfileProvider>
                <KycProvider>
                    <InvestorKycGuard>
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
                    </InvestorKycGuard>
                </KycProvider>
            </ProfileProvider>
        </div>
    );
}
