'use client';

import PageTitle from '@/components/admin/PageTitle';
import StatCard from '@/components/admin/StatCard';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaPlus, FaPhone, FaEnvelope, FaCheckCircle, FaTag, FaStar } from 'react-icons/fa';

export default function ContactListsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const contactLists = [
        {
            title: 'LinkedIn Accredited Investors Q4',
            count: '5,248 contacts',
            source: 'LinkedIn Sales Navigator Export',
            created: 'Dec 1, 2025',
            lastUsed: 'Dec 20, 2025 (Voice Campaign)',
            meta: [
                { icon: FaPhone, text: '5,102 valid phones' },
                { icon: FaEnvelope, text: '5,248 emails' },
                { icon: FaCheckCircle, text: 'DNC scrubbed' },
            ]
        },
        {
            title: 'Real Estate Fund Investors',
            count: '428 contacts',
            source: 'Internal CRM',
            created: 'Jan 15, 2023',
            lastUsed: 'Dec 10, 2025 (Capital Call)',
            meta: [
                { icon: FaPhone, text: '428 valid phones' },
                { icon: FaEnvelope, text: '428 emails' },
                { icon: FaTag, text: 'Tagged: High Value' },
            ]
        },
        {
            title: 'Webinar Attendees – Digital Assets',
            count: '612 contacts',
            source: 'Webinar Registration',
            created: 'Nov 18, 2025',
            lastUsed: 'Nov 20, 2025 (Follow-up SMS)',
            meta: [
                { icon: FaPhone, text: '589 valid phones' },
                { icon: FaEnvelope, text: '612 emails' },
                { icon: FaStar, text: 'Hot Leads', color: 'text-orange-400' },
            ]
        },
        {
            title: 'Family Office Network',
            count: '156 contacts',
            source: 'Manual Entry + Referrals',
            created: 'Mar 10, 2025',
            lastUsed: 'Oct 15, 2025',
            meta: [
                { icon: FaPhone, text: '156 valid phones' },
                { icon: FaEnvelope, text: '156 emails' },
                { icon: FaStar, text: 'VIP Tier', color: 'text-mogul-gold' },
            ]
        }
    ];

    return (
        <div className="pb-20">
            <PageTitle>Contact Lists</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <SearchBar
                    placeholder="Search contact lists..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full md:max-w-md"
                />
                <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors">
                    <FaPlus size={14} /> Create New List
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard value="24" label="Total Lists" />
                <StatCard value="18,421" label="Total Contacts" />
                <StatCard value="98.2%" label="Valid Phone Numbers" />
                <StatCard value="6" label="Lists Used This Month" />
            </div>

            {/* Contact Lists Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {contactLists.map((list, idx) => (
                    <div key={idx} className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow flex flex-col hover:transform hover:-translate-y-2 transition-all duration-300 border border-mogul-gold/10">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-display font-bold text-mogul-gold max-w-[70%]">
                                {list.title}
                            </h3>
                            <span className="text-sm font-medium text-gray-400 bg-black/30 px-3 py-1 rounded">
                                {list.count}
                            </span>
                        </div>

                        <div className="space-y-3 mb-8 flex-1">
                            <p className="text-sm text-gray-300">
                                <span className="text-mogul-gold/60 font-medium">Source:</span> {list.source}
                            </p>
                            <p className="text-sm text-gray-300">
                                <span className="text-mogul-gold/60 font-medium">Created:</span> {list.created}
                            </p>
                            <p className="text-sm text-gray-300">
                                <span className="text-mogul-gold/60 font-medium">Last Used:</span> {list.lastUsed}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-mogul-gold/10">
                                {list.meta.map((item, mIdx) => (
                                    <div key={mIdx} className={`flex items-center gap-3 text-xs ${item.color || 'text-gray-400'}`}>
                                        <item.icon className={item.color || 'text-mogul-gold'} />
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <button className="py-3 px-4 bg-transparent border border-mogul-gold text-mogul-gold rounded-lg font-bold hover:bg-mogul-gold hover:text-mogul-dark transition-all text-xs">
                                View Contacts
                            </button>
                            <button className="py-3 px-4 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-all text-xs">
                                Export List
                            </button>
                            <button className="py-3 px-4 bg-transparent border border-mogul-gold/30 text-gray-400 rounded-lg hover:bg-mogul-gold hover:text-mogul-dark hover:border-mogul-gold transition-all text-xs">
                                Add Contacts
                            </button>
                            <button className="py-3 px-4 bg-transparent border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-all text-xs">
                                Delete List
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
