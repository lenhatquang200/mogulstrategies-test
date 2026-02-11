"use client";

import { useEffect, useState } from "react";
import type { ProfileUpdateData, ProfileData } from "@/types/user";
import toast from 'react-hot-toast';
import { useProfile } from "@/contexts/ProfileContext";

export default function AccountDetails() {
  const { profile, loading, setProfile } = useProfile();
  const [form, setForm] = useState<ProfileUpdateData>({
    name: "",
    email: "",
    phone: "",
    timezone: "",
  });

  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name ?? "",
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        timezone: profile.timezone ?? "",
      });
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json(); // ⚠️ parse TRƯỚC

      if (!res.ok) {
        throw data; // ✅ throw JSON từ API
      }

      setProfile(data);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.message || "Update failed");

      if (error?.field) {
        document.getElementById(error.field)?.focus();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} >
      <div
        id="account-details"
        className="settings-card scroll-anchor settings-card scroll-anchor mb-12 rounded-2xl bg-[#112240] p-10"

      >
        <h3 className="mb-6 border-b border-[#D4AF37]/30 pb-3 text-[2rem] text-[#D4AF37]">
          Profile Settings
        </h3>


        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">

          {/* Full name */}
          <div className="form-group">
            <label className="block mb-2.5 font-medium">Full Name</label>
            <input type="text" name="name" required value={form.name} onChange={handleChange}
              className="w-full rounded-lg border border-[#D4AF37] bg-[#0A1A2F] px-4 py-4 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="block mb-2.5 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              readOnly
              style={{
                width: "100%",
                padding: "1rem",
                background: "#0A1A2F",
                border: "1px solid #D4AF37",
                borderRadius: "8px",
                color: "#E0E0E0",
                opacity: 0.7,
                cursor: "not-allowed",
              }}
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="block mb-2.5 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "1rem",
                background: "#0A1A2F",
                border: "1px solid #D4AF37",
                borderRadius: "8px",
                color: "#E0E0E0",
              }}
            />
          </div>

          {/* Timezone */}
          <div className="form-group">
            <label className="block mb-2.5 font-medium">Timezone</label>
            <select
              name="timezone"
              required
              value={form.timezone}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "1rem",
                background: "#0A1A2F",
                border: "1px solid #D4AF37",
                borderRadius: "8px",
                color: "#E0E0E0",
              }}
            >
              <option value="">Select timezone</option>
              <option value="EST">EST (Eastern Standard Time)</option>
              <option value="PST">PST (Pacific Standard Time)</option>
              <option value="GMT">GMT (Greenwich Mean Time)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="save-btn mt-4 bg-[#D4AF37] text-[#0A1A2F] px-10 py-4 rounded-lg font-bold hover:opacity-90 disabled:opacity-50"
        >
          Save Profile Changes
        </button>
      </div>
    </form>

  );

  
}
