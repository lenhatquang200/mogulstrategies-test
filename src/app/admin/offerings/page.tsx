'use client';

import PageTitle from '@/components/admin/PageTitle';
import StatCard from '@/components/admin/StatCard';
import SearchBar from '@/components/admin/SearchBar';
import Tabs from '@/components/admin/Tabs';
import { useState } from 'react';
import { FaPlus, FaEdit, FaEye, FaChartLine, FaUsers, FaPaperPlane } from 'react-icons/fa';

export default function OfferingsSyndicationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'funds', label: 'Structured Funds' },
        { id: 'spvs', label: 'Single-Asset SPVs' },
        { id: 'draft', label: 'Draft' },
    ];

    const offerings = [
        {
            name: 'Mogul Real Estate Fund – Tranche 3',
            type: 'Structured Fund',
            target: '$50M',
            raised: '$28M',
            progress: 56,
            status: 'Open',
            closingDate: 'Jan 31, 2026'
        },
        {
            name: 'Dubai Luxury Waterfront Villa',
            type: 'Single-Asset SPV',
            target: '$8.5M',
            raised: '$5.2M',
            progress: 61,
            status: 'Open',
            closingDate: 'Feb 15, 2026'
        },
        {
            name: 'Mogul Technologies Fund II',
            type: 'Structured Fund',
            target: '$75M',
            raised: '$42M',
            progress: 56,
            status: 'Open',
            closingDate: 'Feb 28, 2026'
        },
        {
            name: 'Miami Beach Boutique Hotel',
            type: 'Single-Asset SPV',
            target: '$12M',
            raised: '$7.8M',
            progress: 65,
            status: 'Open',
            closingDate: 'Mar 10, 2026'
        },
        {
            name: 'New Tech Campus Acquisition',
            type: 'Single-Asset SPV',
            target: '$22M',
            raised: '$0',
            progress: 0,
            status: 'Draft',
            closingDate: 'TBD'
        }
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Open': return 'bg-green-500/20 text-green-400';
            case 'Closed': return 'bg-red-500/20 text-red-400';
            case 'Draft': return 'bg-gray-500/20 text-gray-400';
            default: return 'bg-white/10 text-gray-300';
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>Offerings & Syndications</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search offerings or syndications..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full lg:max-w-md"
                />
                <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
                    <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
                    <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-gold whitespace-nowrap">
                        <FaPlus size={14} /> Create New
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard value="6" label="Active Funds" />
                <StatCard value="4" label="Active SPVs" />
                <StatCard value="$182M" label="Total Raised (Active)" />
                <StatCard value="3" label="In Draft" />
            </div>

            {/* Offerings Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow overflow-x-auto border border-mogul-gold/10">
                <table className="w-full min-w-[1200px]">
                    <thead>
                        <tr className="bg-mogul-gold/10 text-mogul-gold text-xs uppercase tracking-widest">
                            <th className="p-4 text-left border-b border-mogul-gold/20">Name</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Type</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Target Size</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Raised</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Progress</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Status</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Closing Date</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offerings.map((off, idx) => (
                            <tr key={idx} className="border-b border-mogul-gold/10 hover:bg-mogul-gold/5 transition-colors text-sm">
                                <td className="p-4 font-bold text-white max-w-[250px]">{off.name}</td>
                                <td className="p-4 text-gray-400">{off.type}</td>
                                <td className="p-4 text-white font-mono">{off.target}</td>
                                <td className="p-4 text-mogul-gold font-bold font-mono">{off.raised}</td>
                                <td className="p-4 min-w-[150px]">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                                            <div className="bg-mogul-gold h-full transition-all duration-1000" style={{ width: `${off.progress}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400">{off.progress}%</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${getStatusStyle(off.status)}`}>
                                        {off.status}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500 font-mono text-xs">{off.closingDate}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-mogul-dark transition-all" title="Edit">
                                            <FaEdit size={12} />
                                        </button>
                                        {off.status === 'Draft' ? (
                                            <button className="p-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-mogul-dark transition-all" title="Publish">
                                                <FaPaperPlane size={12} />
                                            </button>
                                        ) : (
                                            <>
                                                <button className="p-2 border border-mogul-gold text-mogul-gold rounded hover:bg-mogul-gold hover:text-mogul-dark transition-all" title="Preview">
                                                    <FaEye size={12} />
                                                </button>
                                                <button className="p-2 border border-gray-500 text-gray-400 rounded hover:bg-gray-500 hover:text-white transition-all" title={off.type === 'Structured Fund' ? 'Stats' : 'Investors'}>
                                                    {off.type === 'Structured Fund' ? <FaChartLine size={12} /> : <FaUsers size={12} />}
                                                </button>
                                            </>
                                        )}
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
