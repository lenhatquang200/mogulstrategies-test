import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { createPool } from 'mariadb';

const globalForPrisma = globalThis as unknown as {
    prismaMogul: PrismaClient | undefined;
};

const createPrismaClient = () => {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
        throw new Error("DATABASE_URL environment variable is missing.");
    }

    try {
        const url = new URL(dbUrl);
        console.log(`🔌 INIT PRISMA (New Ref): ${url.hostname}:${url.port} `);

        const pool = createPool({
            host: url.hostname,
            user: url.username,
            password: url.password,
            database: url.pathname.slice(1),
            port: Number(url.port),
            ssl: { rejectUnauthorized: false },
            connectionLimit: 5,
            connectTimeout: 20000,
            idleTimeout: 30000
        });

        // @ts-ignore
        const adapter = new PrismaMariaDb(pool);

        return new PrismaClient({
            adapter,
            log: ['error', 'warn'],
        });

    } catch (error) {
        console.error("Failed to initialize Prisma Client:", error);
        throw error;
    }
};

export const prisma = globalForPrisma.prismaMogul ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prismaMogul = prisma;
}
