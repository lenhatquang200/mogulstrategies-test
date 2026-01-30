"use client";

import { useState } from "react";
import "./syndication.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";

export default function SyndicationPage() {

  return (
    <>
        <h1 className="page-title">Syndications</h1>

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

        <p style={{
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto 4rem",
          fontSize: "1.2rem",
        }}>
            Exclusive single-asset SPV syndications offering direct exposure to proprietary deal flow outside of our structured funds.
        </p>

        <section className="syndications-grid">
            <div className="syndication-card">
                <div className="syndication-header">
                    <div className="syndication-title">Dubai Luxury Waterfront Villa</div>
                    <span className="syndication-status">Open</span>
                </div>
                <div className="syndication-details">
                    <p><strong>Asset Type:</strong> Single-Family Luxury Residence</p>
                    <p><strong>Location:</strong> Palm Jumeirah, Dubai</p>
                    <p><strong>Target Size:</strong> $8.5M</p>
                    <p><strong>Minimum Investment:</strong> $250,000</p>
                    <p><strong>Projected Hold:</strong> 3–5 years</p>
                    <p><strong>Expected Return:</strong> <span className="highlight">18–22% IRR</span></p>
                    <p><strong>Raised to Date:</strong> $5.2M (61%)</p>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "61%" }}></div>
                    </div>
                </div>
                <div className="syndication-actions">
                    <a href="#" className="action-btn view">View Deck</a>
                    <a href="#" className="action-btn view">Read Memorandum</a>
                    <a href="#" className="action-btn indicate">Indicate Interest</a>
                </div>
            </div>

            <div className="syndication-card">
                <div className="syndication-header">
                    <div className="syndication-title">Miami Beach Boutique Hotel</div>
                    <span className="syndication-status">Open</span>
                </div>
                <div className="syndication-details">
                    <p><strong>Asset Type:</strong> Boutique Hospitality</p>
                    <p><strong>Location:</strong> South Beach, Miami, FL</p>
                    <p><strong>Target Size:</strong> $12M</p>
                    <p><strong>Minimum Investment:</strong> $300,000</p>
                    <p><strong>Projected Hold:</strong> 5–7 years</p>
                    <p><strong>Expected Return:</strong> <span className="highlight">14–18% IRR + Yield</span></p>
                    <p><strong>Raised to Date:</strong> $7.8M (65%)</p>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "65%" }}></div>
                    </div>
                </div>
                <div className="syndication-actions">
                    <a href="#" className="action-btn view">View Deck</a>
                    <a href="#" className="action-btn view">Read Memorandum</a>
                    <a href="#" className="action-btn indicate">Indicate Interest</a>
                </div>
            </div>

            <div className="syndication-card">
                <div className="syndication-header">
                    <div className="syndication-title">Los Angeles Feature Film SPV</div>
                    <span className="syndication-status">Open</span>
                </div>
                <div className="syndication-details">
                    <p><strong>Asset Type:</strong> Motion Picture Financing</p>
                    <p><strong>Project:</strong> Major studio co-production (A-list talent)</p>
                    <p><strong>Target Size:</strong> $15M</p>
                    <p><strong>Minimum Investment:</strong> $500,000</p>
                    <p><strong>Projected Hold:</strong> 2–4 years</p>
                    <p><strong>Expected Return:</strong> <span className="highlight">20–30% IRR</span></p>
                    <p><strong>Raised to Date:</strong> $6.5M (43%)</p>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "43%" }}></div>
                    </div>
                </div>
                <div className="syndication-actions">
                    <a href="#" className="action-btn view">View Deck</a>
                    <a href="#" className="action-btn view">Read Memorandum</a>
                    <a href="#" className="action-btn indicate">Indicate Interest</a>
                </div>
            </div>

            <div className="syndication-card">
                <div className="syndication-header">
                    <div className="syndication-title">Austin Tech Campus Acquisition</div>
                    <span className="syndication-status">Open</span>
                </div>
                <div className="syndication-details">
                    <p><strong>Asset Type:</strong> Commercial Office</p>
                    <p><strong>Location:</strong> Austin, TX</p>
                    <p><strong>Target Size:</strong> $22M</p>
                    <p><strong>Minimum Investment:</strong> $750,000</p>
                    <p><strong>Projected Hold:</strong> 7–10 years</p>
                    <p><strong>Expected Return:</strong> <span className="highlight">10–14% IRR + 6% Yield</span></p>
                    <p><strong>Raised to Date:</strong> $9M (41%)</p>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "41%" }}></div>
                    </div>
                </div>
                <div className="syndication-actions">
                    <a href="#" className="action-btn view">View Deck</a>
                    <a href="#" className="action-btn view">Read Memorandum</a>
                    <a href="#" className="action-btn indicate">Indicate Interest</a>
                </div>
            </div>
        </section>
    </>
  );
}
