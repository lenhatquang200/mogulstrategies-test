import React from 'react';

export default function SecureMessagingPage() {
    const threads = [
        {
            subject: 'Re: Capital Call – Mogul Real Estate Fund',
            preview: 'Thank you for the confirmation. The wire has been initiated...',
            date: 'December 22, 2025',
            unreadCount: 2
        },
        {
            subject: 'Q4 Distribution Questions',
            preview: 'Could you clarify the tax treatment of the recent distribution?',
            date: 'December 18, 2025',
        },
        {
            subject: 'Upcoming Webinar Registration',
            preview: 'I would like to register for the 2026 Outlook webinar...',
            date: 'December 10, 2025',
        },
        {
            subject: 'Document Access Request',
            preview: 'Please send the latest PPM for the Technologies Fund.',
            date: 'November 28, 2025',
        }
    ];

    return (
        <>
            <h1 className="page-title">Secure Messaging</h1>

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

                <div className="top-card">
                    <h3>Quick Message</h3>
                    <p>Send a quick message to your relationship manager.</p>
                    <textarea placeholder="Type your message..."
                        style={{ width: '100%', height: '100px', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0', marginBottom: '1rem', marginTop: '1rem' }}></textarea>
                    <button className="send-btn" onClick={() => alert('Message sent!')} style={{ background: '#D4AF37', color: '#0A1A2F', padding: '0.8rem 2rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Send Message</button>
                </div>
            </section>

            <section className="messaging-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="threads-list" style={{ background: '#112240', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', color: '#D4AF37', marginBottom: '1.5rem' }}>Your Message Threads</h3>
                    {threads.map((thread, idx) => (
                        <div key={idx} className="thread-item" style={{ padding: '1.2rem 0', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => alert(`Opening thread: ${thread.subject}`)}>
                            <div>
                                <div className="thread-subject" style={{ fontWeight: 'bold' }}>{thread.subject}</div>
                                <div className="thread-preview" style={{ fontSize: '0.9rem', color: '#AAAAAA', marginTop: '0.3rem' }}>{thread.preview}</div>
                                <div className="thread-date" style={{ fontSize: '0.9rem', color: '#AAAAAA', marginTop: '0.2rem' }}>{thread.date}</div>
                            </div>
                            {thread.unreadCount && (
                                <div className="unread-count" style={{ background: '#D4AF37', color: '#0A1A2F', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', border: 'none' }}>{thread.unreadCount}</div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="compose-section" style={{ background: '#112240', borderRadius: '16px', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.8rem', color: '#D4AF37', marginBottom: '1.5rem' }}>Compose New Message</h3>
                    <form className="compose-form" onSubmit={(e) => { e.preventDefault(); alert('Secure message sent!'); }}>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="recipient" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>To</label>
                            <input type="text" id="recipient" value="Relationship Manager (Daniel Fainman)" readOnly style={{ width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subject</label>
                            <input type="text" id="subject" placeholder="Enter subject..." style={{ width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                            <textarea id="message" placeholder="Write your message here..." style={{ width: '100%', height: '200px', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0', resize: 'vertical' }}></textarea>
                        </div>
                        <button type="submit" className="send-btn" style={{ background: '#D4AF37', color: '#0A1A2F', padding: '1rem 2.5rem', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Send Secure Message</button>
                    </form>
                    <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#AAAAAA' }}>
                        All messages are encrypted end-to-end and stored securely in compliance with industry standards.
                    </p>
                </div>
            </section>
        </>
    );
}
