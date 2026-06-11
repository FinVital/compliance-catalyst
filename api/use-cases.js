import { createClient } from "@libsql/client/web";

export default async function handler(req, res) {
  const dbClient = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Ensure table exists
    await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS use_cases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        card_key TEXT UNIQUE,
        title TEXT,
        badge TEXT,
        problem TEXT,
        solution TEXT
      )
    `);

    // 2. Check if table is empty
    const countCheck = await dbClient.execute("SELECT COUNT(*) as count FROM use_cases");
    if (countCheck.rows[0]?.count === 0) {
      await dbClient.execute({
        sql: `INSERT OR IGNORE INTO use_cases (card_key, title, badge, problem, solution) VALUES 
          ('vciso', 'vCISO & GRC Consultants', 'Consultant Force Multiplier', 'Consultants spend 80% of their billing hours manually requesting screenshots, chasing down client stakeholders, and copying text into static spreadsheets.', 'Manage 15+ clients from a single white-labeled GRC command center. ReguLattice autonomously maps client infrastructure, highlights gaps, and auto-generates policy templates, letting you focus on high-margin strategic advisory.'),
          ('fintech', 'Fintechs & High-Growth Startups', 'Enterprise Sales Accelerator', 'Landing a major enterprise bank or financial contract stalls for weeks when the buyer''s procurement team dumps a grueling 400-question compliance spreadsheet.', 'Drop the questionnaire into ReguLattice. The AI engine cross-references your live evidence, auto-fills the document in minutes, and generates an audit-ready pack showing your active ISO 27001, SOC 2, and SAMA posture, cutting sales cycles by 10x.'),
          ('auditor', 'Auditors & Compliance Officers', 'Frictionless Auditing', 'The annual certification audit is a high-stress scramble of screenshot gathering, sample testing, and developer interviews, draining weeks of engineering time.', 'Provide your external auditor with a read-only secure dashboard to your live Compliance Graph. Auditors can inspect automatically logged evidence trails, verify control mappings, and approve samples directly — turning weeks of chaos into a 2-hour sign-off.')`,
      });
    }

    // 3. Fetch all use cases
    const result = await dbClient.execute("SELECT * FROM use_cases ORDER BY id ASC");
    return res.status(200).json({ success: true, useCases: result.rows });
  } catch (err) {
    console.error("Use cases database error:", err);
    // Fallback: return success with empty array or let front-end handle it
    return res.status(500).json({ error: "Failed to load use cases" });
  }
}
