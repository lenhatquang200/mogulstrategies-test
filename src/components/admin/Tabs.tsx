'use client';

import { useState } from 'react';

interface Tab {
    id: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
    return (
        <div className="flex gap-4 flex-wrap">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-300
            ${activeTab === tab.id
                            ? 'bg-mogul-gold text-mogul-dark'
                            : 'bg-gray-700 text-gray-300 hover:bg-mogul-gold hover:text-mogul-dark'
                        }
          `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
