'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaPaperPlane, FaFileExport, FaCheckDouble, FaUserCircle } from 'react-icons/fa';

export default function MessagingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeThread, setActiveThread] = useState(0);

    const threads = [
        {
            user: 'John Doe',
            id: 'MS-INV-4872',
            preview: 'Re: Capital Call Confirmation – Thank you...',
            meta: 'Dec 24, 2025',
            unread: 2,
            messages: [
                { type: 'investor', text: 'Hi, I just completed the wire for the capital call. Can you confirm receipt?', time: 'Dec 24, 2025 – 13:45 EST' },
                { type: 'admin', text: 'Thank you, John. We have received your $75,000 wire transfer. Your commitment is now fully funded.', time: 'Dec 24, 2025 – 14:10 EST' },
                { type: 'investor', text: 'Great, thank you! Looking forward to the next update.', time: 'Dec 24, 2025 – 14:15 EST' }
            ]
        },
        {
            user: 'Jane Smith',
            id: 'MS-INV-4865',
            preview: 'Question about Q4 distribution...',
            meta: 'Dec 22, 2025',
            unread: 0,
            messages: []
        },
        {
            user: 'Acme Investments LLC',
            id: 'MS-INV-4801',
            preview: 'Request for additional fund documents',
            meta: 'Dec 20, 2025',
            unread: 1,
            messages: []
        }
    ];

    return (
        <div className="pb-10 h-full flex flex-col">
            <PageTitle>Secure Messaging</PageTitle>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[700px]">
                {/* Threads Sidebar */}
                <div className="lg:col-span-4 bg-mogul-darker rounded-2xl p-6 border border-mogul-gold/10 flex flex-col h-full overflow-hidden">
                    <h3 className="text-xl font-display font-bold text-mogul-gold mb-4">Message Threads</h3>
                    <SearchBar
                        placeholder="Search investors..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                        className="mb-6"
                    />

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                        {threads.map((thread, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActiveThread(idx)}
                                className={`p-4 rounded-xl cursor-pointer transition-all border ${activeThread === idx
                                        ? 'bg-mogul-gold/20 border-mogul-gold/40'
                                        : 'bg-black/20 border-transparent hover:border-mogul-gold/20'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-white text-sm">{thread.user} <span className="text-[10px] text-mogul-gold/60 font-mono ml-1">{thread.id}</span></span>
                                    {thread.unread > 0 && (
                                        <span className="bg-mogul-gold text-mogul-dark text-[10px] font-bold px-2 py-0.5 rounded-full">
                                            {thread.unread}
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500 truncate mb-2">{thread.preview}</div>
                                <div className="text-[10px] text-gray-600 font-mono">{thread.meta}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conversation Area */}
                <div className="lg:col-span-8 bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 flex flex-col h-full overflow-hidden animate-pulse-glow">
                    <div className="flex justify-between items-center mb-8 border-b border-mogul-gold/20 pb-4">
                        <div className="flex items-center gap-3">
                            <FaUserCircle className="text-mogul-gold text-3xl" />
                            <div>
                                <h3 className="text-xl font-display font-bold text-mogul-gold">{threads[activeThread].user}</h3>
                                <div className="text-[10px] text-gray-500 font-mono">{threads[activeThread].id}</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 border border-mogul-gold/30 text-mogul-gold rounded-lg hover:bg-mogul-gold hover:text-mogul-dark transition-all text-xs font-bold">
                                Mark Resolved
                            </button>
                            <button className="px-4 py-2 border border-mogul-gold/30 text-mogul-gold rounded-lg hover:bg-mogul-gold hover:text-mogul-dark transition-all text-xs font-bold">
                                <FaFileExport className="inline mr-2" /> Export
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-6 mb-8">
                        {threads[activeThread].messages.map((msg, i) => (
                            <div key={i} className={`flex flex-col ${msg.type === 'admin' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.type === 'admin'
                                        ? 'bg-mogul-gold text-mogul-dark font-medium rounded-tr-none shadow-gold/20 shadow-lg'
                                        : 'bg-black/40 text-gray-200 border border-mogul-gold/10 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                                <div className="text-[10px] text-gray-600 font-mono mt-2">
                                    {msg.time} {msg.type === 'admin' && '• You'}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 bg-black/40 p-2 rounded-2xl border border-mogul-gold/20 items-end">
                        <textarea
                            className="flex-1 bg-transparent border-none focus:ring-0 text-white p-4 text-sm min-h-[100px] resize-none"
                            placeholder="Type your secure reply here..."
                        />
                        <button className="bg-mogul-gold text-mogul-dark p-4 rounded-xl hover:bg-white transition-all shadow-gold mb-2 mr-2">
                            <FaPaperPlane size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
