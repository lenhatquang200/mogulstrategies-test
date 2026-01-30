"use client";

import { useState } from "react";
import "./investment.css";
import ValueChart from "./components/ValueChart"
import IrrChart from "./components/IrrChart"
import InvestmentDetail from "./components/InvestmentDetail";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";

export default function SyndicationPage() {

  return (
    <>
        <h1 className="page-title">My Investments</h1>

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

        <section className="investments-summary">
            <div className="summary-item">
                <div className="summary-value">$1,240,000</div>
                <div className="summary-label">Total Committed</div>
            </div>
            <div className="summary-item">
                <div className="summary-value">$965,000</div>
                <div className="summary-label">Called Capital</div>
            </div>
            <div className="summary-item">
                <div className="summary-value">$275,000</div>
                <div className="summary-label">Uncalled Capital</div>
            </div>
            <div className="summary-item">
                <div className="summary-value">$1,586,400</div>
                <div className="summary-label">Current Value</div>
            </div>
            <div className="summary-item">
                <div className="summary-value">+27.9%</div>
                <div className="summary-label">Net Return</div>
            </div>
        </section>
        
        <section className="investments-grid">

            <div className="investment-card">
                <div className="investment-header">
                    <div className="investment-title">Mogul Real Estate Fund – Tranche 3</div>
                    <span className="investment-status">Active</span>
                </div>
                <div className="investment-content">
                    <InvestmentDetail
                        items={[
                            { label: "Commitment Amount", value: "$500,000" },
                            { label: "Called Capital", value: "$375,000 (75%)" },
                            { label: "Uncalled Capital", value: "$125,000" },
                            { label: "Estimated Value", value: "$612,000" },
                            { label: "Net Return", value: "+22.4%" },
                            { label: "IRR (since inception)", value: "14.8%" },
                        ]}
                    />
                    <div>
                        <div className="performance-chart">
                            <ValueChart
                                data={[
                                    500000, 510000, 520000, 530000, 545000, 560000,
                                    570000, 580000, 595000, 605000, 610000, 612000,
                                ]}
                            />
                        </div>
                        <div className="irr-chart">
                            <IrrChart irr={14.8} />
                        </div>
                    </div>
                </div>
                <div className="investment-actions">
                    <a href="#" className="action-btn secondary">Download Signed Docs</a>
                    <a href="#" className="action-btn secondary">View Reports</a>
                    <a href="#" className="action-btn primary">Fund Summary</a>
                </div>
                <div className="manage-wrapper">
                    <a href="#" className="action-btn secondary">Manage</a>
                </div>
            </div>

            <div className="investment-card">
                <div className="investment-header">
                    <div className="investment-title">Mogul Digital Fund</div>
                    <span className="investment-status">Active</span>
                </div>
                <div className="investment-content">
                    <InvestmentDetail
                        items={[
                            { label: "Commitment Amount", value: "$400,000" },
                            { label: "Called Capital", value: "$400,000 (100%)" },
                            { label: "Uncalled Capital", value: "$0" },
                            { label: "Estimated Value", value: "$592,000" },
                            { label: "Net Return", value: "+48.0%" },
                            { label: "IRR (since inception)", value: "38.2%" },
                        ]}
                    />
                    <div>
                        <div className="performance-chart">
                            <ValueChart
                                data={[
                                    400000, 420000, 440000, 470000, 500000, 530000, 
                                    550000, 570000, 580000, 585000, 590000, 592000,
                                ]}
                            />
                        </div>
                        <div className="irr-chart">
                            <IrrChart irr={38.2} />
                        </div>
                    </div>
                </div>
                <div className="investment-actions">
                    <a href="#" className="action-btn secondary">Download Signed Docs</a>
                    <a href="#" className="action-btn secondary">View Reports</a>
                    <a href="#" className="action-btn primary">Fund Summary</a>
                </div>
                <div className="manage-wrapper">
                    <a href="#" className="action-btn secondary">Manage</a>
                </div>
            </div>

            <div className="investment-card">
                <div className="investment-header">
                    <div className="investment-title">Mogul Technologies Fund</div>
                    <span className="investment-status">Active</span>
                </div>
                <div className="investment-content">
                    <InvestmentDetail
                        items={[
                            { label: "Commitment Amount", value: "$340,000" },
                            { label: "Called Capital", value: "$190,000 (56%)" },
                            { label: "Uncalled Capital", value: "$150,000" },
                            { label: "Estimated Value", value: "$382,400" },
                            { label: "Net Return", value: "+31.7%" },
                            { label: "IRR (since inception)", value: "26.5%" },
                        ]}
                    />

                    <div>
                        <div className="performance-chart">
                            <ValueChart
                                data={[
                                    340000, 345000, 350000, 360000, 370000, 375000, 
                                    380000, 382000, 382400, 382400, 382400, 382400,
                                ]}
                            />
                        </div>
                        <div className="irr-chart">
                            <IrrChart irr={26.5} />
                        </div>
                    </div>
                </div>
                <div className="investment-actions">
                    <a href="#" className="action-btn secondary">Download Signed Docs</a>
                    <a href="#" className="action-btn secondary">View Reports</a>
                    <a href="#" className="action-btn primary">Fund Summary</a>
                </div>
                <div className="manage-wrapper">
                    <a href="#" className="action-btn secondary">Manage</a>
                </div>
            </div>
        </section>
    </>
  );
}
