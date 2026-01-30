"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthUser } from "@/types/user.type";
import Link from "next/link";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <header>
        <div className="investor-header-container">
            <div className="investor-header-left">
                <button className="hamburger" aria-label="Menu">☰</button>
                <div className="investor-logo">Mogul Strategies</div>
                <button className="sidebar-toggle" aria-label="Toggle Sidebar" onClick={onToggleSidebar}>☰</button>
            </div>
            <div className="user-menu">
                <span>{loading ? "Loading..." : `Welcome, ${user?.name ?? "Guest"}`}</span>
                <button className="user-menu-btn">▼</button>
                <div className="dropdown">
                    <Link
                      href="/investor/account-setting"
                    >
                      Account Settings
                    </Link>
                    <button className="logout" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    </header>
  );
}
