'use client';

import { useEffect, useState } from 'react';

type ProfileResponse = {
    name: string | null;
    email: string;
    investorType: string;
    joined: string;
    lastLogin: string | null;
};

export default function AccountInfoCard() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile', {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch profile');

        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error('AccountInfo fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="top-card account-info-card">
        <p>Loading account information...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="top-card account-info-card">
        <p>Unable to load account information</p>
      </div>
    );
  }

  const accountId = `MS-INV-${profile.email.slice(0, 4).toUpperCase()}`;

  return (
    <div className="top-card account-info-card">
      <h3>Account Information</h3>
      <ul>
        <li>
          <strong>Name:</strong> {profile.name ?? '—'}
        </li>
        <li>
          <strong>Email:</strong> {profile.email}
        </li>
        <li>
          <strong>Investor Type:</strong> {profile.investorType}
        </li>
        <li>
          <strong>Account ID:</strong> {accountId}
        </li>
        <li>
          <strong>Joined:</strong> {profile.joined}
        </li>
        <li>
          <strong>Last Login:</strong> {profile.lastLogin ?? '—'}
        </li>
      </ul>
    </div>
  );
}
