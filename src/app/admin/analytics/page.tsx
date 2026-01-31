'use client';

import PageTitle from '@/components/admin/PageTitle';
import StatCard from '@/components/admin/StatCard';
import { useState, useEffect } from 'react';
import { FaDownload, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function AnalyticsReportingPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: '#888' },
                position: 'bottom' as const,
            },
        },
        scales: {
            x: {
                ticks: { color: '#666' },
                grid: { color: 'rgba(212, 175, 55, 0.05)' },
            },
            y: {
                ticks: { color: '#666' },
                grid: { color: 'rgba(212, 175, 55, 0.05)' },
            },
        },
    };

    const aumData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'AUM ($B)',
            data: [1.2, 1.28, 1.35, 1.42, 1.48, 1.55, 1.62, 1.68, 1.73, 1.78, 1.81, 1.84],
            borderColor: '#D4AF37',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            tension: 0.4,
            fill: true,
        }]
    };

    const investorData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'New Investors',
            data: [42, 58, 71, 65, 82, 94, 78, 89, 102, 115, 98, 124],
            backgroundColor: 'rgba(212, 175, 55, 0.8)',
            borderRadius: 8,
        }]
    };

    const engagementData = {
        labels: ['Logins', 'Docs', 'Events', 'Messages'],
        datasets: [{
            data: [12480, 8420, 1248, 3120],
            backgroundColor: ['#D4AF37', '#00ccff', '#ff6b6b', '#0f0'],
            borderWidth: 0,
        }]
    };

    if (!isClient) return null;

    return (
        <div className="pb-20">
            <PageTitle>Analytics & Reporting</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                <div className="flex gap-4 items-center">
                    <input type="date" className="bg-black/40 border border-mogul-gold/20 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-mogul-gold transition-all" />
                    <span className="text-gray-500">to</span>
                    <input type="date" className="bg-black/40 border border-mogul-gold/20 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-mogul-gold transition-all" />
                </div>
                <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-8 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-gold">
                    <FaDownload size={14} /> Export Report
                </button>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
                <StatCard value="$1.84B" label="Total AUM" />
                <StatCard value="+18.4%" label="YTD Return" />
                <StatCard value="1,248" label="Active Investors" />
                <StatCard value="$182M" label="Capital Raised (2025)" />
                <StatCard value="94.2%" label="Call Fulfillment" />
                <StatCard value="4.8/5" label="Satisfaction" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow h-[450px] flex flex-col">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-8 text-center">AUM Growth Over Time</h3>
                    <div className="flex-1">
                        <Line data={aumData} options={chartOptions} />
                    </div>
                </div>

                <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow h-[450px] flex flex-col">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-8 text-center">New Investors by Month</h3>
                    <div className="flex-1">
                        <Bar data={investorData} options={chartOptions} />
                    </div>
                </div>

                <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow h-[450px] flex flex-col">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-8 text-center">Portal Engagement</h3>
                    <div className="flex-1 relative">
                        <Doughnut data={engagementData} options={{ ...chartOptions, cutout: '70%' }} />
                    </div>
                </div>

                <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow h-[450px] flex flex-col">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 text-center italic uppercase tracking-widest">Top Performing Funds</h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-mogul-gold/60 border-b border-mogul-gold/10">
                                    <th className="text-left py-3">Fund</th>
                                    <th className="text-right py-3">AUM</th>
                                    <th className="text-right py-3">YTD</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-mogul-gold/5">
                                {[
                                    { name: 'Mogul Digital Fund', aum: '$592M', ytd: '+48.0%' },
                                    { name: 'Mogul Tech Fund', aum: '$382M', ytd: '+31.7%' },
                                    { name: 'Mogul Real Estate Fund', aum: '$612M', ytd: '+22.4%' },
                                    { name: 'Mogul Alpha Fund', aum: '$256M', ytd: '+15.2%' }
                                ].map((pool, idx) => (
                                    <tr key={idx}>
                                        <td className="py-4 font-bold text-white">{pool.name}</td>
                                        <td className="py-4 text-right text-gray-400 font-mono">{pool.aum}</td>
                                        <td className="py-4 text-right text-green-400 font-bold">{pool.ytd}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
