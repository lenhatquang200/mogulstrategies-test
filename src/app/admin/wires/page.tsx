'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaEye, FaSync, FaBell, FaPhone, FaCheck, FaExclamationTriangle, FaDownload, FaCreditCard } from 'react-icons/fa';

export default function WireTrackingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: 'All Subscriptions' },
        { id: 'pending', label: 'Pending Wires' },
        { id: 'overdue', label: 'Overdue' },
        { id: 'failed', label: 'Failed/Rejected' },
        { id: 'escrow', label: 'Escrow Overview' },
    ];

    const wires = [
        {
            investor: 'John Doe (MS-INV-4872)',
            fund: 'Real Estate Fund – Tranche 3',
            commitment: '$500,000',
            received: '$375,000',
            status: 'Partial Received',
            agreement: 'Signed Dec 22, 2025',
            dueDate: 'Jan 15, 2026'
        },
        {
            investor: 'Acme Investments LLC',
            fund: 'Real Estate Fund – Tranche 3',
            commitment: '$2,500,000',
            received: '$0',
            status: 'Pending',
            agreement: 'Signed Dec 20, 2025',
            dueDate: 'Jan 10, 2026'
        },
        {
            investor: 'Jane Smith (MS-INV-4865)',
            fund: 'Digital Fund',
            commitment: '$400,000',
            received: '$400,000',
            status: 'Fully Received',
            agreement: 'Signed Dec 15, 2025',
            dueDate: 'Dec 30, 2025'
        },
        {
            investor: 'Global Growth Trust',
            fund: 'Technologies Fund II',
            commitment: '$1,000,000',
            received: '$0',
            status: 'Overdue',
            agreement: 'Signed Nov 30, 2025',
            dueDate: 'Dec 15, 2025'
        }
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Fully Received': return 'bg-green-500/20 text-green-400';
            case 'Partial Received': return 'bg-green-500/10 text-green-300';
            case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
            case 'Overdue': return 'bg-red-500/20 text-red-400';
            case 'Wire Rejected': return 'bg-gray-500/20 text-gray-400';
            default: return 'bg-white/10 text-gray-300';
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>Subscription & Wire Tracking</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search by investor, fund, or reference..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full xl:max-w-xl"
                />
                <select className="bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-mogul-gold transition-all w-full xl:w-auto">
                    <option>All Subscriptions</option>
                    <option>Pending Wire</option>
                    <option>Overdue</option>
                    <option>Reconciled</option>
                    <option>Rejected/Failed</option>
                </select>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
                {[
                    { val: '$182M', label: 'Total Committed' },
                    { val: '$148M', label: 'Funds Received' },
                    { val: '$34M', label: 'Pending Wires' },
                    { val: '12', label: 'Overdue' },
                    { val: '98.2%', label: 'Reconciliation' },
                    { val: '$2.1M', label: 'Escrow Balance' },
                ].map((stat, i) => (
                    <div key={i} className="bg-mogul-darker p-4 rounded-xl border border-mogul-gold/10 text-center animate-pulse-glow">
                        <div className="text-2xl font-display font-bold text-mogul-gold">{stat.val}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto gap-2 mb-6 pb-2 border-b border-mogul-gold/10">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 rounded-t-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-mogul-gold text-mogul-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'escrow' ? (
                // Escrow View
                <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow">
                    <div className="flex items-center gap-3 mb-8 border-b border-mogul-gold/20 pb-4">
                        <FaCreditCard className="text-mogul-gold text-2xl" />
                        <h3 className="text-2xl font-display font-bold text-white">Escrow Account Overview</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        <div className="bg-black/30 p-6 rounded-2xl border border-mogul-gold/10 text-center">
                            <div className="text-4xl font-display font-bold text-mogul-gold mb-2">$2.1M</div>
                            <div className="text-sm text-gray-400 uppercase tracking-widest">Current Balance</div>
                        </div>
                        <div className="bg-black/30 p-6 rounded-2xl border border-mogul-gold/10 text-center">
                            <div className="text-lg font-bold text-white mb-2">JPMorgan Chase Escrow</div>
                            <div className="text-sm text-gray-400">Account: ****3210</div>
                        </div>
                        <div className="bg-black/30 p-6 rounded-2xl border border-mogul-gold/10 text-center">
                            <div className="text-4xl font-display font-bold text-white mb-2">3</div>
                            <div className="text-sm text-gray-400 uppercase tracking-widest">Pending Releases</div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-mogul-gold text-mogul-dark rounded-xl font-bold hover:bg-white transition-all shadow-gold"><FaSync /> Sync with Bank API</button>
                        <button className="flex items-center gap-2 px-6 py-3 border border-mogul-gold text-mogul-gold rounded-xl font-bold hover:bg-mogul-gold hover:text-black transition-all"><FaDownload /> Export Transactions</button>
                    </div>
                </div>
            ) : (
                // Table View
                <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow overflow-x-auto">
                    <table className="w-full min-w-[1000px] text-sm">
                        <thead>
                            <tr className="bg-mogul-gold/10 text-mogul-gold text-xs uppercase tracking-widest text-left">
                                <th className="p-4 rounded-tl-lg">Investor</th>
                                <th className="p-4">Fund / Tranche</th>
                                <th className="p-4">Commitment</th>
                                <th className="p-4">Received</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Agreement</th>
                                <th className="p-4">Due Date</th>
                                <th className="p-4 rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-mogul-gold/5">
                            {wires.map((wire, idx) => (
                                <tr key={idx} className="hover:bg-mogul-gold/5 transition-colors">
                                    <td className="p-4 font-medium text-white">{wire.investor}</td>
                                    <td className="p-4 text-gray-300">{wire.fund}</td>
                                    <td className="p-4 font-mono text-white">{wire.commitment}</td>
                                    <td className="p-4 font-mono text-gray-400">{wire.received}</td>
                                    <td className="p-4"><span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(wire.status)}`}>{wire.status}</span></td>
                                    <td className="p-4 text-xs text-gray-500">{wire.agreement}</td>
                                    <td className={`p-4 text-xs ${wire.status === 'Overdue' ? 'text-red-400 font-bold' : 'text-gray-500'}`}>{wire.dueDate}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all" title="View"><FaEye /></button>
                                            {wire.status === 'Overdue' && <button className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded transition-all" title="Remind"><FaBell /></button>}
                                            {wire.status === 'Partial Received' && <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-all" title="Reconcile"><FaSync /></button>}
                                            {wire.status === 'Fully Received' && <button className="p-2 text-green-400 hover:bg-green-400/10 rounded transition-all" title="Confirm"><FaCheck /></button>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
