"use client";

import { useState } from "react";

export default function NotificationSettings() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const [events, setEvents] = useState({
    capitalCalls: true,
    distributions: true,
    documents: true,
    kyc: true,
    market: false,
    reminders: true,
  });

  const toggleEvent = (key: keyof typeof events) => {
    setEvents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="settings-card">
      <h3>Notification Preferences</h3>

      <div className="form-grid">
        {/* ===== Email ===== */}
        <div className="form-group">
          <label>Email Notifications</label>

          <div className="toggle-row">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={emailEnabled}
                onChange={(e) => setEmailEnabled(e.target.checked)}
              />
              <span className="slider"></span>
            </label>

            <span className={emailEnabled ? "" : ""}>
              {emailEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        {/* ===== SMS ===== */}
        <div className="form-group">
          <label>SMS Alerts (Critical Only)</label>

          <div className="toggle-row">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={smsEnabled}
                onChange={(e) => setSmsEnabled(e.target.checked)}
              />
              <span className="slider"></span>
            </label>

            <span className={smsEnabled ? "" : ""}>
              {smsEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        {/* ===== Event Types ===== */}
        <div className="form-group full-width">
          <p>Choose which events trigger notifications:</p>

          <div className="notification-grid">
            <label>
              <input
                type="checkbox"
                checked={events.capitalCalls}
                onChange={() => toggleEvent("capitalCalls")}
              />
              New Capital Calls
            </label>

            <label>
              <input
                type="checkbox"
                checked={events.distributions}
                onChange={() => toggleEvent("distributions")}
              />
              Distributions Posted
            </label>

            <label>
              <input
                type="checkbox"
                checked={events.documents}
                onChange={() => toggleEvent("documents")}
              />
              New Documents
            </label>

            <label>
              <input
                type="checkbox"
                checked={events.kyc}
                onChange={() => toggleEvent("kyc")}
              />
              KYC / Compliance Updates
            </label>

            <label>
              <input
                type="checkbox"
                checked={events.market}
                onChange={() => toggleEvent("market")}
              />
              Market Commentary
            </label>

            <label>
              <input
                type="checkbox"
                checked={events.reminders}
                onChange={() => toggleEvent("reminders")}
              />
              Event Reminders
            </label>
          </div>
        </div>
      </div>

      <button className="save-btn">
        Save Notification Preferences
      </button>
    </div>
  );
}
