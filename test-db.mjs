
import { createPool } from 'mariadb';
import 'dotenv/config';

async function testConnection() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        console.error("No DATABASE_URL found");
        return;
    }

    console.log("Testing connection string parsing...");
    const url = new URL(dbUrl);
    console.log(`Host: ${url.hostname}`);
    console.log(`Port: ${url.port}`);
    console.log(`User: ${url.username}`);
    console.log(`Database: ${url.pathname.slice(1)}`);

    console.log("\nAttempting to connect with mariadb driver...");
    const pool = createPool({
        host: url.hostname,
        user: url.username,
        password: url.password,
        database: url.pathname.slice(1),
        port: Number(url.port),
        ssl: { rejectUnauthorized: false },
        connectionLimit: 1,
        connectTimeout: 10000
    });

    try {
        const conn = await pool.getConnection();
        console.log("✅ Connection SUCCESS!");
        const rows = await conn.query("SELECT 1 as val");
        console.log("Query result:", rows);
        conn.release();
    } catch (err) {
        console.error("❌ Connection FAILED:", err);
    } finally {
        await pool.end();
    }
}

testConnection();
