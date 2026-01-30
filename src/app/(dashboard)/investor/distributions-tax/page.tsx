"use client";

import { useState } from "react";
import "./distributions-tax.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";

export default function DistributionTaxPage() {

  return (
    <>
        <h1 className="page-title">Distributions & Tax</h1>

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

        <section className="distributions-grid">
            
            <div className="dist-card">
                <h3>Distribution History</h3>
                <ul className="dist-list">
                    <li><span>Q4 2025 Distribution <span className="date">Dec 20, 2025</span></span> <span className="amount">$18,420.00</span></li>
                    <li><span>Q3 2025 Distribution <span className="date">Sep 25, 2025</span></span> <span className="amount">$15,780.00</span></li>
                    <li><span>Q2 2025 Distribution <span className="date">Jun 28, 2025</span></span> <span className="amount">$17,210.00</span></li>
                    <li><span>Q1 2025 Distribution <span className="date">Mar 31, 2025</span></span> <span className="amount">$14,950.00</span></li>
                    <li><span>Q4 2024 Distribution <span className="date">Dec 20, 2024</span></span> <span className="amount">$16,340.00</span></li>
                </ul>
                <a href="#" style={{display: "block", marginTop: "1.5rem", textAlign: "center", fontWeight: "bold"}}>View Full History →</a>
            </div>

            <div className="dist-card">
                <h3>Tax Documents</h3>
                <ul className="dist-list">
                    <li><span>2025 Schedule K-1 (Estimated) <span className="date">Coming Q1 2026</span></span> <span style={{color:"#AAAAAA"}}>Pending</span></li>
                    <li><span>2024 Schedule K-1 <span className="date">Mar 15, 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>2023 Schedule K-1 <span className="date">Mar 15, 2024</span></span> <a href="#">Download PDF</a></li>
                    <li><span>2022 Schedule K-1 <span className="date">Mar 15, 2023</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Tax Reporting Guide (2025)</span> <a href="#">Download PDF</a></li>
                    <li><span>Foreign Tax Credit Information</span> <a href="#">Download PDF</a></li>
                </ul>
            </div>

            <div className="dist-card">
                <h3>2026 Distribution Summary</h3>
                <ul className="dist-list">
                    <li><span>Total Distributions YTD</span> <span className="amount">$0.00</span></li>
                    <li><span>Average Quarterly Distribution</span> <span className="amount">$0.00</span></li>
                    <li><span>Projected Annual Yield</span> <span className="amount">5.2%</span></li>
                    <li><span>Reinvested Distributions</span> <span className="amount">$0.00</span></li>
                    <li><span>Cash Distributions Expected</span> <span className="amount">Pending Q1</span></li>
                </ul>
            </div>

            <div className="dist-card">
                <h3>Tax Information & Resources</h3>
                <p>Mogul Strategies funds are structured as pass-through entities. Investors receive Schedule K-1 forms annually.</p>
                <ul className="dist-list">
                    <li><span>Expected K-1 Delivery (2025)</span> <span>Mid-March 2026</span></li>
                    <li><span>Tax Advisor Contact</span> <a href="mailto:tax@mogulstrategies.com">tax@mogulstrategies.com</a></li>
                    <li><span>Estimated Tax Payments Guide</span> <a href="#">Download PDF</a></li>
                    <li><span>State Tax Considerations</span> <a href="#">View Details</a></li>
                </ul>
            </div>
        </section>
    </>
  );
}
