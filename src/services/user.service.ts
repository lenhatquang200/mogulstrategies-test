import { prisma } from "@/lib/prisma";
import type { ProfileUpdateData } from "@/types/user";

type ListUsersParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export const UserService = {
  async getByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        role: true
      }
    });
  },

  async updateByEmail(email: string, data: ProfileUpdateData) {
    return prisma.user.update({
      where: { email },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.phone && { phone: data.phone }),
        ...(data.timezone && { timezone: data.timezone }),
      },
    });
  },

  async listUsers({ page = 1, limit = 10, search }: ListUsersParams) {
    const skip = (page - 1) * limit;

    const where = {
      roleId: 1,
      ...(search && {
        OR: [
          { email: { contains: search } },
          { name: { contains: search } },
        ],
      }),
    };

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          userCode: true,
          status: true,
          verificationStatus: true,
          accreditationStatus: true,
          createdAt: true,
          lastLoginAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // ===== NEW: USER DETAIL =====
  async getDetailById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        timezone: true,
        role: true,
        createdAt: true,

        kyc: {
          select: {
            status: true,
            currentStep: true,
            // step1Completed: true,
            // step2Completed: true,
            // step3Completed: true,
            // step4Completed: true,
            createdAt: true,
            updatedAt: true,
          },
        },

        activityLogs: {
          orderBy: { createdAt: "desc" },
          take: 10,
          select: {
            action: true,
            entityType: true,
            ipAddress: true,
            location: true,
            createdAt: true,
          },
        },
      },
    });
  },

  async updatePasswordByEmail(email: string, hashedPassword: string) {
    return prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
  }

};
