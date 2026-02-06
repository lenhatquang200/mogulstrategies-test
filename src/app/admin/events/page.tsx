'use client';

import PageTitle from '@/components/admin/PageTitle';
import SearchBar from '@/components/admin/SearchBar';
import { useState } from 'react';
import { FaPlus, FaUsers, FaEye, FaVideo, FaTicketAlt, FaCalendarAlt } from 'react-icons/fa';

export default function EventsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Events');

    const events = [
        {
            title: '2026 Market Outlook with Daniel Fainman',
            status: 'Upcoming',
            date: 'January 8, 2026 – 2:00 PM EST',
            type: 'Virtual Webinar (Zoom)',
            description: 'Annual macro outlook, alternative investment trends, and portfolio strategy discussion.',
            meta: [
                { icon: FaUsers, text: '412 Registered' },
                { icon: FaEye, text: '0 Attended' },
                { icon: FaVideo, text: 'Recording: Not Available' }
            ]
        },
        {
            title: 'Investor Roundtable – Digital Assets Focus',
            status: 'Upcoming',
            date: 'February 12, 2026 – 12:00 PM EST',
            type: 'Virtual Webinar',
            description: 'Deep dive into blockchain, Bitcoin strategy, and guest speakers.',
            meta: [
                { icon: FaUsers, text: '298 Registered' },
                { icon: FaEye, text: '0 Attended' },
                { icon: FaVideo, text: 'Recording: Not Available' }
            ]
        },
        {
            title: 'Annual Investor Dinner',
            status: 'Upcoming',
            date: 'March 20, 2026 – 6:30 PM EST',
            type: 'In-Person Event',
            location: 'The Plaza Hotel, New York, NY',
            description: 'Exclusive networking dinner with leadership team.',
            meta: [
                { icon: FaUsers, text: '85 Registered' },
                { icon: FaEye, text: '0 Attended' },
                { icon: FaTicketAlt, text: 'Capacity: 100' }
            ]
        },
        {
            title: 'Mid-Year Portfolio Review 2025',
            status: 'Past',
            date: 'June 18, 2025 – 3:00 PM EST',
            type: 'Virtual Webinar',
            description: 'H1 performance review and forward guidance.',
            meta: [
                { icon: FaUsers, text: '612 Registered' },
                { icon: FaEye, text: '548 Attended (89.5%)' },
                { icon: FaVideo, text: 'Recording Available' }
            ]
        }
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Upcoming': return 'bg-cyan-500/20 text-cyan-400';
            case 'Live Now': return 'bg-green-500/20 text-green-400 animate-pulse';
            case 'Past': return 'bg-white/10 text-gray-400';
            case 'Draft': return 'bg-yellow-500/20 text-yellow-400';
            default: return 'bg-white/10 text-gray-300';
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>Events & Webinars</PageTitle>

            {/* Controls Bar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <SearchBar
                    placeholder="Search events or webinars..."
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
                        <option>All Events</option>
                        <option>Upcoming</option>
                        <option>Live Now</option>
                        <option>Past</option>
                        <option>Draft</option>
                    </select>
                    <button className="flex items-center gap-2 bg-mogul-gold text-mogul-dark px-6 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-gold whitespace-nowrap h-[50px]">
                        <FaPlus /> Create New Event
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                    { val: '8', label: 'Total Events' },
                    { val: '3', label: 'Upcoming' },
                    { val: '1,248', label: 'Total Registrations' },
                    { val: '89%', label: 'Average Attendance' },
                ].map((stat, i) => (
                    <div key={i} className="bg-mogul-darker p-4 rounded-xl border border-mogul-gold/10 text-center animate-pulse-glow p-8">
                        <div className="text-4xl md:text-5xl font-bold text-mogul-gold mb-2">{stat.val}</div>
                        <div className="text-base md:text-lg text-gray-300">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {events.map((event, idx) => (
                    <div key={idx} className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow group hover:-translate-y-2 transition-transform duration-300">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-display font-bold text-mogul-gold leading-tight max-w-[70%]">{event.title}</h3>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusStyle(event.status)}`}>
                                {event.status}
                            </span>
                        </div>

                        <div className="space-y-3 mb-6">
                            <p className="text-gray-200 flex items-center gap-2">
                                <FaCalendarAlt className="text-mogul-gold" />
                                <span className="font-bold">{event.date}</span>
                            </p>
                            <p className="text-gray-300 text-sm">
                                <span className="font-bold">Type:</span> {event.type}
                            </p>
                            {/* @ts-ignore */}
                            {event.location && (
                                <p className="text-gray-300 text-sm">
                                    <span className="font-bold">Location:</span> {event.location}
                                </p>
                            )}
                            <p className="text-gray-400 text-sm leading-relaxed border-t border-mogul-gold/10 pt-3 mt-3">
                                {event.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {event.meta.map((item, mIdx) => (
                                <div key={mIdx} className="flex items-center gap-3 text-gray-400 text-sm">
                                    <item.icon className="text-mogul-gold" />
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {event.status === 'Past' ? (
                                <>
                                    <button className="px-4 py-2 border border-mogul-gold/20 rounded-lg text-mogul-gold hover:bg-mogul-gold hover:text-mogul-dark transition-all text-sm font-bold">View Recording</button>
                                    <button className="px-4 py-2 border border-mogul-gold/20 rounded-lg text-mogul-gold hover:bg-mogul-gold hover:text-mogul-dark transition-all text-sm font-bold">Attendees</button>
                                    <button className="px-4 py-2 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-all text-sm shadow-gold">Analytics</button>
                                </>
                            ) : (
                                <>
                                    <button className="px-4 py-2 border border-mogul-gold/20 rounded-lg text-mogul-gold hover:bg-mogul-gold hover:text-mogul-dark transition-all text-sm font-bold">Edit Event</button>
                                    <button className="px-4 py-2 border border-mogul-gold/20 rounded-lg text-mogul-gold hover:bg-mogul-gold hover:text-mogul-dark transition-all text-sm font-bold">Registrants</button>
                                    <button className="px-4 py-2 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-all text-sm shadow-gold">{event.status === 'Upcoming' ? 'Send Reminder' : 'Join Now'}</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
