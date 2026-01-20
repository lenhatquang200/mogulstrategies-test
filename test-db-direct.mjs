
import { createPool } from 'mariadb';
import 'dotenv/config';

async function testConnection(useSsl) {
    console.log(`\nTesting connection to ${process.env.DB_HOST} (SSL: ${useSsl})...`);

    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
        connectionLimit: 1,
        connectTimeout: 5000
    };

    if (useSsl) {
        config.ssl = { rejectUnauthorized: false };
    }

    const pool = createPool(config);

    try {
        const conn = await pool.getConnection();
        console.log(`✅ Connection SUCCESS (SSL: ${useSsl})!`);
        const rows = await conn.query("SELECT 1 as val");
        console.log("Query result:", rows);
        conn.release();
        return true;
    } catch (err) {
        console.error(`❌ Connection FAILED (SSL: ${useSsl}):`, err.message);
        return false;
    } finally {
        await pool.end();
    }
}

async function run() {
    // Try with SSL first (as current config does)
    const sslSuccess = await testConnection(true);
    if (!sslSuccess) {
        // Try without SSL
        await testConnection(false);
    }
}

run();
