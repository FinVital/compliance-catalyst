import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { createClient } from "@libsql/client";
import fs from "fs";
import { randomUUID } from "crypto";

// Read .env manually (Vite loads it for the client bundle, but we need it for Node middleware too)
function readEnv() {
  let dbUrl = process.env.TURSO_DATABASE_URL || "";
  let dbToken = process.env.TURSO_AUTH_TOKEN || "";

  if (fs.existsSync(".env")) {
    const envContent = fs.readFileSync(".env", "utf8");
    envContent.split("\n").forEach((line) => {
      const eqIdx = line.indexOf("=");
      if (eqIdx === -1) return;
      const key = line.slice(0, eqIdx).trim();
      const val = line.slice(eqIdx + 1).trim();
      if (key === "TURSO_DATABASE_URL") dbUrl = val;
      if (key === "TURSO_AUTH_TOKEN") dbToken = val;
    });
  }

  return { dbUrl, dbToken };
}

// Helper: parse JSON request body
function getBody(req): Promise<any> {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => {
      try { resolve(JSON.parse(body)); }
      catch { resolve({}); }
    });
  });
}

// Ensure all required tables exist
async function ensureTables(db) {
  await db.execute(`
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
  await db.execute(`
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
  await db.execute(`
    CREATE TABLE IF NOT EXISTS visitor_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_path TEXT UNIQUE NOT NULL,
      views INTEGER DEFAULT 0,
      last_visit DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS visitor_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_path TEXT NOT NULL,
      ip TEXT,
      location TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await db.execute(`
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
  await db.execute(`
    CREATE TABLE IF NOT EXISTS assessments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      company TEXT,
      phone TEXT,
      score INTEGER,
      answers TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS use_cases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      card_key TEXT UNIQUE,
      title TEXT,
      badge TEXT,
      problem TEXT,
      solution TEXT
    )
  `);

  const ucCheck = await db.execute("SELECT COUNT(*) as count FROM use_cases");
  if (ucCheck.rows[0]?.count === 0) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO use_cases (card_key, title, badge, problem, solution) VALUES 
        ('vciso', 'vCISO & GRC Consultants', 'Consultant Force Multiplier', 'Consultants spend 80% of their billing hours manually requesting screenshots, chasing down client stakeholders, and copying text into static spreadsheets.', 'Manage 15+ clients from a single white-labeled GRC command center. ReguLattice autonomously maps client infrastructure, highlights gaps, and auto-generates policy templates, letting you focus on high-margin strategic advisory.'),
        ('fintech', 'Fintechs & High-Growth Startups', 'Enterprise Sales Accelerator', 'Landing a major enterprise bank or financial contract stalls for weeks when the buyer''s procurement team dumps a grueling 400-question compliance spreadsheet.', 'Drop the questionnaire into ReguLattice. The AI engine cross-references your live evidence, auto-fills the document in minutes, and generates an audit-ready pack showing your active ISO 27001, SOC 2, and SAMA posture, cutting sales cycles by 10x.'),
        ('auditor', 'Auditors & Compliance Officers', 'Frictionless Auditing', 'The annual certification audit is a high-stress scramble of screenshot gathering, sample testing, and developer interviews, draining weeks of engineering time.', 'Provide your external auditor with a read-only secure dashboard to your live Compliance Graph. Auditors can inspect automatically logged evidence trails, verify control mappings, and approve samples directly — turning weeks of chaos into a 2-hour sign-off.')`,
    });
  }
}

// Vite plugin that handles all /api/* routes in dev
const apiMiddlewarePlugin = {
  name: "api-middleware",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const pathname = (req.url || "").split("?")[0];
      const searchParams = new URLSearchParams((req.url || "").split("?")[1] || "");

      // ── /api/geo — proxy ipapi.co to avoid browser CORS ──────────────
      if (pathname === "/api/geo") {
        try {
          const resp = await fetch("https://ipapi.co/json/");
          const data = await resp.json();
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.end(JSON.stringify(data));
        } catch (err) {
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.end(JSON.stringify({ ip: null, city: null, region: null, country_name: null }));
        }
        return;
      }

      if (!pathname.startsWith("/api/")) {
        return next();
      }

      // All other /api/* routes need Turso
      res.setHeader("Content-Type", "application/json");

      const { dbUrl, dbToken } = readEnv();
      const db = createClient({ url: dbUrl, authToken: dbToken });

      try {
        await ensureTables(db);
      } catch (err) {
        console.error("[api] table init error:", err);
      }

      // ── /api/use-cases ───────────────────────────────────────────────
      if (pathname === "/api/use-cases") {
        if (req.method === "GET") {
          try {
            const result = await db.execute("SELECT * FROM use_cases ORDER BY id ASC");
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, useCases: result.rows }));
          } catch (err) {
            console.error("[api/use-cases] error:", err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(err) }));
          }
          return;
        }
      }

      // ── /api/visitor ─────────────────────────────────────────────────
      if (pathname === "/api/visitor") {

        // POST — register new visitor OR log session for returning visitor
        if (req.method === "POST") {
          try {
            const body = await getBody(req);
            const { visitorId, name, email, company, phone, ip, location, page, referrer, userAgent } = body;

            if (visitorId) {
              // RETURNING visitor — update last_seen, increment visit_count, log session
              await db.execute({
                sql: `UPDATE visitors SET visit_count = visit_count + 1, last_seen = CURRENT_TIMESTAMP WHERE id = ?`,
                args: [visitorId],
              });

              // If they submitted details this time too (upgrade), update profile
              if (name || email) {
                await db.execute({
                  sql: `UPDATE visitors SET name = COALESCE(?, name), email = COALESCE(?, email), company = COALESCE(?, company), phone = COALESCE(?, phone) WHERE id = ?`,
                  args: [name || null, email || null, company || null, phone || null, visitorId],
                });
              }

              await db.execute({
                sql: `INSERT INTO visitor_sessions (visitor_id, ip, location, page, referrer, user_agent) VALUES (?, ?, ?, ?, ?, ?)`,
                args: [visitorId, ip || null, location || null, page || "home", referrer || null, userAgent || null],
              });

              const result = await db.execute({
                sql: "SELECT name, email, visit_count FROM visitors WHERE id = ?",
                args: [visitorId],
              });

              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                returning: true,
                visitorId,
                name: result.rows[0]?.name || null,
                email: result.rows[0]?.email || null,
                visitCount: result.rows[0]?.visit_count || 1,
              }));

            } else {
              // NEW visitor — create profile + log first session
              const newId = randomUUID();

              await db.execute({
                sql: `INSERT INTO visitors (id, name, email, company, phone, ip, location) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                args: [newId, name || null, email || null, company || null, phone || null, ip || null, location || null],
              });

              await db.execute({
                sql: `INSERT INTO visitor_sessions (visitor_id, ip, location, page, referrer, user_agent) VALUES (?, ?, ?, ?, ?, ?)`,
                args: [newId, ip || null, location || null, page || "home", referrer || null, userAgent || null],
              });

              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                returning: false,
                visitorId: newId,
              }));
            }
          } catch (err) {
            console.error("[api/visitor POST] error:", err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(err) }));
          }
          return;
        }

        // GET — get visitor profile by id
        if (req.method === "GET") {
          try {
            const id = searchParams.get("id");
            if (!id) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "id required" }));
              return;
            }
            const result = await db.execute({
              sql: "SELECT * FROM visitors WHERE id = ?",
              args: [id],
            });
            if (result.rows.length === 0) {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: "visitor not found" }));
              return;
            }
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, visitor: result.rows[0] }));
          } catch (err) {
            console.error("[api/visitor GET] error:", err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(err) }));
          }
          return;
        }
      }

      // ── /api/visit ────────────────────────────────────────────────────
      if (pathname === "/api/visit") {
        try {
          if (req.method === "POST") {
            const body = await getBody(req);
            const page = body.page || "home";
            const ip = body.ip || null;
            const location = body.location || null;

            await db.execute({
              sql: "INSERT INTO visitor_logs (page_path, ip, location) VALUES (?, ?, ?)",
              args: [page, ip, location],
            });

            await db.execute({
              sql: `
                INSERT INTO visitor_stats (page_path, views, last_visit)
                VALUES (?, 1, CURRENT_TIMESTAMP)
                ON CONFLICT(page_path) DO UPDATE SET
                  views = views + 1,
                  last_visit = CURRENT_TIMESTAMP
              `,
              args: [page],
            });

            const result = await db.execute({
              sql: "SELECT views FROM visitor_stats WHERE page_path = ?",
              args: [page],
            });

            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, count: result.rows[0]?.views || 1 }));

          } else if (req.method === "GET") {
            const page = searchParams.get("page") || "home";
            const result = await db.execute({
              sql: "SELECT views FROM visitor_stats WHERE page_path = ?",
              args: [page],
            });
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, count: result.rows[0]?.views || 0 }));
          } else {
            res.statusCode = 405;
            res.end(JSON.stringify({ error: "Method not allowed" }));
          }
        } catch (err) {
          console.error("[api/visit] error:", err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(err) }));
        }
        return;
      }

      // ── /api/contact ─────────────────────────────────────────────────
      if (pathname === "/api/contact" && req.method === "POST") {
        try {
          const { name, email, company, phone, message } = await getBody(req);

          await db.execute({
            sql: "INSERT INTO contacts (name, email, company, phone, message) VALUES (?, ?, ?, ?, ?)",
            args: [name, email, company || null, phone || null, message || null],
          });

          res.statusCode = 200;
          res.end(JSON.stringify({ success: true }));
        } catch (err) {
          console.error("[api/contact] error:", err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(err) }));
        }
        return;
      }

      // ── /api/assessment ──────────────────────────────────────────────
      if (pathname === "/api/assessment" && req.method === "POST") {
        try {
          const { name, email, company, phone, score, answers } = await getBody(req);

          await db.execute({
            sql: "INSERT INTO assessments (name, email, company, phone, score, answers) VALUES (?, ?, ?, ?, ?, ?)",
            args: [name, email, company || null, phone || null, score, JSON.stringify(answers || {})],
          });

          res.statusCode = 200;
          res.end(JSON.stringify({ success: true }));
        } catch (err) {
          console.error("[api/assessment] error:", err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(err) }));
        }
        return;
      }

      // Unknown /api/* route
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Not found" }));
    });
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    apiMiddlewarePlugin,
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
}));
