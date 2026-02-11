'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Toggles = {
  emailNotifications: boolean;
  smsAlerts: boolean;
};

type NotificationEvents = {
  [key: string]: boolean;
};

export default function NotificationSettings() {
  /* =====================
     STATE
  ====================== */
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [toggles, setToggles] = useState<Toggles>({
    emailNotifications: false,
    smsAlerts: false,
  });

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationEvents>({
      capitalCalls: false,
      distributions: false,
      documents: false,
      kyc: false,
      marketCommentary: false,
      eventReminders: false,
    });

  /* =====================
     FETCH SETTINGS
  ====================== */
  async function fetchSettings() {
    try {
      const res = await fetch('/api/profile/settings');
      if (!res.ok) return;

      const data = await res.json();

      if (data?.notifications) {
        setToggles({
          emailNotifications: data.notifications.emailNotifications,
          smsAlerts: data.notifications.smsAlerts,
        });

        setNotificationSettings(data.notifications.events);
      }
    } finally {
      setLoading(false);
    }
  }

  /* =====================
     HANDLERS
  ====================== */
  function handleToggle(key: keyof Toggles) {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function handleNotifToggle(key: keyof NotificationEvents) {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  async function handleSave() {
    setSaving(true);

    try {
      await fetch('/api/profile/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notifications: {
            ...toggles,
            events: notificationSettings,
          },
        }),
      });

      toast.success('Preferences saved!');
    } catch {
      toast.error('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading) return null;

  /* =====================
     UI
  ====================== */
  return (
    <div
      className="settings-card"
      style={{
        background: '#112240',
        borderRadius: '16px',
        padding: '2.5rem',
        marginBottom: '3rem',
      }}
    >
      <h3
        style={{
          fontSize: '2rem',
          color: '#D4AF37',
          marginBottom: '1.5rem',
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
          paddingBottom: '0.8rem',
        }}
      >
        Notification Preferences
      </h3>

      {/* TOGGLES */}
      <div className="form-group"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        {(
          [
            ['emailNotifications', 'Email Notifications'],
            ['smsAlerts', 'SMS Alerts (Critical Only)'],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <label>{label}</label>
            <button
              onClick={() => handleToggle(key)}
              style={{
                position: 'relative',
                width: '60px',
                height: '34px',
                background: toggles[key] ? '#D4AF37' : '#333',
                borderRadius: '17px',
                border: 'none',
                cursor: 'pointer',
                transition: '0.4s',
                marginTop: '0.5rem',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '26px',
                  height: '26px',
                  left: toggles[key] ? '30px' : '4px',
                  bottom: '4px',
                  background: '#E0E0E0',
                  borderRadius: '50%',
                  transition: '0.4s',
                }}
              />
            </button>
          </div>
          
        ))}
      </div>

      {/* EVENTS */}
      <div style={{ marginTop: '2rem' }}>
        <p style={{ fontWeight: 500, marginBottom: '1rem' }}>
          Choose which events trigger notifications:
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
          }}
        >
          {Object.entries(notificationSettings).map(([key, value]) => (
            <label
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleNotifToggle(key)}
                style={{
                  width: '20px',
                  height: '20px',
                  accentColor: '#D4AF37',
                }}
              />
              {key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, s => s.toUpperCase())}
            </label>
          ))}
        </div>
      </div>

    <button
        onClick={handleSave}
        disabled={saving}
        className="
            mt-8
            px-10 py-4
            rounded-lg
            font-bold
            bg-[#D4AF37] text-[#0A1A2F]
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            hover:opacity-90">
        {saving ? "Saving..." : "Save Preferences"}
    </button>

    </div>
  );
}
