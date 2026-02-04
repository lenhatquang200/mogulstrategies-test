"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import AccountInfoPopup from "./AccountInfoPopup";
import SecureMessagingPopup from "./SecureMessagingPopup";
import NotificationsPopup from "./NotificationsPopup";
import { useProfile } from "@/contexts/ProfileContext";

const LogoutConfirmationModal = dynamic(
  () => import("@/components/LogoutConfirmationModal"),
  { ssr: false }
);

type ActiveCard = "account" | "message" | "notification" | null;

interface Props {
  onToggleSidebar: () => void;
}

export default function InvestorHeader({ onToggleSidebar }: Props) {
  const { profile, loading } = useProfile();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
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

      if (popupRef.current && !popupRef.current.contains(target)) {
        setActiveCard(null);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutConfirm = async () => {
    await signOut({ callbackUrl: "/login" });
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <header>
                <div className="header-container">
                    <div className="header-left">
                        <button className="hamburger" aria-label="Menu" onClick={onToggleSidebar}>☰</button>
                        <Link href="/" className="logo">Mogul Strategies</Link>
                    </div>
                    <div className="user-menu" ref={userMenuRef}>
                        <span>Welcome, {profile?.name || 'Investor'}</span>

                        <div className='relative'>
                            <button className="user-menu-btn" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>▼</button>
                            {isUserMenuOpen && (
                                <div className="dropdown absolute right-0 !top-full !mt-4">
                                    {userMenuItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block px-4 py-2 transition-colors hover:!text-[#d4af37]"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}

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

                        <div className="header-icons flex items-bottom gap-x-4" ref={popupRef}>
                            {/* Notification */}
                            <div className="relative">
                                <button
                                title="Notifications"
                                onClick={() => {
                                    setActiveCard('notification');
                                    setIsUserMenuOpen(false);
                                }}
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

                                {activeCard === 'notification' && (
                                    <section className="absolute right-0 top-full pt-4 z-50">
                                        <NotificationsPopup />
                                    </section>
                                )}
                            </div>

                            <div className="relative">
                                <button onClick={() => {setActiveCard("message"); setIsUserMenuOpen(false);}}
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
                                    onClick={() => {setActiveCard("account"); setIsUserMenuOpen(false);}}
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
                                    <section className="absolute right-0 top-full pt-4 w-max z-50 min-w-[520px]">
                                        <div className="transition-all duration-300 ease-out opacity-100 translate-y-0">
                                            <AccountInfoPopup
                                                data={profile}
                                                loading={loading}
                                                onClose={() => setActiveCard(null)}
                                            />
                                        </div>
                                    </section>
                                )}

                            </div>

                            
                        </div>
                    

                    </div>
                </div>
                
            </header>

        <LogoutConfirmationModal
            isOpen={isLogoutModalOpen}
            onClose={() => setIsLogoutModalOpen(false)}
            onConfirm={handleLogoutConfirm}
        />
    </>
  );
}
