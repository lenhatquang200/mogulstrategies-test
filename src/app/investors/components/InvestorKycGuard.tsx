'use client';

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useKyc } from "@/contexts/KycContext";

const KYC_PROTECTED_ROUTES = [
  "/investors/performanceanalytics",
  "/investors/activeofferings",
  "/investors/syndications",
  "/investors/financial",
  "/investors/subscriptioncenter",
];

export function InvestorKycGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { kycCompleted, loading } = useKyc();

  const isKycProtectedRoute = KYC_PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  useEffect(() => {
    if (loading) return;

    if (isKycProtectedRoute && !kycCompleted) {
      router.replace("/investors/kyc1");
    }
  }, [loading, kycCompleted, isKycProtectedRoute, router]);

  if (loading) return null;
  if (isKycProtectedRoute && !kycCompleted) return null;

  return <>{children}</>;
}

export function InvestorKycGuard1({ children }: { children: React.ReactNode }) {
  const { kycCompleted, loading } = useKyc();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const isKycRoute = pathname.startsWith("/investors/kyc");

    if (kycCompleted === false && !isKycRoute) {
      router.replace("/investors/kyc1");
    }
  }, [kycCompleted, loading, pathname, router]);

  if (loading) return null;

  if (
    kycCompleted === false &&
    !pathname.startsWith("/investors/kyc")
  ) {
    return null;
  }

  return <>{children}</>;
}
