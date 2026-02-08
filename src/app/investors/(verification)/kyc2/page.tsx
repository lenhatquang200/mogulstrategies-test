'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "./kyc2.css";
import KYCProgressBar from '../components/KYCProgressBar';
import toast from 'react-hot-toast';

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

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!file) return;

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('documentType', selectedDocType);

        const res = await fetch('/api/kyc/step2', {
        method: 'POST',
        body: formData,
        });

        setLoading(false);

        if (res.ok) {
            router.push('/investors/kyc3');
        } else {
            const data = await res.json();
            toast.error(data.message);
        }
    };

    const [uploadedData, setUploadedData] = useState<{
        documentType: string;
        fileName: string;
        fileUrl?: string;
        fileType?: string;
        identityStatus?: string;
    } | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/kyc/step2');
            if (res.ok) {
                const data = await res.json();
                if (data?.hasUploaded) {
                    setUploadedData(data);
                    setSelectedDocType(data.documentType);
                }
            }
        };

        fetchData();
    }, []);

    const isApproved = uploadedData?.identityStatus === 'approved';
    const previewImage =
    previewUrl ||
    (uploadedData?.fileType === 'image'
        ? encodeURI(uploadedData.fileUrl!)
        : null);

    const previewFileName =
    file?.name || uploadedData?.fileName;


    return (
        <>
            <h1 className="page-title">Step 2: Identity Verification</h1>

            {/* Progress Bar */}
            <KYCProgressBar currentStep={2} />

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
                        
                        {/* Upload area */}
                        {!uploadedData && (
                            <label
                                htmlFor="file-upload"
                                className="upload-area"
                                style={{
                                border: '3px dashed #D4AF37',
                                borderRadius: '16px',
                                padding: '3rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                display: 'block',
                                }}
                            >
                                <div className="upload-icon">📤</div>
                                    <p>Click to browse or upload your ID</p>
                                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                    Accepted: JPG, PNG, PDF (max 10MB)
                                    </p>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*,application/pdf"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </label>
                        )}

                        {previewFileName && (
                            <div
                                className="file-preview"
                                style={{
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    background: 'rgba(212, 175, 55, 0.1)',
                                    borderRadius: '8px',
                                    display: 'block',
                                    textAlign: 'center',
                                }}
                            >
                            {previewImage ? (
                                <>
                                    <img
                                        src={previewImage}
                                        alt="ID Preview"
                                        style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}
                                    />
                                    <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                                    {previewFileName}
                                    </p>
                                </>
                            ) : (
                                <p style={{ fontWeight: 'bold' }}>
                                    📄 {previewFileName} (PDF)
                                </p>
                            )}

                            {uploadedData && !file && (
                                <p style={{ fontSize: '0.85rem', color: '#FFD54F' }}>
                                Status: {uploadedData.identityStatus}
                                </p>
                            )}
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        {uploadedData ? (
                            <Link
                                href="/investors/kyc3"
                                className={`next-btn inline-block text-center transition
                                    ${uploadedData ? 'opacity-100 pointer-events-auto' : 'opacity-50 pointer-events-none'}
                                `}
                            >
                                Continue to Step 3
                            </Link>
                        ) : (
                            <button
                                onClick={submit}
                                className="next-btn"
                                disabled={!file || loading}
                                style={{ opacity: !file ? 0.5 : 1 }}
                            >
                                {loading ? 'Uploading...' : 'Continue to Step 3'}
                            </button>
                        )}
                    </div>

                    <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#AAAAAA' }}>
                        Your documents are encrypted and processed securely. Verification typically takes 1–2 business days.
                    </p>
                </div>
            </section>
        </>
    );
}
