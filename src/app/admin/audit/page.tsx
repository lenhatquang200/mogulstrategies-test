'use client';

import PageTitle from '@/components/admin/PageTitle';
import StatCard from '@/components/admin/StatCard';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

export default function AuditLogsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const auditLogs = [
        {
            timestamp: 'Dec 24, 2025 14:32 EST',
            type: 'Admin',
            user: 'Admin User',
            action: 'Login Successful',
            target: '-',
            ip: '192.168.1.100',
            details: '2FA verified'
        },
        {
            timestamp: 'Dec 24, 2025 14:10 EST',
            type: 'Admin',
            user: 'Compliance Officer',
            action: 'Approved Accreditation',
            target: 'MS-INV-4898 (Jane Smith)',
            ip: '10.0.0.50',
            details: 'Net worth verified via CPA letter'
        },
        {
            timestamp: 'Dec 24, 2025 13:45 EST',
            type: 'Security',
            user: 'System',
            action: 'Failed Login Attempt',
            target: 'MS-INV-4850',
            ip: '203.0.113.78',
            details: '3 attempts from unknown IP – account locked'
        },
        {
            timestamp: 'Dec 24, 2025 12:20 EST',
            type: 'Data Access',
            user: 'Admin User',
            action: 'Viewed Investor Profile',
            target: 'MS-INV-4872 (John Doe)',
            ip: '192.168.1.100',
            details: 'Accessed KYC documents'
        },
        {
            timestamp: 'Dec 23, 2025 18:40 EST',
            type: 'System',
            user: 'Automated Process',
            action: 'Capital Call Notification Sent',
            target: '312 recipients',
            ip: '-',
            details: 'Email batch completed'
        },
        {
            timestamp: 'Dec 23, 2025 11:45 EST',
            type: 'Admin',
            user: 'Compliance Officer',
            action: 'Rejected KYC',
            target: 'MS-INV-4905',
            ip: '10.0.0.50',
            details: 'Document unclear – requested resubmit'
        }
    ];

    const getTypeStyle = (type: string) => {
        switch (type) {
            case 'Admin': return 'bg-mogul-gold/20 text-mogul-gold';
            case 'System': return 'bg-cyan-500/10 text-cyan-400';
            case 'Security': return 'bg-red-500/20 text-red-400';
            case 'Data Access': return 'bg-green-500/20 text-green-400';
            default: return 'bg-white/10 text-gray-300';
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>Audit & Activity Logs</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                <SearchBar
                    placeholder="Search logs by user, action, or IP..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full lg:max-w-md"
                />
                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    <select className="bg-mogul-darker border border-mogul-gold/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mogul-gold">
                        <option>All Log Types</option>
                        <option>Admin Actions</option>
                        <option>System Events</option>
                        <option>Security Events</option>
                        <option>Data Access</option>
                    </select>
                    <div className="flex items-center gap-2">
                        <input type="date" className="bg-mogul-darker border border-mogul-gold/30 rounded-lg px-4 py-2 text-white" defaultValue="2025-12-01" />
                        <span className="text-gray-500">to</span>
                        <input type="date" className="bg-mogul-darker border border-mogul-gold/30 rounded-lg px-4 py-2 text-white" defaultValue="2025-12-24" />
                    </div>
                    <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors">
                        <FaDownload size={14} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard value="48,521" label="Total Log Entries" />
                <StatCard value="1,248" label="Today" />
                <StatCard value="12" label="Security Alerts" />
                <StatCard value="842" label="Data Access Events" />
            </div>

            {/* Audit Log Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow overflow-x-auto">
                <h2 className="text-2xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/30 pb-4">
                    Complete System Audit Trail
                </h2>
                <table className="w-full min-w-[1000px]">
                    <thead>
                        <tr className="bg-mogul-gold/10 text-mogul-gold">
                            <th className="p-4 text-left border-b border-mogul-gold/20">Timestamp</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Type</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">User / System</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Action</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Target</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">IP Address</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auditLogs.map((log, idx) => (
                            <tr key={idx} className="border-b border-mogul-gold/10 hover:bg-mogul-gold/5 transition-colors">
                                <td className="p-4 whitespace-nowrap text-sm">{log.timestamp}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeStyle(log.type)}`}>
                                        {log.type}
                                    </span>
                                </td>
                                <td className="p-4 text-sm font-medium">{log.user}</td>
                                <td className="p-4 text-sm">{log.action}</td>
                                <td className="p-4 text-sm text-gray-400">{log.target}</td>
                                <td className="p-4 font-mono text-xs">{log.ip}</td>
                                <td className="p-4 text-sm text-gray-400">{log.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
