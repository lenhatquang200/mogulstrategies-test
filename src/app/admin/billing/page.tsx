'use client';

import PageTitle from '@/components/admin/PageTitle';
import StatCard from '@/components/admin/StatCard';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaFileInvoiceDollar, FaEye, FaBell, FaPhone, FaFilePdf } from 'react-icons/fa';

export default function BillingPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const invoices = [
        {
            id: 'INV-2025-1248',
            entity: 'John Doe (MS-INV-4872)',
            type: 'Management Fee – Q4',
            amount: '$45,000',
            issueDate: 'Dec 15, 2025',
            dueDate: 'Jan 15, 2026',
            status: 'Pending'
        },
        {
            id: 'INV-2025-1245',
            entity: 'Acme Investments LLC',
            type: 'Platform Fee – Annual',
            amount: '$125,000',
            issueDate: 'Dec 1, 2025',
            dueDate: 'Dec 31, 2025',
            status: 'Overdue'
        },
        {
            id: 'INV-2025-1239',
            entity: 'Jane Smith (MS-INV-4865)',
            type: 'Carried Interest Distribution',
            amount: '$18,200',
            issueDate: 'Dec 20, 2025',
            dueDate: '—',
            status: 'Paid'
        },
        {
            id: 'INV-2025-1232',
            entity: 'Global Growth Trust',
            type: 'Management Fee – Q4',
            amount: '$92,500',
            issueDate: 'Dec 10, 2025',
            dueDate: 'Jan 10, 2026',
            status: 'Paid'
        }
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Paid': return 'bg-green-500/20 text-green-400';
            case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
            case 'Overdue': return 'bg-red-500/20 text-red-400';
            default: return 'bg-white/10 text-gray-300';
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>Billing & Subscription Management</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                <SearchBar
                    placeholder="Search by investor, invoice ID, or fund..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full lg:max-w-md"
                />
                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    <select className="bg-mogul-darker border border-mogul-gold/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mogul-gold">
                        <option>All Invoices</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Overdue</option>
                        <option>Platform Fees</option>
                        <option>Management Fees</option>
                    </select>
                    <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors">
                        <FaFileInvoiceDollar size={14} /> Generate Invoices
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard value="$2.84M" label="Total Billed (2025)" />
                <StatCard value="$2.61M" label="Collected" />
                <StatCard value="$230K" label="Outstanding" />
                <StatCard value="12" label="Overdue Invoices" />
            </div>

            {/* Billing Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow overflow-x-auto">
                <h2 className="text-2xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/30 pb-4 text-center">
                    Invoices & Payment Status
                </h2>
                <table className="w-full min-w-[1000px]">
                    <thead>
                        <tr className="bg-mogul-gold/10 text-mogul-gold">
                            <th className="p-4 text-left border-b border-mogul-gold/20">Invoice ID</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Investor / Entity</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Type</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Amount</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Issue Date</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Due Date</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Status</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice, idx) => (
                            <tr key={idx} className="border-b border-mogul-gold/10 hover:bg-mogul-gold/5 transition-colors">
                                <td className="p-4 text-sm font-mono">{invoice.id}</td>
                                <td className="p-4 text-sm font-medium">{invoice.entity}</td>
                                <td className="p-4 text-sm text-gray-400">{invoice.type}</td>
                                <td className="p-4 text-sm font-bold text-mogul-gold">{invoice.amount}</td>
                                <td className="p-4 text-sm">{invoice.issueDate}</td>
                                <td className="p-4 text-sm">{invoice.dueDate}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(invoice.status)}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-mogul-dark transition-all" title="View">
                                            <FaEye size={12} />
                                        </button>
                                        {invoice.status !== 'Paid' && (
                                            <button className="p-2 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-400 hover:text-mogul-dark transition-all" title="Remind">
                                                <FaBell size={12} />
                                            </button>
                                        )}
                                        {invoice.status === 'Overdue' && (
                                            <button className="p-2 border border-red-400 text-red-400 rounded hover:bg-red-400 hover:text-mogul-dark transition-all" title="Contact">
                                                <FaPhone size={12} />
                                            </button>
                                        )}
                                        {invoice.status === 'Paid' && (
                                            <button className="p-2 border border-gray-500 text-gray-400 rounded hover:bg-gray-500 hover:text-white transition-all" title="Receipt">
                                                <FaFilePdf size={12} />
                                            </button>
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
