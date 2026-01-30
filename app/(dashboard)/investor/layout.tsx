"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Star from "@/components/Star";
import "./investor.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };


  return (
    <div>
        <Star />
        <Header onToggleSidebar={toggleSidebar} />
        <Sidebar collapsed={collapsed} />
        <main id="main-content" className={collapsed ? "expanded" : ""}>
            {children}
        </main>
        <Footer />
    </div>
  );
}
