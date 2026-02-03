'use client';
import React from 'react';
import Link from 'next/link';

export default function KYCStep5Page() {
    return (
        <>
            <h1 className="page-title">Step 4: Review & Approval</h1>

            {/* Progress Bar – All Completed */}
            <section className="progress-container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2>KYC & Accreditation Progress</h2>
                <div className="progress-bar">
                    <div className="progress-line"></div>
                    <div className="progress-fill" style={{ width: '100%' }}></div>
                    <div className="progress-step completed">
                        <div className="progress-circle">1</div>
                        <div className="progress-label">Personal Information</div>
                    </div>
                    <div className="progress-step completed">
                        <div className="progress-circle">2</div>
                        <div className="progress-label">Identity Verification</div>
                    </div>
                    <div className="progress-step completed">
                        <div className="progress-circle">3</div>
                        <div className="progress-label">Accreditation</div>
                    </div>
                    <div className="progress-step completed">
                        <div className="progress-circle">4</div>
                        <div className="progress-label">Review & Approval</div>
                    </div>
                </div>
                <p style={{ fontSize: '1.2rem' }}>Your KYC & Accreditation submission is complete and under final review.</p>
            </section>

            {/* Review & Approval Content */}
            <section className="review-container pt-0" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* Summary */}
                <div className="review-summary" style={{ background: '#112240', borderRadius: '16px', padding: '3rem', textAlign: 'center', marginBottom: '4rem' }}>
                    <h2>Verification Under Review</h2>
                    <div className="status-badge status-pending" style={{ background: 'rgba(255, 255, 0, 0.2)', color: '#ff0', padding: '0.8rem 2rem', borderRadius: '30px', display: 'inline-block', fontWeight: 'bold', margin: '2rem 0', fontSize: '1.4rem' }}>
                        Pending Approval
                    </div>
                    <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Thank you for completing your KYC and accreditation submission.</p>
                    <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Our compliance team is reviewing your information and documents.</p>
                    <p><strong>Expected completion:</strong> 2–5 business days</p>
                    <p>You will receive email and portal notification upon approval.</p>
                </div>

                {/* Submitted Details */}
                <div className="review-details" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem', marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem', textAlign: 'center' }}>Submitted Information Summary</h3>
                    <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="detail-group" style={{ background: '#0A1A2F', borderRadius: '12px', padding: '1.5rem' }}>
                            <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '0.5rem' }}>Personal Details</strong>
                            <span>John Doe<br />DOB: January 15, 1985<br />U.S. Citizen</span>
                        </div>
                        <div className="detail-group" style={{ background: '#0A1A2F', borderRadius: '12px', padding: '1.5rem' }}>
                            <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '0.5rem' }}>Identity Document</strong>
                            <span>U.S. Passport<br />Uploaded: Dec 24, 2025</span>
                        </div>
                        <div className="detail-group" style={{ background: '#0A1A2F', borderRadius: '12px', padding: '1.5rem' }}>
                            <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '0.5rem' }}>Accreditation Type</strong>
                            <span>Net Worth &gt; $1M (excluding primary residence)</span>
                        </div>
                        <div className="detail-group" style={{ background: '#0A1A2F', borderRadius: '12px', padding: '1.5rem' }}>
                            <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '0.5rem' }}>Supporting Documents</strong>
                            <span>Bank statements, brokerage summary<br />Uploaded: Dec 24, 2025</span>
                        </div>
                    </div>
                </div>

                {/* Next Actions */}
                <div className="next-actions" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem' }}>What Happens Next</h3>
                    <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Once approved, you will gain full access to subscribe to active offerings and syndications.</p>
                    <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>In the meantime, you can explore available opportunities or contact your relationship manager with questions.</p>
                    <div className="action-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <Link href="/investors/activeofferings" className="action-btn" style={{ textDecoration: 'none' }}>Browse Active Offerings</Link>
                        <Link href="/investors/syndications" className="action-btn" style={{ textDecoration: 'none' }}>Browse Syndications</Link>
                        <Link href="/investors/portfoliosummary" className="action-btn" style={{ textDecoration: 'none' }}>Return to Dashboard</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
