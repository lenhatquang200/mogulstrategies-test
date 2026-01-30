"use client";

import { useState } from "react";
import "./account-setting.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";
import ProfileSettings from "./components/ProfileSettings";
import SecuritySettings from "./components/SecuritySettings";
import NotificationSettings from "./components/NotificationSettings";

export default function AccountSettingPage() {

  return (
    <>
        <h1 className="page-title">User Settings</h1>

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

        <section className="settings-container">
            <ProfileSettings />

            <SecuritySettings />

            <NotificationSettings />

            <div className="settings-card">
                <h3>Account Activity & Login History</h3>
                <p>Recent login and activity tracking (IP addresses logged for security)</p>
                <table className="activity-table">
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>Activity</th>
                            <th>IP Address</th>
                            <th>Location</th>
                            <th>Device</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Dec 24, 2025 – 14:32 EST</td>
                            <td>Login</td>
                            <td>192.168.1.100</td>
                            <td>New York, NY, USA</td>
                            <td>Chrome on MacOS</td>
                        </tr>
                        <tr>
                            <td>Dec 23, 2025 – 09:15 EST</td>
                            <td>Viewed Portfolio</td>
                            <td>203.0.113.45</td>
                            <td>Miami, FL, USA</td>
                            <td>Safari on iPhone</td>
                        </tr>
                        <tr>
                            <td>Dec 20, 2025 – 18:40 EST</td>
                            <td>Login</td>
                            <td>198.51.100.23</td>
                            <td>London, UK</td>
                            <td>Firefox on Windows</td>
                        </tr>
                        <tr>
                            <td>Dec 18, 2025 – 11:22 EST</td>
                            <td>Downloaded Report</td>
                            <td>192.168.1.100</td>
                            <td>New York, NY, USA</td>
                            <td>Chrome on MacOS</td>
                        </tr>
                    </tbody>
                </table>
                <a href="#" style={{
                    display: "block",
                    marginTop: "1.5rem",
                    textAlign: "center",
                    fontWeight: "bold",
                }}>View Full Activity Log →</a>
            </div>
        </section>
    </>
  );
}
