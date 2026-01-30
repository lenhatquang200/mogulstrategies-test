"use client";

import { useState } from "react";
import "./capital-calls.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";

export default function CapitalCallsPage() {

  return (
    <>
        <h1 className="page-title">Capital Calls</h1>

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

        <section className="capital-grid">
            
            <div className="capital-card">
                <h3>Current & Open Capital Calls</h3>
                <ul className="call-list">
                    <li>
                        <div>
                            <strong>Mogul Real Estate Fund – Tranche 3</strong>
                            <div className="call-date">Issued: Dec 10, 2025 | Due: Jan 15, 2026</div>
                        </div>
                        <div>
                            <span className="call-amount">$75,000.00</span>
                            <span className="call-status status-open">Open</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <strong>Mogul Technologies Fund – Follow-on</strong>
                            <div className="call-date">Issued: Nov 20, 2025 | Due: Jan 20, 2026</div>
                        </div>
                        <div>
                            <span className="call-amount">$50,000.00</span>
                            <span className="call-status status-open">Open</span>
                        </div>
                    </li>
                </ul>
                <a href="#"  style={{
                    display: "block",
                    marginTop: "1.5rem",
                    textAlign: "center",
                    fontWeight: "bold",
                }}>View Payment Instructions →</a>
            </div>

            <div className="capital-card">
                <h3>Paid Capital Calls History</h3>
                <ul className="call-list">
                    <li>
                        <div>
                            <strong>Mogul Digital Fund – Initial Call</strong>
                            <div className="call-date">Paid: Oct 5, 2025</div>
                        </div>
                        <div>
                            <span className="call-amount">$100,000.00</span>
                            <span className="call-status status-paid">Paid</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <strong>Mogul Real Estate Fund – Tranche 2</strong>
                            <div className="call-date">Paid: Jul 12, 2025</div>
                        </div>
                        <div>
                            <span className="call-amount">$60,000.00</span>
                            <span className="call-status status-paid">Paid</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <strong>Creative Arts Fund – Production Call</strong>
                            <div className="call-date">Paid: Apr 18, 2025</div>
                        </div>
                        <div>
                            <span className="call-amount">$40,000.00</span>
                            <span className="call-status status-paid">Paid</span>
                        </div>
                    </li>
                </ul>
                <a href="#"  style={{
                    display: "block",
                    marginTop: "1.5rem",
                    textAlign: "center",
                    fontWeight: "bold",
                }}>View Full History →</a>
            </div>

            <div className="capital-card">
                <h3>Capital Call Summary</h3>
                <ul className="call-list">
                    <li><span>Total Committed Capital</span> <span className="call-amount">$1,240,000.00</span></li>
                    <li><span>Total Called to Date</span> <span className="call-amount">$965,000.00</span></li>
                    <li><span>Total Paid</span> <span className="call-amount">$965,000.00</span></li>
                    <li><span>Outstanding Calls</span> <span className="call-amount">$125,000.00</span></li>
                    <li><span>Remaining Uncalled Capital</span> <span className="call-amount">$275,000.00</span></li>
                </ul>
            </div>

            <div className="capital-card">
                <h3>Capital Call Information</h3>
                <p>Capital calls are issued as investment opportunities arise in accordance with fund documents.</p>
                <ul className="call-list">
                    <li><span>Notice Period</span> <span>30 days</span></li>
                    <li><span>Payment Methods</span> <span>Wire Transfer, ACH, Crypto (BTC/ETH/USDC)</span></li>
                    <li><span>Default Policy</span> <a href="#">View Details</a></li>
                    <li><span>Contact for Questions</span> <a href="mailto:capitalcalls@mogulstrategies.com">capitalcalls@mogulstrategies.com</a></li>
                </ul>
            </div>
        </section>
    </>
  );
}
