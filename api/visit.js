import { createClient } from "@libsql/client/web";

export default async function handler(req, res) {
  const dbClient = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    // 1. Ensure tables exist
    await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS visitor_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page_path TEXT UNIQUE NOT NULL,
        views INTEGER DEFAULT 0,
        last_visit DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS visitor_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page_path TEXT NOT NULL,
        ip TEXT,
        location TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    if (req.method === "POST") {
      const { page = "home", ip = null, location = null } = req.body || {};

      // 2. Log individual visit with IP & Location
      await dbClient.execute({
        sql: "INSERT INTO visitor_logs (page_path, ip, location) VALUES (?, ?, ?)",
        args: [page, ip, location],
      });

      // 3. Increment aggregated visitor count (UPSERT)
      await dbClient.execute({
        sql: `
          INSERT INTO visitor_stats (page_path, views, last_visit)
          VALUES (?, 1, CURRENT_TIMESTAMP)
          ON CONFLICT(page_path) DO UPDATE SET
            views = views + 1,
            last_visit = CURRENT_TIMESTAMP
        `,
        args: [page],
      });

      // Fetch the updated count to return
      const result = await dbClient.execute({
        sql: "SELECT views FROM visitor_stats WHERE page_path = ?",
        args: [page],
      });

      const updatedCount = result.rows[0]?.views || 1;
      return res.status(200).json({ success: true, count: updatedCount });
    } 

    if (req.method === "GET") {
      const { page = "home" } = req.query;

      const result = await dbClient.execute({
        sql: "SELECT views FROM visitor_stats WHERE page_path = ?",
        args: [page],
      });

      const count = result.rows[0]?.views || 0;
      return res.status(200).json({ success: true, count });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Visitor count database error:", err);
    return res.status(500).json({ error: "Failed to process visitor statistic" });
  }
}
