'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaUpload, FaEdit, FaEye, FaTrash, FaTimes, FaFileAlt } from 'react-icons/fa';

export default function ResourcesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All Categories');

    const resourceCategories = [
        {
            title: 'White Papers',
            items: [
                { name: 'Bitcoin as a Portfolio Diversifier', meta: 'Added Nov 2025 • 1,248 downloads' },
                { name: 'The Future of Sustainable Infrastructure Investing', meta: 'Added Oct 2025 • 892 downloads' },
                { name: 'Alternative Assets in a High-Inflation Environment', meta: 'Added Aug 2025 • 1,156 downloads' },
                { name: 'Entertainment IP as an Asset Class', meta: 'Added Jun 2025 • 678 downloads' }
            ]
        },
        {
            title: 'Market Research Reports',
            items: [
                { name: 'Gulf Region Real Estate Outlook 2026', meta: 'Added Dec 2025 • 456 downloads' },
                { name: 'Digital Assets Market Update Q4 2025', meta: 'Added Dec 2025 • 789 downloads' },
                { name: 'AI & Technology Investment Trends', meta: 'Added Nov 2025 • 934 downloads' }
            ]
        },
        {
            title: 'Investor Guides',
            items: [
                { name: 'Guide to Private Fund Investing', meta: 'Updated 2025 • 2,145 downloads' },
                { name: 'Understanding Capital Calls & Distributions', meta: 'Updated 2025 • 1,823 downloads' },
                { name: 'Tax Considerations for Alternative Investments', meta: 'Updated 2025 • 1,523 downloads' }
            ]
        }
    ];

    return (
        <div className="pb-20 relative">
            <PageTitle>Resource Library</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full xl:max-w-xl"
                />
                <div className="flex flex-wrap gap-4 w-full xl:w-auto">
                    <select
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value)}
                        className="bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-mogul-gold h-[50px]"
                    >
                        <option>All Categories</option>
                        <option>White Papers</option>
                        <option>Market Research</option>
                        <option>Investor Guides</option>
                        <option>Case Studies</option>
                        <option>Other</option>
                    </select>
                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-gold whitespace-nowrap h-[50px]"
                    >
                        <FaUpload /> Upload New Resource
                    </button>
                </div>
            </div>

            {/* Compact Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                    { val: '48', label: 'Total Resources' },
                    { val: '12', label: 'Published This Month' },
                    { val: '8,421', label: 'Total Downloads' },
                    { val: '4', label: 'In Draft' },
                ].map((stat, i) => (
                    <div key={i} className="bg-mogul-darker p-4 rounded-xl border border-mogul-gold/10 text-center animate-pulse-glow">
                        <div className="text-2xl font-display font-bold text-mogul-gold">{stat.val}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {resourceCategories.map((category, idx) => (
                    <div key={idx} className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow h-full">
                        <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/20 pb-4">{category.title}</h3>
                        <div className="space-y-4">
                            {category.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-mogul-gold/5 pb-4 last:border-0 last:pb-0 gap-4">
                                    <div className="flex-1">
                                        <div className="font-bold text-white text-lg mb-1">{item.name}</div>
                                        <div className="text-xs text-gray-400 font-mono">{item.meta}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-all border border-cyan-400/20 hover:border-cyan-400" title="Edit">
                                            <FaEdit />
                                        </button>
                                        <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all border border-mogul-gold/20 hover:border-mogul-gold" title="Preview">
                                            <FaEye />
                                        </button>
                                        <button className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-all border border-red-400/20 hover:border-red-400" title="Delete">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-mogul-darker rounded-2xl border border-mogul-gold/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-pulse-glow shadow-2xl relative">
                        <button
                            onClick={() => setIsUploadModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                        >
                            <FaTimes size={24} />
                        </button>

                        <div className="p-8">
                            <h2 className="text-2xl font-display font-bold text-mogul-gold mb-8 text-center">Upload New Resource</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-mogul-gold">Resource Title *</label>
                                    <input type="text" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold" placeholder="e.g., Bitcoin as a Portfolio Diversifier" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-mogul-gold">Category *</label>
                                    <select className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold">
                                        <option>White Papers</option>
                                        <option>Market Research Reports</option>
                                        <option>Investor Guides</option>
                                        <option>Case Studies</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-mogul-gold">Publish Status</label>
                                    <select className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold">
                                        <option>Publish Immediately</option>
                                        <option>Save as Draft</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-mogul-gold">Access Level</label>
                                    <select className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold">
                                        <option>All Investors</option>
                                        <option>Specific Funds Only</option>
                                        <option>Admin Only (Internal)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2 mb-8">
                                <label className="block text-sm font-bold text-mogul-gold">Description / Summary</label>
                                <textarea className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold h-32 resize-none" placeholder="Brief description shown to investors..."></textarea>
                            </div>

                            <div className="border-2 border-dashed border-mogul-gold/30 rounded-xl p-8 text-center hover:bg-mogul-gold/5 transition-all cursor-pointer mb-8">
                                <FaFileAlt className="mx-auto text-4xl text-mogul-gold mb-4" />
                                <p className="text-white font-bold mb-2">Drag & drop your file here or click to browse</p>
                                <p className="text-xs text-gray-400">Accepted: PDF, DOCX, XLSX (max 50MB)</p>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setIsUploadModalOpen(false)}
                                    className="px-6 py-3 rounded-xl border border-mogul-gold/20 text-mogul-gold font-bold hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </button>
                                <button className="px-6 py-3 rounded-xl bg-mogul-gold text-mogul-dark font-bold hover:bg-white transition-all shadow-gold">
                                    Upload Resource
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
