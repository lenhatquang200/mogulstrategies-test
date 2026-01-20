import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
    const adapter = new PrismaMariaDb({
        host: 'turntable.proxy.rlwy.net',
        port: 39752,
        user: 'root',
        password: 'vMznmgmoVcfWfvqNwJMSuTtfTvGbbZtV',
        database: 'MogulStrategies',
        connectTimeout: 30000,
        // @ts-ignore
        ssl: {
            rejectUnauthorized: false
        }
    });

    return new PrismaClient({
        adapter,
        log: ['error', 'warn'],
    });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
