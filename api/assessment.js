import { createClient } from "@libsql/client/web";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, company, phone, score, answers } = req.body;

  if (!name || !email || score === undefined) {
    return res.status(400).json({ error: "Missing required fields (name, email, score)" });
  }

  const dbClient = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    // 1. Ensure the assessments table exists
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

    // 2. Insert the assessment details
    const answersJson = JSON.stringify(answers || {});
    await dbClient.execute({
      sql: `INSERT INTO assessments (name, email, company, phone, score, answers) 
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [name, email, company || null, phone || null, score, answersJson],
    });

    return res.status(200).json({ success: true, message: "Assessment stored successfully" });
  } catch (dbErr) {
    console.error("Turso DB error during assessment storage:", dbErr);
    return res.status(500).json({ error: "Failed to store assessment details in database" });
  }
}
