import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { createPool } from 'mariadb';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
    const dbUrl = process.env.DATABASE_URL;
    let adapter;

    if (!dbUrl) {
        // If DATABASE_URL is missing (e.g. build time without env), fallback to a mock or throw if runtime.
        // For Next.js build, we often want to avoid crashing if pages don't strictly need DB.
        console.warn("⚠️ DATABASE_URL is missing. Prisma Adapter will not be initialized correctly.");
        // We cannot create a valid pool without a URL.
        // Throwing here to prevent 'createPool("")' invalid string error.
        throw new Error("DATABASE_URL environment variable is missing.");
    }

    try {
        const url = new URL(dbUrl);
        // Enforce SSL for Railway/Production
        const pool = createPool({
            host: url.hostname,
            user: url.username,
            password: url.password,
            database: url.pathname.slice(1),
            port: Number(url.port),
            ssl: { rejectUnauthorized: false }, // Critical for Railway
            connectionLimit: 5
        });
        // @ts-ignore
        adapter = new PrismaMariaDb(pool);
    } catch (error) {
        console.error("Failed to parse DATABASE_URL or create pool:", error);
        throw error;
    }

    return new PrismaClient({
        adapter,
        log: ['error', 'warn'],
    });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
