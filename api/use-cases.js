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

    // 2. Seed/Update table with new AI use cases
    await dbClient.execute({
      sql: `INSERT OR REPLACE INTO use_cases (card_key, title, badge, problem, solution) VALUES 
        ('vciso', 'AI Product Managers & Devs', 'Safety & Documentation Accelerator', 'Engineering teams spend days manually writing model cards, system descriptions, and filling out compliance logs before deploying new AI models.', 'ReguLattice autonomously scans repositories, model registries, and datasets to auto-generate comprehensive system documentation and model cards, cutting time-to-deployment by 10x.'),
        ('fintech', 'Risk & Compliance Officers', 'Autonomous AI Risk Management', 'With evolving AI standards like ISO 42001 and the EU AI Act, risk officers struggle to manually assess model bias, safety issues, and data privacy risks.', 'Our AI agents perform continuous automated risk and impact assessments, flagging model drift, bias, or regulatory non-compliance in real-time.'),
        ('auditor', 'AI Auditors & Consultants', 'Frictionless Verification', 'Preparing for independent AI audits is chaotic, requiring manual tracing of training data, model versions, testing parameters, and compliance logs.', 'Provide third-party auditors with a read-only dashboard to a secure, automatically logged evidence trail, reducing audit validation times to a few hours.')`,
    });

    // 3. Fetch all use cases
    const result = await dbClient.execute("SELECT * FROM use_cases ORDER BY id ASC");
    return res.status(200).json({ success: true, useCases: result.rows });
  } catch (err) {
    console.error("Use cases database error:", err);
    // Fallback: return success with empty array or let front-end handle it
    return res.status(500).json({ error: "Failed to load use cases" });
  }
}
