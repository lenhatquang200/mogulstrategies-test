export interface AuthUser {
  id: number;
  name: string | null;
  email: string;
  role: string;
}

export interface User {
  id: number;
  name: string | null;
  email: string;
  password: string;
  roleId: number;
  accreditationStatus: string;
  twoFactorEnabled: boolean;
  otpCode?: string | null;
  otpExpiry?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
