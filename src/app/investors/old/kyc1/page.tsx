'use client';
import Link from 'next/link';

export default function KYCStep1Page() {

    return (
        <>
            <h1 className="page-title">Step 1: Personal Information</h1>

            {/* Progress Bar */}
            <section className="progress-container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2>KYC & Accreditation Progress</h2>
                <div className="progress-bar">
                    <div className="progress-line"></div>
                    <div className="progress-fill" style={{ width: '12.5%' }}></div>
                    <div className="progress-step active">
                        <div className="progress-circle">1</div>
                        <div className="progress-label">Personal Information</div>
                    </div>
                    <div className="progress-step">
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
                <p style={{ fontSize: '1.2rem' }}>Step 1 of 4 – Please complete your personal details below.</p>
            </section>

            {/* Personal Information Form */}
            <section className="kyc-form">
                <h2>Personal Information</h2>
                <p style={{ textAlign: 'center', marginBottom: '3rem' }}>All fields marked with * are required.</p>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input type="text" id="firstName" placeholder="John" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name *</label>
                            <input type="text" id="lastName" placeholder="Doe" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="middleName">Middle Name (optional)</label>
                            <input type="text" id="middleName" placeholder="Middle" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth *</label>
                            <input type="date" id="dateOfBirth" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality">Nationality *</label>
                            <input type="text" id="nationality" placeholder="United States" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="countryOfResidence">Country of Residence *</label>
                            <select id="countryOfResidence" required style={{ width: '100%' }}>
                                <option value="">Select Country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="GB">United Kingdom</option>
                            </select>
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="residentialAddress">Residential Address *</label>
                            <input type="text" id="residentialAddress" placeholder="123 Main Street, Apt 4B" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City *</label>
                            <input type="text" id="city" placeholder="New York" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State/Province *</label>
                            <input type="text" id="state" placeholder="NY" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postalCode">Postal Code *</label>
                            <input type="text" id="postalCode" placeholder="10001" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number *</label>
                            <input type="tel" id="phone" placeholder="+1 (555) 123-4567" required />
                        </div>
                    </div>

                    <Link href="/investors/kyc2" className="next-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Save & Continue to Step 2</Link>
                </form>

                <p style={{ marginTop: '2rem', fontSize: '0.9rem', textAlign: 'center', color: '#AAAAAA' }}>
                    Your information is encrypted and stored securely in compliance with global data protection standards.
                </p>
            </section>
        </>
    );
}
