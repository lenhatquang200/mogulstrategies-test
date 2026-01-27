import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // Create roles
  const investorRole = await prisma.role.upsert({
    where: { name: 'INVESTOR' },
    update: {},
    create: {
      name: 'INVESTOR',
      description: 'Investor account with access to investor dashboard',
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      description: 'Administrator account with full system access',
    },
  });

  console.log('✅ Created roles:', { investorRole, adminRole });

  // Create admin user
  const adminPassword = 'admin123456'; // Change this in production
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@mogulstrategies.com' },
    update: {},
    create: {
      email: 'admin@mogulstrategies.com',
      password: hashedAdminPassword,
      name: 'System Administrator',
      roleId: adminRole.id,
      accreditationStatus: 'admin',
      twoFactorEnabled: true,
    },
  });

  console.log('✅ Created admin user:', adminUser.email);

  console.log('🎉 Seeding finished!');
}

import bcrypt from 'bcryptjs';

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
