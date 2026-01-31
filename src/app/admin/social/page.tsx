'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaPlus, FaEye, FaChartLine, FaCheck, FaTimes } from 'react-icons/fa';

export default function SocialMediaPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const channels = [
        { name: 'LinkedIn Company Page', handle: '@mogulstrategies', icon: <FaLinkedin />, status: 'Connected', type: 'connected' },
        { name: 'Twitter / X', handle: '@Mogul_Strategies', icon: <FaTwitter />, status: 'Connected', type: 'connected' },
        { name: 'Facebook Page', handle: 'Mogul Strategies', icon: <FaFacebook />, status: 'Connected', type: 'connected' },
        { name: 'Instagram', handle: '@mogulstrategies', icon: <FaInstagram />, status: 'Not Connected', type: 'disconnected' },
        { name: 'YouTube', handle: 'Mogul Strategies', icon: <FaYoutube />, status: 'Not Connected', type: 'disconnected' },
    ];

    const announcements = [
        {
            date: 'Dec 24, 2025',
            content: 'Q4 Investor Letter now available...',
            platforms: ['LinkedIn', 'Twitter'],
            reach: '42,100',
            engagement: '3,210',
            status: 'Published'
        },
        {
            date: 'Dec 20, 2025',
            content: 'New Capital Call Issued – Real Estate Fund',
            platforms: ['LinkedIn'],
            reach: '28,400',
            engagement: '1,890',
            status: 'Published'
        },
        {
            date: 'Dec 15, 2025',
            content: 'Upcoming Webinar: 2026 Market Outlook',
            platforms: ['LinkedIn', 'Twitter', 'Facebook'],
            reach: '68,200',
            engagement: '5,420',
            status: 'Published'
        }
    ];

    const getPlatformIcon = (name: string) => {
        switch (name) {
            case 'LinkedIn': return <FaLinkedin />;
            case 'Twitter': return <FaTwitter />;
            case 'Facebook': return <FaFacebook />;
            default: return null;
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>Social Media Announcements</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search announcements..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full xl:max-w-xl"
                />
                <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-gold whitespace-nowrap">
                    <FaPlus /> Create New Announcement
                </button>
            </div>

            {/* Global Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                    { val: '142', label: 'Total Posts' },
                    { val: '5', label: 'Connected Channels' },
                    { val: '1.2M', label: 'Total Reach' },
                    { val: '48.2K', label: 'Total Engagements' },
                ].map((stat, i) => (
                    <div key={i} className="bg-mogul-darker p-4 rounded-xl border border-mogul-gold/10 text-center animate-pulse-glow">
                        <div className="text-2xl font-display font-bold text-mogul-gold">{stat.val}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Connected Channels Grid */}
            <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow mb-10">
                <h3 className="text-xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/10 pb-4">Connected Social Channels</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {channels.map((channel, i) => (
                        <div key={i} className={`bg-black/30 p-6 rounded-xl border-2 text-center transition-all ${channel.type === 'connected' ? 'border-mogul-gold' : 'border-transparent hover:border-gray-600'}`}>
                            <div className="text-4xl text-mogul-gold mb-4 flex justify-center">{channel.icon}</div>
                            <h4 className="font-bold text-white mb-1">{channel.name}</h4>
                            <p className="text-xs text-gray-400 mb-4">{channel.handle}</p>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide inline-block ${channel.type === 'connected' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {channel.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Announcements Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow overflow-x-auto">
                <h2 className="text-xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/10 pb-4">Announcement History</h2>
                <table className="w-full min-w-[800px] text-sm">
                    <thead>
                        <tr className="bg-mogul-gold/10 text-mogul-gold text-xs uppercase tracking-widest text-left">
                            <th className="p-4 rounded-tl-lg">Date</th>
                            <th className="p-4">Content Preview</th>
                            <th className="p-4">Platforms</th>
                            <th className="p-4">Reach</th>
                            <th className="p-4">Engagements</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-mogul-gold/5">
                        {announcements.map((item, idx) => (
                            <tr key={idx} className="hover:bg-mogul-gold/5 transition-colors">
                                <td className="p-4 font-mono text-xs text-gray-400">{item.date}</td>
                                <td className="p-4 font-bold text-white truncate max-w-xs">{item.content}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        {item.platforms.map((p, i) => (
                                            <span key={i} className="bg-mogul-gold/10 text-mogul-gold p-1.5 rounded-lg text-xs" title={p}>
                                                {getPlatformIcon(p)}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-4 font-mono text-gray-300">{item.reach}</td>
                                <td className="p-4 font-mono text-gray-300">{item.engagement}</td>
                                <td className="p-4">
                                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all"><FaEye /></button>
                                    <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-all"><FaChartLine /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
