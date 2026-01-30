"use client";

import { useState } from "react";
import "./portfolio.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";
import PerformanceCharts from "./components/PerformanceCharts";

export default function PortfolioSummaryPage() {

  return (
    <>
        <h1 className="section-title">Portfolio Summary</h1>

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

        <div className="market-ticker">
            <div className="ticker-title">Live Market Data (December 24, 2025 – 14:32 EST)</div>
            <div className="ticker-items">
                <span className="ticker-item">
                    BTC/USD: $92,847.32{" "}
                    <span style={{ color: "#0f0" }}>+2.41%</span>
                    </span>

                    <span className="ticker-item">
                    S&P 500: 5,924.18{" "}
                    <span style={{ color: "#0f0" }}>+0.68%</span>
                    </span>

                    <span className="ticker-item">
                    Gold: $2,618.40/oz{" "}
                    <span style={{ color: "#f00" }}>-0.32%</span>
                    </span>

                    <span className="ticker-item">
                    10Y Treasury: 4.12%{" "}
                    <span style={{ color: "#0f0" }}>+0.05%</span>
                    </span>

                    <span className="ticker-item">
                    VIX: 14.82{" "}
                    <span style={{ color: "#f00" }}>+1.21%</span>
                    </span>

                    <span className="ticker-item">
                    Oil (WTI): $78.41{" "}
                    <span style={{ color: "#0f0" }}>+1.87%</span>
                </span>

            </div>
        </div>

        <section id="portfolio-stats">
            <h2 className="section-title">Portfolio Overview</h2>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">$1,240,000</div>
                    <p className="stat-label">Total Invested</p>
                </div>
                <div className="stat-card">
                    <div className="stat-value">$1,586,400</div>
                    <p className="stat-label">Current Value</p>
                </div>
                <div className="stat-card">
                    <div className="stat-value">+27.9%</div>
                    <p className="stat-label">Total Return</p>
                </div>
                <div className="stat-card">
                    <div className="stat-value">18.4%</div>
                    <p className="stat-label">Annualized</p>
                </div>
                <div className="stat-card">
                    <div className="stat-value">1.72</div>
                    <p className="stat-label">Sharpe Ratio</p>
                </div>
            </div>
        </section>

        <PerformanceCharts />

        <section className="lower-grid">
            <div className="lower-card">
                <h3>Fund Performance Summary (YTD)</h3>
                <ul>
                    <li>Mogul Equities: <strong>+12.8%</strong></li>
                    <li>Mogul Digital Fund: <strong>+48.2%</strong></li>
                    <li>Mogul Real Estate: <strong>+9.4%</strong> (incl. distributions)</li>
                    <li>Mogul Technologies: <strong>+31.7%</strong></li>
                    <li>Creative Arts Fund: <strong>+22.1%</strong></li>
                    <li>Mogul Recycling Fund: <strong>+15.6%</strong></li>
                </ul>
            </div>

            <div className="lower-card">
                <h3>Notifications & Updates</h3>
                <div className="notification">New capital call: Mogul Real Estate Fund – Due January 15, 2026 <a href="#">View →</a></div>
                <div className="notification">Distribution posted: Creative Arts Fund Q4 2025 <a href="#">View →</a></div>
                <div className="notification">Webinar: 2026 Market Outlook – January 8, 2026 <a href="#">Register →</a></div>
            </div>

            <div className="lower-card">
                <h3>Recent Documents</h3>
                <ul className="document-list">
                    <li>Q4 2025 Investor Letter <a href="#">Download PDF</a></li>
                    <li>December 2025 Performance Report <a href="#">Download PDF</a></li>
                    <li>Annual Tax Package (2025) <a href="#">Download ZIP</a></li>
                    <li>Fund Subscription Agreement <a href="#">View</a></li>
                </ul>
            </div>
        </section>
    </>
  );
}
