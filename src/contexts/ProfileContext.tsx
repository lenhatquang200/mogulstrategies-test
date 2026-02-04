// src/contexts/ProfileContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ProfileData } from "@/types/user";

type ProfileContextType = {
  profile: ProfileData | null;
  loading: boolean;
  setProfile: (profile: ProfileData) => void;
  refreshProfile: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data: ProfileData = await res.json();
      setProfile(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        setProfile,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }
  return ctx;
}
