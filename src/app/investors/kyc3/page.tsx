'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import "./kyc3.css";

export default function KYCStep3Page() {
    const [entityType, setEntityType] = useState('individual');

    const entityOptions = [
        { id: 'individual', label: 'Individual', description: 'Natural person investing personally' },
        { id: 'corporation', label: 'Corporation', description: 'C-Corp or similar corporate entity' },
        { id: 'partnership', label: 'Limited Partnership / Fund', description: 'LP, GP, or investment fund' },
        { id: 'trust', label: 'Trust', description: 'Revocable or irrevocable trust' },
        { id: 'nonprofit', label: 'Non-Profit / Foundation', description: '501(c)(3) or similar' },
        { id: 'other', label: 'Other Entity', description: 'LLC, family office, etc.' }
    ];

    return (
        <>
            <h1 className="page-title">Step 3: Accreditation</h1>

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

            {/* Progress Bar */}
            <section className="progress-container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2>KYC & Accreditation Progress</h2>
                <div className="progress-bar">
                    <div className="progress-line"></div>
                    <div className="progress-fill" style={{ width: '62.5%' }}></div>
                    <div className="progress-step completed">
                        <div className="progress-circle">1</div>
                        <div className="progress-label">Personal Information</div>
                    </div>
                    <div className="progress-step completed">
                        <div className="progress-circle">2</div>
                        <div className="progress-label">Identity Verification</div>
                    </div>
                    <div className="progress-step active">
                        <div className="progress-circle">3</div>
                        <div className="progress-label">Accreditation</div>
                    </div>
                    <div className="progress-step">
                        <div className="progress-circle">4</div>
                        <div className="progress-label">Review & Approval</div>
                    </div>
                </div>
                <p style={{ fontSize: '1.2rem' }}>Step 3 of 4 – Please select your entity type and complete accreditation details.</p>
            </section>

            <section className="accreditation-container max-w-[900px] mx-auto pt-0">
                {/* Entity Type Selector */}
                <div className="entity-selector bg-[#112240] rounded-[16px] p-10 text-center mb-12">
                    <h3>Select Investor Entity Type</h3>
                    <p style={{ marginBottom: '1.5rem' }}>Please choose the type of entity you are representing. This determines the accreditation criteria.</p>
                    <div className="entity-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        {entityOptions.map(option => (
                            <div
                                key={option.id}
                                className={`entity-option ${entityType === option.id ? 'selected' : ''}`}
                                onClick={() => setEntityType(option.id)}
                                style={{
                                    background: entityType === option.id ? 'rgba(212, 175, 55, 0.1)' : '#0A1A2F',
                                    border: `2px solid ${entityType === option.id ? '#D4AF37' : 'transparent'}`,
                                    borderRadius: '12px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s'
                                }}
                            >
                                <strong>{option.label}</strong><br />
                                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{option.description}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Individual Form */}
                {entityType === 'individual' ? (
                    <div className="entity-form active" style={{ background: '#112240', borderRadius: '16px', padding: '3rem' }}>
                        <h3>Individual Accreditation</h3>
                        <p style={{ marginBottom: '2rem', textAlign: 'center' }}>Select the criteria that applies to you (SEC Rule 501):</p>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label style={{ gap: '1rem', cursor: 'pointer' }}>
                                        <input type="radio" name="individualCriteria" value="income" defaultChecked />
                                        <span>Annual income exceeding $200,000 (or $300,000 joint with spouse) in each of the two most
                                            recent years, with expectation of same in current year</span>
                                    </label>
                                </div>
                                <div className="form-group full-width">
                                    <label style={{ gap: '1rem', cursor: 'pointer' }}>
                                        <input type="radio" name="individualCriteria" value="networth" />
                                        <span>Net worth exceeding $1,000,000 (excluding primary residence), individually or jointly
                                            with spouse</span>
                                    </label>
                                </div>
                                <div className="form-group full-width">
                                    <label style={{ gap: '1rem', cursor: 'pointer' }}>
                                        <input type="radio" name="individualCriteria" value="professional" />
                                        <span>Holder of Series 7, 65, or 82 license in good standing</span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label>Upload Supporting Documentation</label>
                                <div className="upload-area" style={{ border: '2px dashed #D4AF37', borderRadius: '12px', padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
                                    <p>Drag & drop or click to upload (tax returns, financial statements, license, etc.)</p>
                                </div>
                            </div>
                            <Link href="/investors/kyc4" className="submit-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Submit for Review</Link>
                        </form>
                    </div>
                ) : (
                    <div className="entity-form active" style={{ background: '#112240', borderRadius: '16px', padding: '3rem' }}>
                        <h3>{entityOptions.find(o => o.id === entityType)?.label} Accreditation</h3>
                        <p style={{ marginBottom: '2rem', textAlign: 'center' }}>Entity must have total assets in excess of $5,000,000 and not formed for the specific purpose of
                            acquiring the securities offered.</p>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="entityName">Entity Legal Name *</label>
                                    <input type="text" id="entityName" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="entityTypeDropdown">Entity Type *</label>
                                    <select id="entityTypeDropdown" required style={{ width: '100%' }}>
                                        <option>{entityType.charAt(0).toUpperCase() + entityType.slice(1)}</option>
                                        <option>Corporation</option>
                                        <option>LLC</option>
                                        <option>Partnership</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="formationDate">Date of Formation *</label>
                                    <input type="date" id="formationDate" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="jurisdiction">Jurisdiction of Formation *</label>
                                    <input type="text" id="jurisdiction" required />
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="totalAssets">Total Assets (as of most recent statement) *</label>
                                    <input type="text" id="totalAssets" placeholder="$5,000,000+" required />
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label>Upload Entity Documentation</label>
                                <div className="upload-area" style={{ border: '2px dashed #D4AF37', borderRadius: '12px', padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
                                    <p>Upload Formation Documents, Financial Statements, or Operating Agreements</p>
                                </div>
                            </div>
                            <Link href="/investors/kyc4" className="submit-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Submit for Review</Link>
                        </form>
                    </div>
                )}
            </section>
        </>
    );
}
