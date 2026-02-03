'use client';
import React from 'react';
import "./resource-library.css";

export default function ResourceLibraryPage() {
    const categories = [
        {
            title: 'White Papers',
            resources: [
                { name: 'Bitcoin as a Portfolio Diversifier', date: 'Nov 2025' },
                { name: 'The Future of Sustainable Infrastructure Investing', date: 'Oct 2025' },
                { name: 'Alternative Assets in a High-Inflation Environment', date: 'Aug 2025' },
                { name: 'Entertainment IP as an Asset Class', date: 'Jun 2025' },
            ]
        },
        {
            title: 'Market Research Reports',
            resources: [
                { name: 'Gulf Region Real Estate Outlook 2026', date: 'Dec 2025' },
                { name: 'Digital Assets Market Update Q4 2025', date: 'Dec 2025' },
                { name: 'AI & Technology Investment Trends', date: 'Nov 2025' },
                { name: 'Circular Economy Opportunities', date: 'Sep 2025' },
            ]
        },
        {
            title: 'Investor Guides',
            resources: [
                { name: 'Guide to Private Fund Investing', date: 'Updated 2025' },
                { name: 'Understanding Capital Calls & Distributions', date: '' },
                { name: 'Tax Considerations for Alternative Investments', date: '' },
                { name: 'Risk Management in Diversified Portfolios', date: '' },
            ]
        },
        {
            title: 'Case Studies',
            resources: [
                { name: 'Successful Real Estate Syndication – Dubai Project', date: '2025' },
                { name: 'Digital Asset Portfolio Performance Review', date: '' },
                { name: 'Technology Fund Exit Analysis', date: '' },
                { name: 'Creative Arts Fund Production Success', date: '' },
            ]
        }
    ];

    return (
        <>
            <h1 className="page-title">Resource Library</h1>

            <section className="resources-grid">
                {categories.map((cat, idx) => (
                    <div key={idx} className="resource-category">
                        <h3>{cat.title}</h3>
                        <ul className="resource-list" style={{ listStyle: 'none' }}>
                            {cat.resources.map((res, rIdx) => (
                                <li key={rIdx} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{res.name} {res.date && <span className="date" style={{ fontSize: '0.9rem', color: '#AAAAAA' }}>({res.date})</span>}</span>
                                    <button style={{ background: 'none', border: 'none', color: '#D4AF37', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => alert(`Downloading ${res.name}...`)}>Download PDF</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
        </>
    );
}
