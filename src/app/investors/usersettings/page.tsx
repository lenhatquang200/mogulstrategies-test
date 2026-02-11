'use client';
import React, { useState, useEffect } from 'react';
import ActivityLog from './components/ActivityLog';
import AccountDetails from './components/AccountDetails';
import ChangePasswordModal from './components/ChangePasswordModal';
import toast from 'react-hot-toast';
import { useProfile } from "@/contexts/ProfileContext";
import NotificationSettings from './components/NotificationSettings';

export default function UserSettingsPage() {
    const { profile, loading, setProfile } = useProfile();
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

    const [openChangePassword, setOpenChangePassword] = useState(false);
    const handleChangePassword = async (data: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
     }) => {
        try {
            const isSetPassword = !profile?.hasPassword;

            const res = await fetch(
            isSetPassword ? "/api/set-password" : "/api/change-password",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                isSetPassword
                    ? {
                        newPassword: data.newPassword,
                    }
                    : {
                        currentPassword: data.currentPassword,
                        newPassword: data.newPassword,
                    }
                ),
            }
            );

            const result = await res.json();

            if (!res.ok) {
            toast.error(result.message || "Failed to update password");
            return;
            }

            toast.success(
            isSetPassword
                ? "Password set successfully"
                : "Password updated successfully"
            );

            setOpenChangePassword(false);
        } catch (error) {
            console.error("Password error:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <h1 className="page-title">User Settings</h1>

            <section className="settings-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

                <AccountDetails />

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
                                onClick={() => setOpenChangePassword(true)}
                                className="mt-2 rounded-lg border border-[#D4AF37] bg-[#D4AF371A] px-6 py-3 font-bold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A1A2F] transition"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>

                <NotificationSettings  />

                <ActivityLog />

                <ChangePasswordModal
                    isOpen={openChangePassword}
                    onClose={() => setOpenChangePassword(false)}
                    onSubmit={handleChangePassword}
                    hasPassword={!!profile?.hasPassword}
                />

            </section>
        </>
    );
}
