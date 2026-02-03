import { prisma } from "@/lib/prisma";
import type { ProfileUpdateData } from "@/types/user";

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
};
