"use client";

import { useState } from "react";

export default function SecuritySettings() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);

  return (
    <div className="settings-card">
      <h3>Security &amp; Two-Factor Authentication</h3>

      <div className="form-grid">
        {/* ===== 2FA ===== */}
        <div className="form-group">
          <label>Two-Factor Authentication (2FA)</label>

          <div className="twofa-row">
            <span>
              Currently:{" "}
              <strong className={twoFAEnabled ? "status-enabled" : "status-disabled"}>
                {twoFAEnabled ? "Enabled" : "Disabled"}
              </strong>
            </span>

            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={twoFAEnabled}
                onChange={(e) => setTwoFAEnabled(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <p className="twofa-hint">
            Authenticator app (recommended) or SMS
          </p>
        </div>
        

        {/* ===== Password ===== */}
        <div className="form-group">
          <label>Password</label>
          <button
            className="save-btn"
            style={{ width: "auto" }}
          >
            Change Password
          </button>
        </div>
      </div>

      <button className="save-btn">
        Update Security Settings
      </button>
    </div>
  );
}
