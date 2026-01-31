'use client';

import PageTitle from '@/components/admin/PageTitle';
import { useState } from 'react';
import { FaUpload, FaPhoneAlt, FaRobot, FaBullseye, FaCalendarCheck } from 'react-icons/fa';

export default function CreateCampaignPage() {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { id: 1, label: 'Basic Info', icon: FaCalendarCheck },
        { id: 2, label: 'Phone Number', icon: FaPhoneAlt },
        { id: 3, label: 'Script & AI', icon: FaRobot },
        { id: 4, label: 'Targeting', icon: FaBullseye },
        { id: 5, label: 'Review', icon: FaCalendarCheck },
    ];

    return (
        <div className="pb-20 max-w-5xl mx-auto">
            <PageTitle>Create New Campaign</PageTitle>

            {/* Step Indicator */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-3 ${currentStep === step.id
                                ? 'bg-mogul-gold text-mogul-dark shadow-gold'
                                : 'bg-mogul-darker text-gray-500 border border-mogul-gold/10'
                            }`}
                    >
                        <step.icon size={14} />
                        <span className="text-sm">{step.id}. {step.label}</span>
                    </div>
                ))}
            </div>

            {/* Form Container */}
            <div className="bg-mogul-darker rounded-3xl p-8 md:p-12 animate-pulse-glow border border-mogul-gold/20 shadow-2xl">
                <form className="space-y-12">
                    {/* Section 1: Basic Information */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 border-b border-mogul-gold/30 pb-4">
                            <div className="w-10 h-10 rounded-full bg-mogul-gold/20 flex items-center justify-center text-mogul-gold">
                                <span className="font-bold text-lg">1</span>
                            </div>
                            <h3 className="text-2xl font-display font-bold text-mogul-gold text-center">Basic Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Campaign Name *</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-mogul-gold/30 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mogul-gold transition-all"
                                    placeholder="e.g., Q4 Accredited Investor Outreach"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Campaign Type *</label>
                                <select className="w-full bg-black/50 border border-mogul-gold/30 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mogul-gold transition-all">
                                    <option>Voice AI Outbound</option>
                                    <option>Voice AI Inbound Support</option>
                                    <option>SMS Campaign</option>
                                    <option>Hybrid (SMS + Voice)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Primary Goal *</label>
                                <select className="w-full bg-black/50 border border-mogul-gold/30 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mogul-gold transition-all">
                                    <option>Lead Qualification</option>
                                    <option>Capital Call Reminders</option>
                                    <option>Event Promotion</option>
                                    <option>Investor Support</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Expected Volume (calls/SMS)</label>
                                <input
                                    type="number"
                                    className="w-full bg-black/50 border border-mogul-gold/30 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mogul-gold transition-all"
                                    placeholder="e.g., 5000"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Phone Number Assignment */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 border-b border-mogul-gold/30 pb-4">
                            <div className="w-10 h-10 rounded-full bg-mogul-gold/20 flex items-center justify-center text-mogul-gold">
                                <span className="font-bold text-lg">2</span>
                            </div>
                            <h3 className="text-2xl font-display font-bold text-mogul-gold">Assign Phone Number</h3>
                        </div>

                        <div className="bg-black/40 rounded-2xl p-6 border border-mogul-gold/10">
                            <label className="text-xs uppercase tracking-widest text-mogul-gold/60 mb-4 block">Available Twilio Numbers</label>
                            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                                {[
                                    { num: '+1 (555) 421-8921', loc: 'New York area' },
                                    { num: '+1 (555) 888-5678', loc: 'National toll-free' },
                                    { num: '+1 (555) 777-1234', loc: 'Miami area' },
                                    { num: '+1 (855) MOGUL-AI', loc: 'Vanity number' }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-mogul-gold/5 border border-mogul-gold/10 rounded-xl hover:bg-mogul-gold/10 transition-colors cursor-pointer group">
                                        <span className="font-mono text-lg text-mogul-gold group-hover:text-white transition-colors">{item.num}</span>
                                        <span className="text-xs text-gray-500">{item.loc}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-center text-gray-500 italic">Or purchase new number via Twilio integration settings</p>
                        </div>
                    </div>

                    {/* Section 3: AI Script & Prompt */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 border-b border-mogul-gold/30 pb-4">
                            <div className="w-10 h-10 rounded-full bg-mogul-gold/20 flex items-center justify-center text-mogul-gold">
                                <span className="font-bold text-lg">3</span>
                            </div>
                            <h3 className="text-2xl font-display font-bold text-mogul-gold">AI Script & Behavior (SimpleTalkAI)</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">AI System Prompt *</label>
                                <textarea
                                    className="w-full bg-black/50 border border-mogul-gold/30 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mogul-gold transition-all min-h-[150px]"
                                    placeholder="You are a professional, warm, and knowledgeable investor relations associate for Mogul Strategies..."
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Voice Profile</label>
                                    <select className="w-full bg-black/50 border border-mogul-gold/30 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mogul-gold transition-all">
                                        <option>Matthew (Professional male)</option>
                                        <option>Joanna (Warm female)</option>
                                        <option>Custom Neural Voice</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Language</label>
                                    <select className="w-full bg-black/50 border border-mogul-gold/30 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mogul-gold transition-all">
                                        <option>English (US)</option>
                                        <option>English (UK)</option>
                                        <option>Spanish</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 flex flex-col sm:flex-row justify-end gap-4 border-t border-mogul-gold/20">
                        <button type="button" className="px-10 py-4 bg-transparent border border-mogul-gold text-mogul-gold rounded-xl font-bold hover:bg-mogul-gold hover:text-mogul-dark transition-all">
                            Cancel
                        </button>
                        <button type="submit" className="px-10 py-4 bg-mogul-dark border border-mogul-gold/30 text-mogul-gold rounded-xl font-bold hover:bg-mogul-gold/10 transition-all">
                            Save as Draft
                        </button>
                        <button type="submit" className="px-10 py-4 bg-mogul-gold text-mogul-dark rounded-xl font-bold hover:bg-white shadow-gold transition-all">
                            Launch Campaign
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
