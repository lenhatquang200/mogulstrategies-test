'use client';
import React, { useState, useEffect } from 'react';
import ActivityLog from './components/ActivityLog';
import {ProfileUpdateData} from '@/types/user';
import AccountDetails from './components/AccountDetails';

export default function UserSettingsPage() {
    const [toggles, setToggles] = useState({
        twoFactor: false,
        emailNotifications: true,
        smsAlerts: false
    });
    const [loading2FA, setLoading2FA] = useState(false);

    // Load 2FA status from database on mount
    useEffect(() => {
        const load2FAStatus = async () => {
            try {
                const res = await fetch('/api/auth/toggle-2fa');
                if (res.ok) {
                    const data = await res.json();
                    setToggles(prev => ({ ...prev, twoFactor: data.twoFactorEnabled }));
                }
            } catch (error) {
                console.error('Failed to load 2FA status:', error);
            }
        };
        load2FAStatus();
    }, []);

    const [notificationSettings, setNotificationSettings] = useState({
        capitalCalls: true,
        distributions: true,
        documents: true,
        kyc: true,
        marketCommentary: false,
        eventReminders: true
    });
    
    const handleToggle = async (key: keyof typeof toggles) => {
        if (key === 'twoFactor') {
            setLoading2FA(true);
            try {
                const newValue = !toggles.twoFactor;
                const res = await fetch('/api/auth/toggle-2fa', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ enabled: newValue }),
                });
                
                if (res.ok) {
                    setToggles(prev => ({ ...prev, twoFactor: newValue }));
                    alert(newValue ? '2FA enabled! You will receive a verification code via email when logging in.' : '2FA disabled.');
                } else {
                    const data = await res.json();
                    alert(data.message || 'Failed to update 2FA setting');
                }
            } catch (error) {
                console.error('Failed to toggle 2FA:', error);
                alert('Failed to update 2FA setting');
            } finally {
                setLoading2FA(false);
            }
        } else {
            setToggles(prev => ({ ...prev, [key]: !prev[key] }));
        }
    };

    const handleNotifToggle = (key: keyof typeof notificationSettings) => {
        setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // profile
    const [profile, setProfile] = useState<ProfileUpdateData | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    useEffect(() => {
    const loadProfile = async () => {
        try {
        const res = await fetch("/api/profile");
        if (res.ok) {
            const data = await res.json();
            setProfile(data);
        }
        } finally {
        setLoadingProfile(false);
        }
    };

    loadProfile();
    }, []);

    return (
        <>
            <h1 className="page-title">User Settings</h1>

            <section className="settings-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

                <AccountDetails
                    initialData={profile ?? undefined}
                    loading={loadingProfile}
                />

                <div className="settings-card scroll-anchor" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem', marginBottom: '3rem' }} id="user-preferences">
                    <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.8rem' }}>Security & Two-Factor Authentication</h3>
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="form-group">
                            <label>Two-Factor Authentication (2FA)</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                <span>Currently: <strong style={{ color: toggles.twoFactor ? '#0f0' : '#ff6b6b' }}>{toggles.twoFactor ? 'Enabled' : 'Disabled'}</strong></span>
                                <button
                                    onClick={() => handleToggle('twoFactor')}
                                    disabled={loading2FA}
                                    style={{
                                        position: 'relative', width: '60px', height: '34px', background: toggles.twoFactor ? '#D4AF37' : '#333',
                                        borderRadius: '17px', border: 'none', cursor: loading2FA ? 'wait' : 'pointer', transition: '0.4s',
                                        opacity: loading2FA ? 0.6 : 1
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute', width: '26px', height: '26px', left: toggles.twoFactor ? '30px' : '4px', bottom: '4px',
                                        background: '#E0E0E0', borderRadius: '50%', transition: '0.4s'
                                    }} />
                                </button>
                                {loading2FA && <span style={{ marginLeft: '0.5rem', color: '#888' }}>Saving...</span>}
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

                <ActivityLog />

            </section>
        </>
    );
}
