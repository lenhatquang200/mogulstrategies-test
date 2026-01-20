import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { createPool } from 'mariadb';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
    const dbUrl = process.env.DATABASE_URL;
    let pool;

    if (dbUrl) {
        try {
            const url = new URL(dbUrl);
            pool = createPool({
                host: url.hostname,
                user: url.username,
                password: url.password,
                database: url.pathname.slice(1),
                port: Number(url.port),
                ssl: { rejectUnauthorized: false }
            });
        } catch (error) {
            console.warn("Failed to parse DATABASE_URL, falling back to string");
            pool = createPool(dbUrl);
        }
    } else {
        pool = createPool("");
    }

    // @ts-ignore
    const adapter = new PrismaMariaDb(pool);

    return new PrismaClient({
        adapter,
        log: ['error', 'warn'],
    });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
