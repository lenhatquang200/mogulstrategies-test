'use client';
import Link from 'next/link';
import KYCProgressBar from '../components/KYCProgressBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function KYCStep1Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        dateOfBirth: '',
        nationality: '',
        country: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        currentStep: ''
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch('/api/kyc/step1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        setLoading(false);

        if (res.ok) {
            router.push('/investors/kyc2');
        } else {
            const data = await res.json();
            toast.error(data.message);
            if (data.field) {
                document.getElementById(data.field)?.focus();
            }
        }
    };

    const [status, setStatus] = useState<'draft' | 'in_review' | 'approved' | 'rejected'>('draft');
    useEffect(() => {
        const load = async () => {
            const res = await fetch('/api/kyc/progress');
            if (!res.ok) return;

            const data = await res.json();

            if (data.currentStep < 1) {
                router.replace(`/investors/kyc${data.currentStep}`);
                return;
            }

            setForm({
                firstName: data.firstName ?? '',
                lastName: data.lastName ?? '',
                middleName: data.middleName ?? '',
                dateOfBirth: data.dateOfBirth?.slice(0, 10) ?? '',
                nationality: data.nationality ?? '',
                country: data.country ?? '',
                address: data.address ?? '',
                city: data.city ?? '',
                state: data.state ?? '',
                postalCode: data.postalCode ?? '',
                phone: data.phone ?? '',
                currentStep: data.currentStep ?? ''
            });

            setStatus(data.status);
        };

        load();
    }, []);
    const isReadonly = status === 'in_review' || status === 'approved';

    return (
        <>
            <h1 className="page-title">Step 1: Personal Information</h1>

            {/* Progress Bar */}
            <KYCProgressBar currentStep={1} />

            {/* Personal Information Form */}
            <section className="kyc-form">
                <h2>Personal Information</h2>
                <p style={{ textAlign: 'center', marginBottom: '3rem' }}>All fields marked with * are required.</p>
                <form onSubmit={onSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input type="text" id="firstName" placeholder="John" required onChange={onChange} value={form.firstName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name *</label>
                            <input type="text" id="lastName" placeholder="Doe" required onChange={onChange} value={form.lastName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="middleName">Middle Name (optional)</label>
                            <input type="text" id="middleName" placeholder="Middle" onChange={onChange} value={form.middleName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth *</label>
                            <input type="date" id="dateOfBirth" required onChange={onChange} value={form.dateOfBirth} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality">Nationality *</label>
                            <input type="text" id="nationality" placeholder="United States" required onChange={onChange} value={form.nationality} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country of Residence *</label>
                            <select id="country" required style={{ width: '100%' }} onChange={onChange} value={form.country}>
                                <option value="">Select Country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="GB">United Kingdom</option>
                            </select>
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="address">Residential Address *</label>
                            <input type="text" id="address" placeholder="123 Main Street, Apt 4B" required onChange={onChange} value={form.address} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City *</label>
                            <input type="text" id="city" placeholder="New York" required onChange={onChange} value={form.city} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State/Province *</label>
                            <input type="text" id="state" placeholder="NY" required onChange={onChange} value={form.state} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postalCode">Postal Code *</label>
                            <input type="text" id="postalCode" placeholder="10001" required onChange={onChange} value={form.postalCode} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number *</label>
                            <input type="tel" id="phone" placeholder="+1 (555) 123-4567" required onChange={onChange} value={form.phone}/>
                        </div>
                    </div>
                    {form.currentStep ? (
                        <Link
                            href="/investors/kyc3"
                            className={`next-btn next-btn inline-block text-center transition'}
                            `}
                        >
                            Continue to Step 2
                        </Link>
                    ) : (
                        <button className={`next-btn
                            ${
                            loading || isReadonly
                                ? 'bg-gray-500 cursor-not-allowed opacity-60'
                                : 'bg-[#D4AF37] hover:bg-[#bfa134] text-black'
                            }
                        `} disabled={loading || isReadonly} >
                            {loading ? 'Saving...' : 'Save & Continue to Step 2'}
                        </button>
                    )}
                </form>

                <p style={{ marginTop: '2rem', fontSize: '0.9rem', textAlign: 'center', color: '#AAAAAA' }}>
                    Your information is encrypted and stored securely in compliance with global data protection standards.
                </p>
            </section>
        </>
    );
}
