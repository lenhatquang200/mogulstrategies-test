'use client';

import PageTitle from '@/components/admin/PageTitle';
import { useState } from 'react';
import { FaSave, FaPowerOff, FaCheckCircle, FaServer } from 'react-icons/fa';

export default function SettingsPage() {
    const [toggles, setToggles] = useState({
        twoFA: true,
        ipWhitelist: false,
        emailNotifs: true,
        smsAlerts: false
    });

    const toggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="pb-20">
            <PageTitle>System Settings</PageTitle>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* General Settings */}
                <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/20 pb-4">General Settings</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-mogul-gold">Platform Name</label>
                            <input type="text" defaultValue="Mogul Strategies Investors Portal" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-mogul-gold">Support Email</label>
                            <input type="email" defaultValue="support@mogulstrategies.com" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-mogul-gold">Maintenance Message</label>
                            <textarea className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold h-32 resize-none" placeholder="Optional message displayed during maintenance..."></textarea>
                        </div>
                        <button className="w-full py-3 bg-mogul-gold text-mogul-dark rounded-xl font-bold hover:bg-white transition-all shadow-gold flex justify-center items-center gap-2">
                            <FaSave /> Save General Settings
                        </button>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/20 pb-4">Security Settings</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-white font-bold">Require 2FA for All Admins</span>
                            <div
                                onClick={() => toggle('twoFA')}
                                className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${toggles.twoFA ? 'bg-mogul-gold' : 'bg-gray-700'}`}
                            >
                                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${toggles.twoFA ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white font-bold">Enable IP Whitelisting</span>
                            <div
                                onClick={() => toggle('ipWhitelist')}
                                className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${toggles.ipWhitelist ? 'bg-mogul-gold' : 'bg-gray-700'}`}
                            >
                                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${toggles.ipWhitelist ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white font-bold">Session Timeout (minutes)</span>
                            <input type="number" defaultValue="30" className="w-20 bg-black/40 border border-mogul-gold/20 rounded-lg px-2 py-1 text-center text-white focus:outline-none focus:border-mogul-gold" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-mogul-gold">Allowed Admin IPs (one per line)</label>
                            <textarea className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold h-32 resize-none font-mono text-sm" defaultValue={`10.0.0.50\n192.168.1.100`}></textarea>
                        </div>
                        <button className="w-full py-3 bg-mogul-gold text-mogul-dark rounded-xl font-bold hover:bg-white transition-all shadow-gold flex justify-center items-center gap-2">
                            <FaSave /> Save Security Settings
                        </button>
                    </div>
                </div>

                {/* Email & Notification Settings */}
                <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/20 pb-4">Email & Notification Settings</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-mogul-gold">SMTP Server</label>
                            <input type="text" defaultValue="smtp.mogulstrategies.com" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-mogul-gold">From Email Address</label>
                            <input type="email" defaultValue="no-reply@mogulstrategies.com" className="w-full bg-black/40 border border-mogul-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mogul-gold" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white font-bold">Enable Email Notifications</span>
                            <div
                                onClick={() => toggle('emailNotifs')}
                                className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${toggles.emailNotifs ? 'bg-mogul-gold' : 'bg-gray-700'}`}
                            >
                                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${toggles.emailNotifs ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white font-bold">Enable SMS Alerts (Twilio)</span>
                            <div
                                onClick={() => toggle('smsAlerts')}
                                className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${toggles.smsAlerts ? 'bg-mogul-gold' : 'bg-gray-700'}`}
                            >
                                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${toggles.smsAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-mogul-gold text-mogul-dark rounded-xl font-bold hover:bg-white transition-all shadow-gold flex justify-center items-center gap-2">
                            <FaSave /> Save Notification Settings
                        </button>
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-mogul-darker rounded-2xl p-8 border border-mogul-gold/10 animate-pulse-glow flex flex-col">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 border-b border-mogul-gold/20 pb-4">System Status</h3>
                    <div className="grid grid-cols-2 gap-4 mb-8 flex-1">
                        <div className="bg-black/30 rounded-xl p-4 text-center border border-mogul-gold/5 flex flex-col items-center justify-center">
                            <FaCheckCircle className="text-green-500 text-3xl mb-2" />
                            <div className="text-green-500 font-bold text-lg">Online</div>
                            <div className="text-xs text-gray-400">Portal Status</div>
                        </div>
                        <div className="bg-black/30 rounded-xl p-4 text-center border border-mogul-gold/5 flex flex-col items-center justify-center">
                            <FaCheckCircle className="text-green-500 text-3xl mb-2" />
                            <div className="text-green-500 font-bold text-lg">Healthy</div>
                            <div className="text-xs text-gray-400">Database</div>
                        </div>
                        <div className="bg-black/30 rounded-xl p-4 text-center border border-mogul-gold/5 flex flex-col items-center justify-center">
                            <FaCheckCircle className="text-green-500 text-3xl mb-2" />
                            <div className="text-green-500 font-bold text-lg">Active</div>
                            <div className="text-xs text-gray-400">Email Service</div>
                        </div>
                        <div className="bg-black/30 rounded-xl p-4 text-center border border-mogul-gold/5 flex flex-col items-center justify-center">
                            <FaServer className="text-green-500 text-3xl mb-2" />
                            <div className="text-green-500 font-bold text-lg">Running</div>
                            <div className="text-xs text-gray-400">Background Jobs</div>
                        </div>
                    </div>
                    <button className="w-full py-4 bg-red-500/20 text-red-500 border border-red-500/50 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all flex justify-center items-center gap-2 mt-auto">
                        <FaPowerOff /> Trigger Maintenance Mode
                    </button>
                </div>
            </div>
        </div>
    );
}
