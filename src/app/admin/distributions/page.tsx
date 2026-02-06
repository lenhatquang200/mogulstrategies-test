'use client';

import PageTitle from '@/components/admin/PageTitle';
import StatCard from '@/components/admin/StatCard';
import SearchBar from '@/components/admin/SearchBar';
import Tabs from '@/components/admin/Tabs';
import StatusBadge from '@/components/admin/StatusBadge';
import ProgressBar from '@/components/admin/ProgressBar';
import ActionButton from '@/components/admin/ActionButton';
import { useState } from 'react';
import { FaPlus, FaEye, FaChartLine, FaList, FaBell } from 'react-icons/fa';

interface Distribution {
    type: 'Distribution' | 'Capital Call';
    fund: string;
    amount: string;
    dateIssued: string;
    dueDate: string;
    progress: number;
    status: 'paid' | 'pending' | 'overdue' | 'draft';
}

export default function DistributionsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const distributions: Distribution[] = [
        {
            type: 'Distribution',
            fund: 'Mogul Real Estate Fund',
            amount: '$18.42M',
            dateIssued: 'Dec 20, 2025',
            dueDate: '—',
            progress: 100,
            status: 'paid',
        },
        {
            type: 'Capital Call',
            fund: 'Mogul Real Estate Fund – Tranche 3',
            amount: '$75M',
            dateIssued: 'Dec 10, 2025',
            dueDate: 'Jan 15, 2026',
            progress: 68,
            status: 'pending',
        },
        {
            type: 'Capital Call',
            fund: 'Mogul Technologies Fund II',
            amount: '$50M',
            dateIssued: 'Nov 20, 2025',
            dueDate: 'Jan 20, 2026',
            progress: 42,
            status: 'pending',
        },
        {
            type: 'Distribution',
            fund: 'Mogul Digital Fund',
            amount: '$22.1M',
            dateIssued: 'Sep 30, 2025',
            dueDate: '—',
            progress: 100,
            status: 'paid',
        },
        {
            type: 'Capital Call',
            fund: 'Creative Arts Fund – Series B',
            amount: '$40M',
            dateIssued: 'Oct 5, 2025',
            dueDate: 'Nov 5, 2025',
            progress: 100,
            status: 'paid',
        },
    ];

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'distributions', label: 'Distributions' },
        { id: 'capital-calls', label: 'Capital Calls' },
        { id: 'pending', label: 'Pending' },
    ];

    return (
        <div className="pb-20">
            <PageTitle>Distributions & Capital Calls</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                <SearchBar
                    placeholder="Search by fund, investor, or reference..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full lg:w-96"
                />

                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-colors duration-300">
                        <FaPlus /> New Distribution
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-colors duration-300">
                        <FaPlus /> New Capital Call
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 p-0">
                <StatCard value="$66.4M" label="Total Distributions YTD" />
                <StatCard value="$125M" label="Active Capital Calls" />
                <StatCard value="94%" label="Capital Call Response Rate" />
                <StatCard value="8" label="Overdue Payments" />
            </section>

            {/* Activity Table */}
            <section className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] border-collapse">
                        <thead>
                            <tr className="bg-mogul-gold/10 text-mogul-gold">
                                <th className="p-4 text-left border-b border-mogul-gold/20">Type</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Fund / Tranche</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Amount</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Date Issued</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Due Date</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Progress</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Status</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {distributions.map((item, idx) => (
                                <tr key={idx} className="border-b border-mogul-gold/10 hover:bg-mogul-gold/5 transition-colors">
                                    <td className="p-4 font-medium">{item.type}</td>
                                    <td className="p-4">{item.fund}</td>
                                    <td className="p-4 font-bold text-mogul-gold">{item.amount}</td>
                                    <td className="p-4 text-gray-400">{item.dateIssued}</td>
                                    <td className="p-4 text-gray-400">{item.dueDate}</td>
                                    <td className="p-4">
                                        <ProgressBar percentage={item.progress} />
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={item.status}>
                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                        </StatusBadge>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {item.status === 'paid' ? (
                                                <>
                                                    <ActionButton variant="primary" icon={<FaEye />}>
                                                        View
                                                    </ActionButton>
                                                    <ActionButton variant="primary" icon={<FaChartLine />}>
                                                        Report
                                                    </ActionButton>
                                                </>
                                            ) : (
                                                <>
                                                    <ActionButton variant="secondary" icon={<FaList />}>
                                                        Responses
                                                    </ActionButton>
                                                    <ActionButton variant="warning" icon={<FaBell />}>
                                                        Remind
                                                    </ActionButton>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
