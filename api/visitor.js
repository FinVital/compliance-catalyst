import { createClient } from "@libsql/client/web";
import { randomUUID } from "crypto";

export default async function handler(req, res) {
  const dbClient = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    // 1. Ensure tables exist
    await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS visitors (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT,
        company TEXT,
        phone TEXT,
        ip TEXT,
        location TEXT,
        visit_count INTEGER DEFAULT 1,
        last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS visitor_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visitor_id TEXT,
        ip TEXT,
        location TEXT,
        page TEXT,
        referrer TEXT,
        user_agent TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Handle POST request (register new visitor OR log return session)
    if (req.method === "POST") {
      const body = req.body || {};
      const {
        visitorId,
        name,
        email,
        company,
        phone,
        ip,
        location,
        page = "home",
        referrer = null,
        userAgent = null,
      } = body;

      if (visitorId) {
        // RETURNING visitor — update last_seen, increment visit_count
        await dbClient.execute({
          sql: `UPDATE visitors SET visit_count = visit_count + 1, last_seen = CURRENT_TIMESTAMP WHERE id = ?`,
          args: [visitorId],
        });

        // If details are submitted (upgrade), update profile
        if (name || email) {
          await dbClient.execute({
            sql: `UPDATE visitors SET name = COALESCE(?, name), email = COALESCE(?, email), company = COALESCE(?, company), phone = COALESCE(?, phone) WHERE id = ?`,
            args: [name || null, email || null, company || null, phone || null, visitorId],
          });
        }

        // Log session
        await dbClient.execute({
          sql: `INSERT INTO visitor_sessions (visitor_id, ip, location, page, referrer, user_agent) VALUES (?, ?, ?, ?, ?, ?)`,
          args: [visitorId, ip || null, location || null, page, referrer || null, userAgent || null],
        });

        // Retrieve updated details
        const result = await dbClient.execute({
          sql: "SELECT name, email, visit_count FROM visitors WHERE id = ?",
          args: [visitorId],
        });

        return res.status(200).json({
          success: true,
          returning: true,
          visitorId,
          name: result.rows[0]?.name || null,
          email: result.rows[0]?.email || null,
          visitCount: result.rows[0]?.visit_count || 1,
        });
      } else {
        // NEW visitor — create profile + log first session
        const newId = randomUUID();

        await dbClient.execute({
          sql: `INSERT INTO visitors (id, name, email, company, phone, ip, location) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          args: [newId, name || null, email || null, company || null, phone || null, ip || null, location || null],
        });

        await dbClient.execute({
          sql: `INSERT INTO visitor_sessions (visitor_id, ip, location, page, referrer, user_agent) VALUES (?, ?, ?, ?, ?, ?)`,
          args: [newId, ip || null, location || null, page, referrer || null, userAgent || null],
        });

        return res.status(200).json({
          success: true,
          returning: false,
          visitorId: newId,
        });
      }
    }

    // 3. Handle GET request (get visitor profile by id)
    if (req.method === "GET") {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: "id required" });
      }

      const result = await dbClient.execute({
        sql: "SELECT * FROM visitors WHERE id = ?",
        args: [id],
      });

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "visitor not found" });
      }

      return res.status(200).json({ success: true, visitor: result.rows[0] });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Visitor API error:", err);
    return res.status(500).json({ error: "Failed to process visitor data" });
  }
}
