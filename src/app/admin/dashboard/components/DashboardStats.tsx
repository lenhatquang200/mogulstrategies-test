'use client';

import { useEffect, useState } from 'react';
import StatCard from '@/components/admin/StatCard';

type Stats = {
  totalInvestors: number;
  verifiedInvestors: number;
};

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/admin/dashboard/stats')
      .then(res => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 py-2">
        <StatCard value="0" label="Total Investors" />
        <StatCard value="0" label="Verified Investors" />
        <StatCard value="$1.84B" label="Assets Under Management" />
        <StatCard value="6" label="Active Funds" />
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 py-2">
        <StatCard
            value={stats.totalInvestors.toLocaleString()}
            label="Total Investors"
        />
        <StatCard
            value={stats.verifiedInvestors.toLocaleString()}
            label="Verified Investors"
        />
        <StatCard value="$1.84B" label="Assets Under Management" />
        <StatCard value="6" label="Active Funds" />
    </section>
  );
}
