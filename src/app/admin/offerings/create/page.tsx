'use client';

import PageTitle from '@/components/admin/PageTitle';
import Link from 'next/link';
import { useState } from 'react';
import { FaArrowLeft, FaSave, FaGlobe, FaUpload } from 'react-icons/fa';

export default function CreateOfferingPage() {
    const [activeTab, setActiveTab] = useState('structured');

    return (
        <div className="pb-20 max-w-5xl mx-auto">
            <div className="mb-8">
                <Link href="/admin/offerings" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 text-sm font-bold">
                    <FaArrowLeft /> Back to Offerings
                </Link>
                <PageTitle>Create New Investment Opportunity</PageTitle>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-mogul-gold/20 mb-8">
                <button
                    onClick={() => setActiveTab('structured')}
                    className={`px-8 py-4 text-lg font-display font-bold transition-all border-b-2 ${activeTab === 'structured' ? 'border-mogul-gold text-mogul-gold bg-mogul-gold/5' : 'border-transparent text-gray-400 hover:text-white'}`}
                >
                    Structured Fund
                </button>
                <button
                    onClick={() => setActiveTab('spv')}
                    className={`px-8 py-4 text-lg font-display font-bold transition-all border-b-2 ${activeTab === 'spv' ? 'border-mogul-gold text-mogul-gold bg-mogul-gold/5' : 'border-transparent text-gray-400 hover:text-white'}`}
                >
                    Single-Asset SPV (Syndication)
                </button>
            </div>

            {/* Form Content */}
            <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow">

                {activeTab === 'structured' && (
                    <form className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Fund Name *</label>
                                <input type="text" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold transition-all" placeholder="e.g., Mogul Technologies Fund III" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Fund Strategy *</label>
                                <select className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold transition-all">
                                    <option>Real Estate</option>
                                    <option>Digital Assets</option>
                                    <option>Technology</option>
                                    <option>Creative Arts</option>
                                    <option>Recycling & Sustainability</option>
                                    <option>Multi-Strategy</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Target Size ($M) *</label>
                                <input type="number" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold transition-all" placeholder="e.g., 75" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Minimum Commitment ($K) *</label>
                                <input type="number" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold transition-all" placeholder="e.g., 500" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">First Close Date</label>
                                <input type="date" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-mogul-gold transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Final Close Date</label>
                                <input type="date" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-mogul-gold transition-all" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-gray-300">Investment Thesis / Description *</label>
                                <textarea rows={4} className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold transition-all" placeholder="Brief overview of strategy, target returns, and key differentiators..."></textarea>
                            </div>

                            {/* Uploaders */}
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Upload Pitch Deck</label>
                                    <div className="border-2 border-dashed border-mogul-gold/30 rounded-xl p-8 text-center cursor-pointer hover:bg-mogul-gold/5 transition-all group">
                                        <FaUpload className="text-mogul-gold text-2xl mx-auto mb-2 opacity-70 group-hover:opacity-100" />
                                        <div className="text-xs text-gray-400">Drag & drop PDF or <span className="text-mogul-gold underline">browse</span></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Upload PPM</label>
                                    <div className="border-2 border-dashed border-mogul-gold/30 rounded-xl p-8 text-center cursor-pointer hover:bg-mogul-gold/5 transition-all group">
                                        <FaUpload className="text-mogul-gold text-2xl mx-auto mb-2 opacity-70 group-hover:opacity-100" />
                                        <div className="text-xs text-gray-400">Drag & drop PDF or <span className="text-mogul-gold underline">browse</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}

                {activeTab === 'spv' && (
                    <form className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-gray-300">Deal Name *</label>
                                <input type="text" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold transition-all" placeholder="e.g., Dubai Luxury Waterfront Villa" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Asset Type *</label>
                                <select className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold transition-all">
                                    <option>Real Estate</option>
                                    <option>Hospitality</option>
                                    <option>Entertainment IP</option>
                                    <option>Commercial Property</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Location *</label>
                                <input type="text" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold transition-all" placeholder="e.g., Palm Jumeirah, Dubai" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Target Raise ($M) *</label>
                                <input type="number" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold transition-all" placeholder="e.g., 8.5" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Minimum Investment ($K) *</label>
                                <input type="number" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold transition-all" placeholder="e.g., 250" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Expected Close Date</label>
                                <input type="date" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-mogul-gold transition-all" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-gray-300">Deal Summary *</label>
                                <textarea rows={4} className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold transition-all" placeholder="Key highlights, projected returns, hold period..."></textarea>
                            </div>

                            {/* Uploaders */}
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Investment Memo</label>
                                    <div className="border-2 border-dashed border-mogul-gold/30 rounded-xl p-8 text-center cursor-pointer hover:bg-mogul-gold/5 transition-all group">
                                        <FaUpload className="text-mogul-gold text-2xl mx-auto mb-2 opacity-70 group-hover:opacity-100" />
                                        <div className="text-xs text-gray-400">Drag & drop PDF or <span className="text-mogul-gold underline">browse</span></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Legal Docs</label>
                                    <div className="border-2 border-dashed border-mogul-gold/30 rounded-xl p-8 text-center cursor-pointer hover:bg-mogul-gold/5 transition-all group">
                                        <FaUpload className="text-mogul-gold text-2xl mx-auto mb-2 opacity-70 group-hover:opacity-100" />
                                        <div className="text-xs text-gray-400">Drag & drop files or <span className="text-mogul-gold underline">browse</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-6 mt-10 pt-6 border-t border-mogul-gold/10">
                    <button className="px-8 py-3 bg-transparent border border-mogul-gold/50 text-mogul-gold rounded-xl font-bold hover:bg-mogul-gold hover:text-black transition-all">Cancel</button>
                    <button className="flex items-center gap-2 px-8 py-3 bg-gray-700/50 text-white rounded-xl font-bold hover:bg-gray-600 transition-all"><FaSave /> Save Draft</button>
                    <button className="flex items-center gap-2 px-8 py-3 bg-mogul-gold text-mogul-dark rounded-xl font-bold hover:bg-white transition-all shadow-gold"><FaGlobe /> Publish Opportunity</button>
                </div>

            </div>
        </div>
    );
}
