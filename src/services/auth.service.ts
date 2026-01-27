import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
  accreditationStatus?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role?: 'INVESTOR' | 'ADMIN';
}

export class AuthService {
  /**
   * Create a new user with INVESTOR role
   */
  static async createUser(data: CreateUserInput) {
    // Get INVESTOR role
    const investorRole = await prisma.role.findUnique({
      where: { name: 'INVESTOR' }
    });

    if (!investorRole) {
      throw new Error('Investor role not found');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        accreditationStatus: data.accreditationStatus || 'individual',
        roleId: investorRole.id,
        twoFactorEnabled: true,
      },
      include: {
        role: true
      }
    });
  }

  /**
   * Create admin user
   */
  static async createAdmin(data: CreateUserInput) {
    // Get ADMIN role
    const adminRole = await prisma.role.findUnique({
      where: { name: 'ADMIN' }
    });

    if (!adminRole) {
      throw new Error('Admin role not found');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        accreditationStatus: data.accreditationStatus || 'admin',
        roleId: adminRole.id,
        twoFactorEnabled: true,
      },
      include: {
        role: true
      }
    });
  }

  /**
   * Find user by email with role
   */
  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        role: true
      }
    });
  }

  /**
   * Verify user password
   */
  static async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * Check if user exists
   */
  static async userExists(email: string) {
    const user = await this.findUserByEmail(email);
    return !!user;
  }

  /**
   * Validate login credentials with role check
   */
  static async validateCredentials(credentials: LoginCredentials) {
    const user = await this.findUserByEmail(credentials.email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check role if specified
    if (credentials.role && user.role.name !== credentials.role) {
      throw new Error(`Access denied. ${credentials.role} role required.`);
    }

    const isValidPassword = await this.verifyPassword(credentials.password, user.password);
    
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  /**
   * Generate and save OTP for user
   */
  static async generateOTP(userId: number) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await prisma.user.update({
      where: { id: userId },
      data: {
        otpCode: otp,
        otpExpiry: otpExpiry,
      },
    });

    return { otp, expiry: otpExpiry };
  }

  /**
   * Verify OTP code
   */
  static async verifyOTP(email: string, otp: string) {
    const user = await this.findUserByEmail(email);
    
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.otpCode || !user.otpExpiry) {
      throw new Error('No OTP requested');
    }

    // Check if OTP expired
    if (new Date() > user.otpExpiry) {
      await this.clearOTP(user.id);
      throw new Error('OTP has expired. Please request a new one.');
    }

    // Verify OTP
    if (user.otpCode !== otp) {
      throw new Error('Invalid OTP');
    }

    // Clear OTP after successful verification
    await this.clearOTP(user.id);
    
    return true;
  }

  /**
   * Clear OTP for user
   */
  static async clearOTP(userId: number) {
    await prisma.user.update({
      where: { id: userId },
      data: { otpCode: null, otpExpiry: null },
    });
  }

  /**
   * Toggle 2FA for user
   */
  static async toggle2FA(userId: number, enabled: boolean) {
    return await prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: enabled },
    });
  }

  /**
   * Get user role
   */
  static async getUserRole(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    return user?.role?.name || null;
  }

  /**
   * Check if user is admin
   */
  static async isAdmin(userId: number) {
    const role = await this.getUserRole(userId);
    return role === 'ADMIN';
  }

  /**
   * Check if user is investor
   */
  static async isInvestor(userId: number) {
    const role = await this.getUserRole(userId);
    return role === 'INVESTOR';
  }
}
