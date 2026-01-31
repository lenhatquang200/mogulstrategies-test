'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaPaperPlane, FaSearch, FaCheckDouble, FaFileDownload } from 'react-icons/fa';

export default function MessagingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeThreadId, setActiveThreadId] = useState(1);

    const threads = [
        {
            id: 1,
            user: 'John Doe (MS-INV-4872)',
            preview: 'Re: Capital Call Confirmation – Thank you for the prompt response...',
            date: 'Dec 24, 2025',
            unread: 2
        },
        {
            id: 2,
            user: 'Jane Smith (MS-INV-4865)',
            preview: 'Question about Q4 distribution taxation...',
            date: 'Dec 22, 2025',
            unread: 0
        },
        {
            id: 3,
            user: 'Acme Investments LLC',
            preview: 'Request for additional fund documents',
            date: 'Dec 20, 2025',
            unread: 1
        },
        {
            id: 4,
            user: 'Robert Johnson (MS-INV-4850)',
            preview: 'Webinar registration confirmation',
            date: 'Dec 18, 2025',
            unread: 0
        }
    ];

    const messages = [
        {
            id: 1,
            sender: 'investor',
            text: 'Hi, I just completed the wire for the capital call. Can you confirm receipt?',
            meta: 'Dec 24, 2025 – 13:45 EST'
        },
        {
            id: 2,
            sender: 'admin',
            text: 'Thank you, John. We have received your $75,000 wire transfer. Your commitment is now fully funded. A confirmation will be sent shortly.',
            meta: 'Dec 24, 2025 – 14:10 EST • You'
        },
        {
            id: 3,
            sender: 'investor',
            text: 'Great, thank you! Looking forward to the next update.',
            meta: 'Dec 24, 2025 – 14:15 EST'
        }
    ];

    return (
        <div className="pb-20 h-[calc(100vh-100px)] flex flex-col">
            <PageTitle>Secure Messaging</PageTitle>

            <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
                {/* Threads List */}
                <div className="w-full lg:w-[350px] bg-mogul-darker rounded-2xl border border-mogul-gold/10 flex flex-col animate-pulse-glow h-full">
                    <div className="p-6 border-b border-mogul-gold/10">
                        <h3 className="text-xl font-display font-bold text-mogul-gold mb-4">Message Threads</h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search investors..."
                                className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:border-mogul-gold"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {threads.map((thread) => (
                            <div
                                key={thread.id}
                                onClick={() => setActiveThreadId(thread.id)}
                                className={`p-5 border-b border-mogul-gold/5 cursor-pointer transition-all hover:bg-mogul-gold/5 ${activeThreadId === thread.id ? 'bg-mogul-gold/10 border-l-4 border-l-mogul-gold' : 'border-l-4 border-l-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <div className="font-bold text-white text-sm">{thread.user}</div>
                                    {thread.unread > 0 && (
                                        <span className="bg-mogul-gold text-mogul-dark text-[10px] font-bold px-2 py-0.5 rounded-full">
                                            {thread.unread}
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-400 mb-2 line-clamp-2">{thread.preview}</div>
                                <div className="text-[10px] text-gray-500 font-mono">{thread.date}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conversation Area */}
                <div className="flex-1 bg-mogul-darker rounded-2xl border border-mogul-gold/10 flex flex-col animate-pulse-glow h-full overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-mogul-gold/10 flex justify-between items-center bg-black/20">
                        <h2 className="text-xl font-display font-bold text-mogul-gold">John Doe (MS-INV-4872)</h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-mogul-gold/20 rounded-lg text-mogul-gold hover:bg-mogul-gold hover:text-mogul-dark transition-all text-sm font-bold flex items-center gap-2">
                                <FaCheckDouble /> Mark Resolved
                            </button>
                            <button className="px-4 py-2 border border-mogul-gold/20 rounded-lg text-mogul-gold hover:bg-mogul-gold hover:text-mogul-dark transition-all text-sm font-bold flex items-center gap-2">
                                <FaFileDownload /> Export
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[80%] p-5 rounded-2xl text-sm leading-relaxed shadow-lg ${msg.sender === 'admin' ? 'bg-mogul-gold text-mogul-dark rounded-tr-none' : 'bg-black/40 text-gray-200 border border-mogul-gold/10 rounded-tl-none'}`}>
                                    {msg.text}
                                </div>
                                <div className="text-[10px] text-gray-500 mt-2 font-mono px-2">
                                    {msg.meta}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 border-t border-mogul-gold/10 bg-black/20">
                        <div className="flex gap-4">
                            <textarea
                                className="flex-1 bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold resize-none h-[60px]"
                                placeholder="Type your reply..."
                            ></textarea>
                            <button className="bg-mogul-gold text-mogul-dark px-8 rounded-xl font-bold hover:bg-white transition-all shadow-gold h-[60px] flex items-center justify-center gap-2">
                                <FaPaperPlane /> Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
