'use client';

import PageTitle from '@/components/admin/PageTitle';
import { useState } from 'react';
import { FaSync, FaPlug, FaKey, FaLink, FaDatabase, FaEye, FaCopy, FaTrash, FaEdit, FaPlus, FaUpload } from 'react-icons/fa';

export default function IntegrationManagementPage() {
    const integrations = [
        { name: 'JPMorgan Chase Banking API', status: 'online' },
        { name: 'Parallel Markets KYC Provider', status: 'online' },
        { name: 'SendGrid Email Service', status: 'online' },
        { name: 'Stripe Payment Gateway', status: 'warning' },
        { name: 'DocuSign E-Signature', status: 'offline' },
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'warning': return 'bg-yellow-500';
            case 'offline': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="pb-20">
            <PageTitle>Integration Management</PageTitle>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Third-Party Status */}
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow border border-mogul-gold/10">
                    <div className="flex items-center gap-3 mb-8 border-b border-mogul-gold/20 pb-4">
                        <FaPlug className="text-mogul-gold text-2xl" />
                        <h3 className="text-2xl font-display font-bold text-mogul-gold">Third-Party Status</h3>
                    </div>
                    <div className="space-y-4">
                        {integrations.map((int, i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-black/30 rounded-xl border border-mogul-gold/5 group hover:border-mogul-gold/20 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${getStatusStyle(int.status)} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}></div>
                                    <span className="text-white font-medium">{int.name}</span>
                                </div>
                                <button className="p-2 text-mogul-gold/60 hover:text-white transition-colors">
                                    <FaSync size={14} className="hover:rotate-180 transition-transform duration-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* API Key Management */}
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow border border-mogul-gold/10">
                    <div className="flex items-center gap-3 mb-8 border-b border-mogul-gold/20 pb-4">
                        <FaKey className="text-mogul-gold text-2xl" />
                        <h3 className="text-2xl font-display font-bold text-mogul-gold">API Key Management</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            {[
                                { name: 'JPMorgan API Key', key: 'sk_live_51J...' },
                                { name: 'Parallel Markets Key', key: 'pm_live_abc123...' }
                            ].map((k, i) => (
                                <div key={i} className="space-y-2">
                                    <label className="text-xs text-gray-500 uppercase tracking-widest">{k.name}</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 flex items-center bg-black/40 border border-mogul-gold/20 rounded-lg px-4 py-3">
                                            <input type="password" value={k.key} readOnly className="bg-transparent text-white font-mono text-sm w-full outline-none" />
                                            <button className="text-gray-500 hover:text-mogul-gold mx-2"><FaEye size={12} /></button>
                                            <button className="text-gray-500 hover:text-mogul-gold"><FaCopy size={12} /></button>
                                        </div>
                                        <button className="px-4 py-2 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 py-4 bg-mogul-gold/10 text-mogul-gold border border-mogul-gold/30 rounded-xl font-bold hover:bg-mogul-gold hover:text-mogul-dark transition-all">
                            <FaPlus size={14} /> Add New API Key
                        </button>
                    </div>
                </div>

                {/* Webhook Configuration */}
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow border border-mogul-gold/10">
                    <div className="flex items-center gap-3 mb-8 border-b border-mogul-gold/20 pb-4">
                        <FaLink className="text-mogul-gold text-2xl" />
                        <h3 className="text-2xl font-display font-bold text-mogul-gold">Webhooks</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            {[
                                { url: 'https://crm.mogul.com/webhook', status: 'online', msg: 'Last delivery: 2 min ago' },
                                { url: 'https://accounting.mogul.com/api', status: 'warning', msg: 'Failed last 3 deliveries' }
                            ].map((w, i) => (
                                <div key={i} className="p-4 bg-black/40 rounded-xl border border-mogul-gold/10 group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-sm font-mono text-cyan-400 truncate max-w-[80%]">{w.url}</span>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-gray-500 hover:text-mogul-gold"><FaEdit size={12} /></button>
                                            <button className="text-gray-500 hover:text-red-500"><FaTrash size={12} /></button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                        <div className={`w-2 h-2 rounded-full ${getStatusStyle(w.status)}`}></div>
                                        {w.msg}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4 bg-black/20 p-6 rounded-xl border border-mogul-gold/5">
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 uppercase tracking-widest pl-1">New Webhook URL</label>
                                <input type="url" placeholder="https://..." className="w-full bg-black/40 border border-mogul-gold/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mogul-gold transition-all" />
                            </div>
                            <button className="w-full py-3 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-all text-sm">
                                Register Webhook
                            </button>
                        </div>
                    </div>
                </div>

                {/* Data Import/Export */}
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow border border-mogul-gold/10">
                    <div className="flex items-center gap-3 mb-8 border-b border-mogul-gold/20 pb-4">
                        <FaDatabase className="text-mogul-gold text-2xl" />
                        <h3 className="text-2xl font-display font-bold text-mogul-gold">Data Mobility</h3>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-xs text-gray-500 uppercase tracking-widest">Bulk Export</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="py-4 bg-mogul-gold/10 text-mogul-gold border border-mogul-gold/20 rounded-xl hover:bg-mogul-gold hover:text-mogul-dark transition-all text-xs font-bold">
                                    Export CSV
                                </button>
                                <button className="py-4 bg-mogul-gold/10 text-mogul-gold border border-mogul-gold/20 rounded-xl hover:bg-mogul-gold hover:text-mogul-dark transition-all text-xs font-bold">
                                    Export JSON
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4 text-center">
                            <label className="text-xs text-gray-500 uppercase tracking-widest block text-left">Bulk Import</label>
                            <div className="border-2 border-dashed border-mogul-gold/20 rounded-2xl p-10 hover:border-mogul-gold/50 cursor-pointer transition-all bg-black/20 group">
                                <FaUpload className="text-mogul-gold/20 group-hover:text-mogul-gold group-hover:scale-110 transition-all mx-auto text-4xl mb-4" />
                                <div className="text-sm text-gray-400">Drag & drop source file</div>
                                <div className="text-[10px] text-gray-600 mt-2 uppercase">Supports: .csv, .json, .xlsx</div>
                            </div>
                            <button className="w-full py-4 bg-mogul-gold text-mogul-dark rounded-xl font-bold hover:bg-white transition-all">
                                Process Import
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
