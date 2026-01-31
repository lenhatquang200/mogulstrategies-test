'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaPhone, FaSms, FaRobot, FaUser, FaClock, FaCheck, FaPlay, FaPause, FaChartBar, FaEdit, FaPlus, FaPhoneVolume } from 'react-icons/fa';

export default function CampaignManagerPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const campaigns = [
        {
            id: 'c-1',
            title: 'Q4 Accredited Investor Outreach',
            status: 'Active',
            type: 'Voice AI Outbound',
            phone: '+1 (555) 421-8921',
            script: 'SimpleTalkAI – Warm Introduction & Qualification',
            target: '5,248 leads (LinkedIn sourced)',
            schedule: 'Mon–Fri, 9AM–6PM EST',
            stats: [
                { icon: <FaPhone />, label: 'Calls', value: '8,421' },
                { icon: <FaCheck />, label: 'Connected', value: '2,156' },
                { icon: <FaClock />, label: 'Avg Dur', value: '4:28' },
                { icon: <FaUser />, label: 'Qualified', value: '248' },
            ]
        },
        {
            id: 'c-2',
            title: 'Inbound Investor Support Line',
            status: 'Active',
            type: 'Voice AI Inbound',
            phone: '+1 (855) MOGUL-AI',
            script: 'SimpleTalkAI – Support & Qualification',
            target: 'Inbound Callers',
            schedule: '24/7 with escalation',
            stats: [
                { icon: <FaPhoneVolume />, label: 'Inbound', value: '3,245' },
                { icon: <FaRobot />, label: 'AI Handled', value: '2,891' },
                { icon: <FaUser />, label: 'Escalated', value: '354' },
                { icon: <FaCheck />, label: 'Generic', value: '4.8/5' }, // Satisfaction
            ]
        },
        {
            id: 'c-3',
            title: 'Capital Call Reminder Series',
            status: 'Active',
            type: 'SMS + Voice Follow-up',
            phone: '+1 (555) 888-1234',
            script: 'Reminder + link to portal',
            target: 'Real Estate Fund Investors',
            schedule: 'Trigger based',
            stats: [
                { icon: <FaSms />, label: 'SMS Sent', value: '428' },
                { icon: <FaPhone />, label: 'Voice Calls', value: '156' },
                { icon: <FaCheck />, label: 'Responded', value: '89%' },
                { icon: <FaChartBar />, label: 'Collected', value: '$42M' },
            ]
        },
        {
            id: 'c-4',
            title: 'Webinar Follow-Up Sequence',
            status: 'Completed',
            type: 'SMS Campaign',
            phone: '+1 (555) 777-5678',
            script: 'Recording link + next steps',
            target: 'Webinar Attendees',
            schedule: 'Finished',
            stats: [
                { icon: <FaSms />, label: 'SMS Sent', value: '612' },
                { icon: <FaEye />, label: 'Opened', value: '489' },
                { icon: <FaLink />, label: 'Clicks', value: '312' },
            ]
        }
    ];

    // Helper for icons used in stats
    function FaEye(props: any) { return <FaCheck {...props} />; } // Placeholder replacement
    function FaLink(props: any) { return <FaCheck {...props} />; } // Placeholder replacement

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>Voice & SMS Campaign Manager</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full xl:max-w-xl"
                />
                <div className="flex flex-wrap gap-4 w-full xl:w-auto">
                    <select className="bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-mogul-gold transition-all">
                        <option>All Campaigns</option>
                        <option>Voice AI Outbound</option>
                        <option>Voice AI Inbound</option>
                        <option>SMS Campaigns</option>
                        <option>Active</option>
                        <option>Paused</option>
                        <option>Completed</option>
                    </select>
                    <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-gold whitespace-nowrap">
                        <FaPlus /> Create New Campaign
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
                {[
                    { val: '18', label: 'Active Campaigns' },
                    { val: '24,821', label: 'Total Calls' },
                    { val: '68.4%', label: 'Connection Rate' },
                    { val: '4:12', label: 'Avg Duration' },
                    { val: '142k', label: 'SMS Sent' },
                    { val: '94.2%', label: 'Delivery Rate' },
                ].map((stat, i) => (
                    <div key={i} className="bg-mogul-darker p-4 rounded-xl border border-mogul-gold/10 text-center animate-pulse-glow">
                        <div className="text-2xl font-display font-bold text-mogul-gold">{stat.val}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Campaigns Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow hover:-translate-y-2 transition-transform duration-300">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-display font-bold text-mogul-gold mb-1">{campaign.title}</h3>
                                <div className="text-sm text-gray-400 font-bold">{campaign.type}</div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusStyle(campaign.status)}`}>
                                {campaign.status}
                            </span>
                        </div>

                        {/* Details */}
                        <div className="space-y-3 mb-8 text-sm text-gray-300">
                            <p><strong className="text-white">Phone:</strong> <span className="font-mono text-mogul-gold ml-2">{campaign.phone}</span></p>
                            <p><strong className="text-white">Script:</strong> <span className="ml-2">{campaign.script}</span></p>
                            <p><strong className="text-white">Target:</strong> <span className="ml-2">{campaign.target}</span></p>
                            <p><strong className="text-white">Schedule:</strong> <span className="ml-2">{campaign.schedule}</span></p>
                        </div>

                        {/* Campaign Meta Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {campaign.stats.map((stat, idx) => (
                                <div key={idx} className="flex flex-col items-center bg-black/20 p-3 rounded-lg border border-mogul-gold/5">
                                    <div className="text-mogul-gold text-lg mb-1">{stat.icon}</div>
                                    <div className="text-white font-bold">{stat.value}</div>
                                    <div className="text-[10px] text-gray-500 uppercase">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button className="flex items-center justify-center gap-2 p-3 text-xs font-bold text-mogul-gold border border-mogul-gold/30 rounded-xl hover:bg-mogul-gold hover:text-black transition-all">
                                <FaEdit /> Edit
                            </button>
                            <button className="flex items-center justify-center gap-2 p-3 text-xs font-bold text-mogul-gold border border-mogul-gold/30 rounded-xl hover:bg-mogul-gold hover:text-black transition-all">
                                Logs
                            </button>
                            <button className="md:col-span-2 flex items-center justify-center gap-2 p-3 text-xs font-bold bg-mogul-gold text-mogul-dark rounded-xl hover:bg-white transition-all shadow-gold">
                                <FaChartBar /> Analytics Dashboard
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
