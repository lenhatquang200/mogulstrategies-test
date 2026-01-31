'use client';

import PageTitle from '@/components/admin/PageTitle';
import StatCard from '@/components/admin/StatCard';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaPlus, FaPalette, FaEye, FaChartBar, FaTimes, FaSave, FaPaperPlane, FaClock } from 'react-icons/fa';

export default function NewsletterManagementPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [isTemplateOpen, setIsTemplateOpen] = useState(false);

    const newsletterHistory = [
        { title: 'Q4 2025 Investor Update', date: 'Dec 20, 2025', recipients: 842, opens: '72.7%', clicks: '18.5%', replies: 24, polls: '37.1%' },
        { title: 'November Performance Report', date: 'Nov 30, 2025', recipients: 835, opens: '70.5%', clicks: '17.0%', replies: 18, polls: '—' },
        { title: 'New Syndication Announcement', date: 'Nov 15, 2025', recipients: 828, opens: '73.9%', clicks: '22.8%', replies: 31, polls: '51.3%' },
        { title: 'Q3 2025 Distribution Notice', date: 'Sep 30, 2025', recipients: 812, opens: '71.2%', clicks: '12.1%', replies: 12, polls: '—' },
    ];

    return (
        <div className="pb-20 relative">
            <PageTitle>Newsletter Management</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search newsletters..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full lg:max-w-md"
                />
                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    <button
                        onClick={() => setIsComposeOpen(true)}
                        className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-lg font-bold hover:bg-white transition-all shadow-gold"
                    >
                        <FaPlus size={14} /> Compose New
                    </button>
                    <button
                        onClick={() => setIsTemplateOpen(true)}
                        className="flex items-center gap-2 bg-mogul-darker text-mogul-gold border border-mogul-gold/30 px-6 py-3 rounded-lg font-bold hover:bg-mogul-gold hover:text-mogul-dark transition-all"
                    >
                        <FaPalette size={14} /> Manage Templates
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard value="48" label="Newsletters Sent" />
                <StatCard value="842" label="Avg Recipients" />
                <StatCard value="68.4%" label="Avg Open Rate" />
                <StatCard value="12.1%" label="Avg Click Rate" />
            </div>

            {/* History Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow overflow-x-auto border border-mogul-gold/10">
                <h2 className="text-2xl font-display font-bold text-mogul-gold mb-8 text-center uppercase tracking-widest">History & Analytics</h2>
                <table className="w-full min-w-[1000px]">
                    <thead>
                        <tr className="bg-mogul-gold/10 text-mogul-gold text-xs uppercase tracking-widest">
                            <th className="p-4 text-left border-b border-mogul-gold/20">Newsletter Title</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Sent Date</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Recipients</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Opens</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Clicks</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Replies</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Polls</th>
                            <th className="p-4 text-left border-b border-mogul-gold/20">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsletterHistory.map((item, idx) => (
                            <tr key={idx} className="border-b border-mogul-gold/10 hover:bg-mogul-gold/5 transition-colors text-sm">
                                <td className="p-4 font-bold text-white">{item.title}</td>
                                <td className="p-4 text-gray-400 font-mono text-xs">{item.date}</td>
                                <td className="p-4 text-white">{item.recipients}</td>
                                <td className="p-4 text-green-400 font-bold">{item.opens}</td>
                                <td className="p-4 text-cyan-400">{item.clicks}</td>
                                <td className="p-4 text-white">{item.replies}</td>
                                <td className="p-4 text-gray-500">{item.polls}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 border border-mogul-gold text-mogul-gold rounded hover:bg-mogul-gold hover:text-mogul-dark transition-all" title="View">
                                            <FaEye size={12} />
                                        </button>
                                        <button className="p-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-mogul-dark transition-all" title="Analytics">
                                            <FaChartBar size={12} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Compose Modal */}
            {isComposeOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-mogul-darker w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-mogul-gold/20 p-8 relative animate-pulse-glow">
                        <button
                            onClick={() => setIsComposeOpen(false)}
                            className="absolute top-6 right-6 text-gray-500 hover:text-mogul-gold transition-colors"
                        >
                            <FaTimes size={24} />
                        </button>
                        <h2 className="text-3xl font-display font-bold text-mogul-gold mb-10 text-center">Compose Newsletter</h2>

                        <form className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Subject Line *</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-mogul-gold/20 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-mogul-gold transition-all"
                                    placeholder="e.g., Q4 2025 Market Commentary"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-300 ml-1">Newsletter Content</label>
                                <textarea
                                    className="w-full bg-black/50 border border-mogul-gold/20 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-mogul-gold transition-all min-h-[300px]"
                                    placeholder="supports full markdown or HTML rich formatting..."
                                />
                            </div>

                            <div className="flex flex-wrap gap-4 justify-end pt-6 border-t border-mogul-gold/10">
                                <button type="button" onClick={() => setIsComposeOpen(false)} className="px-8 py-4 border border-mogul-gold text-mogul-gold rounded-xl font-bold hover:bg-mogul-gold/10 transition-all">
                                    Cancel
                                </button>
                                <button type="button" className="px-8 py-4 bg-mogul-darker border border-mogul-gold/30 text-mogul-gold rounded-xl font-bold hover:bg-mogul-gold/10 transition-all">
                                    <FaSave className="inline mr-2" /> Save Draft
                                </button>
                                <button type="button" className="px-8 py-4 bg-mogul-gold text-mogul-dark rounded-xl font-bold hover:bg-white shadow-gold transition-all">
                                    <FaPaperPlane className="inline mr-2" /> Send Now
                                </button>
                                <button type="button" className="px-8 py-4 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-500 transition-all">
                                    <FaClock className="inline mr-2" /> Schedule
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
