'use client';
import React from 'react';
import "./syndication.css";

export default function SyndicationsPage() {
    const syndications = [
        {
            title: 'Dubai Luxury Waterfront Villa',
            assetType: 'Single-Family Luxury Residence',
            location: 'Palm Jumeirah, Dubai',
            targetSize: '$8.5M',
            minInvestment: '$250,000',
            hold: '3–5 years',
            expectedReturn: '18–22% IRR',
            raised: 61,
        },
        {
            title: 'Miami Beach Boutique Hotel',
            assetType: 'Boutique Hospitality',
            location: 'South Beach, Miami, FL',
            targetSize: '$12M',
            minInvestment: '$300,000',
            hold: '5–7 years',
            expectedReturn: '14–18% IRR + Yield',
            raised: 65,
        },
        {
            title: 'Los Angeles Feature Film SPV',
            assetType: 'Motion Picture Financing',
            project: 'Major studio co-production (A-list talent)',
            targetSize: '$15M',
            minInvestment: '$500,000',
            hold: '2–4 years',
            expectedReturn: '20–30% IRR',
            raised: 43,
        },
        {
            title: 'Austin Tech Campus Acquisition',
            assetType: 'Commercial Office',
            location: 'Austin, TX',
            targetSize: '$22M',
            minInvestment: '$750,000',
            hold: '7–10 years',
            expectedReturn: '10–14% IRR + 6% Yield',
            raised: 41,
        }
    ];

    return (
        <>
            <h1 className="page-title">Syndications</h1>

            <p style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 4rem', fontSize: '1.2rem' }}>
                Exclusive single-asset SPV syndications offering direct exposure to proprietary deal flow outside of our structured funds.
            </p>

            <section className="syndications-grid">
                {syndications.map((item, idx) => (
                    <div key={idx} className="syndication-card">
                        <div className="syndication-header">
                            <div className="syndication-title">{item.title}</div>
                            <span className="syndication-status" style={{ background: 'rgba(0, 255, 0, 0.2)', color: '#0f0', padding: '0.5rem 1.2rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>Open</span>
                        </div>
                        <div className="syndication-details">
                            <p><strong>Asset Type:</strong> {item.assetType}</p>
                            {item.project && <p><strong>Project:</strong> {item.project}</p>}
                            {item.location && <p><strong>Location:</strong> {item.location}</p>}
                            <p><strong>Target Size:</strong> {item.targetSize}</p>
                            <p><strong>Minimum Investment:</strong> {item.minInvestment}</p>
                            <p><strong>Projected Hold:</strong> {item.hold}</p>
                            <p><strong>Expected Return:</strong> <span className="highlight">{item.expectedReturn}</span></p>
                            <p><strong>Raised to Date:</strong> {Math.floor(parseFloat(item.targetSize.replace('$', '').replace('M', '')) * item.raised / 100).toFixed(1)}M ({item.raised}%)</p>
                            <div className="progress-bar" style={{ background: '#333', height: '12px', borderRadius: '6px', overflow: 'hidden', margin: '1.5rem 0' }}>
                                <div className="progress-fill" style={{ width: `${item.raised}%`, height: '100%', background: '#D4AF37', transition: 'width 0.5s ease', top: 0 }}></div>
                            </div>
                        </div>
                        <div className="syndication-actions">
                            <button className="action-btn view" onClick={() => alert('Viewing deck...')}>View Deck</button>
                            <button className="action-btn view" onClick={() => alert('Reading memorandum...')}>Read Memorandum</button>
                            <button className="action-btn indicate" onClick={() => alert('Interest indicated!')}>Indicate Interest</button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
