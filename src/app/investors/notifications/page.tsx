'use client';
import React from 'react';

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            icon: '🔔',
            title: 'New Capital Call Issued',
            message: 'Mogul Real Estate Fund – Tranche 3 capital call of $75,000 due January 15, 2026.',
            date: 'December 10, 2025 – 14:20 EST',
            unread: true,
            actions: [
                { label: 'View Details', onClick: () => alert('View details...') },
                { label: 'Pay Now', onClick: () => alert('Pay now...') }
            ]
        },
        {
            id: 2,
            icon: '📊',
            title: 'Q4 2025 Performance Report Available',
            message: 'Detailed fund performance and commentary now available for download.',
            date: 'December 24, 2025 – 09:00 EST',
            unread: true,
            actions: [
                { label: 'Download Report', onClick: () => alert('Downloading...') }
            ]
        },
        {
            id: 3,
            icon: '💰',
            title: 'Distribution Posted',
            message: 'Q4 2025 distribution of $18,420 credited to your account.',
            date: 'December 20, 2025 – 16:45 EST',
            unread: false,
            actions: [
                { label: 'View Statement', onClick: () => alert('Viewing statement...') }
            ]
        },
        {
            id: 4,
            icon: '📅',
            title: 'Upcoming Webinar Reminder',
            message: '2026 Market Outlook with Daniel Fainman – January 8, 2026 at 2:00 PM EST',
            date: 'December 18, 2025 – 10:00 EST',
            unread: false,
            actions: [
                { label: 'Register Now', onClick: () => alert('Registering...') },
                { label: 'Add to Calendar', onClick: () => alert('Adding to calendar...') }
            ]
        },
        {
            id: 5,
            icon: '📄',
            title: 'New Document Uploaded',
            message: 'Q4 2025 Investor Letter is now available in Documents & Reports.',
            date: 'December 15, 2025 – 11:30 EST',
            unread: false,
            actions: [
                { label: 'View Document', onClick: () => alert('Viewing document...') }
            ]
        }
    ];

    return (
        <>
            <h1 className="page-title">Notifications</h1>

            <section className="top-row">
                <div className="top-card account-info-card">
                    <h3>Account Information</h3>
                    <ul>
                        <li><strong>Name:</strong> John Doe</li>
                        <li><strong>Email:</strong> john.doe@example.com</li>
                        <li><strong>Investor Type:</strong> Accredited Individual</li>
                        <li><strong>Account ID:</strong> MS-INV-4872</li>
                        <li><strong>Joined:</strong> March 15, 2023</li>
                        <li><strong>Last Login:</strong> December 24, 2025</li>
                    </ul>
                </div>

                <div className="top-card messaging-card">
                    <h3>Secure Messaging</h3>
                    <p>Communicate directly with your relationship manager.</p>
                    <a href="#" style={{ display: 'block', margin: '1rem 0', fontWeight: 'bold' }}>Open Inbox (2 unread)</a>
                    <textarea placeholder="Type your message..."
                        style={{ width: '100%', height: '100px', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }}></textarea>
                    <button
                        style={{ marginTop: '1rem', background: '#D4AF37', color: '#0A1A2F', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Send
                        Message</button>
                </div>
            </section>

            <section className="notifications-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                    <button style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '0.8rem 2rem', borderRadius: '8px', cursor: 'pointer' }} onClick={() => alert('Marked all as read!')}>Mark All as Read</button>
                </div>

                {notifications.map((n) => (
                    <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`} style={{
                        background: '#112240', borderRadius: '16px', padding: '1.8rem', marginBottom: '1.5rem',
                        display: 'flex', alignItems: 'flex-start', gap: '1.5rem', borderLeft: n.unread ? '4px solid #D4AF37' : 'none'
                    }}>
                        <div className="notification-icon" style={{ fontSize: '2rem', minWidth: '50px', textAlign: 'center' }}>{n.icon}</div>
                        <div className="notification-content" style={{ flex: 1 }}>
                            <div className="notification-title" style={{ fontSize: '1.4rem', color: '#D4AF37', marginBottom: '0.5rem' }}>{n.title}</div>
                            <div className="notification-message" style={{ marginBottom: '0.8rem' }}>{n.message}</div>
                            <div className="notification-date" style={{ fontSize: '0.9rem', color: '#AAAAAA', marginBottom: '1rem' }}>{n.date}</div>
                            <div className="notification-actions" style={{ display: 'flex', gap: '1rem' }}>
                                {n.actions.map((action, aIdx) => (
                                    <button key={aIdx} style={{ background: 'none', border: 'none', color: '#D4AF37', fontWeight: 'bold', cursor: 'pointer', padding: 0 }} onClick={action.onClick}>{action.label}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
