import { createClient } from "@libsql/client/web";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { pagePath, elementType, elementText, elementId, elementClass, ip, location } = req.body;

  // Resolve IP from request body or headers
  const clientIp = ip || req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || (req.socket && req.socket.remoteAddress) || null;

  // Resolve Location from request body or Vercel geo headers
  let clientLocation = location || null;
  if (!clientLocation && req.headers['x-vercel-ip-country']) {
    const city = req.headers['x-vercel-ip-city'] ? decodeURIComponent(req.headers['x-vercel-ip-city']) : "";
    const region = req.headers['x-vercel-ip-country-region'] ? decodeURIComponent(req.headers['x-vercel-ip-country-region']) : "";
    const country = req.headers['x-vercel-ip-country'] ? decodeURIComponent(req.headers['x-vercel-ip-country']) : "";
    clientLocation = `${city}, ${region}, ${country}`.trim().replace(/^,|,$/g, "").trim();
  }

  // Initialize Turso DB Client
  const dbClient = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    // Ensure table exists
    await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS click_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page_path TEXT NOT NULL,
        element_type TEXT,
        element_text TEXT,
        element_id TEXT,
        element_class TEXT,
        ip TEXT,
        location TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert click details into Turso DB
    await dbClient.execute({
      sql: "INSERT INTO click_logs (page_path, element_type, element_text, element_id, element_class, ip, location) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [pagePath || "/", elementType || null, elementText || null, elementId || null, elementClass || null, clientIp, clientLocation],
    });

    return res.status(200).json({ success: true });
  } catch (dbErr) {
    console.error("Turso DB Error:", dbErr);
    return res.status(500).json({ error: "Failed to save click tracking logs" });
  }
}
