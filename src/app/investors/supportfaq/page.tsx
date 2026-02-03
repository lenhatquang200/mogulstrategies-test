'use client';
import React, { useState } from 'react';

export default function SupportFAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: 'How do I access my fund documents?',
            a: 'All fund documents, including PPMs, subscription agreements, and quarterly reports, are available in the "Documents & Reports" section. Use the search or filter by fund to locate specific files.'
        },
        {
            q: 'When will I receive my Schedule K-1?',
            a: 'Schedule K-1 forms are typically delivered by mid-March each year. Estimated K-1s are provided in Q1 for tax planning purposes. Check the "Distributions & Tax" section for updates.'
        },
        {
            q: 'How are capital calls processed?',
            a: 'Capital calls are announced 30 days in advance via notification and email. Payment instructions (wire, ACH, crypto) are provided in the Capital Calls section. Contact support for assistance.'
        },
        {
            q: 'Can I change my distribution preferences?',
            a: 'Yes. Reinvestment vs. cash distribution preferences can be updated in your Account Settings or by contacting your relationship manager via Secure Messaging.'
        },
        {
            q: 'How is portfolio performance calculated?',
            a: 'Performance is reported net of fees on a time-weighted basis. Detailed methodology and benchmark comparisons are available in the Performance Analytics section.'
        },
        {
            q: 'Who is my primary contact?',
            a: 'Your dedicated relationship manager is listed in your Account Information. You can reach them directly through Secure Messaging or by phone at (800) 776-0990.'
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <h1 className="page-title">Support & FAQ</h1>

            <section className="faq-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h2 className="section-title">Frequently Asked Questions</h2>

                {faqs.map((faq, idx) => (
                    <div key={idx} className={`faq-item ${openIndex === idx ? 'open' : ''}`} style={{
                        background: '#112240', borderRadius: '16px', marginBottom: '1.5rem', overflow: 'hidden'
                    }}>
                        <div className="faq-question" onClick={() => toggleFAQ(idx)} style={{
                            padding: '1.8rem 2rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.3rem', fontWeight: '600'
                        }}>
                            {faq.q}
                            <span style={{ fontSize: '1.8rem', color: '#D4AF37', transition: 'transform 0.3s', transform: openIndex === idx ? 'rotate(45deg)' : 'none' }}>+</span>
                        </div>
                        {openIndex === idx && (
                            <div className="faq-answer" style={{ padding: '0 2rem 1.8rem', fontSize: '1.1rem' }}>
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </section>

            <section className="support-contact" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', marginTop: '4rem' }}>
                <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem' }}>Need Additional Help?</h3>
                <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Our investor support team is available Monday–Friday, 9:00 AM–6:00 PM EST.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> <a href="mailto:support@mogulstrategies.com">support@mogulstrategies.com</a></p>
                <p style={{ marginBottom: '1.5rem' }}><strong>Phone:</strong> <a href="tel:+18007760990">(800) 776-0990</a></p>
                <button className="contact-btn" onClick={() => alert('Opening secure message...')} style={{ background: '#D4AF37', color: '#0A1A2F', padding: '1rem 2.5rem', border: 'none', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>Open Secure Message</button>
            </section>
        </>
    );
}
