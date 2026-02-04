'use client';
import React, { useState } from 'react';
import "./kyc4.css";
import KYCProgressBar from '../components/KYCProgressBar';

type KYCStatus = 'pending' | 'approved' | 'declined';

export default function KYCStep4Page() {
    // For demonstration, we'll use local state to switch between views.
    // In a real app, this would be fetched from an API.
    const [status, setStatus] = useState<KYCStatus>('pending');

    return (
        <>
            <h1 className="page-title">
                {status === 'pending' && 'KYC & Accreditation'}
                {status === 'approved' && 'Step 4: Review & Approval'}
                {status === 'declined' && 'Step 4: Review & Approval'}
            </h1>

            {/* Debug Controls (Remove in production) */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span style={{ marginRight: '1rem' }}>Demo Controls:</span>
                <button onClick={() => setStatus('pending')} style={{ marginRight: '0.5rem', padding: '0.5rem', cursor: 'pointer', background: status === 'pending' ? '#D4AF37' : '#333' }}>Pending</button>
                <button onClick={() => setStatus('approved')} style={{ marginRight: '0.5rem', padding: '0.5rem', cursor: 'pointer', background: status === 'approved' ? '#D4AF37' : '#333' }}>Approved</button>
                <button onClick={() => setStatus('declined')} style={{ padding: '0.5rem', cursor: 'pointer', background: status === 'declined' ? '#D4AF37' : '#333' }}>Declined</button>
            </div>

            {/* Progress Bar */}
            <KYCProgressBar currentStep={4} />

            {/* KYC & Accreditation Content based on Status */}
            <section className="kyc-content pt-0">
                {/* 1. PENDING STATE */}
                {status === 'pending' && (
                    <>
                        {/* Current Status */}
                        <div className="kyc-status">
                            <h3>Current Status</h3>
                            <div className="status-badge status-pending" style={{ background: 'rgba(255, 255, 0, 0.2)', color: '#ff0', padding: '0.8rem 2rem', borderRadius: '30px', display: 'inline-block', fontWeight: 'bold', margin: '1rem 0' }}>
                                Pending Full Verification
                            </div>
                            <div className="kyc-details">
                                <p><strong>KYC Status:</strong> Verified (Passport uploaded Dec 20, 2025)</p>
                                <p><strong>Accreditation Status:</strong> Under Review</p>
                                <p><strong>Last Updated:</strong> December 22, 2025</p>
                                <p><strong>Expected Completion:</strong> 2–5 business days</p>
                            </div>
                            <p style={{ marginTop: '2rem' }}>You will be notified via email and portal notification upon approval.</p>
                        </div>

                        {/* Accreditation Form / Upload */}
                        <div className="accreditation-form">
                            <h3>Complete Accreditation</h3>
                            <p>Please provide documentation confirming your accredited investor status per SEC Rule 501.</p>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label htmlFor="accreditationType">Accreditation Type</label>
                                    <select id="accreditationType" style={{ width: '100%' }}>
                                        <option>Net Worth &gt; $1M (excluding primary residence)</option>
                                        <option>Income &gt; $200K (or $300K joint) last 2 years</option>
                                        <option>Professional Certification (Series 7, 65, or 82)</option>
                                        <option>Trust/Entity with assets &gt; $5M</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Upload Supporting Documents</label>
                                    <div className="upload-area" style={{ border: '2px dashed #D4AF37', borderRadius: '12px', padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
                                        <p>Drag & drop files here or click to browse</p>
                                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Accepted: PDF, JPG, PNG (max 10MB)</p>
                                    </div>
                                </div>
                                <button type="submit" className="submit-btn" onClick={() => alert('Accreditation documents submitted!')}>Submit for Review</button>
                            </form>
                            <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#AAAAAA' }}>
                                All information is encrypted and processed in compliance with SEC regulations. Verification
                                typically takes 2–5 business days.
                            </p>
                        </div>
                    </>
                )}

                {/* 2. APPROVED STATE */}
                {status === 'approved' && (
                    <div className="review-container">
                        {/* Success Summary */}
                        <div className="review-summary" style={{ textAlign: 'center', background: '#112240', padding: '3rem', borderRadius: '16px', marginBottom: '4rem' }}>
                            <div className="success-icon" style={{ fontSize: '6rem', color: '#0f0', marginBottom: '1rem' }}>✓</div>
                            <h2 style={{ fontSize: '2.8rem', color: '#D4AF37', marginBottom: '1.5rem' }}>Approved & Completed</h2>
                            <div className="status-badge" style={{ display: 'inline-block', padding: '0.8rem 2rem', borderRadius: '30px', fontSize: '1.4rem', fontWeight: 'bold', margin: '2rem 0', background: 'rgba(0, 255, 0, 0.2)', color: '#0f0' }}>Fully Verified</div>
                            <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Congratulations! Your investor profile has been successfully verified and accredited.</p>
                            <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>You now have full access to all portal features, including subscribing to active offerings and syndications.</p>
                            <p><strong>Approval Date:</strong> December 24, 2025</p>
                        </div>

                        {/* Verification Details */}
                        <div className="review-details" style={{ background: '#112240', padding: '2.5rem', borderRadius: '16px', marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem', textAlign: 'center' }}>Verification Summary</h3>
                            <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                <div className="detail-group" style={{ background: '#0A1A2F', borderRadius: '12px', padding: '1.5rem' }}>
                                    <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '0.5rem' }}>KYC Status</strong>
                                    <span style={{ fontSize: '1.1rem' }}>Verified (Passport accepted)</span>
                                </div>
                                <div className="detail-group" style={{ background: '#0A1A2F', borderRadius: '12px', padding: '1.5rem' }}>
                                    <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '0.5rem' }}>Accreditation Status</strong>
                                    <span style={{ fontSize: '1.1rem' }}>Approved (Net Worth &gt; $1M)</span>
                                </div>
                                <div className="detail-group" style={{ background: '#0A1A2F', borderRadius: '12px', padding: '1.5rem' }}>
                                    <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '0.5rem' }}>Approval Authority</strong>
                                    <span style={{ fontSize: '1.1rem' }}>Mogul Strategies Compliance Team</span>
                                </div>
                                <div className="detail-group" style={{ background: '#0A1A2F', borderRadius: '12px', padding: '1.5rem' }}>
                                    <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '0.5rem' }}>Next Review</strong>
                                    <span style={{ fontSize: '1.1rem' }}>December 2026 (Annual Re-verification)</span>
                                </div>
                            </div>
                        </div>

                        {/* Next Actions */}
                        <div className="next-actions" style={{ background: '#112240', padding: '2.5rem', borderRadius: '16px', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem' }}>Welcome to the Portal!</h3>
                            <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Explore exclusive investment opportunities and manage your portfolio.</p>
                            <div className="action-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                                <a href="#" className="action-btn" style={{ background: '#D4AF37', color: '#0A1A2F', padding: '1.2rem 2.5rem', border: 'none', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' }}>Browse Active Offerings</a>
                                <a href="#" className="action-btn" style={{ background: '#D4AF37', color: '#0A1A2F', padding: '1.2rem 2.5rem', border: 'none', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' }}>View Syndications</a>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. DECLINED STATE */}
                {status === 'declined' && (
                    <div className="review-container">
                        {/* Declined Summary */}
                        <div className="review-summary" style={{ textAlign: 'center', background: '#112240', padding: '3rem', borderRadius: '16px', marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2.8rem', color: '#ff6b6b', marginBottom: '1.5rem' }}>Additional Information Required</h2>
                            <div className="status-badge" style={{ display: 'inline-block', padding: '0.8rem 2rem', borderRadius: '30px', fontSize: '1.4rem', fontWeight: 'bold', margin: '2rem 0', background: 'rgba(255, 107, 107, 0.2)', color: '#ff6b6b' }}>Declined – Action Needed</div>
                            <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>We regret to inform you that your KYC & accreditation submission could not be approved at this time.</p>
                            <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Our compliance team has identified items that require clarification or additional documentation.</p>
                            <p>Please review the notes below and resubmit the requested information.</p>
                        </div>

                        {/* Decline Reasons */}
                        <div className="decline-reasons" style={{ background: '#112240', padding: '2.5rem', borderRadius: '16px', marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem', textAlign: 'center' }}>Review Notes from Compliance Team</h3>
                            <ul className="reasons-list" style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ padding: '1.2rem 0', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', fontSize: '1.1rem' }}>
                                    <strong style={{ color: '#ff6b6b' }}>Identity Document:</strong> The uploaded passport image is unclear. Please upload a high-resolution scan showing all four corners.
                                </li>
                                <li style={{ padding: '1.2rem 0', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', fontSize: '1.1rem' }}>
                                    <strong style={{ color: '#ff6b6b' }}>Accreditation Documentation:</strong> The provided bank statement does not show assets exceeding $1M. Please submit a certified financial statement or letter from a CPA verifying net worth (excluding primary residence).
                                </li>
                                <li style={{ padding: '1.2rem 0', borderBottom: 'none', fontSize: '1.1rem' }}>
                                    <strong style={{ color: '#ff6b6b' }}>Address Verification:</strong> Proof of residential address required (utility bill or bank statement dated within last 3 months).
                                </li>
                            </ul>
                        </div>

                        {/* Resubmit Section */}
                        <div className="resubmit-section" style={{ background: '#112240', padding: '2.5rem', borderRadius: '16px', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem' }}>Resubmit Required Documents</h3>
                            <p style={{ marginBottom: '2rem' }}>Please upload the corrected or additional documents below.</p>
                            <div className="upload-area" style={{ border: '3px dashed #D4AF37', borderRadius: '16px', padding: '3rem', textAlign: 'center', cursor: 'pointer', marginBottom: '2rem' }}>
                                <div className="upload-icon" style={{ fontSize: '4rem', color: '#D4AF37', marginBottom: '1rem' }}>📤</div>
                                <p>Drag & drop files here or click to browse</p>
                                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Accepted: PDF, JPG, PNG (max 10MB each)</p>
                            </div>
                            <button className="resubmit-btn" style={{ background: '#D4AF37', color: '#0A1A2F', padding: '1.3rem 3rem', border: 'none', borderRadius: '12px', fontSize: '1.4rem', fontWeight: 'bold', cursor: 'pointer' }}>Resubmit for Review</button>
                            <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#AAAAAA' }}>
                                Your resubmission will be reviewed within 2–5 business days. You will be notified via email and portal upon completion.
                            </p>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}
