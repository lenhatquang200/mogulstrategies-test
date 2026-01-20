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
        console.log(`🔌 INIT DB: ${url.hostname}:${url.port}`);

        // Define connection options dynamically based on environment or URL params.
        // If connecting to Railway from local, we usually need SSL.
        const pool = createPool({
            host: url.hostname,
            user: url.username,
            password: url.password,
            database: url.pathname.slice(1),
            port: Number(url.port),
            // Important: Railway requires SSL for external connections (like from your PC).
            // Check if we are running in production or development to possibly toggle this?
            // For now, keep it safer for external connections but add a connection timeout.
            ssl: { rejectUnauthorized: false },
            connectionLimit: 5,
            connectTimeout: 20000 // Increase timeout to 20s
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
