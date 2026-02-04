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
}

export type ProfileUpdateData = Pick<
  ProfileData,
  "name" | "email" | "phone" | "timezone"
>;
