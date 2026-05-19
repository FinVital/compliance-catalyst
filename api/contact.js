import { createClient } from "@libsql/client/web";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, company, phone, message } = req.body;

  // Initialize Turso DB Client
  const dbClient = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    // Ensure table exists
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

    // Insert data into Turso DB
    await dbClient.execute({
      sql: "INSERT INTO contacts (name, email, company, phone, message) VALUES (?, ?, ?, ?, ?)",
      args: [name, email, company, phone, message],
    });

    return res.status(200).json({ success: true, Messages: [{ Status: "success" }] });
  } catch (dbErr) {
    console.error("Turso DB Error:", dbErr);
    return res.status(500).json({ error: "Failed to save contact details to database" });
  }
}
