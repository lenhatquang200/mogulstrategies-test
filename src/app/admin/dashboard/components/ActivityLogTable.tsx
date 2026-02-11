'use client';

import { useEffect, useState } from 'react';
import SearchBar from '@/components/admin/SearchBar';

type Activity = {
  id: number;
  action: string;
  details?: string | null;
  ipAddress?: string | null;
  createdAt: string;
  user?: {
    name?: string | null;
    userCode?: string | null;
    role?: {
      name: string;
    };
  } | null;
};

export default function ActivityLogTable() {
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/admin/activity-log?search=${searchQuery}`)
        .then(res => res.json())
        .then(res => setActivities(res.data ?? []))
        .finally(() => setLoading(false));
    }, [searchQuery]);

    const getActionBadgeStyle = (action: string) => {
        if (action.includes('LOGIN')) return 'bg-cyan-500/10 text-cyan-400';
        if (action.includes('KYC')) return 'bg-mogul-gold/10 text-mogul-gold';
        return 'bg-white/10 text-gray-300';
    };

    return (
        <section className="bg-mogul-darker rounded-2xl p-8 animate-pulse-glow">
            <h3 className="text-2xl font-display font-bold text-mogul-gold mb-6 pb-3 border-b border-mogul-gold/30">
                Recent Activity Log
            </h3>

            {/* Search + Filter */}
            <form
                className="mb-6 flex gap-4"
                onSubmit={(e) => {
                    e.preventDefault();        // chặn reload page
                    setSearchQuery(searchInput);
                }}
                >
                <SearchBar
                    placeholder="Search activity..."
                    value={searchInput}
                    onChange={setSearchInput}
                    className="flex-1"
                />

                <button
                    type="submit"
                    className="px-6 py-4 bg-mogul-gold text-mogul-dark rounded-lg font-bold hover:bg-white transition-colors duration-300"
                >
                    Filter
                </button>
            </form>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                <thead>
                    <tr className="bg-mogul-gold/10 text-mogul-gold">
                    <th className="p-4 text-left">Time</th>
                    <th className="p-4 text-left">User</th>
                    <th className="p-4 text-left">Action</th>
                    <th className="p-4 text-left">Details</th>
                    <th className="p-4 text-left">IP Address</th>
                    </tr>
                </thead>
                    <tbody>
                        {loading && (
                        <tr>
                            <td colSpan={5} className="p-6 text-center text-gray-400">
                            Loading...
                            </td>
                        </tr>
                        )}

                        {!loading && activities.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-6 text-center text-gray-400">
                            No activity found
                            </td>
                        </tr>
                        )}

                        {activities.map((activity) => (
                            <tr
                                key={activity.id}
                                className="border-b border-mogul-gold/10 hover:bg-mogul-gold/5"
                            >
                                {/* Time */}
                                <td className="p-4">
                                {new Date(activity.createdAt).toLocaleString()}
                                </td>

                                {/* User */}
                                <td className="p-4">
                                    {activity.user
                                    ? `${activity.user.name ?? 'Unknown'} `
                                    : 'System'}
                                </td>

                                {/* Action */}
                                <td className="p-4">
                                <span
                                    className={`px-3 py-1 rounded text-sm ${getActionBadgeStyle(
                                    activity.action
                                    )}`}
                                >
                                    {activity.action}
                                </span>
                                </td>

                                {/* Details */}
                                <td className="p-4 text-gray-400">
                                {activity.details ?? '—'}
                                </td>

                                {/* IP */}
                                <td className="p-4 font-mono text-sm">
                                {activity.ipAddress ?? '—'}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            
        </section>
    );
}
