'use client';

import React from 'react';

interface LogoutConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function LogoutConfirmationModal({ isOpen, onClose, onConfirm }: LogoutConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0A1A2F] border border-[#D4AF37] rounded-xl p-8 max-w-sm w-full mx-4 shadow-[0_0_30px_rgba(212,175,55,0.2)] animate-pulse-glow">
                <h2 className="text-2xl font-bold text-[#D4AF37] mb-4 text-center font-display">Signout</h2>
                <p className="text-gray-300 text-center mb-8">Are you sure you want to sign out?</p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg border border-gray-600 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 rounded-lg bg-[#D4AF37] text-[#0A1A2F] font-bold hover:bg-[#F4DF87] transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
