'use client';

import PageTitle from '@/components/admin/PageTitle';
import { useEffect, useState } from 'react';
import DashboardStats from './dashboard/components/DashboardStats';
import ActivityLogTable from './dashboard/components/ActivityLogTable';

export default function AdminDashboardPage() {
    return (
        <div className="pb-20">
            <PageTitle>Admin Portal Dashboard</PageTitle>
            
            {/* Platform Overview Stats */}
            <DashboardStats />

            {/* Main Action Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 py-2">
                {/* Pending Actions */}
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 pb-3 border-b border-mogul-gold/30">
                        Pending Actions
                    </h3>
                    <ul className="space-y-4">
                        {[
                            { label: 'KYC Reviews Pending', count: 12 },
                            { label: 'Accreditation Submissions', count: 8 },
                            { label: 'Capital Call Responses', count: 23 },
                            { label: 'Support Tickets', count: 5 },
                            { label: 'Document Approvals', count: 3 },
                        ].map((item, idx) => (
                            <li key={idx} className="flex justify-between items-center py-3 border-b border-mogul-gold/20 last:border-0">
                                <span className="text-gray-300">{item.label}</span>
                                <span className="text-mogul-gold font-bold text-lg">{item.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* System Status */}
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 pb-3 border-b border-mogul-gold/30">
                        System Status
                    </h3>
                    <ul className="space-y-4">
                        {[
                            { label: 'Portal Status', value: 'Online', color: 'text-cyan-400' },
                            { label: 'Database Connection', value: 'Healthy', color: 'text-cyan-400' },
                            { label: 'Email Service', value: 'Active', color: 'text-cyan-400' },
                            { label: 'API Latency', value: '24ms', color: 'text-cyan-400' },
                            { label: 'Last Backup', value: '2 hours ago', color: 'text-gray-400' },
                        ].map((item, idx) => (
                            <li key={idx} className="flex justify-between items-center py-3 border-b border-mogul-gold/20 last:border-0">
                                <span className="text-gray-300">{item.label}</span>
                                <span className={`font-bold ${item.color}`}>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Recent Activity Log */}
            <ActivityLogTable />

        </div>
    );
}


