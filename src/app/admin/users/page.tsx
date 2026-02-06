'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useEffect, useState } from 'react';
import { FaUserPlus, FaEye, FaEdit, FaBan, FaCheck, FaTrash, FaEnvelope } from 'react-icons/fa';
import type { User } from '@/types/user';

export type UserListItem = Pick<
  User,
  | 'id'
  | 'name'
  | 'email'
  | 'userCode'
  | 'status'
  | 'verificationStatus'
  | 'accreditationStatus'
  | 'createdAt'
  | 'lastLoginAt'
>;

type UserListResponse = {
  items: UserListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};


export default function UserManagementPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<UserListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
    const fetchUsers = async () => {
        try {
        setLoading(true);

        const res = await fetch(
            `/api/user?page=${page}&limit=10&search=${searchQuery}`
        );

        if (!res.ok) throw new Error('Failed to fetch users');

        const data: UserListResponse = await res.json();

        setUsers(data.items);
        setTotalPages(data.pagination.totalPages);
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    fetchUsers();
    }, [page, searchQuery]);

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

    const getUserStatusLabel = (status: number) => {
        switch (status) {
            case 1:
                return 'Active';
            case 0:
                return 'Inactive';
            case -1:
                return 'Rejected';
            default:
                return 'Unknown';
        }
    };

    const getKycLabel = (verificationStatus: number) => {
        return verificationStatus === 1 ? 'Verified' : 'Pending';
    };

    const getAccreditationLabel = (status: string) => {
        // individual | approved | pending | rejected
        switch (status) {
            case 'approved':
                return 'Approved';
            case 'pending':
                return 'Pending';
            case 'rejected':
                return 'Rejected';
            default:
                return 'Individual';
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
                        {
                        users.map((user, idx) => {
                            const userStatus = getUserStatusLabel(user.status);
                            const kycStatus = getKycLabel(user.verificationStatus);
                            const accreditationStatus = getAccreditationLabel(
                                user.accreditationStatus
                            );

                            return (
                                <tr key={user.id} className="hover:bg-mogul-gold/5 transition-colors">
                                <td className="p-4 font-mono text-xs text-mogul-gold opacity-80">
                                    {user.userCode ?? `${user.id}`}
                                </td>

                                <td className="p-4 font-bold text-white">
                                    {user.name ?? '—'}
                                </td>

                                <td className="p-4 text-gray-400">
                                    {user.email}
                                </td>

                                {/* STATUS */}
                                <td className="p-4">
                                    <span
                                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(
                                        userStatus
                                    )}`}
                                    >
                                    {userStatus}
                                    </span>
                                </td>

                                {/* KYC */}
                                <td className="p-4">
                                    <span
                                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(
                                        kycStatus
                                    )}`}
                                    >
                                    {kycStatus}
                                    </span>
                                </td>

                                {/* ACCREDITATION */}
                                <td className="p-4">
                                    <span
                                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(
                                        accreditationStatus
                                    )}`}
                                    >
                                    {accreditationStatus}
                                    </span>
                                </td>

                                <td className="p-4 text-gray-500 font-mono text-xs">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>

                                <td className="p-4 text-gray-500 font-mono text-xs">
                                    {user.lastLoginAt
                                    ? new Date(user.lastLoginAt).toLocaleDateString()
                                    : '—'}
                                </td>

                                {/* ACTIONS */}
                                <td className="p-4">
                                    <div className="flex gap-2">
                                    <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all">
                                        <FaEye />
                                    </button>

                                    <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-all">
                                        <FaEdit />
                                    </button>

                                    {kycStatus === 'Pending' ||
                                    accreditationStatus === 'Pending' ? (
                                        <button className="p-2 text-green-400 hover:bg-green-400/10 rounded transition-all">
                                        <FaCheck />
                                        </button>
                                    ) : (
                                        <button className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded transition-all">
                                        <FaEnvelope />
                                        </button>
                                    )}

                                    {userStatus === 'Inactive' ? (
                                        <button className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-all">
                                        <FaTrash />
                                        </button>
                                    ) : (
                                        <button className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-all">
                                        <FaBan />
                                        </button>
                                    )}
                                    </div>
                                </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    );
}
