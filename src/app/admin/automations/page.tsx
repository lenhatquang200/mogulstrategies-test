'use client';

import PageTitle from '@/components/admin/PageTitle';
import StatCard from '@/components/admin/StatCard';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaPlus, FaChartLine } from 'react-icons/fa';

export default function AutomationsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const automations = [
        {
            title: 'New User Registration Flow',
            status: 'Active',
            triggers: [
                'User registers on portal',
                'User clicks "Start KYC"'
            ],
            actions: [
                'Send welcome email',
                'Assign relationship manager',
                'Start KYC workflow',
                'Notify admin team'
            ]
        },
        {
            title: 'Capital Call Response Automation',
            status: 'Active',
            triggers: [
                'Investor confirms wire transfer',
                'Wire received in escrow'
            ],
            actions: [
                'Update investor commitment status',
                'Send confirmation email',
                'Generate updated cap table',
                'Notify fund manager'
            ]
        },
        {
            title: 'KYC Completion Follow-up',
            status: 'Active',
            triggers: [
                'KYC started but not completed in 7 days',
                'KYC pending documents > 5 days'
            ],
            actions: [
                'Send reminder email',
                'SMS reminder (day 10)',
                'Notify relationship manager'
            ]
        },
        {
            title: 'Distribution Notification Flow',
            status: 'Active',
            triggers: [
                'Distribution posted to portal'
            ],
            actions: [
                'Send distribution notice email',
                'Update investor statements',
                'Trigger tax document preparation'
            ]
        }
    ];

    return (
        <div className="pb-20">
            <PageTitle>Waterfall Automation & Workflow</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <SearchBar
                    placeholder="Search automations..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full md:max-w-md"
                />
                <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors">
                    <FaPlus size={14} /> Create New Automation
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard value="18" label="Active Automations" />
                <StatCard value="1,842" label="Triggers This Month" />
                <StatCard value="98.2%" label="Success Rate" />
                <StatCard value="6" label="In Draft" />
            </div>

            {/* Active Automations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {automations.map((automation, idx) => (
                    <div key={idx} className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow flex flex-col h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-display font-bold text-mogul-gold">
                                {automation.title}
                            </h3>
                            <span className="px-4 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                                {automation.status}
                            </span>
                        </div>

                        <div className="flex-1">
                            <div className="mb-6">
                                <strong className="text-mogul-gold text-sm uppercase tracking-wider block mb-3">Triggers:</strong>
                                <ul className="space-y-2">
                                    {automation.triggers.map((trigger, tIdx) => (
                                        <li key={tIdx} className="flex items-center gap-3 text-gray-300 py-2 border-b border-mogul-gold/10 last:border-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-mogul-gold"></span>
                                            {trigger}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-8">
                                <strong className="text-mogul-gold text-sm uppercase tracking-wider block mb-3">Actions:</strong>
                                <ul className="space-y-2">
                                    {automation.actions.map((action, aIdx) => (
                                        <li key={aIdx} className="flex items-center gap-3 text-gray-300 py-2 border-b border-mogul-gold/10 last:border-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                            {action}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-auto pt-6 border-t border-mogul-gold/20">
                            <button className="px-4 py-2 border border-mogul-gold text-mogul-gold rounded-lg hover:bg-mogul-gold hover:text-mogul-dark transition-all">
                                Edit
                            </button>
                            <button className="px-4 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-mogul-dark transition-all">
                                Deactivate
                            </button>
                            <button className="px-4 py-2 flex items-center gap-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-500 hover:text-white transition-all">
                                <FaChartLine size={12} /> Stats
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Workflow Diagram Placeholder */}
            <div className="bg-mogul-darker rounded-2xl p-10 animate-pulse-glow text-center">
                <h3 className="text-2xl font-display font-bold text-mogul-gold mb-8">Investor Journey Workflow Overview</h3>
                <div className="bg-black/40 rounded-xl p-12 border border-mogul-gold/20 min-h-[300px] flex items-center justify-center">
                    <div className="text-gray-500 max-w-2xl leading-relaxed">
                        <p className="text-xl mb-4 font-display">Interactive Workflow Visualization</p>
                        <p className="text-sm uppercase tracking-widest text-mogul-gold/60">
                            Registration → KYC Start → Document Upload → Accreditation → Approval → First Investment → Ongoing Engagement
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
