'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaPlus, FaVial, FaDownload, FaEdit, FaChartLine, FaPause, FaEye, FaPlay, FaBackward, FaForward, FaExpand, FaLinkedin, FaGoogle, FaFacebook, FaTwitter, FaMousePointer } from 'react-icons/fa';

export default function TrafficAnalyticsPage() {
    const [dateRange, setDateRange] = useState({ start: '2025-12-01', end: '2025-12-24' });
    const [heatmapPage, setHeatmapPage] = useState('home');

    const campaigns = [
        { name: 'Accredited Investor Outreach Q4', source: 'LinkedIn / Sponsored', imp: '145,200', clicks: '8,421', ctr: '5.8%', cost: '$42,105', conv: '248', cpc: '$5.00', status: 'Active' },
        { name: 'Google Search Real Estate Focus', source: 'Google Ads / Search', imp: '89,300', clicks: '5,612', ctr: '6.3%', cost: '$28,060', conv: '156', cpc: '$5.00', status: 'Active' },
        { name: 'Retargeting – Abandoned Registrations', source: 'Facebook / Retargeting', imp: '62,100', clicks: '3,845', ctr: '6.2%', cost: '$15,380', conv: '98', cpc: '$4.00', status: 'Active' },
        { name: 'Investor Newsletter Q4', source: 'Email / Newsletter', imp: '—', clicks: '2,156', ctr: '—', cost: '$0', conv: '89', cpc: '$0', status: 'Completed' },
        { name: 'Twitter Thought Leadership Series', source: 'Twitter/X / Promoted', imp: '78,500', clicks: '4,210', ctr: '5.4%', cost: '$21,050', conv: '112', cpc: '$5.00', status: 'Active' },
    ];

    return (
        <div className="pb-20">
            <PageTitle>Website Traffic Analytics</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <div className="flex items-center gap-4 bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-2">
                    <input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} className="bg-transparent text-white focus:outline-none" />
                    <span className="text-gray-400">to</span>
                    <input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} className="bg-transparent text-white focus:outline-none" />
                </div>
                <div className="flex flex-wrap gap-4 w-full xl:w-auto">
                    <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-gold whitespace-nowrap">
                        <FaPlus /> Add Campaign
                    </button>
                    <button className="flex items-center gap-2 border border-mogul-gold text-mogul-gold px-6 py-3 rounded-xl font-bold hover:bg-mogul-gold hover:text-black transition-all shadow-gold whitespace-nowrap">
                        <FaVial /> New A/B Test
                    </button>
                    <button className="flex items-center gap-2 border border-mogul-gold/50 text-gray-300 px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all whitespace-nowrap">
                        <FaDownload /> Export Report
                    </button>
                </div>
            </div>

            {/* Campaign Details Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow overflow-x-auto mb-10">
                <h2 className="text-xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/10 pb-4">Ad Campaign Details</h2>
                <table className="w-full min-w-[1200px] text-sm">
                    <thead>
                        <tr className="bg-mogul-gold/10 text-mogul-gold text-xs uppercase tracking-widest text-left">
                            <th className="p-4 rounded-tl-lg">Campaign Name</th>
                            <th className="p-4">Source / Medium</th>
                            <th className="p-4">Impressions</th>
                            <th className="p-4">Clicks</th>
                            <th className="p-4">CTR</th>
                            <th className="p-4">Cost</th>
                            <th className="p-4">Conversions</th>
                            <th className="p-4">CPC</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-mogul-gold/5">
                        {campaigns.map((camp, idx) => (
                            <tr key={idx} className="hover:bg-mogul-gold/5 transition-colors">
                                <td className="p-4 font-bold text-white">{camp.name}</td>
                                <td className="p-4 text-gray-300">{camp.source}</td>
                                <td className="p-4 font-mono text-gray-400">{camp.imp}</td>
                                <td className="p-4 font-mono text-white">{camp.clicks}</td>
                                <td className="p-4 font-mono text-mogul-gold">{camp.ctr}</td>
                                <td className="p-4 font-mono text-gray-400">{camp.cost}</td>
                                <td className="p-4 font-mono text-green-400 font-bold">{camp.conv}</td>
                                <td className="p-4 font-mono text-gray-400">{camp.cpc}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${camp.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                        {camp.status}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all"><FaEdit /></button>
                                    <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-all"><FaChartLine /></button>
                                    {camp.status === 'Active' && <button className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded transition-all"><FaPause /></button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
                {[
                    { val: '18,421', label: 'Total Visits' },
                    { val: '12,856', label: 'Unique Visitors' },
                    { val: '3.8', label: 'Avg. Pages/Session' },
                    { val: '4:32', label: 'Avg. Session Duration' },
                    { val: '42.1%', label: 'Bounce Rate' },
                    { val: '1,248', label: 'New Registrations' },
                ].map((stat, i) => (
                    <div key={i} className="bg-mogul-darker p-4 rounded-xl border border-mogul-gold/10 text-center animate-pulse-glow">
                        <div className="text-2xl font-display font-bold text-mogul-gold">{stat.val}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Charts Grid Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {['Traffic Over Time', 'Traffic Sources', 'Conversion Funnel', 'Ad Campaign Performance'].map((title, i) => (
                    <div key={i} className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow h-80 flex flex-col items-center justify-center text-gray-500">
                        <h3 className="text-lg font-bold text-mogul-gold absolute top-6 left-8">{title}</h3>
                        <div className="w-full h-full bg-black/20 rounded-xl mt-8 flex items-center justify-center border border-dashed border-gray-700">
                            [Chart Visualization Placeholder]
                        </div>
                    </div>
                ))}
            </div>

            {/* Heatmap Section */}
            <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow mb-10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                        <FaMousePointer className="text-mogul-gold" /> User Behavior Heatmap
                    </h3>
                    <select
                        value={heatmapPage}
                        onChange={(e) => setHeatmapPage(e.target.value)}
                        className="bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-mogul-gold transition-all"
                    >
                        <option value="home">Homepage</option>
                        <option value="offerings">Active Offerings</option>
                        <option value="login">Login / Registration</option>
                    </select>
                </div>
                <div className="relative h-[500px] bg-black rounded-xl overflow-hidden border border-gray-800">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-50 pointer-events-none">
                        <h2 className="text-4xl text-mogul-gold font-display font-bold">Welcome to Mogul Strategies</h2>
                        <p className="mt-4 text-white text-xl">Exclusive Alternative Investments</p>
                        <button className="mt-8 px-8 py-3 bg-mogul-gold text-black font-bold rounded-xl">Explore Offerings</button>
                    </div>
                    <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-red-500/40 blur-xl rounded-full"></div>
                    <div className="absolute top-[60%] left-1/2 w-32 h-32 bg-red-600/50 blur-2xl rounded-full"></div>
                    <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-yellow-500/30 blur-xl rounded-full"></div>
                </div>
            </div>

            {/* Session Replay */}
            <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow">
                <h3 className="text-2xl font-display font-bold text-white mb-6 text-center">Session Replay Player</h3>
                <div className="flex justify-center gap-4 mb-6">
                    <button className="p-3 bg-black/40 text-mogul-gold border border-mogul-gold/20 rounded-lg hover:bg-white/5"><FaBackward /></button>
                    <button className="px-6 py-3 bg-mogul-gold text-mogul-dark font-bold rounded-lg hover:bg-white flex items-center gap-2"><FaPlay /> Play</button>
                    <button className="p-3 bg-black/40 text-mogul-gold border border-mogul-gold/20 rounded-lg hover:bg-white/5"><FaForward /></button>
                </div>
                <div className="h-[400px] bg-black/50 border border-gray-800 rounded-xl flex items-center justify-center text-gray-500 mb-6">
                    <div className="text-center">
                        <div className="text-4xl mb-4"><FaPlay className="inline-block" /></div>
                        <div>Select a session to replay</div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <select className="bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-mogul-gold w-full max-w-md">
                        <option>Select a session...</option>
                        <option>Session #1248 – Dec 24, 2025 14:32</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
