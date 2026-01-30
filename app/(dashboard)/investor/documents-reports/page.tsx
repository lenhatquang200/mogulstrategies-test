"use client";

import { useState } from "react";
import "./documents-reports.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";

export default function DocumentReportPage() {

  return (
    <>
        <h1 className="page-title">Documents & Reports</h1>

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

        <section className="documents-grid">
            
            <div className="document-category">
                <h3>Quarterly Investor Letters</h3>
                <ul className="document-list">
                    <li><span>Q4 2025 Investor Letter <span className="date">Dec 24, 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Q3 2025 Investor Letter <span className="date">Sep 30, 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Q2 2025 Investor Letter <span className="date">Jun 30, 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Q1 2025 Investor Letter <span className="date">Mar 31, 2025</span></span> <a href="#">Download PDF</a></li>
                </ul>
            </div>

            <div className="document-category">
                <h3>Monthly Performance Reports</h3>
                <ul className="document-list">
                    <li><span>December 2025 Report <span className="date">Dec 24, 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>November 2025 Report <span className="date">Nov 30, 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>October 2025 Report <span className="date">Oct 31, 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>September 2025 Report <span className="date">Sep 30, 2025</span></span> <a href="#">Download PDF</a></li>
                </ul>
            </div>

            <div className="document-category">
                <h3>Quarterly Performance Reports</h3>
                <ul className="document-list">
                    <li><span>Q4 2025 Performance Report <span className="date">Dec 24, 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Q3 2025 Performance Report <span className="date">Sep 30, 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Q2 2025 Performance Report <span className="date">Jun 30, 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Q1 2025 Performance Report <span className="date">Mar 31, 2025</span></span> <a href="#">Download PDF</a></li>
                </ul>
            </div>

            <div className="document-category">
                <h3>My Subscriptions</h3>
                <ul className="document-list">
                    <li><span>Mogul Digital Fund Subscription Agreement <span className="date">Signed Oct 12, 2025</span></span> <a href="#">View</a></li>
                    <li><span>Mogul Real Estate Fund Offering Memorandum <span className="date">Signed Aug 5, 2025</span></span> <a href="#">View</a></li>
                    <li><span>Mogul Technologies Fund Subscription <span className="date">Signed Jun 20, 2025</span></span> <a href="#">View</a></li>
                    <li><span>Creative Arts Fund Offering Documents <span className="date">Signed Apr 3, 2025</span></span> <a href="#">View</a></li>
                </ul>
            </div>
            
            <div className="report-generator">
                <h3>Report Generator</h3>
                <p>Select a report type and generate a custom PDF on demand.</p>
                <div className="report-options">
                    <div className="report-option">
                        <label><input type="radio" name="report" value="portfolio" /> Portfolio Summary Report</label>
                    </div>
                    <div className="report-option">
                        <label><input type="radio" name="report" value="tax" /> Estimated Tax Summary</label>
                    </div>
                    <div className="report-option">
                        <label><input type="radio" name="report" value="allocation" /> Asset Allocation Breakdown</label>
                    </div>
                    <div className="report-option">
                        <label><input type="radio" name="report" value="performance" /> Historical Performance</label>
                    </div>
                    <div className="report-option">
                        <label><input type="radio" name="report" value="transactions" /> Transaction History</label>
                    </div>
                </div>
                <button className="generate-btn">Generate Report</button>
            </div>

            <div className="document-category">
                <h3>Tax Documents</h3>
                <ul className="document-list">
                    <li><span>2025 Schedule K-1 (Estimated) <span className="date">Coming Q1 2026</span></span> <span style={{color:'#AAAAAA'}}>Pending</span></li>
                    <li><span>2024 Schedule K-1 <span className="date">Mar 15, 2025</span></span> <a href="#">Download PDF</a></li>
                    <li><span>2023 Schedule K-1 <span className="date">Mar 15, 2024</span></span> <a href="#">Download PDF</a></li>
                    <li><span>Tax Reporting Guide</span> <a href="#">Download PDF</a></li>
                </ul>
            </div>
        </section>
    </>
  );
}
