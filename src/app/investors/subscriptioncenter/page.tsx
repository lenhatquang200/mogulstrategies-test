'use client';
import React, { useState } from 'react';

export default function SubscriptionCenterPage() {
    const [hasSigned, setHasSigned] = useState(false);
    const [title, setTitle] = useState('');

    const handleSign = () => {
        setHasSigned(true);
    };

    const handleClear = () => {
        setHasSigned(false);
    };

    return (
        <>
            <h1 className="page-title">Subscription Center</h1>

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
            <div className="progress-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div className="progress-step completed">
                    <div className="progress-circle">1</div>
                    <div className="progress-label">Review Documents</div>
                </div>
                <div className="progress-step active">
                    <div className="progress-circle">2</div>
                    <div className="progress-label">Electronic Signature</div>
                </div>
                <div className="progress-step">
                    <div className="progress-circle">3</div>
                    <div className="progress-label">Fund Transfer</div>
                </div>
                <div className="progress-step">
                    <div className="progress-circle">4</div>
                    <div className="progress-label">Confirmation</div>
                </div>
            </div>

            {/* DocuSign-style Layout */}
            <section className="esign-container">
                {/* PDF Viewer */}
                <div className="pdf-viewer">
                    <iframe src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                        title="Subscription Document" style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }}></iframe>
                </div>

                {/* Signature Panel */}
                <div className="signature-panel">
                    <h3>Complete Your Subscription</h3>
                    <div className="document-info">
                        <p><strong>Document:</strong> Mogul Real Estate Fund – Tranche 3 Subscription Agreement</p>
                        <p><strong>Commitment Amount:</strong> <span className="highlight">$500,000.00</span></p>
                        <p><strong>Fund:</strong> Mogul Real Estate Fund</p>
                        <p><strong>Date:</strong> December 24, 2025</p>
                    </div>

                    <div className="signature-fields">
                        <div className="field-group">
                            <label htmlFor="fullNameDoc">Full Name</label>
                            <input type="text" id="fullNameDoc" value="John Doe" readOnly style={{ width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }} />
                        </div>
                        <div className="field-group">
                            <label htmlFor="titleDoc">Title (if applicable)</label>
                            <input
                                type="text"
                                id="titleDoc"
                                placeholder="e.g., Managing Member"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }}
                            />
                        </div>
                        <div className="field-group">
                            <label>Signature</label>
                            <div
                                className="signature-pad"
                                onClick={handleSign}
                                style={{
                                    background: '#0A1A2F', border: '2px dashed #D4AF37', borderRadius: '12px', height: '200px',
                                    marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: hasSigned ? '#D4AF37' : '#AAAAAA', fontSize: hasSigned ? '2rem' : '1.2rem',
                                    fontFamily: hasSigned ? 'cursive' : 'inherit', cursor: 'pointer'
                                }}
                            >
                                {hasSigned ? '✒ John Doe' : 'Click here to sign'}
                            </div>
                            <button className="clear-signature" onClick={handleClear}>Clear Signature</button>
                        </div>
                    </div>

                    <button
                        className="sign-btn"
                        disabled={!hasSigned}
                        onClick={() => alert('Signature completed successfully! You will be redirected to wire transfer instructions.')}
                    >
                        Complete Electronic Signature
                    </button>

                    <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#AAAAAA' }}>
                        By clicking "Complete Electronic Signature", you agree to use electronic records and signatures in
                        accordance with the U.S. Electronic Signatures in Global and National Commerce Act (ESIGN) and
                        Uniform Electronic Transactions Act (UETA).
                    </p>
                </div>
            </section>
        </>
    );
}
