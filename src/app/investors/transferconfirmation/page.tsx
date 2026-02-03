'use client';
import React from 'react';
import Link from 'next/link';

export default function TransferConfirmationPage() {
    return (
        <>
            <h1 className="page-title">Subscription Confirmation</h1>

            <div className="progress-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                {[
                    { step: 1, label: 'Review Documents' },
                    { step: 2, label: 'E-Signature' },
                    { step: 3, label: 'Fund Transfer' },
                    { step: 4, label: 'Confirmation' }
                ].map((s, idx, arr) => (
                    <div key={s.step} className="progress-step completed" style={{ textAlign: 'center', flex: 1, position: 'relative' }}>
                        {idx < arr.length - 1 && (
                            <div style={{ position: 'absolute', top: '20px', left: '50%', width: '100%', height: '4px', background: '#D4AF37', zIndex: 0 }} />
                        )}
                        <div className="progress-circle" style={{
                            width: '40px', height: '40px', borderRadius: '50%', background: '#D4AF37', color: '#0A1A2F',
                            margin: '0 auto 0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1
                        }}>
                            {s.step}
                        </div>
                        <div className="progress-label" style={{ fontSize: '1rem' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            <section className="confirmation-container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                <div className="success-icon" style={{ fontSize: '6rem', color: '#0f0', marginBottom: '2rem' }}>✓</div>
                <div className="confirmation-message" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>
                    Congratulations! Your subscription has been successfully confirmed.
                </div>

                <div className="confirmation-details" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem', marginBottom: '3rem', textAlign: 'left' }}>
                    <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem', textAlign: 'center' }}>Subscription Details</h3>
                    {[
                        { label: 'Fund', value: 'Mogul Real Estate Fund – Tranche 3' },
                        { label: 'Commitment Amount', value: '$500,000.00' },
                        { label: 'Subscription Date', value: 'December 24, 2025' },
                        { label: 'Confirmation ID', value: 'SUB-2025-12-4872-RE3' },
                        { label: 'Status', value: 'Confirmed (Pending Fund Receipt)', color: '#0f0' }
                    ].map((item, i) => (
                        <div key={i} className="detail-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '1.2rem' }}>
                            <strong style={{ color: '#D4AF37' }}>{item.label}</strong>
                            <span style={{ color: item.color || 'inherit' }}>{item.value}</span>
                        </div>
                    ))}
                </div>

                <div className="next-steps" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem', textAlign: 'left' }}>
                    <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem', textAlign: 'center' }}>Next Steps</h3>
                    <ul style={{ listStyle: 'none' }}>
                        {[
                            'Wire transfer confirmation will be sent within 1–3 business days of receipt.',
                            'You will receive quarterly reports and distribution notices going forward.',
                            'Your updated portfolio reflecting this commitment will appear in "My Investments".',
                            'For any questions, please use Secure Messaging or contact your relationship manager.'
                        ].map((step, i) => (
                            <li key={i} style={{ padding: '1rem 0', borderBottom: i < 3 ? '1px solid rgba(212, 175, 55, 0.2)' : 'none' }}>{step}</li>
                        ))}
                    </ul>
                </div>

                <Link href="/investors/portfoliosummary">
                    <button className="dashboard-btn" style={{
                        display: 'inline-block', background: '#D4AF37', color: '#0A1A2F', padding: '1.2rem 3rem',
                        borderRadius: '12px', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '3rem', border: 'none', cursor: 'pointer'
                    }}>Return to Dashboard</button>
                </Link>
            </section>
        </>
    );
}
