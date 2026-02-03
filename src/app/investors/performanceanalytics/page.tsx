'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import "./performance-analytics.css";

export default function PerformanceAnalyticsPage() {
    const cumulativeRef = useRef<HTMLCanvasElement>(null);
    const rollingRef = useRef<HTMLCanvasElement>(null);
    const drawdownRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const charts: Chart[] = [];

        if (cumulativeRef.current) {
            charts.push(new Chart(cumulativeRef.current, {
                type: 'line',
                data: {
                    labels: ['2022', '2023', '2024', '2025'],
                    datasets: [
                        {
                            label: 'Mogul Portfolio',
                            data: [100, 128, 152, 186],
                            borderColor: '#D4AF37',
                            backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'S&P 500',
                            data: [100, 124, 138, 158],
                            borderColor: '#00ffcc',
                            borderDash: [5, 5]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: '#E0E0E0' } }
                    },
                    scales: {
                        x: { ticks: { color: '#E0E0E0' }, grid: { display: false } },
                        y: { ticks: { color: '#E0E0E0' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } }
                    }
                }
            }));
        }

        if (rollingRef.current) {
            charts.push(new Chart(rollingRef.current, {
                type: 'bar',
                data: {
                    labels: ['2023', '2024', '2025'],
                    datasets: [{
                        label: 'Rolling 12-Month Return',
                        data: [22.4, 31.8, 27.9],
                        backgroundColor: '#D4AF37'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: { ticks: { color: '#E0E0E0' }, grid: { display: false } },
                        y: { ticks: { color: '#E0E0E0' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } }
                    }
                }
            }));
        }

        if (drawdownRef.current) {
            charts.push(new Chart(drawdownRef.current, {
                type: 'line',
                data: {
                    labels: ['Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25'],
                    datasets: [{
                        label: 'Portfolio Drawdown',
                        data: [0, -2.1, -9.2, -4.5, 0],
                        borderColor: '#ff6b6b',
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { ticks: { color: '#E0E0E0', callback: value => `${value}%` } },
                        x: { ticks: { color: '#E0E0E0' } }
                    }
                }
            }));
        }

        return () => charts.forEach(c => c.destroy());
    }, []);

    const heatmapData = [
        { month: 'Jan', val: 3.2 }, { month: 'Feb', val: 5.1 }, { month: 'Mar', val: -1.8 },
        { month: 'Apr', val: 4.7 }, { month: 'May', val: 6.3 }, { month: 'Jun', val: 2.9 },
        { month: 'Jul', val: 8.1 }, { month: 'Aug', val: -2.4 }, { month: 'Sep', val: 7.5 },
        { month: 'Oct', val: 4.2 }, { month: 'Nov', val: 3.8 }, { month: 'Dec', val: 5.6 }
    ];

    const getColor = (val: number) => {
        const alpha = Math.min(Math.abs(val) / 10, 1);
        return val > 0 ? `rgba(212, 175, 55, ${0.2 + alpha * 0.8})` : `rgba(255, 107, 107, ${0.2 + alpha * 0.8})`;
    };

    return (
        <>
            <h1 className="page-title">Performance Analytics</h1>

            <section id="key-metrics">
                <h2 className="section-title">Key Performance Metrics</h2>
                <div className="metrics-grid">
                    {[
                        { v: '+27.9%', l: 'Total Return (Net)' },
                        { v: '18.4%', l: 'Annualized Return' },
                        { v: '1.72', l: 'Sharpe Ratio' },
                        { v: '9.2%', l: 'Maximum Drawdown' },
                        { v: '0.28', l: 'Sortino Ratio' },
                        { v: '1.15', l: 'Calmar Ratio' }
                    ].map((m, i) => (
                        <div key={i} className="metric-card">
                            <div className="metric-value">{m.v}</div>
                            <p className="metric-label">{m.l}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="detailed-charts">
                <h2 className="section-title">Detailed Performance Charts</h2>
                <div className="charts-grid">
                    <div className="chart-card">
                        <h3>Cumulative Return vs. Benchmark</h3>
                        <div style={{ height: '300px' }}><canvas ref={cumulativeRef}></canvas></div>
                    </div>
                    <div className="chart-card">
                        <h3>Rolling 12-Month Returns</h3>
                        <div style={{ height: '300px' }}><canvas ref={rollingRef}></canvas></div>
                    </div>
                    <div className="chart-card">
                        <h3>Monthly Returns Heatmap (2025)</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '1.5rem' }}>
                            {heatmapData.map((d, i) => (
                                <div key={i} style={{
                                    background: getColor(d.val),
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    color: '#000',
                                    fontWeight: 'bold'
                                }}>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{d.month}</div>
                                    <div>{d.val}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="chart-card">
                        <h3>Drawdown Analysis</h3>
                        <div style={{ height: '300px' }}><canvas ref={drawdownRef}></canvas></div>
                    </div>
                </div>
            </section>

            <section id="fund-performance">
                <h2 className="section-title">Fund-by-Fund Performance</h2>
                <table className="performance-table">
                    <thead>
                        <tr>
                            <th>Fund Name</th>
                            <th>YTD Return</th>
                            <th>1-Year Return</th>
                            <th>3-Year Annualized</th>
                            <th>Since Inception</th>
                            <th>Sharpe Ratio</th>
                            <th>Max Drawdown</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ['Mogul Equities', '+12.8%', '+15.3%', '+11.2%', '+14.7%', '1.45', '-8.1%'],
                            ['Mogul Digital Fund', '+48.2%', '+62.4%', '+78.9%', '+92.3%', '2.18', '-22.4%'],
                            ['Mogul Real Estate', '+9.4%', '+10.1%', '+8.8%', '+9.6%', '1.62', '-4.2%'],
                            ['Mogul Technologies', '+31.7%', '+38.5%', '+42.1%', '+45.8%', '1.89', '-18.7%'],
                            ['Creative Arts Fund', '+22.1%', '+25.6%', '+20.3%', '+23.9%', '1.71', '-12.5%'],
                            ['Mogul Recycling Fund', '+15.6%', '+17.2%', '+14.8%', '+16.1%', '1.58', '-7.9%']
                        ].map((row, i) => (
                            <tr key={i}>
                                {row.map((cell, j) => <td key={j}>{cell}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}
