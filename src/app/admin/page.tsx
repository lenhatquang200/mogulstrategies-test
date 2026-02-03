'use client';

import PageTitle from '@/components/admin/PageTitle';
import StatCard from '@/components/admin/StatCard';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';

export default function AdminDashboardPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const recentActivities = [
        { time: '14:32 EST', user: 'John Doe (MS-INV-4872)', action: 'Login', details: 'Successful login', ip: '192.168.1.100' },
        { time: '14:15 EST', user: 'Admin User', action: 'Approved KYC', details: 'Investor MS-INV-4865', ip: '10.0.0.50' },
        { time: '13:45 EST', user: 'Jane Smith (MS-INV-4850)', action: 'Subscription', details: 'Real Estate Fund Tranche 3', ip: '203.0.113.78' },
        { time: '12:20 EST', user: 'Admin User', action: 'Uploaded Document', details: 'Q4 2025 Investor Letter', ip: '10.0.0.50' },
    ];

    const getActionBadgeStyle = (action: string) => {
        if (action === 'Login') return 'bg-cyan-500/10 text-cyan-400';
        if (action === 'Approved KYC') return 'bg-mogul-gold/10 text-mogul-gold';
        return 'bg-white/10 text-gray-300';
    };

    return (
        <div className="pb-20">
            <PageTitle>Admin Portal Dashboard</PageTitle>

            {/* Platform Overview Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 py-2">
                <StatCard value="1,248" label="Total Investors" />
                <StatCard value="842" label="Verified Users" />
                <StatCard value="$1.84B" label="Assets Under Management" />
                <StatCard value="6" label="Active Funds" />
            </section>

            {/* Main Action Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 py-2">
                {/* Pending Actions */}
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 pb-3 border-b border-mogul-gold/30">
                        Pending Actions
                    </h3>
                    <ul className="space-y-4">
                        {[
                            { label: 'KYC Reviews Pending', count: 12 },
                            { label: 'Accreditation Submissions', count: 8 },
                            { label: 'Capital Call Responses', count: 23 },
                            { label: 'Support Tickets', count: 5 },
                            { label: 'Document Approvals', count: 3 },
                        ].map((item, idx) => (
                            <li key={idx} className="flex justify-between items-center py-3 border-b border-mogul-gold/20 last:border-0">
                                <span className="text-gray-300">{item.label}</span>
                                <span className="text-mogul-gold font-bold text-lg">{item.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* System Status */}
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 pb-3 border-b border-mogul-gold/30">
                        System Status
                    </h3>
                    <ul className="space-y-4">
                        {[
                            { label: 'Portal Status', value: 'Online', color: 'text-cyan-400' },
                            { label: 'Database Connection', value: 'Healthy', color: 'text-cyan-400' },
                            { label: 'Email Service', value: 'Active', color: 'text-cyan-400' },
                            { label: 'API Latency', value: '24ms', color: 'text-cyan-400' },
                            { label: 'Last Backup', value: '2 hours ago', color: 'text-gray-400' },
                        ].map((item, idx) => (
                            <li key={idx} className="flex justify-between items-center py-3 border-b border-mogul-gold/20 last:border-0">
                                <span className="text-gray-300">{item.label}</span>
                                <span className={`font-bold ${item.color}`}>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Recent Activity Log */}
            <section className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 pb-3 border-b border-mogul-gold/30">
                    Recent Activity Log
                </h3>

                {/* Search Bar */}
                <div className="mb-6 flex gap-4">
                    <SearchBar
                        placeholder="Search activity..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                        className="flex-1"
                    />
                    <button className="px-6 py-4 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-colors duration-300">
                        Filter
                    </button>
                </div>

                {/* Activity Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] border-collapse">
                        <thead>
                            <tr className="bg-mogul-gold/10 text-mogul-gold">
                                <th className="p-4 text-left border-b border-mogul-gold/20">Time</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">User</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Action</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Details</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivities.map((activity, idx) => (
                                <tr key={idx} className="border-b border-mogul-gold/10 hover:bg-mogul-gold/5 transition-colors">
                                    <td className="p-4">{activity.time}</td>
                                    <td className="p-4">{activity.user}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded text-sm ${getActionBadgeStyle(activity.action)}`}>
                                            {activity.action}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400">{activity.details}</td>
                                    <td className="p-4 font-mono text-sm">{activity.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}


