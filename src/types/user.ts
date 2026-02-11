export interface ProfileData {
  name: string;
  email: string;
  role: string;
  investorType: string;
  userCode?: string,
  joined: string;
  lastLogin: string | null;
  phone?: string;
  timezone?: string;
  hasPassword?: boolean;
}

export type ProfileUpdateData = Pick<
  ProfileData,
  "name" | "email" | "phone" | "timezone"
>;

export interface User {
  id: number; // AUTO_INCREMENT
  name: string | null;
  email: string;
  phone: string | null;
  timezone: string | null;

  roleId: number;

  accreditationStatus: string; // individual | approved | pending | rejected
  twoFactorEnabled: boolean;

  otpExpiry: Date | null;

  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;

  userCode: string | null; // MS-INV-xxxx
  status: number; // 1 = active, 0 = inactive, -1 = banned
  verificationStatus: number; // 0 = pending, 1 = verified

  settings?: any; // JSON / object
}
