'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash, FaList, FaBell } from 'react-icons/fa';

export default function NotificationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    const notifications = [
        {
            title: 'Q4 2025 Distribution Posted',
            message: 'Distribution of $18.42M has been posted to investor accounts. Statements available in portal.',
            meta: 'Sent to: All Investors • Dec 20, 2025 16:45 EST • Delivery: 842/842 (100%) • Opens: 612 (73%)',
            type: 'System'
        },
        {
            title: 'New Capital Call – Real Estate Fund Tranche 3',
            message: 'Capital call issued for $75M. Due January 15, 2026. Please review details and respond.',
            meta: 'Sent to: Real Estate Fund Investors • Dec 10, 2025 10:00 EST • Delivery: 312/312 (100%) • Responses: 212 (68%)',
            type: 'Investor Alert'
        },
        {
            title: 'Q4 2025 Investor Letter Published',
            message: 'Latest commentary and performance overview now available in Documents & Reports.',
            meta: 'Sent to: All Investors • Dec 24, 2025 09:00 EST • Delivery: 842/842 (100%) • Opens: 756 (90%)',
            type: 'System'
        },
        {
            title: 'System Maintenance Scheduled',
            message: 'Portal maintenance on Dec 31, 2025 from 02:00–04:00 EST. Brief downtime expected.',
            meta: 'Scheduled for: Dec 30, 2025 12:00 EST • Target: All Users',
            type: 'System'
        }
    ];

    return (
        <div className="pb-20">
            <PageTitle>Notifications</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full xl:max-w-xl"
                />
                <div className="flex flex-wrap gap-4 w-full xl:w-auto items-center">
                    <div className="flex overflow-x-auto gap-2 pb-2 xl:pb-0">
                        {['All', 'System', 'Investor Alerts', 'Templates'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-mogul-gold text-mogul-dark' : 'bg-black/40 text-gray-400 hover:text-white border border-mogul-gold/10 hover:bg-white/5'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-gold whitespace-nowrap ml-auto xl:ml-0">
                        <FaPlus /> Create Notification
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                    { val: '1,842', label: 'Sent Today' },
                    { val: '98.2%', label: 'Delivery Rate' },
                    { val: '14', label: 'Scheduled' },
                    { val: '6', label: 'Templates' },
                ].map((stat, i) => (
                    <div key={i} className="bg-mogul-darker p-4 rounded-xl border border-mogul-gold/10 text-center animate-pulse-glow">
                        <div className="text-2xl font-display font-bold text-mogul-gold">{stat.val}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Notifications List */}
            <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow">
                <div className="space-y-6">
                    {notifications.map((notif, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row justify-between items-start border-b border-mogul-gold/10 pb-6 last:border-0 last:pb-0 group hover:bg-white/5 p-4 -mx-4 rounded-xl transition-colors">
                            <div className="flex-1 pr-4">
                                <h3 className="text-xl font-display font-bold text-mogul-gold mb-2">{notif.title}</h3>
                                <p className="text-gray-300 mb-3 text-sm">{notif.message}</p>
                                <div className="text-xs text-gray-400 font-mono">{notif.meta}</div>
                            </div>
                            <div className="flex gap-2 mt-4 md:mt-0">
                                <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all flex items-center gap-2 border border-mogul-gold/20 hover:border-mogul-gold text-sm font-bold px-4">
                                    <FaEye /> Preview
                                </button>
                                {notif.type === 'Investor Alert' && (
                                    <>
                                        <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-all flex items-center gap-2 border border-cyan-400/20 hover:border-cyan-400 text-sm font-bold px-4">
                                            <FaList /> View Responses
                                        </button>
                                        <button className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded transition-all flex items-center gap-2 border border-yellow-400/20 hover:border-yellow-400 text-sm font-bold px-4">
                                            <FaBell /> Resend Reminder
                                        </button>
                                    </>
                                )}
                                {notif.type === 'System' && (
                                    <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-all flex items-center gap-2 border border-cyan-400/20 hover:border-cyan-400 text-sm font-bold px-4">
                                        <FaEdit /> Edit Template
                                    </button>
                                )}
                                <button className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-all border border-red-400/20 hover:border-red-400 text-sm font-bold px-3">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
