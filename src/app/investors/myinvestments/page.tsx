'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function MyInvestmentsPage() {
    const chartRef1 = useRef<HTMLCanvasElement>(null);
    const chartRef2 = useRef<HTMLCanvasElement>(null);
    const chartRef3 = useRef<HTMLCanvasElement>(null);
    const irrRef1 = useRef<HTMLCanvasElement>(null);
    const irrRef2 = useRef<HTMLCanvasElement>(null);
    const irrRef3 = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
            },
            scales: {
                y: { display: false },
                x: {
                    ticks: { color: '#AAAAAA', font: { size: 10 } },
                    grid: { display: false }
                }
            }
        };

        const datasets = [
            {
                data: [375000, 420000, 480000, 550000, 612000],
                labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1 26']
            },
            {
                data: [400000, 430000, 490000, 540000, 592000],
                labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1 26']
            },
            {
                data: [190000, 240000, 290000, 340000, 382400],
                labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1 26']
            }
        ];

        const charts: Chart[] = [];

        [chartRef1, chartRef2, chartRef3].forEach((ref, idx) => {
            if (ref.current) {
                charts.push(new Chart(ref.current, {
                    type: 'line',
                    data: {
                        labels: datasets[idx].labels,
                        datasets: [{
                            label: 'Value',
                            data: datasets[idx].data,
                            borderColor: '#D4AF37',
                            backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            fill: true,
                            tension: 0.4,
                            pointRadius: 0
                        }]
                    },
                    options: commonOptions
                }));
            }
        });

        // IRR Charts (Bar charts)
        [irrRef1, irrRef2, irrRef3].forEach((ref, idx) => {
            if (ref.current) {
                charts.push(new Chart(ref.current, {
                    type: 'bar',
                    data: {
                        labels: ['2023', '2024', '2025'],
                        datasets: [{
                            label: 'Annual IRR',
                            data: idx === 0 ? [12, 15, 14.8] : idx === 1 ? [25, 42, 38.2] : [18, 28, 26.5],
                            backgroundColor: '#D4AF37',
                            borderRadius: 4
                        }]
                    },
                    options: {
                        ...commonOptions,
                        scales: {
                            y: {
                                ticks: { color: '#AAAAAA', font: { size: 10 }, callback: (value) => `${value}%` },
                                grid: { color: 'rgba(255, 255, 255, 0.05)' }
                            },
                            x: { ticks: { color: '#AAAAAA', font: { size: 10 } }, grid: { display: false } }
                        }
                    }
                }));
            }
        });

        return () => {
            charts.forEach(chart => chart.destroy());
        };
    }, []);

    const investments = [
        {
            title: 'Mogul Real Estate Fund – Tranche 3',
            status: 'Active',
            details: [
                { label: 'Commitment Amount', value: '$500,000' },
                { label: 'Called Capital', value: '$375,000 (75%)' },
                { label: 'Uncalled Capital', value: '$125,000' },
                { label: 'Estimated Value', value: '$612,000' },
                { label: 'Net Return', value: '+22.4%' },
                { label: 'IRR (since inception)', value: '14.8%' },
            ],
            refs: { chart: chartRef1, irr: irrRef1 }
        },
        {
            title: 'Mogul Digital Fund',
            status: 'Active',
            details: [
                { label: 'Commitment Amount', value: '$400,000' },
                { label: 'Called Capital', value: '$400,000 (100%)' },
                { label: 'Uncalled Capital', value: '$0' },
                { label: 'Estimated Value', value: '$592,000' },
                { label: 'Net Return', value: '+48.0%' },
                { label: 'IRR (since inception)', value: '38.2%' },
            ],
            refs: { chart: chartRef2, irr: irrRef2 }
        },
        {
            title: 'Mogul Technologies Fund',
            status: 'Active',
            details: [
                { label: 'Commitment Amount', value: '$340,000' },
                { label: 'Called Capital', value: '$190,000 (56%)' },
                { label: 'Uncalled Capital', value: '$150,000' },
                { label: 'Estimated Value', value: '$382,400' },
                { label: 'Net Return', value: '+31.7%' },
                { label: 'IRR (since inception)', value: '26.5%' },
            ],
            refs: { chart: chartRef3, irr: irrRef3 }
        }
    ];

    return (
        <>
            <h1 className="page-title">My Investments</h1>

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

            {/* Compact Overall Summary */}
            <section className="investments-summary" style={{ background: '#112240', borderRadius: '16px', padding: '1.5rem', marginBottom: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem' }}>
                <div className="summary-item" style={{ textAlign: 'center' }}>
                    <div className="summary-value" style={{ fontSize: '2rem', color: '#D4AF37', fontWeight: 'bold' }}>$1,240,000</div>
                    <div className="summary-label" style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Committed</div>
                </div>
                <div className="summary-item" style={{ textAlign: 'center' }}>
                    <div className="summary-value" style={{ fontSize: '2rem', color: '#D4AF37', fontWeight: 'bold' }}>$965,000</div>
                    <div className="summary-label" style={{ fontSize: '0.9rem', opacity: 0.9 }}>Called Capital</div>
                </div>
                <div className="summary-item" style={{ textAlign: 'center' }}>
                    <div className="summary-value" style={{ fontSize: '2rem', color: '#D4AF37', fontWeight: 'bold' }}>$275,000</div>
                    <div className="summary-label" style={{ fontSize: '0.9rem', opacity: 0.9 }}>Uncalled Capital</div>
                </div>
                <div className="summary-item" style={{ textAlign: 'center' }}>
                    <div className="summary-value" style={{ fontSize: '2rem', color: '#D4AF37', fontWeight: 'bold' }}>$1,586,400</div>
                    <div className="summary-label" style={{ fontSize: '0.9rem', opacity: 0.9 }}>Current Value</div>
                </div>
                <div className="summary-item" style={{ textAlign: 'center' }}>
                    <div className="summary-value" style={{ fontSize: '2rem', color: '#D4AF37', fontWeight: 'bold' }}>+27.9%</div>
                    <div className="summary-label" style={{ fontSize: '0.9rem', opacity: 0.9 }}>Net Return</div>
                </div>
            </section>

            {/* Individual Investments */}
            <section className="investments-grid">
                {investments.map((inv, idx) => (
                    <div key={idx} className="investment-card">
                        <div className="investment-header">
                            <div className="investment-title">{inv.title}</div>
                            <span className="investment-status">Active</span>
                        </div>
                        <div className="investment-content">
                            <div className="investment-details">
                                {inv.details.map((detail, dIdx) => (
                                    <div key={dIdx} className="detail-group">
                                        <div className="detail-label">{detail.label}</div>
                                        <div className="detail-value">{detail.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="performance-chart" style={{ height: '220px', marginTop: '1rem' }}>
                                    <canvas ref={inv.refs.chart}></canvas>
                                </div>
                                <div className="irr-chart" style={{ height: '180px', marginTop: '1.5rem' }}>
                                    <canvas ref={inv.refs.irr}></canvas>
                                </div>
                            </div>
                        </div>
                        <div className="investment-actions">
                            <button className="action-btn secondary" onClick={() => alert('Downloading...')}>Download Signed Docs</button>
                            <button className="action-btn secondary" onClick={() => alert('Viewing reports...')}>View Reports</button>
                            <button className="action-btn primary" onClick={() => alert('Fund summary...')}>Fund Summary</button>
                        </div>
                        <div className="manage-wrapper">
                            <button className="action-btn secondary" onClick={() => alert('Manage investment...')}>Manage</button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
