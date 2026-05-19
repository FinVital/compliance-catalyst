import { createClient } from "@libsql/client";
import fs from "fs";

// Simple manual .env parser
try {
  const envContent = fs.readFileSync(".env", "utf8");
  const envVars = {};
  envContent.split("\n").forEach((line) => {
    const parts = line.split("=");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join("=").trim();
      envVars[key] = val;
    }
  });

  process.env.TURSO_DATABASE_URL = envVars.TURSO_DATABASE_URL;
  process.env.TURSO_AUTH_TOKEN = envVars.TURSO_AUTH_TOKEN;
} catch (e) {
  console.log(".env file not found or couldn't be read. Using process.env instead.");
}

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Error: TURSO_DATABASE_URL or TURSO_AUTH_TOKEN is missing in .env!");
  process.exit(1);
}

console.log("Connecting to Turso Database at:", url);

const dbClient = createClient({ url, authToken });

async function initDb() {
  try {
    console.log("Verifying and creating tables...");

    // 1. Contacts table
    await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        company TEXT,
        phone TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Table 'contacts' created/verified.");

    // 2. Assessments table
    await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        phone TEXT,
        score INTEGER NOT NULL,
        answers TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Table 'assessments' created/verified.");

    // 3. Visitor Stats table
    await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS visitor_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page_path TEXT UNIQUE NOT NULL,
        views INTEGER DEFAULT 0,
        last_visit DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Table 'visitor_stats' created/verified.");

    // 4. Visitor Logs table
    await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS visitor_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page_path TEXT NOT NULL,
        ip TEXT,
        location TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Table 'visitor_logs' created/verified.");

    console.log("\n🎉 All Turso tables have been successfully initialized!");
  } catch (err) {
    console.error("❌ Failed to initialize database:", err);
  }
}

initDb();
