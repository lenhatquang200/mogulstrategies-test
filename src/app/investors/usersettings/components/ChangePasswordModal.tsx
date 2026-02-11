'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    hasPassword: boolean;
    onSubmit: (data: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }) => void;
}

export default function ChangePasswordModal({
    isOpen,
    hasPassword,
    onClose,
    onSubmit,
}: ChangePasswordModalProps) {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        if (form.newPassword !== form.confirmPassword) {
            toast.error('New password does not match');
            return;
        }

        if (hasPassword && !form.currentPassword) {
            toast.error('Current password is required');
            return;
        }

        onSubmit(form);
    };


    return (
        <div
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80"
            onClick={onClose}
        >
            <div
                className="relative w-[90%] max-w-[600px] rounded-2xl bg-[#112240] p-10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <span
                    className="absolute right-6 top-4 cursor-pointer text-3xl text-[#AAAAAA] hover:text-white transition"
                    onClick={onClose}
                >
                    ×
                </span>

                {/* Title */}
                <h3 className="mb-8 text-2xl font-bold text-[#D4AF37]">
                    {hasPassword ? 'Change Password' : 'Set Password'}
                </h3>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6" >
                    {hasPassword && (
                        <div>
                            <label className="mb-2 block font-medium text-gray-300">
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                required
                                value={form.currentPassword}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-[#D4AF37] bg-[#0A1A2F] px-4 py-4 text-gray-200"
                            />
                        </div>
                    )}

                    <div>
                        <label className="mb-2 block font-medium text-gray-300">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            required
                            value={form.newPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-[#D4AF37] bg-[#0A1A2F] px-4 py-4 text-gray-200"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium text-gray-300">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-[#D4AF37] bg-[#0A1A2F] px-4 py-4 text-gray-200"
                        />
                    </div>

                    <div className="mt-10">
                        <button
                            type="submit"
                            className="rounded-lg bg-[#D4AF37] px-8 py-4 font-bold text-[#0A1A2F] hover:opacity-90 transition"
                        >
                            {hasPassword ? 'Update Password' : 'Set Password'}
                        </button>
                    </div>
                    </form>


                
            </div>
        </div>
    );
}
