"use client";

import { useState } from "react";
import "./notifications.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";

export default function NotificationsPage() {

  return (
    <>
        <h1 className="page-title">Notifications</h1>

        <section className="top-row">
              <AccountInfoCard
                name="John Doe"
                email="john.doe@example.com"
                investorType="Accredited Individual"
                accountId="MS-INV-4872"
                joined="March 15, 2023"
                lastLogin="December 24, 2025"
            />

            <SecureMessagingCard />
        </section>

        <section className="notifications-container">
            <div className="mark-all">
                <button className="mark-all-btn">Mark All as Read</button>
            </div>

            <div className="notification-item unread">
                <div className="notification-icon">🔔</div>
                <div className="notification-content">
                    <div className="notification-title">New Capital Call Issued</div>
                    <div className="notification-message">Mogul Real Estate Fund – Tranche 3 capital call of $75,000 due January 15, 2026.</div>
                    <div className="notification-date">December 10, 2025 – 14:20 EST</div>
                    <div className="notification-actions">
                        <a href="#">View Details</a> | <a href="#">Pay Now</a>
                    </div>
                </div>
            </div>

            <div className="notification-item unread">
                <div className="notification-icon">📊</div>
                <div className="notification-content">
                    <div className="notification-title">Q4 2025 Performance Report Available</div>
                    <div className="notification-message">Detailed fund performance and commentary now available for download.</div>
                    <div className="notification-date">December 24, 2025 – 09:00 EST</div>
                    <div className="notification-actions">
                        <a href="#">Download Report</a>
                    </div>
                </div>
            </div>

            <div className="notification-item">
                <div className="notification-icon">💰</div>
                <div className="notification-content">
                    <div className="notification-title">Distribution Posted</div>
                    <div className="notification-message">Q4 2025 distribution of $18,420 credited to your account.</div>
                    <div className="notification-date">December 20, 2025 – 16:45 EST</div>
                    <div className="notification-actions">
                        <a href="#">View Statement</a>
                    </div>
                </div>
            </div>

            <div className="notification-item">
                <div className="notification-icon">📅</div>
                <div className="notification-content">
                    <div className="notification-title">Upcoming Webinar Reminder</div>
                    <div className="notification-message">2026 Market Outlook with Daniel Fainman – January 8, 2026 at 2:00 PM EST</div>
                    <div className="notification-date">December 18, 2025 – 10:00 EST</div>
                    <div className="notification-actions">
                        <a href="#">Register Now</a> | <a href="#">Add to Calendar</a>
                    </div>
                </div>
            </div>

            <div className="notification-item">
                <div className="notification-icon">📄</div>
                <div className="notification-content">
                    <div className="notification-title">New Document Uploaded</div>
                    <div className="notification-message">Q4 2025 Investor Letter is now available in Documents & Reports.</div>
                    <div className="notification-date">December 15, 2025 – 11:30 EST</div>
                    <div className="notification-actions">
                        <a href="#">View Document</a>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
