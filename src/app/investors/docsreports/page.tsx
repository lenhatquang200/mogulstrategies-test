'use client';
import React from 'react';
import "./documents-reports.css";

export default function DocsReportsPage() {
    interface Document {
        name: string;
        date: string;
        status?: string;
        action?: string;
    }

    interface Category {
        title: string;
        docs: Document[];
    }

    const categories: Category[] = [
        {
            title: 'Quarterly Investor Letters',
            docs: [
                { name: 'Q4 2025 Investor Letter', date: 'Dec 24, 2025' },
                { name: 'Q3 2025 Investor Letter', date: 'Sep 30, 2025' },
                { name: 'Q2 2025 Investor Letter', date: 'Jun 30, 2025' },
                { name: 'Q1 2025 Investor Letter', date: 'Mar 31, 2025' },
            ]
        },
        {
            title: 'Monthly Performance Reports',
            docs: [
                { name: 'December 2025 Report', date: 'Dec 24, 2025' },
                { name: 'November 2025 Report', date: 'Nov 30, 2025' },
                { name: 'October 2025 Report', date: 'Oct 31, 2025' },
                { name: 'September 2025 Report', date: 'Sep 30, 2025' },
            ]
        },
        {
            title: 'Quarterly Performance Reports',
            docs: [
                { name: 'Q4 2025 Performance Report', date: 'Dec 24, 2025' },
                { name: 'Q3 2025 Performance Report', date: 'Sep 30, 2025' },
                { name: 'Q2 2025 Performance Report', date: 'Jun 30, 2025' },
                { name: 'Q1 2025 Performance Report', date: 'Mar 31, 2025' },
            ]
        },
        {
            title: 'My Subscriptions',
            docs: [
                { name: 'Mogul Digital Fund Subscription Agreement', date: 'Signed Oct 12, 2025', action: 'View' },
                { name: 'Mogul Real Estate Fund Offering Memorandum', date: 'Signed Aug 5, 2025', action: 'View' },
                { name: 'Mogul Technologies Fund Subscription', date: 'Signed Jun 20, 2025', action: 'View' },
                { name: 'Creative Arts Fund Offering Documents', date: 'Signed Apr 3, 2025', action: 'View' },
            ]
        },
        {
            title: 'Tax Documents',
            docs: [
                { name: '2025 Schedule K-1 (Estimated)', date: 'Coming Q1 2026', status: 'Pending' },
                { name: '2024 Schedule K-1', date: 'Mar 15, 2025' },
                { name: '2023 Schedule K-1', date: 'Mar 15, 2024' },
                { name: 'Tax Reporting Guide', date: '' },
            ]
        }
    ];


    return (
        <>
            <h1 className="page-title">Documents & Reports</h1>

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

            <section className="documents-grid">
                {categories.map((cat, idx) => (
                    <div key={idx} className="document-category">
                        <h3>{cat.title}</h3>
                        <ul className="document-list" style={{ listStyle: 'none' }}>
                            {cat.docs.map((doc, dIdx) => (
                                <li key={dIdx} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{doc.name} {doc.date && <span className="date" style={{ fontSize: '0.9rem', color: '#AAAAAA' }}>({doc.date})</span>}</span>
                                    {doc.status === 'Pending' ? (
                                        <span style={{ color: '#AAAAAA' }}>Pending</span>
                                    ) : (
                                        <button style={{ background: 'none', border: 'none', color: '#D4AF37', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => alert(`Downloading ${doc.name}...`)}>
                                            {doc.action || 'Download PDF'}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Report Generator */}
                <div className="report-generator" style={{ background: '#112240', borderRadius: '16px', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.8rem', color: '#D4AF37', marginBottom: '1.5rem' }}>Report Generator</h3>
                    <p>Select a report type and generate a custom PDF on demand.</p>
                    <div className="report-options" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '1rem' }}>
                        {[
                            { id: 'portfolio', label: 'Portfolio Summary Report' },
                            { id: 'tax', label: 'Estimated Tax Summary' },
                            { id: 'allocation', label: 'Asset Allocation Breakdown' },
                            { id: 'performance', label: 'Historical Performance' },
                            { id: 'transactions', label: 'Transaction History' }
                        ].map((opt) => (
                            <div key={opt.id} className="report-option" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px' }}>
                                <label style={{ flex: 1, cursor: 'pointer' }}>
                                    <input type="radio" name="report" value={opt.id} style={{ marginRight: '0.5rem' }} /> {opt.label}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button className="generate-btn" style={{ background: '#D4AF37', color: '#0A1A2F', padding: '0.8rem 1.8rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '1.5rem' }} onClick={() => alert('Generating report...')}>Generate Report</button>
                </div>
            </section>
        </>
    );
}
