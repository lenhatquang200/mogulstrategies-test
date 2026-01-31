'use client';

import PageTitle from '@/components/admin/PageTitle';
import { useState } from 'react';
import { FaSave } from 'react-icons/fa';

export default function SettingsPage() {
    const [platformName, setPlatformName] = useState('Mogul Strategies Investors Portal');
    const [supportEmail, setSupportEmail] = useState('support@mogulstrategies.com');
    const [maintenanceMessage, setMaintenanceMessage] = useState('');
    const [require2FA, setRequire2FA] = useState(true);
    const [enableIPWhitelist, setEnableIPWhitelist] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState(30);
    const [allowedIPs, setAllowedIPs] = useState('');
    const [smtpServer, setSmtpServer] = useState('smtp.mogulstrategies.com');
    const [fromEmail, setFromEmail] = useState('no-reply@mogulstrategies.com');
    const [enableEmailNotifications, setEnableEmailNotifications] = useState(true);
    const [enableSMSAlerts, setEnableSMSAlerts] = useState(false);

    return (
        <div className="pb-20">
            <PageTitle>System Settings</PageTitle>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* General Settings */}
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 pb-3 border-b border-mogul-gold/30">
                        General Settings
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">Platform Name</label>
                            <input
                                type="text"
                                value={platformName}
                                onChange={(e) => setPlatformName(e.target.value)}
                                className="w-full px-4 py-3 bg-mogul-dark border border-mogul-gold rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-mogul-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">Support Email</label>
                            <input
                                type="email"
                                value={supportEmail}
                                onChange={(e) => setSupportEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-mogul-dark border border-mogul-gold rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-mogul-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">Maintenance Message</label>
                            <textarea
                                value={maintenanceMessage}
                                onChange={(e) => setMaintenanceMessage(e.target.value)}
                                placeholder="Optional message displayed during maintenance..."
                                rows={4}
                                className="w-full px-4 py-3 bg-mogul-dark border border-mogul-gold rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-mogul-gold resize-vertical"
                            />
                        </div>

                        <button className="flex items-center gap-2 px-6 py-3 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-colors duration-300">
                            <FaSave /> Save General Settings
                        </button>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 pb-3 border-b border-mogul-gold/30">
                        Security Settings
                    </h3>

                    <div className="space-y-6">
                        {/* Toggle Switches */}
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-medium">Require 2FA for All Admins</span>
                            <label className="relative inline-block w-14 h-8">
                                <input
                                    type="checkbox"
                                    checked={require2FA}
                                    onChange={(e) => setRequire2FA(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-14 h-8 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-mogul-gold rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-mogul-gold"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-medium">Enable IP Whitelisting</span>
                            <label className="relative inline-block w-14 h-8">
                                <input
                                    type="checkbox"
                                    checked={enableIPWhitelist}
                                    onChange={(e) => setEnableIPWhitelist(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-14 h-8 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-mogul-gold rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-mogul-gold"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-medium">Session Timeout (minutes)</span>
                            <input
                                type="number"
                                value={sessionTimeout}
                                onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                                className="w-24 px-3 py-2 bg-mogul-dark border border-mogul-gold rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-mogul-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">Allowed Admin IPs (one per line)</label>
                            <textarea
                                value={allowedIPs}
                                onChange={(e) => setAllowedIPs(e.target.value)}
                                placeholder="10.0.0.50&#10;192.168.1.100"
                                rows={4}
                                className="w-full px-4 py-3 bg-mogul-dark border border-mogul-gold rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-mogul-gold resize-vertical font-mono text-sm"
                            />
                        </div>

                        <button className="flex items-center gap-2 px-6 py-3 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-colors duration-300">
                            <FaSave /> Save Security Settings
                        </button>
                    </div>
                </div>

                {/* Email & Notification Settings */}
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 pb-3 border-b border-mogul-gold/30">
                        Email & Notification Settings
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">SMTP Server</label>
                            <input
                                type="text"
                                value={smtpServer}
                                onChange={(e) => setSmtpServer(e.target.value)}
                                className="w-full px-4 py-3 bg-mogul-dark border border-mogul-gold rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-mogul-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">From Email Address</label>
                            <input
                                type="email"
                                value={fromEmail}
                                onChange={(e) => setFromEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-mogul-dark border border-mogul-gold rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-mogul-gold"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-medium">Enable Email Notifications</span>
                            <label className="relative inline-block w-14 h-8">
                                <input
                                    type="checkbox"
                                    checked={enableEmailNotifications}
                                    onChange={(e) => setEnableEmailNotifications(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-14 h-8 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-mogul-gold rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-mogul-gold"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-medium">Enable SMS Alerts (Twilio)</span>
                            <label className="relative inline-block w-14 h-8">
                                <input
                                    type="checkbox"
                                    checked={enableSMSAlerts}
                                    onChange={(e) => setEnableSMSAlerts(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-14 h-8 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-mogul-gold rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-mogul-gold"></div>
                            </label>
                        </div>

                        <button className="flex items-center gap-2 px-6 py-3 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-colors duration-300">
                            <FaSave /> Save Notification Settings
                        </button>
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
                    <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 pb-3 border-b border-mogul-gold/30">
                        System Status
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {[
                            { label: 'Portal Status', value: 'Online', color: 'text-cyan-400' },
                            { label: 'Database', value: 'Healthy', color: 'text-cyan-400' },
                            { label: 'Email Service', value: 'Active', color: 'text-cyan-400' },
                            { label: 'Background Jobs', value: 'Running', color: 'text-cyan-400' },
                        ].map((item, idx) => (
                            <div key={idx} className="text-center p-4 bg-mogul-dark rounded-xl">
                                <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                                <div className="text-sm text-gray-400 mt-1">{item.label}</div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full px-6 py-3 bg-red-500/20 text-red-400 border border-red-400 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-colors duration-300">
                        Trigger Maintenance Mode
                    </button>
                </div>
            </div>
        </div>
    );
}
