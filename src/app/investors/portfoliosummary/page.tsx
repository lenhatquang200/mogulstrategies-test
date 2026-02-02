'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function PortfolioSummaryPage() {
    const allocationCanvasRef = useRef<HTMLCanvasElement>(null);
    const portfolioCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let allocationChart: Chart | null = null;
        let portfolioChart: Chart | null = null;

        if (allocationCanvasRef.current) {
            allocationChart = new Chart(allocationCanvasRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['Equities', 'Digital Assets', 'Real Estate', 'Technologies', 'Creative Arts', 'Recycling'],
                    datasets: [{
                        data: [22, 28, 18, 15, 10, 7],
                        backgroundColor: ['#D4AF37', '#00ffcc', '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#E0E0E0' }
                        }
                    }
                }
            });
        }

        if (portfolioCanvasRef.current) {
            portfolioChart = new Chart(portfolioCanvasRef.current, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Portfolio Value ($)',
                        data: [1000000, 1050000, 1120000, 1180000, 1250000, 1320000, 1380000, 1420000, 1490000, 1550000, 1580000, 1586400],
                        borderColor: '#D4AF37',
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: '#E0E0E0' } }
                    },
                    scales: {
                        x: { ticks: { color: '#E0E0E0' } },
                        y: { ticks: { color: '#E0E0E0' } }
                    }
                }
            });
        }

        return () => {
            if (allocationChart) allocationChart.destroy();
            if (portfolioChart) portfolioChart.destroy();
        };
    }, []);

    return (
        <>
            <h1 className="section-title">Portfolio Summary</h1>

            {/* Top Row: Account Info + Secure Messaging */}
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
                    <button onClick={() => alert('Message sent!')}
                        style={{ marginTop: '1rem', background: '#D4AF37', color: '#0A1A2F', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Send
                        Message</button>
                </div>
            </section>

            {/* Real-Time Market Ticker */}
            <div className="market-ticker">
                <div className="ticker-title">Live Market Data (December 24, 2025 – 14:32 EST)</div>
                <div className="ticker-items">
                    <span className="ticker-item">BTC/USD: $92,847.32 <span style={{ color: '#0f0' }}>+2.41%</span></span>
                    <span className="ticker-item">S&P 500: 5,924.18 <span style={{ color: '#0f0' }}>+0.68%</span></span>
                    <span className="ticker-item">Gold: $2,618.40/oz <span style={{ color: '#f00' }}>-0.32%</span></span>
                    <span className="ticker-item">10Y Treasury: 4.12% <span style={{ color: '#0f0' }}>+0.05%</span></span>
                    <span className="ticker-item">VIX: 14.82 <span style={{ color: '#f00' }}>+1.21%</span></span>
                    <span className="ticker-item">Oil (WTI): $78.41 <span style={{ color: '#0f0' }}>+1.87%</span></span>
                </div>
            </div>

            {/* Portfolio Stats */}
            <section id="portfolio-stats">
                <h2 className="section-title">Portfolio Overview</h2>
                <div className="stats-grid-portal">
                    <div className="stat-card">
                        <div className="stat-value">$1,240,000</div>
                        <p className="stat-label">Total Invested</p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">$1,586,400</div>
                        <p className="stat-label">Current Value</p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">+27.9%</div>
                        <p className="stat-label">Total Return</p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">18.4%</div>
                        <p className="stat-label">Annualized</p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">1.72</div>
                        <p className="stat-label">Sharpe Ratio</p>
                    </div>
                </div>
            </section>

            {/* Interactive Charts */}
            <section id="charts">
                <h2 className="section-title">Performance Charts</h2>
                <div className="charts-grid">
                    <div className="chart-card">
                        <h3>Asset Allocation</h3>
                        <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                            <canvas ref={allocationCanvasRef}></canvas>
                        </div>
                    </div>
                    <div className="chart-card">
                        <h3>Portfolio Value Over Time</h3>
                        <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                            <canvas ref={portfolioCanvasRef}></canvas>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lower Sections */}
            <section className="lower-grid">
                <div className="lower-card">
                    <h3>Fund Performance Summary (YTD)</h3>
                    <ul>
                        <li>Mogul Equities: <strong>+12.8%</strong></li>
                        <li>Mogul Digital Fund: <strong>+48.2%</strong></li>
                        <li>Mogul Real Estate: <strong>+9.4%</strong> (incl. distributions)</li>
                        <li>Mogul Technologies: <strong>+31.7%</strong></li>
                        <li>Creative Arts Fund: <strong>+22.1%</strong></li>
                        <li>Mogul Recycling Fund: <strong>+15.6%</strong></li>
                    </ul>
                </div>

                <div className="lower-card">
                    <h3>Notifications & Updates</h3>
                    <div className="notification">New capital call: Mogul Real Estate Fund – Due January 15, 2026 <a
                        href="#">View →</a></div>
                    <div className="notification">Distribution posted: Creative Arts Fund Q4 2025 <a href="#">View →</a></div>
                    <div className="notification">Webinar: 2026 Market Outlook – January 8, 2026 <a href="#">Register →</a>
                    </div>
                </div>

                <div className="lower-card">
                    <h3>Recent Documents</h3>
                    <ul className="document-list">
                        <li>Q4 2025 Investor Letter <a href="#">Download PDF</a></li>
                        <li>December 2025 Performance Report <a href="#">Download PDF</a></li>
                        <li>Annual Tax Package (2025) <a href="#">Download ZIP</a></li>
                        <li>Fund Subscription Agreement <a href="#">View</a></li>
                    </ul>
                </div>
            </section>
        </>
    );

}
