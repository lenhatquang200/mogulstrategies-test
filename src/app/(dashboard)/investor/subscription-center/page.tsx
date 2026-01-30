"use client";

import { useState } from "react";
import "./subscription.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";

export default function SyndicationPage() {

  return (
    <>
        <h1 className="page-title">Subscription Center</h1>

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

        <div className="subscription-progress-bar">
            <div className="progress-step completed">
                <div className="progress-circle">1</div>
                <div className="progress-label">Review Documents</div>
            </div>
            <div className="progress-step active">
                <div className="progress-circle">2</div>
                <div className="progress-label">Electronic Signature</div>
            </div>
            <div className="progress-step">
                <div className="progress-circle">3</div>
                <div className="progress-label">Fund Transfer</div>
            </div>
            <div className="progress-step">
                <div className="progress-circle">4</div>
                <div className="progress-label">Confirmation</div>
            </div>
        </div>

        <section className="esign-container">
            <div className="pdf-viewer">
                <iframe src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" title="Subscription Document"></iframe>
            </div>

            <div className="signature-panel">
                <h3>Complete Your Subscription</h3>
                <div className="document-info">
                    <p><strong>Document:</strong> Mogul Real Estate Fund – Tranche 3 Subscription Agreement</p>
                    <p><strong>Commitment Amount:</strong> <span className="highlight">$500,000.00</span></p>
                    <p><strong>Fund:</strong> Mogul Real Estate Fund</p>
                    <p><strong>Date:</strong> December 24, 2025</p>
                </div>

                <div className="signature-fields">
                    <div className="field-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" value="John Doe" readOnly />
                    </div>
                    <div className="field-group">
                        <label htmlFor="title">Title (if applicable)</label>
                        <input type="text" id="title" placeholder="e.g., Managing Member" />
                    </div>
                    <div className="field-group">
                        <label>Signature</label>
                        <div className="signature-pad" id="signaturePad">
                            Click here to sign
                        </div>
                        <button className="clear-signature" id="clearSig">Clear Signature</button>
                    </div>
                </div>

                <button className="sign-btn" id="completeSign">Complete Electronic Signature</button>

                <p style={{
                    marginTop: "2rem",
                    fontSize: "0.9rem",
                    color: "#AAAAAA",
                }}>
                    By clicking "Complete Electronic Signature", you agree to use electronic records and signatures in accordance with the U.S. Electronic Signatures in Global and National Commerce Act (ESIGN) and Uniform Electronic Transactions Act (UETA).
                </p>
            </div>
        </section>
    </>
  );
}
