'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaEye, FaCheck, FaTimes, FaHistory, FaComment } from 'react-icons/fa';

export default function KYCPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Submissions');

    const submissions = [
        {
            id: 'MS-INV-4901',
            name: 'Acme Investments LLC',
            type: 'Entity (LLC)',
            kycStatus: 'Pending',
            accreditationStatus: 'Pending',
            submitted: 'Dec 22, 2025',
            lastUpdated: 'Dec 23, 2025'
        },
        {
            id: 'MS-INV-4898',
            name: 'Sarah Chen',
            type: 'Individual',
            kycStatus: 'Verified',
            accreditationStatus: 'In Review',
            submitted: 'Dec 20, 2025',
            lastUpdated: 'Dec 22, 2025'
        },
        {
            id: 'MS-INV-4895',
            name: 'Global Growth Trust',
            type: 'Trust',
            kycStatus: 'Verified',
            accreditationStatus: 'Rejected',
            submitted: 'Dec 15, 2025',
            lastUpdated: 'Dec 21, 2025'
        },
        {
            id: 'MS-INV-4880',
            name: 'Michael Roberts',
            type: 'Individual',
            kycStatus: 'Verified',
            accreditationStatus: 'Approved',
            submitted: 'Dec 10, 2025',
            lastUpdated: 'Dec 18, 2025'
        }
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Verified':
            case 'Approved': return 'bg-green-500/20 text-green-400';
            case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
            case 'Rejected': return 'bg-red-500/20 text-red-400';
            case 'In Review': return 'bg-cyan-500/20 text-cyan-400';
            default: return 'bg-white/10 text-gray-300';
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>KYC & Accreditation</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search by name, email, or investor ID..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full xl:max-w-xl"
                />
                <div className="flex overflow-x-auto gap-2 pb-2">
                    {['All Submissions', 'Pending Review', 'Approved', 'Rejected'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeFilter === filter ? 'bg-mogul-gold text-mogul-dark' : 'bg-black/40 text-gray-400 hover:text-white border border-mogul-gold/10 hover:bg-white/5'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                    { val: '842', label: 'Verified Investors' },
                    { val: '12', label: 'Pending KYC' },
                    { val: '8', label: 'Pending Accreditation' },
                    { val: '3', label: 'Requires Action' },
                ].map((stat, i) => (
                    <div key={i} className="bg-mogul-darker p-4 rounded-xl border border-mogul-gold/10 text-center animate-pulse-glow">
                        <div className="text-2xl font-display font-bold text-mogul-gold">{stat.val}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Review Queue Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow overflow-x-auto">
                <h2 className="text-xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/10 pb-4">Review Queue</h2>
                <table className="w-full min-w-[1000px] text-sm">
                    <thead>
                        <tr className="bg-mogul-gold/10 text-mogul-gold text-xs uppercase tracking-widest text-left">
                            <th className="p-4 rounded-tl-lg">Investor ID</th>
                            <th className="p-4">Name / Entity</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">KYC Status</th>
                            <th className="p-4">Accreditation Status</th>
                            <th className="p-4">Submitted</th>
                            <th className="p-4">Last Updated</th>
                            <th className="p-4 rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-mogul-gold/5">
                        {submissions.map((item, idx) => (
                            <tr key={idx} className="hover:bg-mogul-gold/5 transition-colors">
                                <td className="p-4 font-mono text-xs text-gray-400">{item.id}</td>
                                <td className="p-4 font-bold text-white">{item.name}</td>
                                <td className="p-4 text-gray-300">{item.type}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(item.kycStatus)}`}>
                                        {item.kycStatus}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(item.accreditationStatus)}`}>
                                        {item.accreditationStatus}
                                    </span>
                                </td>
                                <td className="p-4 font-mono text-xs text-gray-400">{item.submitted}</td>
                                <td className="p-4 font-mono text-xs text-gray-400">{item.lastUpdated}</td>
                                <td className="p-4 flex gap-2">
                                    {item.accreditationStatus === 'Rejected' ? (
                                        <>
                                            <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all" title="View Notes"><FaEye /></button>
                                            <button className="p-2 text-gray-400 hover:bg-gray-400/10 rounded transition-all" title="Message"><FaComment /></button>
                                        </>
                                    ) : item.accreditationStatus === 'Approved' ? (
                                        <>
                                            <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all" title="View"><FaEye /></button>
                                            <button className="p-2 text-gray-400 hover:bg-gray-400/10 rounded transition-all" title="History"><FaHistory /></button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all" title="Review"><FaEye /></button>
                                            <button className="p-2 text-green-400 hover:bg-green-400/10 rounded transition-all" title="Approve"><FaCheck /></button>
                                            <button className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-all" title="Reject"><FaTimes /></button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
