'use client';
import React from 'react';
import "./distributions-tax.css";

export default function DistributionsTaxPage() {
    const distributionHistory = [
        { name: 'Q4 2025 Distribution', date: 'Dec 20, 2025', amount: '$18,420.00' },
        { name: 'Q3 2025 Distribution', date: 'Sep 25, 2025', amount: '$15,780.00' },
        { name: 'Q2 2025 Distribution', date: 'Jun 28, 2025', amount: '$17,210.00' },
        { name: 'Q1 2025 Distribution', date: 'Mar 31, 2025', amount: '$14,950.00' },
        { name: 'Q4 2024 Distribution', date: 'Dec 20, 2024', amount: '$16,340.00' },
    ];

    const taxDocuments = [
        { name: '2025 Schedule K-1 (Estimated)', date: 'Coming Q1 2026', status: 'Pending' },
        { name: '2024 Schedule K-1', date: 'Mar 15, 2025', action: 'Download PDF' },
        { name: '2023 Schedule K-1', date: 'Mar 15, 2024', action: 'Download PDF' },
        { name: '2022 Schedule K-1', date: 'Mar 15, 2023', action: 'Download PDF' },
        { name: 'Tax Reporting Guide (2025)', action: 'Download PDF' },
        { name: 'Foreign Tax Credit Information', action: 'Download PDF' },
    ];

    const summaryItems = [
        { label: 'Total Distributions YTD', value: '$0.00' },
        { label: 'Average Quarterly Distribution', value: '$0.00' },
        { label: 'Projected Annual Yield', value: '5.2%' },
        { label: 'Reinvested Distributions', value: '$0.00' },
        { label: 'Cash Distributions Expected', value: 'Pending Q1' },
    ];

    return (
        <>
            <h1 className="page-title">Distributions & Tax</h1>

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
                    <button onClick={() => alert('Message sent!')}
                        style={{ marginTop: '1rem', background: '#D4AF37', color: '#0A1A2F', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Send
                        Message</button>
                </div>
            </section>

            <section className="distributions-grid">
                {/* Distribution History */}
                <div className="dist-card">
                    <h3>Distribution History</h3>
                    <ul className="dist-list">
                        {distributionHistory.map((item, idx) => (
                            <li key={idx}>
                                <span>{item.name} <span className="date">({item.date})</span></span>
                                <span className="amount">{item.amount}</span>
                            </li>
                        ))}
                    </ul>
                    <button style={{ background: 'none', border: 'none', color: '#D4AF37', display: 'block', margin: '1.5rem auto 0', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => alert('View full history...')}>View Full History →</button>
                </div>

                {/* Tax Documents */}
                <div className="dist-card">
                    <h3>Tax Documents</h3>
                    <ul className="dist-list">
                        {taxDocuments.map((item, idx) => (
                            <li key={idx}>
                                <span>{item.name} {item.date && <span className="date">({item.date})</span>}</span>
                                {item.status === 'Pending' ? (
                                    <span style={{ color: '#AAAAAA' }}>Pending</span>
                                ) : (
                                    <button style={{ background: 'none', border: 'none', color: '#D4AF37', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => alert(`Downloading ${item.name}...`)}>{item.action || 'Download PDF'}</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 2026 Distribution Summary */}
                <div className="dist-card">
                    <h3>2026 Distribution Summary</h3>
                    <ul className="dist-list">
                        {summaryItems.map((item, idx) => (
                            <li key={idx}>
                                <span>{item.label}</span>
                                <span className="amount">{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tax Information & Resources */}
                <div className="dist-card">
                    <h3>Tax Information & Resources</h3>
                    <p style={{ marginBottom: '1rem' }}>Mogul Strategies funds are structured as pass-through entities. Investors receive Schedule K-1 forms annually.</p>
                    <ul className="dist-list">
                        <li><span>Expected K-1 Delivery (2025)</span> <span>Mid-March 2026</span></li>
                        <li><span>Tax Advisor Contact</span> <a href="mailto:tax@mogulstrategies.com">tax@mogulstrategies.com</a></li>
                        <li><span>Estimated Tax Payments Guide</span> <button style={{ background: 'none', border: 'none', color: '#D4AF37', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => alert('Downloading guide...')}>Download PDF</button></li>
                        <li><span>State Tax Considerations</span> <button style={{ background: 'none', border: 'none', color: '#D4AF37', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => alert('Viewing details...')}>View Details</button></li>
                    </ul>
                </div>
            </section>
        </>
    );
}
