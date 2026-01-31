'use client';

import PageTitle from '@/components/admin/PageTitle';
import StatCard from '@/components/admin/StatCard';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { FaCalculator, FaFileExport, FaPlus, FaEye, FaFilePdf } from 'react-icons/fa';

Chart.register(...registerables);

export default function FundPerformancePage() {
    const returnsChartRef = useRef<HTMLCanvasElement>(null);
    const irrChartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#E0E0E0' } } },
            scales: {
                x: { ticks: { color: '#AAAAAA' }, grid: { color: 'rgba(212, 175, 55, 0.1)' } },
                y: { ticks: { color: '#AAAAAA' }, grid: { color: 'rgba(212, 175, 55, 0.1)' } }
            }
        };

        let returnsChart: Chart | null = null;
        let irrChart: Chart | null = null;

        if (returnsChartRef.current) {
            returnsChart = new Chart(returnsChartRef.current, {
                type: 'line',
                data: {
                    labels: ['2023', 'Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25', 'Q2 25', 'Q3 25', 'Q4 25'],
                    datasets: [
                        {
                            label: 'Portfolio',
                            data: [0, 8.2, 15.6, 22.1, 28.4, 32.7, 38.9, 44.2, 52.8],
                            borderColor: '#D4AF37',
                            backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Benchmark',
                            data: [0, 6.1, 11.8, 15.3, 18.9, 21.4, 24.8, 27.1, 30.4],
                            borderColor: '#00ccff',
                            borderDash: [5, 5]
                        }
                    ]
                },
                options: commonOptions
            });
        }

        if (irrChartRef.current) {
            irrChart = new Chart(irrChartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Real Estate', 'Digital Assets', 'Technology', 'Creative Arts'],
                    datasets: [{
                        label: 'Net IRR %',
                        data: [14.8, 38.2, 26.5, 18.9],
                        backgroundColor: '#D4AF37'
                    }]
                },
                options: commonOptions
            });
        }

        return () => {
            returnsChart?.destroy();
            irrChart?.destroy();
        };
    }, []);

    const fundData = [
        { name: 'Mogul Real Estate Fund', vintage: '2023', committed: '$500M', called: '$375M (75%)', distributed: '$156M', nav: '$612M', irr: '14.8%', moic: '1.63x' },
        { name: 'Mogul Digital Fund', vintage: '2024', committed: '$400M', called: '$400M (100%)', distributed: '$212M', nav: '$592M', irr: '38.2%', moic: '1.48x' },
        { name: 'Mogul Technologies Fund', vintage: '2024', committed: '$340M', called: '$190M (56%)', distributed: '$98M', nav: '$382M', irr: '26.5%', moic: '2.01x' },
    ];

    return (
        <div className="pb-20">
            <PageTitle>Fund Performance Engine</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    <select className="bg-mogul-darker border border-mogul-gold/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mogul-gold">
                        <option>All Funds</option>
                        <option>Real Estate Fund</option>
                        <option>Digital Fund</option>
                    </select>
                    <div className="flex items-center gap-2 bg-mogul-darker border border-mogul-gold/30 rounded-lg px-4 py-3">
                        <span className="text-gray-400 text-sm">As of:</span>
                        <input type="date" defaultValue="2025-12-31" className="bg-transparent text-white focus:outline-none text-sm" />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <button className="flex items-center gap-2 bg-mogul-darker text-mogul-gold border border-mogul-gold/30 px-4 py-3 rounded-lg font-bold hover:bg-mogul-gold hover:text-mogul-dark transition-all text-xs">
                        <FaCalculator size={12} /> Recalculate
                    </button>
                    <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-4 py-3 rounded-lg font-bold hover:bg-white transition-all text-xs">
                        <FaFileExport size={12} /> LP Report
                    </button>
                    <button className="flex items-center gap-2 bg-mogul-darker text-mogul-gold border border-mogul-gold/30 px-4 py-3 rounded-lg font-bold hover:bg-mogul-gold hover:text-mogul-dark transition-all text-xs">
                        <FaPlus size={12} /> Benchmark
                    </button>
                </div>
            </div>

            {/* High Level Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
                <StatCard value="+27.9%" label="YTD Return" />
                <StatCard value="24.1%" label="Net IRR" />
                <StatCard value="1.68x" label="MOIC" />
                <StatCard value="94%" label="Deployment" />
                <StatCard value="$1.84B" label="Total AUM" />
                <StatCard value="+12.4%" label="vs Benchmark" />
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow border border-mogul-gold/10 h-[450px] flex flex-col">
                    <h3 className="text-xl font-display font-bold text-mogul-gold mb-6 text-center">Cumulative Returns vs Benchmark</h3>
                    <div className="flex-1 relative">
                        <canvas ref={returnsChartRef}></canvas>
                    </div>
                </div>
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow border border-mogul-gold/10 h-[450px] flex flex-col">
                    <h3 className="text-xl font-display font-bold text-mogul-gold mb-6 text-center">IRR Contribution by Fund</h3>
                    <div className="flex-1 relative">
                        <canvas ref={irrChartRef}></canvas>
                    </div>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow overflow-x-auto border border-mogul-gold/10">
                <h2 className="text-2xl font-display font-bold text-mogul-gold mb-8 text-center">Detailed Fund Performance</h2>
                <table className="w-full min-w-[1200px]">
                    <thead>
                        <tr className="bg-mogul-gold/10 text-mogul-gold text-xs uppercase tracking-widest">
                            <th className="p-4 text-left border-b border-mogul-gold/20">Fund</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Vintage</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Committed</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Called</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Distributed</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">NAV</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Net IRR</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">MOIC</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fundData.map((fund, idx) => (
                            <tr key={idx} className="border-b border-mogul-gold/10 hover:bg-mogul-gold/5 transition-colors text-sm">
                                <td className="p-4 font-bold text-white">{fund.name}</td>
                                <td className="p-4 text-gray-400 font-mono">{fund.vintage}</td>
                                <td className="p-4 text-white">{fund.committed}</td>
                                <td className="p-4 text-cyan-400">{fund.called}</td>
                                <td className="p-4 text-gray-400">{fund.distributed}</td>
                                <td className="p-4 text-mogul-gold font-bold">{fund.nav}</td>
                                <td className="p-4 text-green-400 font-bold">{fund.irr}</td>
                                <td className="p-4 text-white">{fund.moic}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 border border-mogul-gold text-mogul-gold rounded hover:bg-mogul-gold hover:text-mogul-dark transition-all">
                                            <FaEye size={12} />
                                        </button>
                                        <button className="p-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-mogul-dark transition-all">
                                            <FaFilePdf size={12} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
