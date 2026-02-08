'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "./kyc3.css";
import toast from 'react-hot-toast';
import KYCProgressBar from '../components/KYCProgressBar';
import { useKyc } from "@/contexts/KycContext";

export default function KYCStep3Page() {
    const { refreshKyc } = useKyc();
    const [entityType, setEntityType] = useState('individual');

    const entityOptions = [
        { id: 'individual', label: 'Individual', description: 'Natural person investing personally' },
        { id: 'corporation', label: 'Corporation', description: 'C-Corp or similar corporate entity' },
        { id: 'partnership', label: 'Limited Partnership / Fund', description: 'LP, GP, or investment fund' },
        { id: 'trust', label: 'Trust', description: 'Revocable or irrevocable trust' },
        { id: 'nonprofit', label: 'Non-Profit / Foundation', description: '501(c)(3) or similar' },
        { id: 'other', label: 'Other Entity', description: 'LLC, family office, etc.' }
    ];

    const [entityName, setEntityName] = useState('');
    const [formationDate, setFormationDate] = useState('');
    const [jurisdiction, setJurisdiction] = useState('');
    const [totalAssets, setTotalAssets] = useState('');
    const [criteria, setCriteria] = useState('income');
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const submit = async () => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('entityType', entityType);
            if (entityType === 'individual') {
                formData.append('individualCriteria', criteria);
            } else {
                formData.append('entityName', entityName);
                formData.append('formationDate', formationDate);
                formData.append('jurisdiction', jurisdiction);
                formData.append('totalAssets', totalAssets);
            }
            
            if (file) formData.append('file', file);

            const res = await fetch('/api/kyc/step3', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                toast.error(data?.message || 'Submission failed');
                return;
            }
            await refreshKyc();
            router.push('/investors/kyc4');
        } catch (err) {
            toast.error('Network error, please try again');
        } finally {
            setLoading(false);
        }
    };




    const [existingFile, setExistingFile] = useState<{
        fileName: string;
        fileUrl: string;
    } | null>(null);

    const hasLoadedRef = useRef(false);

    useEffect(() => {
        const fetchStep3 = async () => {
            try {
                const res = await fetch('/api/kyc/step3', { method: 'GET' });
                if (!res.ok) return;

                const data = await res.json();
                if (!data) return;

                // bind entity type
                if (data.entityType) {
                    setEntityType(data.entityType);
                }

                // individual
                if (data.entityType === 'individual') {
                    setCriteria(data.individualCriteria || 'income');
                }

                // entity
                if (data.entityType !== 'individual') {
                    setEntityName(data.entityName || '');
                    setFormationDate(data.formationDate || '');
                    setJurisdiction(data.jurisdiction || '');
                    setTotalAssets(data.totalAssets || '');
                }

                // existing file
                if (data.fileName && data.fileUrl) {
                    setExistingFile({
                        fileName: data.fileName,
                        fileUrl: data.fileUrl,
                    });
                }
            } catch (err) {
                console.error('Failed to load KYC step 3', err);
            }
        };

        fetchStep3();
    }, []);

    // useEffect(() => {
    //     if (!hasLoadedRef.current) {
    //         hasLoadedRef.current = true;
    //         return;
    //     }

    //     setFile(null);
    //     setExistingFile(null);
    //     setEntityName('');
    //     setFormationDate('');
    //     setJurisdiction('');
    //     setTotalAssets('');
    // }, [entityType]);

    return (
        <>
            <h1 className="page-title">Step 3: Accreditation</h1>

            {/* Progress Bar */}
            <KYCProgressBar currentStep={3} />

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
                                        <input type="radio" name="individualCriteria" value="income" checked={criteria === 'income'} onChange={() => setCriteria('income')} />
                                        <span>Annual income exceeding $200,000 (or $300,000 joint with spouse) in each of the two most
                                            recent years, with expectation of same in current year</span>
                                    </label>
                                </div>
                                <div className="form-group full-width">
                                    <label style={{ gap: '1rem', cursor: 'pointer' }}>
                                        <input type="radio" name="individualCriteria" value="networth" checked={criteria === 'networth'} onChange={() => setCriteria('networth')} />
                                        <span>Net worth exceeding $1,000,000 (excluding primary residence), individually or jointly
                                            with spouse</span>
                                    </label>
                                </div>
                                <div className="form-group full-width">
                                    <label style={{ gap: '1rem', cursor: 'pointer' }}>
                                        <input type="radio" name="individualCriteria" value="professional" checked={criteria === 'professional'} onChange={() => setCriteria('professional')} />
                                        <span>Holder of Series 7, 65, or 82 license in good standing</span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label>Upload Supporting Documentation</label>

                                <div
                                    className={`
                                        upload-area border-2 border-dashed border-[#D4AF37]
                                        rounded-xl p-8 text-center transition
                                        ${existingFile ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-[#D4AF3710]'}
                                    `}
                                    onClick={() => {
                                        if (!existingFile) {
                                            fileInputRef.current?.click();
                                        }
                                    }}
                                >
                                    {file ? (
                                        <>
                                            <p style={{ color: '#D4AF37' }}>{file.name}</p>
                                            <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                                        </>
                                    ) : existingFile ? (
                                        <>
                                            <p style={{ color: '#D4AF37' }}>
                                                Uploaded: {existingFile.fileName}
                                            </p>
                                            {/* <a
                                                href={existingFile.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ fontSize: '0.85rem', textDecoration: 'underline' }}
                                            >
                                                View document
                                            </a> */}
                                            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#FFD54F' }}>
                                                Document is under review and cannot be replaced at this time.
                                            </p>
                                        </>
                                    ) : (
                                        <p>Drag & drop or click to upload (tax returns, financial statements, license, etc.)</p>
                                    )}
                                </div>

                                {/* <div className="upload-area border-2 border-dashed border-[#D4AF37] rounded-xl p-8 text-center cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {file ? (
                                        <>
                                            <p style={{ color: '#D4AF37' }}>{file.name}</p>
                                            <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                                        </>
                                    ) : (
                                        <p>Drag & drop or click to upload (tax returns, financial statements, license, etc.)</p>
                                    )}
                                </div> */}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="application/pdf,image/*"
                                    hidden
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                            </div>
                            <button
                                onClick={submit}
                                className="submit-btn"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit for Review'}
                            </button>
                            {/* <Link href="/investors/kyc4" className="submit-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Submit for Review</Link> */}
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
                                    <input type="text" id="entityName" required value={entityName} onChange={(e) => setEntityName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="entityTypeDropdown">Entity Type *</label>
                                    <select id="entityTypeDropdown" required style={{ width: '100%' }} disabled>
                                        <option>{entityType.charAt(0).toUpperCase() + entityType.slice(1)}</option>
                                        <option>Corporation</option>
                                        <option>LLC</option>
                                        <option>Partnership</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="formationDate">Date of Formation *</label>
                                    <input type="date" id="formationDate" required value={formationDate} onChange={(e) => setFormationDate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="jurisdiction">Jurisdiction of Formation *</label>
                                    <input type="text" id="jurisdiction" required value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)}/>
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="totalAssets">Total Assets (as of most recent statement) *</label>
                                    <input type="text" id="totalAssets" placeholder="$5,000,000+" required value={totalAssets} onChange={(e) => setTotalAssets(e.target.value)}/>
                                </div>
                            </div>
                            
                            <div className="form-group full-width">
                                <label>Upload Entity Documentation</label>

                                <div
                                    className={`
                                        border-2 border-dashed border-[#D4AF37]
                                        rounded-xl p-8 text-center
                                        transition
                                        ${existingFile ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-[#D4AF3710]'}
                                    `}
                                    onClick={() => {
                                        if (!existingFile) {
                                        fileInputRef.current?.click();
                                        }
                                    }}
                                >

                                    {file ? (
                                        <>
                                            <p style={{ color: '#D4AF37' }}>{file.name}</p>
                                            <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                                        </>
                                        ) : existingFile ? (
                                        <>
                                            <p style={{ color: '#D4AF37' }}>
                                            Uploaded: {existingFile.fileName}
                                            </p>
                                            {/* <a
                                                href={existingFile.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ fontSize: '0.85rem', textDecoration: 'underline' }}
                                            >
                                            View document
                                            </a> */}
                                            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#FFD54F' }}>
                                            Document is under review and cannot be replaced at this time.
                                            </p>
                                        </>
                                        ) : (
                                        <p>Upload Formation Documents, Financial Statements, or Operating Agreements</p>
                                    )}

                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="application/pdf,image/*"
                                    hidden
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                            </div>

                            <button
                                onClick={submit}
                                className="submit-btn"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit for Review'}
                            </button>
                            {/* <Link href="/investors/kyc4" className="submit-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Submit for Review</Link> */}
                        </form>
                    </div>
                )}
            </section>
        </>
    );
}
