'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaUpload, FaFilePdf, FaFileWord, FaFileExcel, FaEye, FaEdit, FaTrash, FaChartLine, FaUsers, FaPaperPlane, FaTimes } from 'react-icons/fa';

export default function DocumentsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All Types');

    const documents = [
        {
            name: 'Q4 2025 Investor Letter',
            type: 'Quarterly Letter',
            applicableTo: 'All Investors',
            uploaded: 'Dec 24, 2025',
            status: 'Published',
            views: 842,
            downloads: 612
        },
        {
            name: 'December 2025 Performance Report',
            type: 'Monthly Report',
            applicableTo: 'All Investors',
            uploaded: 'Dec 24, 2025',
            status: 'Published',
            views: 756,
            downloads: 521
        },
        {
            name: 'Q4 2025 Performance Summary',
            type: 'Performance Report',
            applicableTo: 'All Investors',
            uploaded: 'Dec 23, 2025',
            status: 'Published',
            views: 689,
            downloads: 456
        },
        {
            name: '2025 Estimated K-1 Template',
            type: 'Tax Document',
            applicableTo: 'All Investors',
            uploaded: 'Dec 20, 2025',
            status: 'Draft',
            views: 0,
            downloads: 0
        },
        {
            name: 'Real Estate Fund Tranche 3 PPM',
            type: 'Legal Document',
            applicableTo: 'Real Estate Fund Investors',
            uploaded: 'Nov 15, 2025',
            status: 'Published',
            views: 312,
            downloads: 298
        }
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Published': return 'bg-green-500/20 text-green-400';
            case 'Draft': return 'bg-gray-500/20 text-gray-400';
            case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
            default: return 'bg-white/10 text-gray-300';
        }
    };

    const getDocIcon = (type: string) => {
        if (type.includes('Excel') || type.includes('Tax')) return <FaFileExcel className="text-green-500" />;
        if (type.includes('Word')) return <FaFileWord className="text-blue-500" />;
        return <FaFilePdf className="text-red-500" />;
    };

    return (
        <div className="pb-20 relative">
            <PageTitle>Documents & Reports</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search documents or reports..."
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
                        <option>All Types</option>
                        <option>Quarterly Letters</option>
                        <option>Monthly Reports</option>
                        <option>Performance Reports</option>
                        <option>Tax Documents</option>
                        <option>Legal Documents</option>
                        <option>Other</option>
                    </select>
                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-gold whitespace-nowrap h-[50px]"
                    >
                        <FaUpload /> Upload New Document
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                    { val: '248', label: 'Total Documents' },
                    { val: '42', label: 'Published This Quarter' },
                    { val: '8', label: 'In Draft' },
                    { val: '1.2GB', label: 'Storage Used' },
                ].map((stat, i) => (
                    <div key={i} className="bg-mogul-darker p-4 rounded-xl border border-mogul-gold/10 text-center animate-pulse-glow">
                        <div className="text-2xl font-display font-bold text-mogul-gold">{stat.val}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Documents Table */}
            <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow overflow-x-auto">
                <h2 className="text-xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/10 pb-4">Document Library</h2>
                <table className="w-full min-w-[1000px] text-sm">
                    <thead>
                        <tr className="bg-mogul-gold/10 text-mogul-gold text-xs uppercase tracking-widest text-left">
                            <th className="p-4 rounded-tl-lg">Document Name</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Applicable To</th>
                            <th className="p-4">Uploaded</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Views / Downloads</th>
                            <th className="p-4 rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-mogul-gold/5">
                        {documents.map((doc, idx) => (
                            <tr key={idx} className="hover:bg-mogul-gold/5 transition-colors">
                                <td className="p-4 font-bold text-white flex items-center gap-3">
                                    <span className="text-lg">{getDocIcon(doc.type)}</span>
                                    {doc.name}
                                </td>
                                <td className="p-4 text-gray-300">{doc.type}</td>
                                <td className="p-4 text-gray-400 text-xs">{doc.applicableTo}</td>
                                <td className="p-4 font-mono text-xs text-gray-400">{doc.uploaded}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(doc.status)}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="p-4 font-mono text-gray-300">
                                    {doc.status === 'Published' ? `${doc.views} / ${doc.downloads}` : '—'}
                                </td>
                                <td className="p-4 flex gap-2">
                                    <button className="p-2 text-mogul-gold hover:bg-mogul-gold/10 rounded transition-all" title="Edit"><FaEdit /></button>
                                    <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-all" title="Preview"><FaEye /></button>
                                    {doc.status === 'Published' && <button className="p-2 text-purple-400 hover:bg-purple-400/10 rounded transition-all" title="Stats"><FaChartLine /></button>}
                                    {doc.status === 'Draft' && <button className="p-2 text-green-400 hover:bg-green-400/10 rounded transition-all" title="Publish"><FaPaperPlane /></button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                            <h2 className="text-2xl font-display font-bold text-mogul-gold mb-8 text-center">Upload New Document</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-mogul-gold">Document Title *</label>
                                    <input type="text" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold" placeholder="e.g., Q4 2025 Investor Letter" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-mogul-gold">Document Type *</label>
                                    <select className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold">
                                        <option>Quarterly Investor Letter</option>
                                        <option>Monthly Performance Report</option>
                                        <option>Tax Document (K-1)</option>
                                        <option>Legal Document (PPM)</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-mogul-gold">Applicable To *</label>
                                    <select className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold">
                                        <option>All Investors</option>
                                        <option>Mogul Real Estate Fund</option>
                                        <option>Mogul Digital Fund</option>
                                        <option>Specific Investors (Manual)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-mogul-gold">Publish Date</label>
                                    <input type="date" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold" />
                                </div>
                            </div>

                            <div className="space-y-2 mb-8">
                                <label className="block text-sm font-bold text-mogul-gold">Description / Notes</label>
                                <textarea className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold h-32 resize-none" placeholder="Optional internal notes..."></textarea>
                            </div>

                            <div className="border-2 border-dashed border-mogul-gold/30 rounded-xl p-8 text-center hover:bg-mogul-gold/5 transition-all cursor-pointer mb-8">
                                <FaUpload className="mx-auto text-4xl text-mogul-gold mb-4" />
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
                                    Upload & Publish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
