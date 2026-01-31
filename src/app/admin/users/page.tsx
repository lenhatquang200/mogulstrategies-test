'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaUserPlus, FaEye, FaEdit, FaBan, FaCheck, FaTrash, FaEnvelope } from 'react-icons/fa';

export default function UserManagementPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const users = [
        {
            id: 'MS-INV-4872',
            name: 'John Doe',
            email: 'john.doe@example.com',
            status: 'Active',
            kyc: 'Verified',
            accreditation: 'Approved',
            joined: 'Mar 15, 2023',
            lastActive: 'Dec 24, 2025'
        },
        {
            id: 'MS-INV-4865',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            status: 'Active',
            kyc: 'Verified',
            accreditation: 'Pending',
            joined: 'Jun 8, 2024',
            lastActive: 'Dec 20, 2025'
        },
        {
            id: 'MS-INV-4850',
            name: 'Robert Johnson',
            email: 'robert.j@example.com',
            status: 'Inactive',
            kyc: 'Verified',
            accreditation: 'Approved',
            joined: 'Jan 12, 2023',
            lastActive: 'Oct 15, 2025'
        },
        {
            id: 'MS-INV-4901',
            name: 'Acme Investments LLC',
            email: 'invest@acme.com',
            status: 'Active',
            kyc: 'Pending',
            accreditation: 'Pending',
            joined: 'Dec 10, 2025',
            lastActive: 'Dec 22, 2025'
        }
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-500/20 text-green-400';
            case 'Inactive': return 'bg-gray-500/20 text-gray-400';
            case 'Verified': return 'bg-green-500/20 text-green-400';
            case 'Approved': return 'bg-green-500/20 text-green-400';
            case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
            case 'Rejected': return 'bg-red-500/20 text-red-400';
            default: return 'bg-white/10 text-gray-300';
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>User Management</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search users by name, email, or ID..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full lg:max-w-md"
                />
                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    <select className="bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-mogul-gold transition-all">
                        <option>All Users</option>
                        <option>Verified</option>
                        <option>Pending KYC</option>
                        <option>Active Investors</option>
                        <option>Inactive</option>
                    </select>
                    <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-gold whitespace-nowrap">
                        <FaUserPlus size={14} /> Add New User
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow overflow-x-auto border border-mogul-gold/10">
                <table className="w-full min-w-[1000px] text-sm">
                    <thead>
                        <tr className="bg-mogul-gold/10 text-mogul-gold text-xs uppercase tracking-widest text-left">
                            <th className="p-4 rounded-tl-lg">User ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">KYC</th>
                            <th className="p-4">Accreditation</th>
                            <th className="p-4">Joined</th>
                            <th className="p-4">Last Active</th>
                            <th className="p-4 rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-mogul-gold/5">
                        {users.map((user, idx) => (
                            <tr key={idx} className="hover:bg-mogul-gold/5 transition-colors">
                                <td className="p-4 font-mono text-xs text-mogul-gold opacity-80">{user.id}</td>
                                <td className="p-4 font-bold text-white">{user.name}</td>
                                <td className="p-4 text-gray-400">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(user.status)}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(user.kyc)}`}>
                                        {user.kyc}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(user.accreditation)}`}>
                                        {user.accreditation}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500 font-mono text-xs">{user.joined}</td>
                                <td className="p-4 text-gray-500 font-mono text-xs">{user.lastActive}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all" title="View Details">
                                            <FaEye />
                                        </button>
                                        <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-all" title="Edit">
                                            <FaEdit />
                                        </button>
                                        {user.kyc === 'Pending' || user.accreditation === 'Pending' ? (
                                            <button className="p-2 text-green-400 hover:bg-green-400/10 rounded transition-all" title="Review">
                                                <FaCheck />
                                            </button>
                                        ) : (
                                            <button className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded transition-all" title="Message">
                                                <FaEnvelope />
                                            </button>
                                        )}
                                        {user.status === 'Inactive' ? (
                                            <button className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-all" title="Delete">
                                                <FaTrash />
                                            </button>
                                        ) : (
                                            <button className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-all" title="Suspend">
                                                <FaBan />
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
