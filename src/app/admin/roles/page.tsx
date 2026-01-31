'use client';

import PageTitle from '@/components/admin/PageTitle';
import StatusBadge from '@/components/admin/StatusBadge';
import { useState } from 'react';
import { FaUserPlus, FaLock, FaUsersCog, FaShieldAlt, FaPlus, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

export default function RolesPermissionsPage() {
    const [selectedRole, setSelectedRole] = useState('super-admin');

    const roles = [
        { id: 'super-admin', name: 'Super Administrator', desc: 'Full access to all features and settings' },
        { id: 'compliance', name: 'Compliance Officer', desc: 'KYC, accreditation, AML, audit logs' },
        { id: 'ir', name: 'Investor Relations', desc: 'Messaging, events, document distribution' },
        { id: 'fund-manager', name: 'Fund Manager', desc: 'Offerings, capital calls, performance reporting' },
        { id: 'marketing', name: 'Marketing', desc: 'Traffic analytics, newsletters, events' },
        { id: 'support', name: 'Support', desc: 'Read-only access + messaging' },
    ];

    const permissions = {
        'super-admin': {
            userManagement: { view: true, edit: true, delete: true },
            kyc: { review: true, approve: true },
            content: { create: true, send: true, events: true },
            finance: { call: true, distribute: true },
            system: { roles: true, audit: true, settings: true },
        },
        'compliance': {
            userManagement: { view: true, edit: false, delete: false },
            kyc: { review: true, approve: true },
            content: { create: false, send: false, events: false },
            finance: { call: false, distribute: false },
            system: { roles: false, audit: true, settings: false },
        },
        // ... defaults for others would be defined here or handled dynamically
    };

    // Helper to get permission state (mocked for now based on simple logic)
    const getPerm = (roleId: string, category: string, action: string) => {
        if (roleId === 'super-admin') return true;
        if (roleId === 'compliance' && (category === 'kyc' || action === 'audit')) return true;
        if (roleId === 'ir' && category === 'content') return true;
        return false;
    };

    return (
        <div className="pb-20">
            <PageTitle>Role-Based Access Control</PageTitle>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Roles List Sidebar */}
                <div className="lg:col-span-4 bg-mogul-darker rounded-2xl p-6 border border-mogul-gold/10 animate-pulse-glow h-fit">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-mogul-gold/10">
                        <h3 className="text-xl font-display font-bold text-mogul-gold">Admin Roles</h3>
                        <button className="text-sm bg-mogul-gold text-mogul-dark px-3 py-1.5 rounded-lg font-bold hover:bg-white transition-all"><FaPlus /></button>
                    </div>
                    <div className="space-y-3">
                        {roles.map(role => (
                            <div
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className={`p-4 rounded-xl cursor-pointer transition-all border-l-4 ${selectedRole === role.id ? 'bg-mogul-gold/10 border-l-mogul-gold' : 'bg-black/20 border-l-transparent hover:bg-white/5'}`}
                            >
                                <div className="font-bold text-white mb-1">{role.name}</div>
                                <div className="text-xs text-gray-400">{role.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Permissions Panel */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow">
                        <div className="flex items-center gap-3 mb-8 border-b border-mogul-gold/20 pb-4">
                            <FaLock className="text-mogul-gold text-2xl" />
                            <h3 className="text-2xl font-display font-bold text-white">
                                Permissions: <span className="text-mogul-gold">{roles.find(r => r.id === selectedRole)?.name}</span>
                            </h3>
                        </div>

                        <div className="space-y-8">
                            {/* User Management */}
                            <div>
                                <h4 className="text-lg font-bold text-mogul-gold mb-4 border-b border-mogul-gold/10 pb-2">User Management</h4>
                                <div className="space-y-3">
                                    {['View Users', 'Edit Users', 'Suspend / Delete Users'].map((label, i) => (
                                        <div key={i} className="flex justify-between items-center py-2">
                                            <span className="text-gray-300">{label}</span>
                                            <label className="relative inline-block w-12 h-6">
                                                <input type="checkbox" className="sr-only peer" checked={getPerm(selectedRole, 'userManagement', 'view')} readOnly />
                                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-mogul-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mogul-gold"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* KYC & Accreditation */}
                            <div>
                                <h4 className="text-lg font-bold text-mogul-gold mb-4 border-b border-mogul-gold/10 pb-2">KYC & Accreditation</h4>
                                <div className="space-y-3">
                                    {['Review Submissions', 'Approve / Reject'].map((label, i) => (
                                        <div key={i} className="flex justify-between items-center py-2">
                                            <span className="text-gray-300">{label}</span>
                                            <label className="relative inline-block w-12 h-6">
                                                <input type="checkbox" className="sr-only peer" checked={getPerm(selectedRole, 'kyc', 'approve')} readOnly />
                                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-mogul-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mogul-gold"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* System Admin */}
                            <div>
                                <h4 className="text-lg font-bold text-mogul-gold mb-4 border-b border-mogul-gold/10 pb-2">System Administration</h4>
                                <div className="space-y-3">
                                    {['Manage Roles', 'View Audit Logs', 'System Settings'].map((label, i) => (
                                        <div key={i} className="flex justify-between items-center py-2">
                                            <span className="text-gray-300">{label}</span>
                                            <label className="relative inline-block w-12 h-6">
                                                <input type="checkbox" className="sr-only peer" checked={getPerm(selectedRole, 'system', 'settings')} readOnly />
                                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-mogul-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mogul-gold"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6">
                                <button className="px-6 py-3 bg-mogul-gold text-mogul-dark rounded-xl font-bold hover:bg-white transition-all shadow-gold">Save Permission Changes</button>
                            </div>
                        </div>
                    </div>

                    {/* Approval Workflows */}
                    <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow">
                        <div className="flex items-center gap-3 mb-8 border-b border-mogul-gold/20 pb-4">
                            <FaShieldAlt className="text-mogul-gold text-2xl" />
                            <h3 className="text-2xl font-display font-bold text-white">Approval Workflows</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { action: 'KYC/Accreditation Final Approval', approvers: 'Compliance Officer + Super Admin' },
                                { action: 'Capital Call Issuance', approvers: 'Fund Manager + Compliance' },
                                { action: 'Distribution Processing', approvers: 'Finance + Super Admin' },
                                { action: 'User Suspension / Deletion', approvers: 'Super Admin' },
                            ].map((workflow, idx) => (
                                <div key={idx} className="bg-black/30 p-5 rounded-xl border border-mogul-gold/5 flex flex-col justify-between">
                                    <div>
                                        <div className="font-bold text-white mb-2">{workflow.action}</div>
                                        <div className="text-xs text-gray-400 mb-3">{workflow.approvers}</div>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-green-400 uppercase font-bold tracking-wider">
                                        <FaCheck /> Active Policy
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-6 flex items-center gap-2 text-sm text-mogul-gold border border-mogul-gold/30 px-4 py-2 rounded-lg hover:bg-mogul-gold/10 transition-all font-bold">
                            <FaPlus /> Configure New Workflow
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
