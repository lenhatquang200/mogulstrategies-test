'use client';
import React from 'react';
import Link from 'next/link';

export default function FundTransferPage() {
    return (
        <>
            <h1 className="page-title">Fund Transfer</h1>

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
                        style={{ marginTop: '1rem', background: '#D4AF37', color: '#0A1A2F', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                        onClick={() => alert('Message sent!')}>Send Message</button>
                </div>
            </section>

            <div className="progress-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                {[
                    { step: 1, label: 'Review Documents', status: 'completed' },
                    { step: 2, label: 'E-Signature', status: 'completed' },
                    { step: 3, label: 'Fund Transfer', status: 'active' },
                    { step: 4, label: 'Confirmation', status: '' }
                ].map((s, idx, arr) => (
                    <div key={s.step} className={`progress-step ${s.status}`} style={{ textAlign: 'center', flex: 1, position: 'relative' }}>
                        {idx < arr.length - 1 && (
                            <div style={{ position: 'absolute', top: '20px', left: '50%', width: '100%', height: '4px', background: (s.status === 'completed' || s.status === 'active') ? '#D4AF37' : '#333', zIndex: 0 }} />
                        )}
                        <div className="progress-circle" style={{
                            width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1,
                            background: (s.status === 'completed' || s.status === 'active') ? '#D4AF37' : '#333',
                            color: (s.status === 'completed' || s.status === 'active') ? '#0A1A2F' : '#AAAAAA'
                        }}>
                            {s.step}
                        </div>
                        <div className="progress-label" style={{ fontSize: '1rem' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            <section className="transfer-container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                <div className="transfer-summary" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem' }}>Transfer Summary</h3>
                    {[
                        { label: 'Fund', value: 'Mogul Real Estate Fund – Tranche 3' },
                        { label: 'Commitment Amount', value: '$500,000.00' },
                        { label: 'Due Date', value: 'January 15, 2026' },
                        { label: 'Reference/ID', value: 'MS-INV-4872-RE3' },
                        { label: 'Status', value: 'Pending Receipt', color: '#0f0' }
                    ].map((item, i) => (
                        <div key={i} style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold', color: '#D4AF37' }}>{item.label}</span>
                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: item.color || 'inherit' }}>{item.value}</span>
                        </div>
                    ))}
                </div>

                <div className="wire-instructions" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem' }}>Wire Transfer Instructions</h3>
                    <p style={{ marginBottom: '1.5rem' }}>Please initiate transfer to the escrow account below. Funds must be received by the due date to complete subscription.</p>
                    <div style={{ background: '#0A1A2F', padding: '1.8rem', borderRadius: '12px', fontFamily: 'monospace', lineHeight: '1.8' }}>
                        <p><strong>Bank Name:</strong> JPMorgan Chase Bank, N.A.</p>
                        <p><strong>Beneficiary:</strong> Mogul Strategies Escrow Account</p>
                        <p><strong>Account Number:</strong> 9876543210</p>
                        <p><strong>Routing Number:</strong> 021000021</p>
                        <p><strong>SWIFT Code:</strong> CHASUS33</p>
                        <p><strong>Bank Address:</strong> 270 Park Avenue, NY 10017</p>
                        <p><strong>Reference (Required):</strong> MS-INV-4872-RE3</p>
                    </div>
                    <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#AAAAAA' }}>Expected processing: 1–3 business days. You will receive confirmation upon receipt.</p>
                </div>
            </section>

            <section className="crypto-option" style={{ background: '#112240', borderRadius: '16px', padding: '2rem', marginTop: '3rem', maxWidth: '1000px', margin: '3rem auto 0' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#D4AF37', marginBottom: '1rem' }}>Cryptocurrency Transfer Option</h3>
                <p style={{ marginBottom: '1.5rem' }}>We also accept USDC (ERC-20) or BTC for qualified commitments. Contact your manager for approval.</p>
                <div style={{ background: '#0A1A2F', padding: '1.5rem', borderRadius: '12px', wordBreak: 'break-all', marginBottom: '1.5rem' }}>
                    <p style={{ marginBottom: '1rem' }}><strong>USDC (ERC-20) Address:</strong><br />0x742d35Cc6634C0532925a3b844Bc454e4438f44e</p>
                    <p><strong>BTC Address:</strong><br />bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
                </div>
                <button style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }} onClick={() => alert('Addresses copied to clipboard!')}>Copy Addresses</button>
            </section>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <Link href="/investors/transferconfirmation">
                    <button style={{
                        width: '100%', background: '#D4AF37', color: '#0A1A2F', padding: '1.5rem', border: 'none', borderRadius: '12px',
                        fontSize: '1.4rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '3rem'
                    }}>I Have Initiated Transfer</button>
                </Link>
            </div>
        </>
    );
}
