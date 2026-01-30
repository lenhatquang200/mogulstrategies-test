"use client";

import { useState } from "react";
import "./resource-library.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";

export default function ResourceLibraryPage() {

  return (
    <>
        <h1 className="page-title">Resource Library</h1>

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

        <section className="resources-grid">
            
            <div className="resource-category">
                <h3>White Papers</h3>
                <ul className="resource-list">
                    <li><span>Bitcoin as a Portfolio Diversifier <span className="date">Nov 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>The Future of Sustainable Infrastructure Investing <span className="date">Oct 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Alternative Assets in a High-Inflation Environment <span className="date">Aug 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Entertainment IP as an Asset Class <span className="date">Jun 2025</span></span> <a href="#">Download PDF</a></li>
                </ul>
            </div>

            <div className="resource-category">
                <h3>Market Research Reports</h3>
                <ul className="resource-list">
                    <li><span>Gulf Region Real Estate Outlook 2026 <span className="date">Dec 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Digital Assets Market Update Q4 2025 <span className="date">Dec 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>AI & Technology Investment Trends <span className="date">Nov 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Circular Economy Opportunities <span className="date">Sep 2025</span></span> <a href="#">Download PDF</a></li>
                </ul>
            </div>

            <div className="resource-category">
                <h3>Investor Guides</h3>
                <ul className="resource-list">
                    <li><span>Guide to Private Fund Investing <span className="date">Updated 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Understanding Capital Calls & Distributions</span> <a href="#">Download PDF</a></li>
                    <li><span>Tax Considerations for Alternative Investments</span> <a href="#">Download PDF</a></li>
                    <li><span>Risk Management in Diversified Portfolios</span> <a href="#">Download PDF</a></li>
                </ul>
            </div>

            <div className="resource-category">
                <h3>Case Studies</h3>
                <ul className="resource-list">
                    <li><span>Successful Real Estate Syndication – Dubai Project <span className="date">2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Digital Asset Portfolio Performance Review</span> <a href="#">Download PDF</a></li>
                    <li><span>Technology Fund Exit Analysis</span> <a href="#">Download PDF</a></li>
                    <li><span>Creative Arts Fund Production Success</span> <a href="#">Download PDF</a></li>
                </ul>
            </div>
        </section>
    </>
  );
}
