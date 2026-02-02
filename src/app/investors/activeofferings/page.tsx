'use client';
import React from 'react';
import "./offering.css";

export default function ActiveOfferingsPage() {
    const offerings = [
        {
            title: 'Mogul Real Estate Fund – Tranche 3',
            status: 'Open',
            targetSize: '$50M',
            minCommitment: '$250,000',
            focus: 'Income-producing multifamily properties in premium Gulf regions',
            projectedIRR: '12–15%',
            closingDate: 'January 31, 2026',
            raised: '$28M (56% of target)',
            actions: ['View Deck', 'Read Memorandum', 'Subscribe Now', 'Wire Details']
        },
        {
            title: 'Mogul Technologies Fund II',
            status: 'Open',
            targetSize: '$75M',
            minCommitment: '$500,000',
            focus: 'High-growth AI, quantum computing, and deep tech ventures',
            projectedIRR: '3–5x (Multiple)',
            closingDate: 'February 28, 2026',
            raised: '$42M (56% of target)',
            actions: ['View Deck', 'Read Memorandum', 'Subscribe Now', 'Wire Details']
        },
        {
            title: 'Creative Arts Fund – Series B',
            status: 'Open',
            targetSize: '$30M',
            minCommitment: '$100,000',
            focus: 'Motion picture production and entertainment IP',
            projectedIRR: '18–25%',
            closingDate: 'March 15, 2026',
            raised: '$12M (40% of target)',
            actions: ['View Deck', 'Read Memorandum', 'Subscribe Now', 'Wire Details']
        },
        {
            title: 'Mogul Digital Fund – Final Close',
            status: 'Closed',
            targetSize: '$100M',
            statusText: 'Fully subscribed and closed',
            closedDate: 'October 2025',
            actions: ['Archived Memorandum', 'Fund Stats']
        }
    ];

    return (
        <>
            <h1 className="page-title">Active Offerings</h1>

            <section className="top-row">
                <div className="top-card account-info-card">
                    <h3>Account Information</h3>
                    <ul>
                        <li><strong>Name:</strong> John Doe</li>
                        <li><strong>Email:</strong> john.doe@example.com</li>
                        <li><strong>Investor Type:</strong> Accredited Individual</li>
                        <li><strong>Account ID:</strong> MS-INV-4872</li>
                        <li><strong>Joined:</strong> March 15, 2023</li>
                        <li><strong>Last Login:</strong> December 24, 2025</li>
                    </ul>
                </div>

                <div className="top-card messaging-card">
                    <h3>Secure Messaging</h3>
                    <p>Communicate directly with your relationship manager.</p>
                    <a href="#" style={{ display: 'block', margin: '1rem 0', fontWeight: 'bold' }}>Open Inbox (2 unread)</a>
                    <textarea placeholder="Type your message..."
                        style={{ width: '100%', height: '100px', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }}></textarea>
                    <button
                        style={{ marginTop: '1rem', background: '#D4AF37', color: '#0A1A2F', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Send
                        Message</button>
                </div>
            </section>

            <section className="offerings-grid">
                {offerings.map((offering, idx) => (
                    <div key={idx} className="offering-card">
                        <div className="offering-header">
                            <div className="offering-title">{offering.title}</div>
                            <span className={`offering-status ${offering.status === 'Open' ? 'status-open' : 'status-closed'}`}>
                                {offering.status}
                            </span>
                        </div>
                        <div className="offering-details">
                            <p><strong>Target Size:</strong> {offering.targetSize}</p>
                            {offering.status === 'Open' ? (
                                <>
                                    <p><strong>Minimum Commitment:</strong> {offering.minCommitment}</p>
                                    <p><strong>Focus:</strong> {offering.focus}</p>
                                    <p><strong>Projected Return:</strong> <span className="highlight">{offering.projectedIRR}</span></p>
                                    <p><strong>Closing Date:</strong> {offering.closingDate}</p>
                                    <p><strong>Raised to Date:</strong> {offering.raised}</p>
                                </>
                            ) : (
                                <>
                                    <p><strong>Status:</strong> {offering.statusText}</p>
                                    <p><strong>Closed:</strong> {offering.closedDate}</p>
                                    <p>Thank you for your participation. Performance updates available in Portfolio Summary.</p>
                                </>
                            )}
                        </div>
                        <div className="offering-actions">
                            {offering.actions.map((action, actionIdx) => {
                                let className = "action-btn ";
                                if (action === 'Subscribe Now') className += "subscribe";
                                else if (action === 'Wire Details') className += "wire";
                                else if (action === 'Archived Memorandum') className += "archive";
                                else if (action === 'Fund Stats') className += "stats";
                                else className += "view";

                                return (
                                    <button key={actionIdx} className={className} onClick={() => alert(`${action} feature coming soon!`)}>
                                        {action}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
