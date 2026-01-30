"use client";

import { useState } from "react";
import "./offering.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";

export default function ActiveOfferingsPage() {

  return (
    <>
        <h1 className="page-title">Active Offerings</h1>

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
        
        <section className="offerings-grid">
          
            <div className="offering-card">
                <div className="offering-header">
                    <div className="offering-title">Mogul Real Estate Fund – Tranche 3</div>
                    <span className="offering-status status-open">Open</span>
                </div>
                <div className="offering-details">
                    <p><strong>Target Size:</strong> $50M</p>
                    <p><strong>Minimum Commitment:</strong> $250,000</p>
                    <p><strong>Focus:</strong> Income-producing multifamily properties in premium Gulf regions</p>
                    <p><strong>Projected IRR:</strong> <span className="highlight">12–15%</span></p>
                    <p><strong>Closing Date:</strong> January 31, 2026</p>
                    <p><strong>Raised to Date:</strong> $28M (56% of target)</p>
                </div>
                <div className="offering-actions">
                    <a href="#" className="action-btn view">View Deck</a>
                    <a href="#" className="action-btn view">Read Memorandum</a>
                    <a href="#" className="action-btn subscribe">Subscribe Now</a>
                    <a href="#" className="action-btn wire">Wire Details</a>
                </div>
            </div>

            <div className="offering-card">
                <div className="offering-header">
                    <div className="offering-title">Mogul Technologies Fund II</div>
                    <span className="offering-status status-open">Open</span>
                </div>
                <div className="offering-details">
                    <p><strong>Target Size:</strong> $75M</p>
                    <p><strong>Minimum Commitment:</strong> $500,000</p>
                    <p><strong>Focus:</strong> High-growth AI, quantum computing, and deep tech ventures</p>
                    <p><strong>Projected Multiple:</strong> <span className="highlight">3–5x</span></p>
                    <p><strong>First Close:</strong> February 28, 2026</p>
                    <p><strong>Raised to Date:</strong> $42M (56% of target)</p>
                </div>
                <div className="offering-actions">
                    <a href="#" className="action-btn view">View Deck</a>
                    <a href="#" className="action-btn view">Read Memorandum</a>
                    <a href="#" className="action-btn subscribe">Subscribe Now</a>
                    <a href="#" className="action-btn wire">Wire Details</a>
                </div>
            </div>

            <div className="offering-card">
                <div className="offering-header">
                    <div className="offering-title">Creative Arts Fund – Series B</div>
                    <span className="offering-status status-open">Open</span>
                </div>
                <div className="offering-details">
                    <p><strong>Target Size:</strong> $30M</p>
                    <p><strong>Minimum Commitment:</strong> $100,000</p>
                    <p><strong>Focus:</strong> Motion picture production and entertainment IP</p>
                    <p><strong>Projected IRR:</strong> <span className="highlight">18–25%</span></p>
                    <p><strong>Closing Date:</strong> March 15, 2026</p>
                    <p><strong>Raised to Date:</strong> $12M (40% of target)</p>
                </div>
                <div className="offering-actions">
                    <a href="#" className="action-btn view">View Deck</a>
                    <a href="#" className="action-btn view">Read Memorandum</a>
                    <a href="#" className="action-btn subscribe">Subscribe Now</a>
                    <a href="#" className="action-btn wire">Wire Details</a>
                </div>
            </div>

            <div className="offering-card">
                <div className="offering-header">
                    <div className="offering-title">Mogul Digital Fund – Final Close</div>
                    <span className="offering-status status-closed">Closed</span>
                </div>
                <div className="offering-details">
                    <p><strong>Target Size:</strong> $100M</p>
                    <p><strong>Status:</strong> Fully subscribed and closed</p>
                    <p><strong>Closed:</strong> October 2025</p>
                    <p>Thank you for your participation. Performance updates available in Portfolio Summary.</p>
                </div>
                <div className="offering-actions">
                    <a href="#" className="action-btn archive">Archived Memorandum</a>
                    <a href="#" className="action-btn stats">Fund Stats</a>
                </div>
            </div>
        </section>
    </>
  );
}


