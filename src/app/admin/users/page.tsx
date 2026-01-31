'use client';

import PageTitle from '@/components/admin/PageTitle';
import StatCard from '@/components/admin/StatCard';
import SearchBar from '@/components/admin/SearchBar';
import Tabs from '@/components/admin/Tabs';
import StatusBadge from '@/components/admin/StatusBadge';
import ActionButton from '@/components/admin/ActionButton';
import { useState } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash, FaBan, FaCheck } from 'react-icons/fa';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'pending';
    joinDate: string;
    lastLogin: string;
}

export default function UserManagementPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const users: User[] = [
        {
            id: 'MS-INV-4872',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Investor',
            status: 'active',
            joinDate: 'Jan 15, 2024',
            lastLogin: '2 hours ago',
        },
        {
            id: 'MS-INV-4865',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'Investor',
            status: 'active',
            joinDate: 'Feb 20, 2024',
            lastLogin: '1 day ago',
        },
        {
            id: 'MS-ADM-001',
            name: 'Admin User',
            email: 'admin@mogulstrategies.com',
            role: 'Administrator',
            status: 'active',
            joinDate: 'Jan 1, 2024',
            lastLogin: '10 minutes ago',
        },
        {
            id: 'MS-INV-4850',
            name: 'Robert Johnson',
            email: 'robert.j@example.com',
            role: 'Investor',
            status: 'pending',
            joinDate: 'Mar 10, 2024',
            lastLogin: 'Never',
        },
        {
            id: 'MS-INV-4820',
            name: 'Sarah Williams',
            email: 'sarah.w@example.com',
            role: 'Investor',
            status: 'inactive',
            joinDate: 'Dec 5, 2023',
            lastLogin: '30 days ago',
        },
    ];

    const tabs = [
        { id: 'all', label: 'All Users' },
        { id: 'active', label: 'Active' },
        { id: 'pending', label: 'Pending' },
        { id: 'inactive', label: 'Inactive' },
    ];

    return (
        <div className="pb-20">
            <PageTitle>User Management</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                <SearchBar
                    placeholder="Search by name, email, or ID..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full lg:w-96"
                />

                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                <button className="flex items-center gap-2 px-6 py-3 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-colors duration-300">
                    <FaPlus /> Add New User
                </button>
            </div>

            {/* Stats Overview */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard value="1,248" label="Total Users" />
                <StatCard value="842" label="Active Users" />
                <StatCard value="12" label="Pending Approval" />
                <StatCard value="394" label="Inactive Users" />
            </section>

            {/* Users Table */}
            <section className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] border-collapse">
                        <thead>
                            <tr className="bg-mogul-gold/10 text-mogul-gold">
                                <th className="p-4 text-left border-b border-mogul-gold/20">User ID</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Name</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Email</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Role</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Status</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Join Date</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Last Login</th>
                                <th className="p-4 text-left border-b border-mogul-gold/20">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-mogul-gold/10 hover:bg-mogul-gold/5 transition-colors">
                                    <td className="p-4 font-mono text-sm text-mogul-gold">{user.id}</td>
                                    <td className="p-4 font-medium">{user.name}</td>
                                    <td className="p-4 text-gray-400">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded text-sm ${user.role === 'Administrator'
                                                ? 'bg-purple-500/10 text-purple-400'
                                                : 'bg-blue-500/10 text-blue-400'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={user.status}>
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </StatusBadge>
                                    </td>
                                    <td className="p-4 text-gray-400">{user.joinDate}</td>
                                    <td className="p-4 text-gray-400">{user.lastLogin}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2 flex-wrap">
                                            <ActionButton variant="primary" icon={<FaEye />}>
                                                View
                                            </ActionButton>
                                            <ActionButton variant="secondary" icon={<FaEdit />}>
                                                Edit
                                            </ActionButton>
                                            {user.status === 'pending' && (
                                                <ActionButton variant="success" icon={<FaCheck />}>
                                                    Approve
                                                </ActionButton>
                                            )}
                                            {user.status === 'active' && (
                                                <ActionButton variant="warning" icon={<FaBan />}>
                                                    Suspend
                                                </ActionButton>
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
