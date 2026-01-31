'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import Tabs from '@/components/admin/Tabs';
import StatCard from '@/components/admin/StatCard';
import { useState } from 'react';
import { FaPlus, FaEdit, FaEye, FaChartLine, FaUsers, FaPaperPlane, FaSearch, FaUpload } from 'react-icons/fa';

export default function CMSPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('pages');

    const tabs = [
        { id: 'pages', label: 'Pages' },
        { id: 'blog', label: 'Blog & News' },
        { id: 'seo', label: 'SEO Tools' },
        { id: 'media', label: 'Media Library' },
    ];

    const websitePages = [
        { name: 'Homepage', path: '/', lastEdited: 'Dec 20, 2025' },
        { name: 'About Us', path: '/about', lastEdited: 'Nov 15, 2025' },
        { name: 'Investment Strategy', path: '/strategy', lastEdited: 'Dec 10, 2025' },
        { name: 'Contact', path: '/contact', lastEdited: 'Oct 5, 2025' },
        { name: 'Legal & Privacy', path: '/legal', lastEdited: 'Jan 1, 2025' },
    ];

    const landingPages = [
        { name: 'Real Estate Fund Launch', path: '/re-fund-launch', status: 'Active' },
        { name: 'Webinar Registration – Digital Assets', path: '/webinar-da-2026', status: '412 registrations' },
    ];

    const blogPosts = [
        { title: 'Q4 2025 Market Commentary', date: 'Dec 20, 2025', views: '1,248' },
        { title: 'New Syndication Launch: Dubai Luxury Villa', date: 'Nov 15, 2025', views: '892' },
        { title: 'Bitcoin Strategy Update – Draft', date: 'Dec 23, 2025', status: 'Draft' },
    ];

    return (
        <div className="pb-20">
            <PageTitle>Content Management System</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <SearchBar
                    placeholder="Search pages, posts, media..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full md:max-w-md"
                />
                <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors">
                    <FaPlus size={14} /> Create New Page
                </button>
            </div>

            {/* CMS Tabs */}
            <div className="mb-12">
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Tab Contents */}
            {activeTab === 'pages' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                        <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/30 pb-3">Website Pages</h3>
                        <ul className="space-y-2">
                            {websitePages.map((page, idx) => (
                                <li key={idx} className="flex justify-between items-center py-4 border-b border-mogul-gold/10 last:border-0 hover:bg-mogul-gold/5 px-4 rounded-lg transition-colors">
                                    <div>
                                        <div className="text-white font-medium">{page.name}</div>
                                        <div className="text-xs text-gray-400">{page.path} • Last edited {page.lastEdited}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-cyan-400 border border-cyan-400/30 rounded hover:bg-cyan-400 hover:text-mogul-dark transition-all">
                                            <FaEdit size={12} />
                                        </button>
                                        <button className="p-2 text-mogul-gold border border-mogul-gold/30 rounded hover:bg-mogul-gold hover:text-mogul-dark transition-all">
                                            <FaEye size={12} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                        <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/30 pb-3">Marketing Landing Pages</h3>
                        <ul className="space-y-2 mb-8">
                            {landingPages.map((page, idx) => (
                                <li key={idx} className="flex justify-between items-center py-4 border-b border-mogul-gold/10 last:border-0 hover:bg-mogul-gold/5 px-4 rounded-lg transition-colors">
                                    <div>
                                        <div className="text-white font-medium">{page.name}</div>
                                        <div className="text-xs text-mogul-gold">{page.path} • {page.status}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-cyan-400 border border-cyan-400/30 rounded hover:bg-cyan-400 hover:text-mogul-dark transition-all">
                                            <FaEdit size={12} />
                                        </button>
                                        <button className="p-2 text-gray-400 border border-gray-400/30 rounded hover:bg-gray-400 hover:text-white transition-all">
                                            <FaChartLine size={12} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="text-center">
                            <button className="flex items-center justify-center gap-2 w-full py-3 bg-mogul-gold/10 text-mogul-gold border border-mogul-gold/30 rounded-lg font-bold hover:bg-mogul-gold hover:text-mogul-dark transition-all">
                                <FaPlus size={12} /> New Landing Page
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'blog' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                        <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/30 pb-3">Blog Posts & News</h3>
                        <ul className="space-y-2 mb-8">
                            {blogPosts.map((post, idx) => (
                                <li key={idx} className="flex justify-between items-center py-4 border-b border-mogul-gold/10 last:border-0 hover:bg-mogul-gold/5 px-4 rounded-lg transition-colors">
                                    <div>
                                        <div className="text-white font-medium">{post.title}</div>
                                        <div className="text-xs text-gray-400">
                                            {post.status === 'Draft' ? `Last edited ${post.date}` : `Published ${post.date} • ${post.views} views`}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-cyan-400 border border-cyan-400/30 rounded hover:bg-cyan-400 hover:text-mogul-dark transition-all">
                                            <FaEdit size={12} />
                                        </button>
                                        {post.status === 'Draft' ? (
                                            <button className="p-2 text-green-400 border border-green-400/30 rounded hover:bg-green-400 hover:text-mogul-dark transition-all">
                                                <FaPaperPlane size={12} />
                                            </button>
                                        ) : (
                                            <button className="p-2 text-gray-400 border border-gray-400/30 rounded hover:bg-gray-400 hover:text-white transition-all">
                                                <FaChartLine size={12} />
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="text-center">
                            <button className="flex items-center justify-center gap-2 w-full py-3 bg-mogul-gold/10 text-mogul-gold border border-mogul-gold/30 rounded-lg font-bold hover:bg-mogul-gold hover:text-mogul-dark transition-all">
                                <FaPlus size={12} /> New Blog Post
                            </button>
                        </div>
                    </div>

                    <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow flex flex-col">
                        <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/30 pb-3">Post Analytics Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                            <StatCard value="12" label="Published Posts (2025)" />
                            <StatCard value="8,421" label="Total Post Views" />
                            <StatCard value="4:12" label="Avg. Time on Post" />
                            <div className="bg-black/40 rounded-xl p-6 border border-mogul-gold/10 flex items-center justify-center">
                                <div className="text-mogul-gold font-bold text-center">
                                    <div className="text-2xl">+4.2%</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest">Growth vs Q3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'seo' && (
                <div className="space-y-8">
                    <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                        <h3 className="text-2xl font-display font-bold text-mogul-gold mb-8 text-center">Site-Wide SEO Performance</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                            {[
                                { label: 'Google PageSpeed', value: '92' },
                                { label: 'Domain Authority', value: '4.8' },
                                { label: 'Indexed Pages', value: '1,248' },
                                { label: 'New Backlinks', value: '42' },
                                { label: 'Critical Issues', value: '0', color: 'text-green-500' }
                            ].map((metric, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className={`text-4xl font-bold ${metric.color || 'text-mogul-gold'}`}>{metric.value}</span>
                                    <span className="text-sm text-gray-400 mt-2">{metric.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 text-center">
                            <button className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-all">
                                <FaSearch /> Run Full SEO Audit
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                            <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6">Top Ranking Keywords</h3>
                            <ul className="space-y-4">
                                {[
                                    { kw: 'accredited investor platform', pos: '3', vol: '2,900' },
                                    { kw: 'private real estate funds', pos: '5', vol: '1,900' },
                                    { kw: 'alternative investments', pos: '8', vol: '4,400' },
                                    { kw: 'bitcoin investment fund', pos: '12', vol: '1,200' }
                                ].map((k, i) => (
                                    <li key={i} className="flex justify-between items-center py-3 border-b border-mogul-gold/10 last:border-0">
                                        <span className="text-white font-medium">{k.kw}</span>
                                        <span className="text-sm">
                                            <span className="text-mogul-gold font-bold">Pos {k.pos}</span>
                                            <span className="text-gray-500 ml-3">Vol: {k.vol}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                            <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6">Recent Recommendations</h3>
                            <ul className="space-y-4">
                                {[
                                    { rec: 'Add alt text to hero images', priority: 'High', target: 'Homepage' },
                                    { rec: 'Improve internal linking', priority: 'Medium', target: 'Site-wide' },
                                    { rec: 'Update meta descriptions', priority: 'Low', target: '12 pages' }
                                ].map((r, i) => (
                                    <li key={i} className="flex justify-between items-center py-3 border-b border-mogul-gold/10 last:border-0">
                                        <div>
                                            <div className="text-white text-sm">{r.rec}</div>
                                            <div className="text-xs text-gray-500">{r.target}</div>
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-tighter uppercase ${r.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                                                r.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                                            }`}>
                                            {r.priority}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'media' && (
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-display font-bold text-mogul-gold">Media Library</h3>
                        <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors">
                            <FaUpload size={14} /> Upload Media
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                            <div key={i} className="group relative aspect-square bg-black/40 rounded-xl overflow-hidden border border-mogul-gold/10 hover:border-mogul-gold/40 transition-all cursor-pointer">
                                <div className="w-full h-full flex items-center justify-center text-mogul-gold/20 font-display text-4xl group-hover:scale-110 transition-transform">
                                    MG
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                    <div className="text-[10px] text-white font-medium truncate">media-file-{i}.jpg</div>
                                    <div className="text-[10px] text-gray-400">1.2 MB</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
