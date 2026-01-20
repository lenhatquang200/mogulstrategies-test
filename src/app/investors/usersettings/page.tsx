'use client';
import React, { useState } from 'react';

export default function UserSettingsPage() {
    const [toggles, setToggles] = useState({
        twoFactor: true,
        emailNotifications: true,
        smsAlerts: false
    });

    const [notificationSettings, setNotificationSettings] = useState({
        capitalCalls: true,
        distributions: true,
        documents: true,
        kyc: true,
        marketCommentary: false,
        eventReminders: true
    });

    const activityLog = [
        { date: 'Dec 24, 2025 – 14:32 EST', activity: 'Login', ip: '192.168.1.100', location: 'New York, NY, USA', device: 'Chrome on MacOS' },
        { date: 'Dec 23, 2025 – 09:15 EST', activity: 'Viewed Portfolio', ip: '203.0.113.45', location: 'Miami, FL, USA', device: 'Safari on iPhone' },
        { date: 'Dec 20, 2025 – 18:40 EST', activity: 'Login', ip: '198.51.100.23', location: 'London, UK', device: 'Firefox on Windows' },
        { date: 'Dec 18, 2025 – 11:22 EST', activity: 'Downloaded Report', ip: '192.168.1.100', location: 'New York, NY, USA', device: 'Chrome on MacOS' },
    ];

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleNotifToggle = (key: keyof typeof notificationSettings) => {
        setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            <h1 className="page-title">User Settings</h1>

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
                        style={{ marginTop: '1rem', background: '#D4AF37', color: '#0A1A2F', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                        onClick={() => alert('Message sent!')}>Send Message</button>
                </div>
            </section>

            <section className="settings-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="settings-card" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem', marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.8rem' }}>Profile Settings</h3>
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '500' }}>Full Name</label>
                            <input type="text" defaultValue="John Doe" style={{ width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }} />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '500' }}>Email Address</label>
                            <input type="email" defaultValue="john.doe@example.com" style={{ width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }} />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '500' }}>Phone Number</label>
                            <input type="tel" defaultValue="+1 (555) 123-4567" style={{ width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }} />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '500' }}>Timezone</label>
                            <select style={{ width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }}>
                                <option>EST (Eastern Standard Time)</option>
                                <option>PST (Pacific Standard Time)</option>
                                <option>GMT (Greenwich Mean Time)</option>
                            </select>
                        </div>
                    </div>
                    <button className="save-btn" style={{ background: '#D4AF37', color: '#0A1A2F', padding: '1rem 2.5rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }} onClick={() => alert('Profile saved!')}>Save Profile Changes</button>
                </div>

                <div className="settings-card" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem', marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.8rem' }}>Security & Two-Factor Authentication</h3>
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="form-group">
                            <label>Two-Factor Authentication (2FA)</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                <span>Currently: <strong style={{ color: toggles.twoFactor ? '#0f0' : '#ff6b6b' }}>{toggles.twoFactor ? 'Enabled' : 'Disabled'}</strong></span>
                                <button
                                    onClick={() => handleToggle('twoFactor')}
                                    style={{
                                        position: 'relative', width: '60px', height: '34px', background: toggles.twoFactor ? '#D4AF37' : '#333',
                                        borderRadius: '17px', border: 'none', cursor: 'pointer', transition: '0.4s'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute', width: '26px', height: '26px', left: toggles.twoFactor ? '30px' : '4px', bottom: '4px',
                                        background: '#E0E0E0', borderRadius: '50%', transition: '0.4s'
                                    }} />
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <button
                                className="save-btn"
                                style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', border: '1px solid #D4AF37', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'block', marginTop: '0.5rem' }}
                                onClick={() => alert('Password change modal would open')}
                            >Change Password</button>
                        </div>
                    </div>
                </div>

                <div className="settings-card" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem', marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.8rem' }}>Notification Preferences</h3>
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="form-group">
                            <label>Email Notifications</label>
                            <button
                                onClick={() => handleToggle('emailNotifications')}
                                style={{
                                    position: 'relative', width: '60px', height: '34px', background: toggles.emailNotifications ? '#D4AF37' : '#333',
                                    borderRadius: '17px', border: 'none', cursor: 'pointer', transition: '0.4s', marginTop: '0.5rem'
                                }}
                            >
                                <div style={{
                                    position: 'absolute', width: '26px', height: '26px', left: toggles.emailNotifications ? '30px' : '4px', bottom: '4px',
                                    background: '#E0E0E0', borderRadius: '50%', transition: '0.4s'
                                }} />
                            </button>
                        </div>
                        <div className="form-group">
                            <label>SMS Alerts (Critical Only)</label>
                            <button
                                onClick={() => handleToggle('smsAlerts')}
                                style={{
                                    position: 'relative', width: '60px', height: '34px', background: toggles.smsAlerts ? '#D4AF37' : '#333',
                                    borderRadius: '17px', border: 'none', cursor: 'pointer', transition: '0.4s', marginTop: '0.5rem'
                                }}
                            >
                                <div style={{
                                    position: 'absolute', width: '26px', height: '26px', left: toggles.smsAlerts ? '30px' : '4px', bottom: '4px',
                                    background: '#E0E0E0', borderRadius: '50%', transition: '0.4s'
                                }} />
                            </button>
                        </div>
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <p style={{ fontWeight: 500, marginBottom: '1rem' }}>Choose which events trigger notifications:</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            {Object.entries(notificationSettings).map(([key, value]) => (
                                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={() => handleNotifToggle(key as keyof typeof notificationSettings)}
                                        style={{ width: '20px', height: '20px', accentColor: '#D4AF37' }}
                                    />
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </label>
                            ))}
                        </div>
                    </div>
                    <button className="save-btn" style={{ background: '#D4AF37', color: '#0A1A2F', padding: '1rem 2.5rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '2rem' }} onClick={() => alert('Preferences saved!')}>Save Preferences</button>
                </div>

                <div className="settings-card" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.8rem' }}>Account Activity & Login History</h3>
                    <p style={{ color: '#AAAAAA', marginBottom: '1.5rem' }}>Recent login and activity tracking (IP addresses logged for security)</p>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37' }}>
                                    <th style={{ padding: '1.2rem', textAlign: 'left' }}>Date & Time</th>
                                    <th style={{ padding: '1.2rem', textAlign: 'left' }}>Activity</th>
                                    <th style={{ padding: '1.2rem', textAlign: 'left' }}>IP Address</th>
                                    <th style={{ padding: '1.2rem', textAlign: 'left' }}>Location</th>
                                    <th style={{ padding: '1.2rem', textAlign: 'left' }}>Device</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activityLog.map((log, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
                                        <td style={{ padding: '1.2rem' }}>{log.date}</td>
                                        <td style={{ padding: '1.2rem' }}>{log.activity}</td>
                                        <td style={{ padding: '1.2rem' }}>{log.ip}</td>
                                        <td style={{ padding: '1.2rem' }}>{log.location}</td>
                                        <td style={{ padding: '1.2rem' }}>{log.device}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: '#D4AF37', display: 'block', margin: '1.5rem auto 0', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => alert('Viewing full log...')}>View Full Activity Log →</button>
                </div>
            </section>
        </>
    );
}
