import React from 'react';

export default function CapitalCallsPage() {
    const openCalls = [
        {
            fund: 'Mogul Real Estate Fund – Tranche 3',
            issued: 'Dec 10, 2025',
            due: 'Jan 15, 2026',
            amount: '$75,000.00'
        },
        {
            fund: 'Mogul Technologies Fund – Follow-on',
            issued: 'Nov 20, 2025',
            due: 'Jan 20, 2026',
            amount: '$50,000.00'
        }
    ];

    const paidCalls = [
        { fund: 'Mogul Digital Fund – Initial Call', date: 'Paid: Oct 5, 2025', amount: '$100,000.00' },
        { fund: 'Mogul Real Estate Fund – Tranche 2', date: 'Paid: Jul 12, 2025', amount: '$60,000.00' },
        { fund: 'Creative Arts Fund – Production Call', date: 'Paid: Apr 18, 2025', amount: '$40,000.00' },
    ];

    const summaryData = [
        { label: 'Total Committed Capital', value: '$1,240,000.00' },
        { label: 'Total Called to Date', value: '$965,000.00' },
        { label: 'Total Paid', value: '$965,000.00' },
        { label: 'Outstanding Calls', value: '$125,000.00' },
        { label: 'Remaining Uncalled Capital', value: '$275,000.00' },
    ];

    return (
        <>
            <h1 className="page-title">Capital Calls</h1>

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

            <section className="capital-grid">
                {/* Current/Open Capital Calls */}
                <div className="capital-card">
                    <h3>Current & Open Capital Calls</h3>
                    <ul className="call-list" style={{ listStyle: 'none' }}>
                        {openCalls.map((call, idx) => (
                            <li key={idx} style={{ padding: '1.2rem 0', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <strong>{call.fund}</strong>
                                    <div className="call-date" style={{ fontSize: '0.9rem', color: '#AAAAAA' }}>Issued: {call.issued} | Due: {call.due}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div className="call-amount" style={{ fontWeight: 'bold', color: '#D4AF37', fontSize: '1.2rem' }}>{call.amount}</div>
                                    <span className="call-status" style={{ padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', background: 'rgba(0, 255, 0, 0.2)', color: '#0f0' }}>Open</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button style={{ background: 'none', border: 'none', color: '#D4AF37', display: 'block', margin: '1.5rem auto 0', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => alert('Viewing instructions...')}>View Payment Instructions →</button>
                </div>

                {/* Paid Capital Calls History */}
                <div className="capital-card">
                    <h3>Paid Capital Calls History</h3>
                    <ul className="call-list" style={{ listStyle: 'none' }}>
                        {paidCalls.map((call, idx) => (
                            <li key={idx} style={{ padding: '1.2rem 0', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <strong>{call.fund}</strong>
                                    <div className="call-date" style={{ fontSize: '0.9rem', color: '#AAAAAA' }}>{call.date}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div className="call-amount" style={{ fontWeight: 'bold', color: '#D4AF37', fontSize: '1.2rem' }}>{call.amount}</div>
                                    <span className="call-status" style={{ padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', background: 'rgba(212, 175, 55, 0.2)', color: '#D4AF37' }}>Paid</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button style={{ background: 'none', border: 'none', color: '#D4AF37', display: 'block', margin: '1.5rem auto 0', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => alert('Viewing history...')}>View Full History →</button>
                </div>

                {/* Capital Call Summary */}
                <div className="capital-card">
                    <h3>Capital Call Summary</h3>
                    <ul className="call-list" style={{ listStyle: 'none' }}>
                        {summaryData.map((item, idx) => (
                            <li key={idx} style={{ padding: '1.2rem 0', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>{item.label}</span>
                                <span className="call-amount" style={{ fontWeight: 'bold', color: '#D4AF37', fontSize: '1.2rem' }}>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Capital Call Information */}
                <div className="capital-card">
                    <h3>Capital Call Information</h3>
                    <p style={{ marginBottom: '1rem' }}>Capital calls are issued as investment opportunities arise in accordance with fund documents.</p>
                    <ul className="call-list" style={{ listStyle: 'none' }}>
                        <li style={{ padding: '1.2rem 0', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Notice Period</span> <span>30 days</span>
                        </li>
                        <li style={{ padding: '1.2rem 0', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Payment Methods</span> <span>Wire Transfer, ACH, Crypto (BTC/ETH/USDC)</span>
                        </li>
                        <li style={{ padding: '1.2rem 0', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Default Policy</span> <button style={{ background: 'none', border: 'none', color: '#D4AF37', fontWeight: 'bold' }}>View Details</button>
                        </li>
                        <li style={{ padding: '1.2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Contact for Questions</span> <a href="mailto:capitalcalls@mogulstrategies.com">capitalcalls@mogulstrategies.com</a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}
