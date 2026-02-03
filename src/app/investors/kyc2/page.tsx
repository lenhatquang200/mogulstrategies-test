'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import "./kyc2.css";

export default function KYCStep2Page() {
    const [selectedDocType, setSelectedDocType] = useState('passport');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (selectedFile.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => setPreviewUrl(event.target?.result as string);
                reader.readAsDataURL(selectedFile);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    return (
        <>
            <h1 className="page-title">Step 2: Identity Verification</h1>

            {/* Progress Bar */}
            <section className="progress-container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2>KYC & Accreditation Progress</h2>
                <div className="progress-bar">
                    <div className="progress-line"></div>
                    <div className="progress-fill" style={{ width: '37.5%' }}></div>
                    <div className="progress-step completed">
                        <div className="progress-circle">1</div>
                        <div className="progress-label">Personal Information</div>
                    </div>
                    <div className="progress-step active">
                        <div className="progress-circle">2</div>
                        <div className="progress-label">Identity Verification</div>
                    </div>
                    <div className="progress-step">
                        <div className="progress-circle">3</div>
                        <div className="progress-label">Accreditation</div>
                    </div>
                    <div className="progress-step">
                        <div className="progress-circle">4</div>
                        <div className="progress-label">Review & Approval</div>
                    </div>
                </div>
                <p style={{ fontSize: '1.2rem' }}>Step 2 of 4 – Please upload a government-issued ID for verification.</p>
            </section>

            {/* Identity Verification */}
            <section className="verification-container pt-0 max-w-[1000px] mx-auto">
                <div className="verification-card" style={{ background: '#112240', borderRadius: '16px', padding: '3rem', textAlign: 'center' }}>
                    <h2>Verify Your Identity</h2>
                    <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>To comply with regulatory requirements, please upload a clear photo of one of the following
                        government-issued IDs.</p>

                    <div className="document-options">
                        <div className={`document-option ${selectedDocType === 'passport' ? 'selected' : ''}`} onClick={() => setSelectedDocType('passport')}>
                            <div className="document-icon">📘</div>
                            <strong>Passport</strong><br />
                            Full page with photo
                        </div>
                        <div className={`document-option ${selectedDocType === 'drivers' ? 'selected' : ''}`} onClick={() => setSelectedDocType('drivers')}>
                            <div className="document-icon">🚗</div>
                            <strong>Driver's License</strong><br />
                            Front and back
                        </div>
                        <div className={`document-option ${selectedDocType === 'national' ? 'selected' : ''}`} onClick={() => setSelectedDocType('national')}>
                            <div className="document-icon">🆔</div>
                            <strong>National ID Card</strong><br />
                            Front and back
                        </div>
                    </div>

                    <div className="upload-section" style={{ marginTop: '2rem' }}>
                        <label htmlFor="file-upload" className="upload-area" style={{
                            border: '3px dashed #D4AF37', borderRadius: '16px', padding: '3rem',
                            textAlign: 'center', cursor: 'pointer', display: 'block', transition: 'background 0.3s'
                        }}>
                            <div className="upload-icon">📤</div>
                            <p>Click to browse or upload your ID</p>
                            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Accepted: JPG, PNG, PDF (max 10MB)</p>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*,application/pdf"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </label>

                        {(file || previewUrl) && (
                            <div className="file-preview" style={{
                                marginTop: '1.5rem', padding: '1rem', background: 'rgba(212, 175, 55, 0.1)',
                                borderRadius: '8px', display: 'block'
                            }}>
                                {previewUrl ? (
                                    <img src={previewUrl} alt="ID Preview" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }} />
                                ) : (
                                    <p>{file?.name} (PDF uploaded)</p>
                                )}
                                <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>{file?.name}</p>
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <Link
                            href="/investors/kyc3"
                            className="next-btn"
                            style={{
                                display: 'inline-block', textDecoration: 'none',
                                opacity: file ? 1 : 0.5, pointerEvents: file ? 'auto' : 'none'
                            }}
                        >
                            Continue to Step 3
                        </Link>
                    </div>

                    <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#AAAAAA' }}>
                        Your documents are encrypted and processed securely. Verification typically takes 1–2 business days.
                    </p>
                </div>
            </section>
        </>
    );
}
