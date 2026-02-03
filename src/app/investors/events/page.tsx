'use client';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ical from 'ical-generator';

export default function EventsPage() {
    const [filter, setFilter] = useState('all');
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const initialEvents = [
        { title: '2026 Market Outlook with Daniel Fainman', start: '2026-01-08T14:00:00', end: '2026-01-08T15:30:00', extendedProps: { type: 'webinar', location: 'Virtual (Zoom)', description: 'Annual outlook on alternative investments.', rsvpLink: '#', rsvpText: 'RSVP Now' } },
        { title: 'Investor Roundtable – Digital Assets', start: '2026-02-12T12:00:00', end: '2026-02-12T13:30:00', extendedProps: { type: 'webinar', location: 'Virtual', description: 'Deep dive into blockchain strategy.', rsvpLink: '#', rsvpText: 'Register' } },
        { title: 'Annual Investor Dinner', start: '2026-03-20T18:30:00', extendedProps: { type: 'in-person', location: 'The Plaza Hotel, New York, NY', description: 'Exclusive networking dinner.', rsvpLink: '#', rsvpText: 'RSVP Required' } },
        { title: 'Mid-Year Portfolio Review', start: '2026-06-18T15:00:00', end: '2026-06-18T16:30:00', extendedProps: { type: 'webinar', location: 'Virtual', description: 'H1 performance and forward guidance.', rsvpLink: '#', rsvpText: 'Join Live' } },
        { title: 'Real Estate Market Update', start: '2026-04-15T13:00:00', end: '2026-04-15T14:00:00', extendedProps: { type: 'webinar', location: 'Virtual', description: 'Gulf region real estate trends.', rsvpLink: '#', rsvpText: 'RSVP' } },
        { title: 'Creative Arts Fund Showcase', start: '2026-05-10T19:00:00', extendedProps: { type: 'in-person', location: 'Los Angeles, CA', description: 'Film production preview event.', rsvpLink: '#', rsvpText: 'RSVP' } },
        { title: 'Sustainable Investing Forum', start: '2026-07-22T11:00:00', end: '2026-07-22T12:30:00', extendedProps: { type: 'webinar', location: 'Virtual', description: 'Recycling and circular economy focus.', rsvpLink: '#', rsvpText: 'Register' } },
        { title: 'Q3 2026 Investor Call', start: '2026-09-25T16:00:00', end: '2026-09-25T17:00:00', extendedProps: { type: 'webinar', location: 'Virtual', description: 'Quarterly update and Q&A.', rsvpLink: '#', rsvpText: 'Join' } },
        { title: 'Technology Deep Dive', start: '2026-08-14T14:00:00', end: '2026-08-14T15:30:00', extendedProps: { type: 'webinar', location: 'Virtual', description: 'AI and quantum computing opportunities.', rsvpLink: '#', rsvpText: 'RSVP' } },
        { title: 'Holiday Investor Reception', start: '2026-12-12T18:00:00', extendedProps: { type: 'in-person', location: 'Manhattan, NY', description: 'Year-end celebration and networking.', rsvpLink: '#', rsvpText: 'RSVP Required' } },
        { title: 'Bitcoin Strategy Session', start: '2026-10-08T13:00:00', end: '2026-10-08T14:00:00', extendedProps: { type: 'webinar', location: 'Virtual', description: 'Portfolio hedging with Bitcoin.', rsvpLink: '#', rsvpText: 'Register' } },
        { title: 'Year-End Tax Planning Webinar', start: '2026-11-18T15:00:00', end: '2026-11-18T16:30:00', extendedProps: { type: 'webinar', location: 'Virtual', description: 'Tax considerations for alternative investments.', rsvpLink: '#', rsvpText: 'RSVP' } }
    ];

    const filteredEvents = filter === 'all'
        ? initialEvents
        : initialEvents.filter(e => e.extendedProps.type === filter);

    const handleExportIcal = () => {
        const calendar = ical({ name: 'Mogul Strategies Events' });
        initialEvents.forEach(e => {
            calendar.createEvent({
                start: new Date(e.start),
                end: e.end ? new Date(e.end) : new Date(e.start),
                summary: e.title,
                description: e.extendedProps.description,
                location: e.extendedProps.location
            });
        });
        const blob = new Blob([calendar.toString()], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mogul-strategies-events.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <style jsx global>{`
        .fc { color: #E0E0E0; background: transparent; }
        .fc-toolbar-title { font-family: 'Playfair Display', serif; color: #D4AF37; }
        .fc-button { background: #D4AF37 !important; border: none !important; color: #0A1A2F !important; font-weight: bold !important; opacity: 1 !important; }
        .fc-button:hover { background: #FFFFFF !important; }
        .fc-button-active { background: #B8860B !important; }
        .fc-daygrid-day { background: rgba(17, 34, 64, 0.4); }
        .fc-day-today { background: rgba(212, 175, 55, 0.1) !important; }
        .fc-event { background: #D4AF37 !important; border: none !important; color: #0A1A2F !important; cursor: pointer; padding: 2px 4px; border-radius: 4px; }
        .fc-event-title { font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .fc-col-header-cell { background: #0A1A2F; padding: 10px 0; }
        .fc-scrollgrid { border-color: rgba(212, 175, 55, 0.3) !important; }
        .fc-td, .fc-th { border-color: rgba(212, 175, 55, 0.2) !important; }
      `}</style>

            <h1 className="page-title">Webinars & Events</h1>

            <section className="calendar-container" style={{ background: '#112240', borderRadius: '16px', padding: '2rem' }}>
                <div className="calendar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 style={{ fontSize: '1.8rem', color: '#D4AF37' }}>Upcoming Events Calendar</h2>
                    <div className="calendar-controls" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div className="filter-group">
                            <label htmlFor="eventFilter" style={{ marginRight: '0.5rem' }}>Filter by Type:</label>
                            <select id="eventFilter" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '0.6rem 1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0', cursor: 'pointer' }}>
                                <option value="all">All Events</option>
                                <option value="webinar">Webinars</option>
                                <option value="in-person">In-Person</option>
                            </select>
                        </div>
                        <button className="export-btn" onClick={handleExportIcal} style={{ background: '#D4AF37', color: '#0A1A2F', padding: '0.6rem 1.5rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Export to iCal</button>
                    </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        events={filteredEvents}
                        eventClick={(info) => {
                            setSelectedEvent({
                                title: info.event.title,
                                start: info.event.start,
                                ...info.event.extendedProps
                            });
                        }}
                        height="auto"
                    />
                </div>
            </section>

            {/* RSVP Modal */}
            {selectedEvent && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setSelectedEvent(null)}>
                    <div style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem', maxWidth: '600px', width: '90%', position: 'relative' }} onClick={e => e.stopPropagation()}>
                        <span style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontSize: '2rem', color: '#AAAAAA', cursor: 'pointer' }} onClick={() => setSelectedEvent(null)}>×</span>
                        <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1rem' }}>{selectedEvent.title}</h3>
                        <p><strong>Date & Time:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
                        <p><strong>Type:</strong> {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}</p>
                        <p><strong>Location:</strong> {selectedEvent.location}</p>
                        <p style={{ margin: '1rem 0' }}>{selectedEvent.description}</p>
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <button style={{ background: '#D4AF37', color: '#0A1A2F', padding: '1rem 2rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => alert('RSVP Confirmed!')}>
                                {selectedEvent.rsvpText || 'RSVP'}
                            </button>
                            <button style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', padding: '1rem 2rem', border: '1px solid #D4AF37', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setSelectedEvent(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
