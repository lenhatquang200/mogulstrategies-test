'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaUserPlus, FaEnvelope, FaPhone, FaStickyNote, FaUserTie, FaBuilding, FaTag, FaPlus, FaTimes } from 'react-icons/fa';

export default function InvestorCRMPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInvestorId, setSelectedInvestorId] = useState('inv-1');
    const [activeTab, setActiveTab] = useState('overview');

    const investors = [
        {
            id: 'inv-1',
            name: 'John Doe',
            meta: 'MS-INV-4872 • Active • RM: Daniel Fainman',
            tags: ['High Net Worth', 'Real Estate Focus'],
            email: 'john.doe@example.com',
            phone: '+1 (555) 123-4567',
            status: 'Active Investor',
            statusColor: 'text-green-400 bg-green-500/20',
            rm: 'Daniel Fainman',
            stats: {
                committed: '$1,240,000',
                called: '$965,000 (78%)',
                value: '$1,586,400',
                return: '+27.9%',
                lifecycle: 'Active → Since Mar 2023',
                lastInteraction: 'Dec 24, 2025 (Capital Call Confirmation)'
            }
        },
        {
            id: 'inv-2',
            name: 'Acme Investments LLC',
            meta: 'MS-INV-4901 • Active • RM: Sarah Chen',
            tags: ['Institutional', 'High Priority'],
            email: 'invest@acme.com',
            phone: '+1 (555) 987-6543',
            status: 'Active Investor',
            statusColor: 'text-green-400 bg-green-500/20',
            rm: 'Sarah Chen',
            stats: {
                committed: '$5,000,000',
                called: '$2,500,000 (50%)',
                value: '$3,100,000',
                return: '+24.0%',
                lifecycle: 'Active → Since Jan 2024',
                lastInteraction: 'Dec 20, 2025 (Quarterly Review)'
            }
        },
        {
            id: 'inv-3',
            name: 'Jane Smith',
            meta: 'MS-INV-4865 • Accredited • RM: Daniel Fainman',
            tags: ['Digital Assets'],
            email: 'jane.smith@example.com',
            phone: '+1 (555) 456-7890',
            status: 'Accredited',
            statusColor: 'text-yellow-400 bg-yellow-500/20',
            rm: 'Daniel Fainman',
            stats: {
                committed: '$0',
                called: '$0',
                value: '$0',
                return: 'N/A',
                lifecycle: 'Accredited → Since Jun 2025',
                lastInteraction: 'Nov 15, 2025 (Intro Call)'
            }
        },
        {
            id: 'inv-4',
            name: 'Global Growth Trust',
            meta: 'MS-INV-4895 • Prospect • Unassigned',
            tags: ['Trust', 'New Lead'],
            email: 'contact@ggtrust.com',
            phone: '+1 (555) 222-3333',
            status: 'Prospect',
            statusColor: 'text-cyan-400 bg-cyan-500/20',
            rm: 'Unassigned',
            stats: {
                committed: '$0',
                called: '$0',
                value: '$0',
                return: 'N/A',
                lifecycle: 'Prospect → Since Dec 2025',
                lastInteraction: 'Dec 05, 2025 (Inquiry Received)'
            }
        }
    ];

    const selectedInvestor = investors.find(inv => inv.id === selectedInvestorId) || investors[0];

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'communication', label: 'Communication History' },
        { id: 'calls', label: 'Call Logs' },
        { id: 'notes', label: 'Notes' },
        { id: 'activity', label: 'Activity Timeline' },
    ];

    return (
        <div className="pb-20 h-screen flex flex-col md:block overflow-hidden md:overflow-visible">
            <div className="shrink-0">
                <PageTitle>Investor Relations / CRM</PageTitle>

                {/* Controls Bar */}
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                    <SearchBar
                        placeholder="Search investors by name, email, ID, tag..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                        className="w-full xl:max-w-xl"
                    />
                    <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
                        <select className="bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-mogul-gold transition-all">
                            <option>All Lifecycle Stages</option>
                            <option>Prospect</option>
                            <option>Accredited</option>
                            <option>Active</option>
                            <option>Dormant</option>
                        </select>
                        <select className="bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-mogul-gold transition-all">
                            <option>All Relationship Managers</option>
                            <option>Daniel Fainman</option>
                            <option>Sarah Chen</option>
                            <option>Unassigned</option>
                        </select>
                        <button className="flex items-center justify-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-gold whitespace-nowrap">
                            <FaUserPlus size={14} /> Add New Investor
                        </button>
                    </div>
                </div>
            </div>

            {/* Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[600px]">
                {/* Investor List Sidebar */}
                <div className="lg:col-span-4 bg-mogul-darker rounded-2xl border border-mogul-gold/10 overflow-hidden flex flex-col h-[calc(100vh-300px)] lg:h-[800px]">
                    <div className="p-6 border-b border-mogul-gold/10 bg-black/20">
                        <h3 className="text-xl font-display font-bold text-mogul-gold">Investors ({investors.length})</h3>
                    </div>
                    <div className="overflow-y-auto flex-1 custom-scrollbar">
                        {investors.map(inv => (
                            <div
                                key={inv.id}
                                onClick={() => setSelectedInvestorId(inv.id)}
                                className={`p-5 border-b border-mogul-gold/5 cursor-pointer hover:bg-mogul-gold/5 transition-colors ${selectedInvestorId === inv.id ? 'bg-mogul-gold/10 border-l-4 border-l-mogul-gold' : 'border-l-4 border-l-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <div className="font-bold text-white text-lg">{inv.name}</div>
                                    {inv.id === selectedInvestorId && <div className="w-2 h-2 rounded-full bg-mogul-gold mt-2"></div>}
                                </div>
                                <div className="text-xs text-gray-400 mb-3 leading-relaxed">{inv.meta}</div>
                                <div className="flex flex-wrap gap-2">
                                    {inv.tags.map((tag, i) => (
                                        <span key={i} className="text-[10px] bg-mogul-gold/10 text-mogul-gold px-2 py-1 rounded-full border border-mogul-gold/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed View */}
                <div className="lg:col-span-8 bg-mogul-darker rounded-2xl border border-mogul-gold/10 overflow-hidden flex flex-col h-[calc(100vh-300px)] lg:h-[800px]">
                    {/* Detail Header */}
                    <div className="p-8 border-b border-mogul-gold/10 bg-gradient-to-br from-black/40 to-transparent">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                            <div>
                                <h2 className="text-3xl font-display font-bold text-mogul-gold mb-2">{selectedInvestor.name}</h2>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-2">
                                    <span>ID: {selectedInvestor.id.toUpperCase().replace('INV-', 'MS-INV-')}</span>
                                    <span className="text-mogul-gold">•</span>
                                    <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${selectedInvestor.statusColor}`}>
                                        {selectedInvestor.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-400 mb-4">
                                    {selectedInvestor.email} • {selectedInvestor.phone}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-500">Relationship Manager:</span>
                                    <span className="text-white font-bold">{selectedInvestor.rm}</span>
                                    <button className="text-[10px] text-cyan-400 border border-cyan-400/30 px-2 py-0.5 rounded ml-2 hover:bg-cyan-400/10">Change</button>
                                </div>
                            </div>
                            <div className="flex gap-3 shrink-0">
                                <button className="p-3 border border-mogul-gold text-mogul-gold rounded-xl hover:bg-mogul-gold hover:text-black transition-all" title="Send Message"><FaEnvelope /></button>
                                <button className="p-3 border border-mogul-gold text-mogul-gold rounded-xl hover:bg-mogul-gold hover:text-black transition-all" title="Log Call"><FaPhone /></button>
                                <button className="p-3 border border-mogul-gold text-mogul-gold rounded-xl hover:bg-mogul-gold hover:text-black transition-all" title="Add Note"><FaStickyNote /></button>
                            </div>
                        </div>

                        {/* Tag Manager */}
                        <div className="flex flex-wrap gap-2 items-center">
                            {selectedInvestor.tags.map((tag, i) => (
                                <span key={i} className="flex items-center gap-2 text-xs font-bold bg-mogul-gold/20 text-mogul-gold px-3 py-1.5 rounded-lg border border-mogul-gold/20">
                                    {tag} <button className="hover:text-white"><FaTimes /></button>
                                </span>
                            ))}
                            <button className="flex items-center gap-1 text-xs font-bold text-gray-400 border border-dashed border-gray-500 px-3 py-1.5 rounded-lg hover:text-white hover:border-white transition-all">
                                <FaPlus size={10} /> Add Tag
                            </button>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex border-b border-mogul-gold/10 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id ? 'text-mogul-gold border-mogul-gold bg-mogul-gold/5' : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-black/20">
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(selectedInvestor.stats).map(([key, value], idx) => (
                                    <div key={idx} className="bg-black/40 p-5 rounded-xl border border-mogul-gold/5">
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                                        <div className="text-lg font-bold text-white">{value}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'communication' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-display font-bold text-mogul-gold mb-4">Secure Messages</h3>
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="bg-black/40 p-5 rounded-xl border border-mogul-gold/5">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-xs text-gray-400">Dec 24, 2025 – 14:15 • {i % 2 === 0 ? 'From Investor' : 'From You'}</div>
                                        </div>
                                        <div className="text-sm text-gray-200 leading-relaxed">
                                            {i % 2 === 0 ? 'Hi, I looks like the distribution hit my account. Thanks for the update!' : 'You represent a high value client. We appreciate your business.'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'calls' && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="bg-black/40 p-5 rounded-xl border border-mogul-gold/5">
                                        <div className="text-xs text-gray-400 mb-1">Dec 15, 2025 – 11:00 AM • Outbound • 28 min</div>
                                        <div className="text-sm text-gray-200">Quarterly review call. Discussed performance and interest in new syndication.</div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-mogul-gold/10">
                                    <textarea className="w-full bg-black/60 border border-mogul-gold/20 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-mogul-gold mb-3" rows={3} placeholder="Log details of the call..." />
                                    <button className="bg-mogul-gold text-mogul-dark px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-all">Log Call</button>
                                </div>
                            </div>
                        )}
                        {/* Other tabs would follow similar patterns */}
                    </div>
                </div>
            </div>
        </div>
    );
}
