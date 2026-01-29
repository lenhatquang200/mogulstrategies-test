import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { Role, User } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function seed() {
  console.log("Seeding database...");

  const now = sql`CURRENT_TIMESTAMP(3)`;

  /* ===== ROLES ===== */
  await db.insert(Role).values([
    {
      name: "INVESTOR",
      description: "Investor account with access to investor dashboard",
      updatedAt: now,
    },
    {
      name: "ADMIN",
      description: "Administrator account with full system access",
      updatedAt: now,
    },
  ]);

  /* ===== GET ROLE IDS ===== */
  const roles = await db.select().from(Role);

  const investorRole = roles.find(r => r.name === "INVESTOR")!;
  const adminRole = roles.find(r => r.name === "ADMIN")!;

  /* ===== USERS ===== */
  await db.insert(User).values([
    {
      name: "System Administrator",
      email: "admin@mogulstrategies.com",
      password: await bcrypt.hash("123456", 10),
      roleId: adminRole.id,
      accreditationStatus: "admin",
      twoFactorEnabled: 1,
      updatedAt: now,
    },
    {
      name: "Test123",
      email: "hieutt.fw@gmail.com",
      password: await bcrypt.hash("123456", 10),
      roleId: investorRole.id,
      accreditationStatus: "institution",
      twoFactorEnabled: 1,
      updatedAt: now,
    },
  ]);

  console.log("✅ Seed done");
}
