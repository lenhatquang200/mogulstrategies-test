"use client";

import { useEffect, useState } from "react";
import type { ProfileUpdateData } from "@/types/user";
import toast from 'react-hot-toast';

interface AccountDetailsProps {
  initialData?: ProfileUpdateData;
  loading?: boolean;
}


export default function AccountDetailsCard({
  initialData,
  loading: loadingProfile,
}: AccountDetailsProps) {
  const [form, setForm] = useState<ProfileUpdateData>({
    name: "",
    email: "",
    phone: "",
    timezone: "",
  });

  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name ?? "",
        email: initialData.email ?? "",
        phone: initialData.phone ?? "",
        timezone: initialData.timezone ?? "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const disabled = loadingProfile || saving;

  return (
    <div className="settings-card scroll-anchor" style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem', marginBottom: '3rem' }} id="account-details">
        <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.8rem' }}>Profile Settings</h3>
        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="form-group">
                <label className="block mb-2.5 font-medium">Full Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} style={{ width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }} />
            </div>
            <div className="form-group">
                <label className="block mb-2.5 font-medium">Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }} readOnly/>
            </div>
            <div className="form-group">
                <label className="block mb-2.5 font-medium">Phone Number</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} style={{ width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }} />
            </div>
            <div className="form-group">
                <label className="block mb-2.5 font-medium">Timezone</label>
                <select name="timezone" style={{ width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0' }}>
                    <option>EST (Eastern Standard Time)</option>
                    <option>PST (Pacific Standard Time)</option>
                    <option>GMT (Greenwich Mean Time)</option>
                </select>
            </div>
        </div>
        <button onClick={handleSubmit} disabled={disabled} 
            className="save-btn mt-4 bg-[#D4AF37] text-[#0A1A2F] px-10 py-4 rounded-lg font-bold hover:opacity-90 disabled:opacity-50">
            Save Profile Changes
        </button>
    </div>
  );
}
