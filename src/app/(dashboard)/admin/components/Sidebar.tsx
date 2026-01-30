"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh(); 
  }

  return (
    <aside className="admin-sidebar" id="adminSidebar">
        <a href="admin.html" className="admin-logo">Mogul Admin</a>
        <ul className="admin-nav">
            <li><a href="admin.html" className="active"><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
            <li><a href="adminusermanage.html"><i className="fas fa-users"></i> User Management</a></li>
            <li><a href="adminkycmanage.html"><i className="fas fa-user-check"></i> KYC & Accreditation</a></li>
            <li><a href="admininvestorcrm.html"><i className="fas fa-user-tie"></i> Investor Relations / CRM</a></li>
            <li><a href="adminofferingssyndications.html"><i className="fas fa-handshake"></i> Offerings & Syndications</a></li>
            <li><a href="admindocumentmanager.html"><i className="fas fa-file-alt"></i> Documents & Reports</a></li>
            <li><a href="admincallsdistributions.html"><i className="fas fa-dollar-sign"></i> Distributions & Capital Calls</a></li>
            <li><a href="adminnotificationsmanager.html"><i className="fas fa-bell"></i> Notifications</a></li>
            <li><a href="adminmessaging.html"><i className="fas fa-envelope"></i> Secure Messaging</a></li>
            <li><a href="admineventswebinars.html"><i className="fas fa-calendar"></i> Events & Webinars</a></li>
            <li><a href="adminresourcemanager.html"><i className="fas fa-book"></i> Resource Library</a></li>
            <li><a href="adminreporting.html"><i className="fas fa-chart-bar"></i> Analytics & Reporting</a></li>
            <li><a href="adminmoderation.html"><i className="fas fa-shield-alt"></i> Compliance & Moderation</a></li>
            <li><a href="adminsettings.html"><i className="fas fa-cog"></i> System Settings</a></li>
            <li>
              <a href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</a>
            </li>
        </ul>
    </aside>
  );
}
