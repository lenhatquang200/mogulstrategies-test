'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaEye, FaUserPlus, FaHistory, FaExclamationTriangle, FaCheckCircle, FaClock } from 'react-icons/fa';

export default function SupportPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const tickets = [
        {
            id: '#TKT-1248',
            investor: 'John Doe (MS-INV-4872)',
            subject: 'Unable to access Q4 distribution statement',
            priority: 'High',
            status: 'In Progress',
            assigned: 'Support Team A',
            created: 'Dec 24, 2025',
            sla: 'Due in 4h',
            slaStatus: 'warning'
        },
        {
            id: '#TKT-1245',
            investor: 'Jane Smith (MS-INV-4865)',
            subject: 'Question about tax implications of recent distribution',
            priority: 'Medium',
            status: 'Open',
            assigned: 'Unassigned',
            created: 'Dec 23, 2025',
            sla: 'On Track',
            slaStatus: 'ontrack'
        },
        {
            id: '#TKT-1242',
            investor: 'Acme Investments LLC',
            subject: 'Request for additional fund documents',
            priority: 'Low',
            status: 'In Progress',
            assigned: 'Support Team B',
            created: 'Dec 22, 2025',
            sla: 'On Track',
            slaStatus: 'ontrack'
        },
        {
            id: '#TKT-1239',
            investor: 'Robert Johnson (MS-INV-4850)',
            subject: 'Login issues on mobile app',
            priority: 'High',
            status: 'Resolved',
            assigned: 'Support Team A',
            created: 'Dec 20, 2025',
            sla: 'Resolved in 6h',
            slaStatus: 'ontrack'
        },
        {
            id: '#TKT-1235',
            investor: 'Sarah Chen',
            subject: 'Capital call confirmation needed',
            priority: 'High',
            status: 'Open',
            assigned: 'Unassigned',
            created: 'Dec 19, 2025',
            sla: 'Overdue',
            slaStatus: 'breached'
        }
    ];

    const getPriorityStyle = (p: string) => {
        switch (p) {
            case 'High': return 'bg-red-500/20 text-red-400';
            case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
            case 'Low': return 'bg-green-500/20 text-green-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    const getStatusStyle = (s: string) => {
        switch (s) {
            case 'Open': return 'bg-yellow-500/20 text-yellow-400';
            case 'In Progress': return 'bg-cyan-500/20 text-cyan-400';
            case 'Resolved': return 'bg-green-500/20 text-green-400';
            case 'Closed': return 'bg-gray-500/20 text-gray-400';
            default: return 'bg-white/10 text-gray-300';
        }
    };

    const getSlaStyle = (status: string) => {
        switch (status) {
            case 'ontrack': return 'text-green-400';
            case 'warning': return 'text-yellow-400';
            case 'breached': return 'text-red-400 font-bold';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>Support & Ticketing System</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search tickets by ID, investor, subject..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full xl:max-w-xl"
                />
                <div className="flex overflow-x-auto gap-2 pb-2">
                    {['All Tickets', 'Open', 'In Progress', 'Resolved', 'High Priority'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter.toLowerCase())}
                            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeFilter === filter.toLowerCase().replace(' tickets', '') ? 'bg-mogul-gold text-mogul-dark' : 'bg-black/40 text-gray-400 hover:text-white border border-mogul-gold/10 hover:bg-white/5'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
                {[
                    { val: '24', label: 'Open Tickets' },
                    { val: '8', label: 'Overdue (SLA Breach)' },
                    { val: '96.4%', label: 'SLA Compliance Rate' },
                    { val: '2.3h', label: 'Avg. First Response' },
                    { val: '18.7h', label: 'Avg. Resolution Time' },
                    { val: '4.8/5', label: 'Customer Satisfaction' },
                ].map((stat, i) => (
                    <div key={i} className="bg-mogul-darker p-4 rounded-xl border border-mogul-gold/10 text-center animate-pulse-glow">
                        <div className="text-2xl font-display font-bold text-mogul-gold">{stat.val}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Tickets Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow overflow-x-auto">
                <h2 className="text-xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/10 pb-4">Support Tickets</h2>
                <table className="w-full min-w-[1200px] text-sm">
                    <thead>
                        <tr className="bg-mogul-gold/10 text-mogul-gold text-xs uppercase tracking-widest text-left">
                            <th className="p-4 rounded-tl-lg">Ticket ID</th>
                            <th className="p-4">Investor</th>
                            <th className="p-4">Subject</th>
                            <th className="p-4">Priority</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Assigned To</th>
                            <th className="p-4">Created</th>
                            <th className="p-4">SLA Status</th>
                            <th className="p-4 rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-mogul-gold/5">
                        {tickets.map((ticket, idx) => (
                            <tr key={idx} className="hover:bg-mogul-gold/5 transition-colors">
                                <td className="p-4 font-mono text-xs text-gray-400">{ticket.id}</td>
                                <td className="p-4 font-bold text-white">{ticket.investor}</td>
                                <td className="p-4 text-gray-300 max-w-xs truncate" title={ticket.subject}>{ticket.subject}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getPriorityStyle(ticket.priority)}`}>
                                        {ticket.priority}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(ticket.status)}`}>
                                        {ticket.status}
                                    </span>
                                </td>
                                <td className="p-4 text-xs text-gray-400">{ticket.assigned}</td>
                                <td className="p-4 text-xs font-mono">{ticket.created}</td>
                                <td className={`p-4 text-xs font-medium ${getSlaStyle(ticket.slaStatus)}`}>
                                    {ticket.sla}
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all" title="View"><FaEye /></button>
                                        <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-all" title="Assign / Reassign"><FaUserPlus /></button>
                                        {ticket.status === 'Resolved' && <button className="p-2 text-gray-400 hover:bg-gray-400/10 rounded transition-all" title="History"><FaHistory /></button>}
                                        {ticket.slaStatus === 'breached' && <button className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-all" title="Escalate"><FaExclamationTriangle /></button>}
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
