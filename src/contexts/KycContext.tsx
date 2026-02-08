"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type KycContextType = {
  kycCompleted: boolean | null;
  loading: boolean;
  refreshKyc: () => Promise<void>;
};

const KycContext = createContext<KycContextType | null>(null);

export function KycProvider({ children }: { children: React.ReactNode }) {
  const [kycCompleted, setKycCompleted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchKyc = async () => {
    try {
      const res = await fetch("/api/kyc/progress", {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data)
      setKycCompleted(data.currentStep>=3 ? true : false); // temp logic for DEMO
    } catch {
      setKycCompleted(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKyc();
  }, []);

  return (
    <KycContext.Provider value={{ kycCompleted, loading, refreshKyc: fetchKyc }}>
      {children}
    </KycContext.Provider>
  );
}

export const useKyc = () => {
  const ctx = useContext(KycContext);
  if (!ctx) throw new Error("useKyc must be used inside KycProvider");
  return ctx;
};
