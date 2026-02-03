'use client';
import React from 'react';

export default function NotificationsPopup() {

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
    <div
      className="notification-scroll w-[420px] max-h-[70vh] overflow-y-auto rounded-2xl bg-[#0B1C33] shadow-xl p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#D4AF37]">
          {/* Notifications */}
        </h3>
        <button
          className="text-sm text-[#D4AF37] hover:underline" onClick={() => alert('Mark all as read...')}
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`rounded-xl p-4 ${
              n.unread
                ? 'bg-[#112240] border-l-4 border-[#D4AF37]'
                : 'bg-[#0F2545]'
            }`}
          >
            <div className="flex gap-3">
              <div className="text-2xl">{n.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-[#D4AF37]">
                  {n.title}
                </div>
                <div className="text-sm mt-1">
                  {n.message}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  {n.date}
                </div>

                <div className="flex gap-4 mt-3">
                    {n.actions.map((a, idx) => (
                        <button
                        key={idx}
                        onClick={a.onClick}
                        className="text-sm font-semibold text-[#D4AF37] hover:underline"
                        >
                        {a.label}
                        </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
