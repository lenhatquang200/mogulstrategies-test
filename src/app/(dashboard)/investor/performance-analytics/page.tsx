"use client";

import { useState } from "react";
import "./performance-analytics.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";
import {fundPerformanceData} from "./fundPerformanceData";
import DetailedPerformanceCharts from "./components/DetailedPerformanceCharts";

export default function PerformanceAnalyticPage() {
    
  return (
    <>
        <h1 className="page-title">Performance Analytics</h1>

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

        <section id="key-metrics">
            <h2 className="section-title">Key Performance Metrics</h2>
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-value">+27.9%</div>
                    <p className="metric-label">Total Return (Net)</p>
                </div>
                <div className="metric-card">
                    <div className="metric-value">18.4%</div>
                    <p className="metric-label">Annualized Return</p>
                </div>
                <div className="metric-card">
                    <div className="metric-value">1.72</div>
                    <p className="metric-label">Sharpe Ratio</p>
                </div>
                <div className="metric-card">
                    <div className="metric-value">9.2%</div>
                    <p className="metric-label">Maximum Drawdown</p>
                </div>
                <div className="metric-card">
                    <div className="metric-value">0.28</div>
                    <p className="metric-label">Sortino Ratio</p>
                </div>
                <div className="metric-card">
                    <div className="metric-value">1.15</div>
                    <p className="metric-label">Calmar Ratio</p>
                </div>
            </div>
        </section>

        <DetailedPerformanceCharts />

        <section id="fund-performance">
            <h2 className="section-title">Fund-by-Fund Performance</h2>

            <table className="performance-table">
                <thead>
                <tr>
                    <th>Fund Name</th>
                    <th>YTD Return</th>
                    <th>1-Year Return</th>
                    <th>3-Year Annualized</th>
                    <th>Since Inception</th>
                    <th>Sharpe Ratio</th>
                    <th>Max Drawdown</th>
                </tr>
                </thead>

                <tbody>
                    {fundPerformanceData.map((fund) => (
                        <tr key={fund.id}>
                        <td>{fund.name}</td>
                        <td>{fund.ytd}</td>
                        <td>{fund.oneYear}</td>
                        <td>{fund.threeYear}</td>
                        <td>{fund.inception}</td>
                        <td>{fund.sharpe}</td>
                        <td>{fund.drawdown}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>

    </>
  );
}
