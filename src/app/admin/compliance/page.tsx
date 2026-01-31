'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaShieldAlt, FaFlag, FaExclamationCircle, FaCheck, FaBan, FaSearch, FaUserShield } from 'react-icons/fa';

export default function ComplianceModerationPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const activeFlags = [
        {
            id: 'F-102',
            title: 'Unusual Login Pattern',
            user: 'MS-INV-4850',
            details: '3 logins from different countries in 24h',
            severity: 'medium',
            time: '2 hours ago'
        },
        {
            id: 'F-105',
            title: 'Large Wire Transfer',
            user: 'MS-INV-4901',
            details: '$2.5M incoming wire (Offshore Source)',
            severity: 'high',
            time: '5 hours ago'
        },
        {
            id: 'F-108',
            title: 'Message Content Flag',
            user: 'MS-INV-4872',
            details: 'Potential non-accredited discussion in thread',
            severity: 'low',
            time: '1 day ago'
        }
    ];

    const auditLog = [
        { time: 'Dec 24, 2025 14:10', admin: 'Admin User', action: 'Approved Accreditation', target: 'MS-INV-4898', details: 'Net worth verified' },
        { time: 'Dec 23, 2025 11:45', admin: 'Compliance Officer', action: 'Rejected KYC', target: 'MS-INV-4905', details: 'Document unclear – requested resubmit' },
        { time: 'Dec 22, 2025 16:20', admin: 'Admin User', action: 'Suspended Account', target: 'MS-INV-4850', details: 'Multiple failed login attempts' },
        { time: 'Dec 20, 2025 09:30', admin: 'Compliance Officer', action: 'Cleared AML Flag', target: 'MS-INV-4872', details: 'Wire source confirmed legitimate' },
    ];

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high': return 'bg-red-500/10 border-red-500/30 text-red-500';
            case 'medium': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500';
            case 'low': return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
            default: return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>Compliance & Moderation</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search flags, users, or messages..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full md:max-w-md"
                />
                <select className="bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-mogul-gold transition-all w-full md:w-auto">
                    <option>All Flags</option>
                    <option>AML Alerts</option>
                    <option>Suspicious Activity</option>
                    <option>Message Review</option>
                    <option>Document Flags</option>
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Active Flags */}
                <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow flex flex-col h-[500px]">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-mogul-gold/20">
                        <div className="bg-red-500/20 p-3 rounded-xl text-red-500">
                            <FaFlag size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-bold text-white">Active Compliance Flags</h3>
                            <p className="text-xs text-gray-500">Action required for {activeFlags.length} items</p>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                        {activeFlags.map((flag, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border ${getSeverityColor(flag.severity)} transition-all hover:bg-opacity-20`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-bold">{flag.title}</div>
                                    <div className="text-[10px] uppercase font-bold tracking-wider opacity-70 border px-1.5 py-0.5 rounded">{flag.severity}</div>
                                </div>
                                <div className="text-sm opacity-90 mb-1">{flag.details}</div>
                                <div className="flex justify-between items-end mt-3">
                                    <div className="text-xs opacity-60 font-mono">User: {flag.user} • {flag.time}</div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold hover:bg-green-500 hover:text-white transition-colors">Resolve</button>
                                        <button className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-colors">Escalate</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recently Resolved (or Stats) */}
                <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow flex flex-col h-[500px]">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-mogul-gold/20">
                        <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                            <FaShieldAlt size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-bold text-white">Recently Resolved</h3>
                            <p className="text-xs text-gray-500">History of automated and manual actions</p>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                        <div className="p-4 rounded-xl bg-black/20 border border-mogul-gold/5 flex items-center justify-between">
                            <div>
                                <div className="font-bold text-white text-sm">Duplicate Account Attempt</div>
                                <div className="text-xs text-gray-500">Resolved Dec 23, 2025 • User Blocked</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 text-xs"><FaCheck /></div>
                        </div>
                        <div className="p-4 rounded-xl bg-black/20 border border-mogul-gold/5 flex items-center justify-between">
                            <div>
                                <div className="font-bold text-white text-sm">KYC Document Issue</div>
                                <div className="text-xs text-gray-500">Resolved Dec 22, 2025 • Docs Requested</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 text-xs"><FaExclamationCircle /></div>
                        </div>
                        <div className="p-4 rounded-xl bg-black/20 border border-mogul-gold/5 flex items-center justify-between">
                            <div>
                                <div className="font-bold text-white text-sm">Suspicious Capital Call Response</div>
                                <div className="text-xs text-gray-500">Resolved Dec 20, 2025 • Verified Legitimate</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 text-xs"><FaCheck /></div>
                        </div>
                        <div className="mt-8 p-6 bg-mogul-gold/5 rounded-xl border border-mogul-gold/10 text-center">
                            <div className="text-3xl font-bold text-mogul-gold mb-1">98.5%</div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest">Compliance Score</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Audit Log Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow">
                <h3 className="text-xl font-display font-bold text-mogul-gold mb-6 uppercase tracking-widest border-b border-mogul-gold/20 pb-4">Compliance Audit Log</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-mogul-gold/70 border-b border-mogul-gold/10 text-xs uppercase text-left">
                                <th className="pb-4 font-bold">Timestamp</th>
                                <th className="pb-4 font-bold">Admin</th>
                                <th className="pb-4 font-bold">Action</th>
                                <th className="pb-4 font-bold">Target</th>
                                <th className="pb-4 font-bold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-mogul-gold/5">
                            {auditLog.map((log, idx) => (
                                <tr key={idx} className="hover:bg-mogul-gold/5 transition-colors">
                                    <td className="py-4 text-gray-400 font-mono text-xs">{log.time}</td>
                                    <td className="py-4 text-white font-bold">{log.admin}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${log.action.includes('Approved') || log.action.includes('Cleared') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="py-4 text-mogul-gold font-mono text-xs">{log.target}</td>
                                    <td className="py-4 text-gray-300 italic">{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
