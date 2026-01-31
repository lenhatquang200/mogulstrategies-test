'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaUpload, FaFileExcel, FaEye, FaRedo, FaDownload, FaBell, FaEnvelope, FaHistory, FaCheck, FaCog } from 'react-icons/fa';

export default function TaxDocumentsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('2025');

    const taxDocs = [
        {
            id: 'MS-INV-4872',
            name: 'John Doe',
            funds: 'Real Estate Fund, Digital Fund',
            status: 'Delivered',
            method: 'Portal + Email',
            date: 'Mar 15, 2026',
            viewed: 'Yes'
        },
        {
            id: 'MS-INV-4865',
            name: 'Jane Smith',
            funds: 'Technologies Fund',
            status: 'Delivered',
            method: 'Portal Only',
            date: 'Mar 14, 2026',
            viewed: 'No'
        },
        {
            id: 'MS-INV-4901',
            name: 'Acme Investments LLC',
            funds: 'Real Estate Fund',
            status: 'Pending',
            method: '—',
            date: '—',
            viewed: '—'
        },
        {
            id: 'MS-INV-4850',
            name: 'Robert Johnson',
            funds: 'All Funds',
            status: 'Delivered',
            method: 'Portal + Email',
            date: 'Mar 12, 2026',
            viewed: 'Yes'
        }
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-green-500/20 text-green-400';
            case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
            case 'Generated': return 'bg-blue-500/20 text-blue-400';
            default: return 'bg-white/10 text-gray-300';
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>Tax Documents & K-1 Management</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-mogul-gold transition-all"
                    >
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                    </select>
                    <SearchBar
                        placeholder="Search investors or funds..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                        className="w-full md:w-80"
                    />
                </div>
                <div className="flex flex-wrap gap-4 w-full xl:w-auto">
                    <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-gold whitespace-nowrap">
                        <FaUpload /> Upload Tax Package
                    </button>
                    <button className="flex items-center gap-2 border border-mogul-gold text-mogul-gold px-6 py-3 rounded-xl font-bold hover:bg-mogul-gold hover:text-black transition-all shadow-gold whitespace-nowrap">
                        <FaFileExcel /> Generate K-1s
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                    { val: '842', label: `${selectedYear} K-1s Prepared` },
                    { val: '798', label: 'Delivered to Investors' },
                    { val: '94.8%', label: 'Delivery Rate' },
                    { val: '44', label: 'Pending Delivery' },
                ].map((stat, i) => (
                    <div key={i} className="bg-mogul-darker p-4 rounded-xl border border-mogul-gold/10 text-center animate-pulse-glow">
                        <div className="text-2xl font-display font-bold text-mogul-gold">{stat.val}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow overflow-x-auto">
                <h2 className="text-xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/10 pb-4">
                    K-1 & Tax Document Status ({selectedYear} Tax Year)
                </h2>
                <table className="w-full min-w-[1000px] text-sm">
                    <thead>
                        <tr className="bg-mogul-gold/10 text-mogul-gold text-xs uppercase tracking-widest text-left">
                            <th className="p-4 rounded-tl-lg">Investor ID</th>
                            <th className="p-4">Name / Entity</th>
                            <th className="p-4">Fund(s)</th>
                            <th className="p-4">K-1 Status</th>
                            <th className="p-4">Method</th>
                            <th className="p-4">Delivered</th>
                            <th className="p-4">Viewed</th>
                            <th className="p-4 rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-mogul-gold/5">
                        {taxDocs.map((doc, idx) => (
                            <tr key={idx} className="hover:bg-mogul-gold/5 transition-colors">
                                <td className="p-4 font-mono text-xs text-gray-400">{doc.id}</td>
                                <td className="p-4 font-bold text-white">{doc.name}</td>
                                <td className="p-4 text-gray-300 max-w-xs truncate">{doc.funds}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(doc.status)}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="p-4 text-xs text-gray-400">{doc.method}</td>
                                <td className="p-4 text-xs font-mono">{doc.date}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${doc.viewed === 'Yes' ? 'bg-green-500/20 text-green-400' : 'text-gray-500'}`}>
                                        {doc.viewed}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all" title="View"><FaEye /></button>
                                        {doc.status === 'Delivered' && (
                                            <>
                                                <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-all" title="Resend"><FaRedo /></button>
                                                <button className="p-2 text-gray-400 hover:bg-gray-400/10 rounded transition-all" title="Download"><FaDownload /></button>
                                                <button className="p-2 text-gray-400 hover:bg-gray-400/10 rounded transition-all" title="History"><FaHistory /></button>
                                            </>
                                        )}
                                        {doc.status === 'Pending' && (
                                            <>
                                                <button className="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-all" title="Generate"><FaCog /></button>
                                                <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all" title="Upload"><FaUpload /></button>
                                            </>
                                        )}
                                        {doc.viewed === 'No' && doc.status === 'Delivered' && (
                                            <button className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded transition-all" title="Remind"><FaBell /></button>
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
