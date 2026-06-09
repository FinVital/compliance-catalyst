// vite.config.ts
import { defineConfig } from "file:///C:/lablabai/FinLabX/demo6/MVP/ReguLattice%20Website/compliance-catalyst/node_modules/vite/dist/node/index.js";
import react from "file:///C:/lablabai/FinLabX/demo6/MVP/ReguLattice%20Website/compliance-catalyst/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/lablabai/FinLabX/demo6/MVP/ReguLattice%20Website/compliance-catalyst/node_modules/lovable-tagger/dist/index.js";
import { createClient } from "file:///C:/lablabai/FinLabX/demo6/MVP/ReguLattice%20Website/compliance-catalyst/node_modules/@libsql/client/lib-esm/node.js";
import fs from "fs";
import { randomUUID } from "crypto";
var __vite_injected_original_dirname = "C:\\lablabai\\FinLabX\\demo6\\MVP\\ReguLattice Website\\compliance-catalyst";
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
function getBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
  });
}
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
        ('auditor', 'Auditors & Compliance Officers', 'Frictionless Auditing', 'The annual certification audit is a high-stress scramble of screenshot gathering, sample testing, and developer interviews, draining weeks of engineering time.', 'Provide your external auditor with a read-only secure dashboard to your live Compliance Graph. Auditors can inspect automatically logged evidence trails, verify control mappings, and approve samples directly \u2014 turning weeks of chaos into a 2-hour sign-off.')`
    });
  }
}
var apiMiddlewarePlugin = {
  name: "api-middleware",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const pathname = (req.url || "").split("?")[0];
      const searchParams = new URLSearchParams((req.url || "").split("?")[1] || "");
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
      res.setHeader("Content-Type", "application/json");
      const { dbUrl, dbToken } = readEnv();
      const db = createClient({ url: dbUrl || "file:local.db", authToken: dbToken });
      try {
        await ensureTables(db);
      } catch (err) {
        console.error("[api] table init error:", err);
      }
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
      if (pathname === "/api/visitor") {
        if (req.method === "POST") {
          try {
            const body = await getBody(req);
            const { visitorId, name, email, company, phone, ip, location, page, referrer, userAgent } = body;
            if (visitorId) {
              await db.execute({
                sql: `UPDATE visitors SET visit_count = visit_count + 1, last_seen = CURRENT_TIMESTAMP WHERE id = ?`,
                args: [visitorId]
              });
              if (name || email) {
                await db.execute({
                  sql: `UPDATE visitors SET name = COALESCE(?, name), email = COALESCE(?, email), company = COALESCE(?, company), phone = COALESCE(?, phone) WHERE id = ?`,
                  args: [name || null, email || null, company || null, phone || null, visitorId]
                });
              }
              await db.execute({
                sql: `INSERT INTO visitor_sessions (visitor_id, ip, location, page, referrer, user_agent) VALUES (?, ?, ?, ?, ?, ?)`,
                args: [visitorId, ip || null, location || null, page || "home", referrer || null, userAgent || null]
              });
              const result = await db.execute({
                sql: "SELECT name, email, visit_count FROM visitors WHERE id = ?",
                args: [visitorId]
              });
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                returning: true,
                visitorId,
                name: result.rows[0]?.name || null,
                email: result.rows[0]?.email || null,
                visitCount: result.rows[0]?.visit_count || 1
              }));
            } else {
              const newId = randomUUID();
              await db.execute({
                sql: `INSERT INTO visitors (id, name, email, company, phone, ip, location) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                args: [newId, name || null, email || null, company || null, phone || null, ip || null, location || null]
              });
              await db.execute({
                sql: `INSERT INTO visitor_sessions (visitor_id, ip, location, page, referrer, user_agent) VALUES (?, ?, ?, ?, ?, ?)`,
                args: [newId, ip || null, location || null, page || "home", referrer || null, userAgent || null]
              });
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                returning: false,
                visitorId: newId
              }));
            }
          } catch (err) {
            console.error("[api/visitor POST] error:", err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(err) }));
          }
          return;
        }
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
              args: [id]
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
      if (pathname === "/api/visit") {
        try {
          if (req.method === "POST") {
            const body = await getBody(req);
            const page = body.page || "home";
            const ip = body.ip || null;
            const location = body.location || null;
            await db.execute({
              sql: "INSERT INTO visitor_logs (page_path, ip, location) VALUES (?, ?, ?)",
              args: [page, ip, location]
            });
            await db.execute({
              sql: `
                INSERT INTO visitor_stats (page_path, views, last_visit)
                VALUES (?, 1, CURRENT_TIMESTAMP)
                ON CONFLICT(page_path) DO UPDATE SET
                  views = views + 1,
                  last_visit = CURRENT_TIMESTAMP
              `,
              args: [page]
            });
            const result = await db.execute({
              sql: "SELECT views FROM visitor_stats WHERE page_path = ?",
              args: [page]
            });
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, count: result.rows[0]?.views || 1 }));
          } else if (req.method === "GET") {
            const page = searchParams.get("page") || "home";
            const result = await db.execute({
              sql: "SELECT views FROM visitor_stats WHERE page_path = ?",
              args: [page]
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
      if (pathname === "/api/contact" && req.method === "POST") {
        try {
          const { name, email, company, phone, message } = await getBody(req);
          await db.execute({
            sql: "INSERT INTO contacts (name, email, company, phone, message) VALUES (?, ?, ?, ?, ?)",
            args: [name, email, company || null, phone || null, message || null]
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
      if (pathname === "/api/assessment" && req.method === "POST") {
        try {
          const { name, email, company, phone, score, answers } = await getBody(req);
          await db.execute({
            sql: "INSERT INTO assessments (name, email, company, phone, score, answers) VALUES (?, ?, ?, ?, ?, ?)",
            args: [name, email, company || null, phone || null, score, JSON.stringify(answers || {})]
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
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Not found" }));
    });
  }
};
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    apiMiddlewarePlugin
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core"
    ]
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxsYWJsYWJhaVxcXFxGaW5MYWJYXFxcXGRlbW82XFxcXE1WUFxcXFxSZWd1TGF0dGljZSBXZWJzaXRlXFxcXGNvbXBsaWFuY2UtY2F0YWx5c3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXGxhYmxhYmFpXFxcXEZpbkxhYlhcXFxcZGVtbzZcXFxcTVZQXFxcXFJlZ3VMYXR0aWNlIFdlYnNpdGVcXFxcY29tcGxpYW5jZS1jYXRhbHlzdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovbGFibGFiYWkvRmluTGFiWC9kZW1vNi9NVlAvUmVndUxhdHRpY2UlMjBXZWJzaXRlL2NvbXBsaWFuY2UtY2F0YWx5c3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAbGlic3FsL2NsaWVudFwiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgcmFuZG9tVVVJRCB9IGZyb20gXCJjcnlwdG9cIjtcblxuLy8gUmVhZCAuZW52IG1hbnVhbGx5IChWaXRlIGxvYWRzIGl0IGZvciB0aGUgY2xpZW50IGJ1bmRsZSwgYnV0IHdlIG5lZWQgaXQgZm9yIE5vZGUgbWlkZGxld2FyZSB0b28pXG5mdW5jdGlvbiByZWFkRW52KCkge1xuICBsZXQgZGJVcmwgPSBwcm9jZXNzLmVudi5UVVJTT19EQVRBQkFTRV9VUkwgfHwgXCJcIjtcbiAgbGV0IGRiVG9rZW4gPSBwcm9jZXNzLmVudi5UVVJTT19BVVRIX1RPS0VOIHx8IFwiXCI7XG5cbiAgaWYgKGZzLmV4aXN0c1N5bmMoXCIuZW52XCIpKSB7XG4gICAgY29uc3QgZW52Q29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhcIi5lbnZcIiwgXCJ1dGY4XCIpO1xuICAgIGVudkNvbnRlbnQuc3BsaXQoXCJcXG5cIikuZm9yRWFjaCgobGluZSkgPT4ge1xuICAgICAgY29uc3QgZXFJZHggPSBsaW5lLmluZGV4T2YoXCI9XCIpO1xuICAgICAgaWYgKGVxSWR4ID09PSAtMSkgcmV0dXJuO1xuICAgICAgY29uc3Qga2V5ID0gbGluZS5zbGljZSgwLCBlcUlkeCkudHJpbSgpO1xuICAgICAgY29uc3QgdmFsID0gbGluZS5zbGljZShlcUlkeCArIDEpLnRyaW0oKTtcbiAgICAgIGlmIChrZXkgPT09IFwiVFVSU09fREFUQUJBU0VfVVJMXCIpIGRiVXJsID0gdmFsO1xuICAgICAgaWYgKGtleSA9PT0gXCJUVVJTT19BVVRIX1RPS0VOXCIpIGRiVG9rZW4gPSB2YWw7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4geyBkYlVybCwgZGJUb2tlbiB9O1xufVxuXG4vLyBIZWxwZXI6IHBhcnNlIEpTT04gcmVxdWVzdCBib2R5XG5mdW5jdGlvbiBnZXRCb2R5KHJlcSk6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGxldCBib2R5ID0gXCJcIjtcbiAgICByZXEub24oXCJkYXRhXCIsIChjaHVuaykgPT4geyBib2R5ICs9IGNodW5rOyB9KTtcbiAgICByZXEub24oXCJlbmRcIiwgKCkgPT4ge1xuICAgICAgdHJ5IHsgcmVzb2x2ZShKU09OLnBhcnNlKGJvZHkpKTsgfVxuICAgICAgY2F0Y2ggeyByZXNvbHZlKHt9KTsgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gRW5zdXJlIGFsbCByZXF1aXJlZCB0YWJsZXMgZXhpc3RcbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVRhYmxlcyhkYikge1xuICBhd2FpdCBkYi5leGVjdXRlKGBcbiAgICBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyB2aXNpdG9ycyAoXG4gICAgICBpZCBURVhUIFBSSU1BUlkgS0VZLFxuICAgICAgbmFtZSBURVhULFxuICAgICAgZW1haWwgVEVYVCxcbiAgICAgIGNvbXBhbnkgVEVYVCxcbiAgICAgIHBob25lIFRFWFQsXG4gICAgICBpcCBURVhULFxuICAgICAgbG9jYXRpb24gVEVYVCxcbiAgICAgIHZpc2l0X2NvdW50IElOVEVHRVIgREVGQVVMVCAxLFxuICAgICAgbGFzdF9zZWVuIERBVEVUSU1FIERFRkFVTFQgQ1VSUkVOVF9USU1FU1RBTVAsXG4gICAgICBjcmVhdGVkX2F0IERBVEVUSU1FIERFRkFVTFQgQ1VSUkVOVF9USU1FU1RBTVBcbiAgICApXG4gIGApO1xuICBhd2FpdCBkYi5leGVjdXRlKGBcbiAgICBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyB2aXNpdG9yX3Nlc3Npb25zIChcbiAgICAgIGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxcbiAgICAgIHZpc2l0b3JfaWQgVEVYVCxcbiAgICAgIGlwIFRFWFQsXG4gICAgICBsb2NhdGlvbiBURVhULFxuICAgICAgcGFnZSBURVhULFxuICAgICAgcmVmZXJyZXIgVEVYVCxcbiAgICAgIHVzZXJfYWdlbnQgVEVYVCxcbiAgICAgIHRpbWVzdGFtcCBEQVRFVElNRSBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QXG4gICAgKVxuICBgKTtcbiAgYXdhaXQgZGIuZXhlY3V0ZShgXG4gICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgdmlzaXRvcl9zdGF0cyAoXG4gICAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXG4gICAgICBwYWdlX3BhdGggVEVYVCBVTklRVUUgTk9UIE5VTEwsXG4gICAgICB2aWV3cyBJTlRFR0VSIERFRkFVTFQgMCxcbiAgICAgIGxhc3RfdmlzaXQgREFURVRJTUUgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUFxuICAgIClcbiAgYCk7XG4gIGF3YWl0IGRiLmV4ZWN1dGUoYFxuICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHZpc2l0b3JfbG9ncyAoXG4gICAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXG4gICAgICBwYWdlX3BhdGggVEVYVCBOT1QgTlVMTCxcbiAgICAgIGlwIFRFWFQsXG4gICAgICBsb2NhdGlvbiBURVhULFxuICAgICAgdGltZXN0YW1wIERBVEVUSU1FIERFRkFVTFQgQ1VSUkVOVF9USU1FU1RBTVBcbiAgICApXG4gIGApO1xuICBhd2FpdCBkYi5leGVjdXRlKGBcbiAgICBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBjb250YWN0cyAoXG4gICAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXG4gICAgICBuYW1lIFRFWFQsXG4gICAgICBlbWFpbCBURVhULFxuICAgICAgY29tcGFueSBURVhULFxuICAgICAgcGhvbmUgVEVYVCxcbiAgICAgIG1lc3NhZ2UgVEVYVCxcbiAgICAgIGNyZWF0ZWRfYXQgREFURVRJTUUgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUFxuICAgIClcbiAgYCk7XG4gIGF3YWl0IGRiLmV4ZWN1dGUoYFxuICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIGFzc2Vzc21lbnRzIChcbiAgICAgIGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxcbiAgICAgIG5hbWUgVEVYVCxcbiAgICAgIGVtYWlsIFRFWFQsXG4gICAgICBjb21wYW55IFRFWFQsXG4gICAgICBwaG9uZSBURVhULFxuICAgICAgc2NvcmUgSU5URUdFUixcbiAgICAgIGFuc3dlcnMgVEVYVCxcbiAgICAgIGNyZWF0ZWRfYXQgREFURVRJTUUgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUFxuICAgIClcbiAgYCk7XG4gIGF3YWl0IGRiLmV4ZWN1dGUoYFxuICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHVzZV9jYXNlcyAoXG4gICAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXG4gICAgICBjYXJkX2tleSBURVhUIFVOSVFVRSxcbiAgICAgIHRpdGxlIFRFWFQsXG4gICAgICBiYWRnZSBURVhULFxuICAgICAgcHJvYmxlbSBURVhULFxuICAgICAgc29sdXRpb24gVEVYVFxuICAgIClcbiAgYCk7XG5cbiAgY29uc3QgdWNDaGVjayA9IGF3YWl0IGRiLmV4ZWN1dGUoXCJTRUxFQ1QgQ09VTlQoKikgYXMgY291bnQgRlJPTSB1c2VfY2FzZXNcIik7XG4gIGlmICh1Y0NoZWNrLnJvd3NbMF0/LmNvdW50ID09PSAwKSB7XG4gICAgYXdhaXQgZGIuZXhlY3V0ZSh7XG4gICAgICBzcWw6IGBJTlNFUlQgT1IgSUdOT1JFIElOVE8gdXNlX2Nhc2VzIChjYXJkX2tleSwgdGl0bGUsIGJhZGdlLCBwcm9ibGVtLCBzb2x1dGlvbikgVkFMVUVTIFxuICAgICAgICAoJ3ZjaXNvJywgJ3ZDSVNPICYgR1JDIENvbnN1bHRhbnRzJywgJ0NvbnN1bHRhbnQgRm9yY2UgTXVsdGlwbGllcicsICdDb25zdWx0YW50cyBzcGVuZCA4MCUgb2YgdGhlaXIgYmlsbGluZyBob3VycyBtYW51YWxseSByZXF1ZXN0aW5nIHNjcmVlbnNob3RzLCBjaGFzaW5nIGRvd24gY2xpZW50IHN0YWtlaG9sZGVycywgYW5kIGNvcHlpbmcgdGV4dCBpbnRvIHN0YXRpYyBzcHJlYWRzaGVldHMuJywgJ01hbmFnZSAxNSsgY2xpZW50cyBmcm9tIGEgc2luZ2xlIHdoaXRlLWxhYmVsZWQgR1JDIGNvbW1hbmQgY2VudGVyLiBSZWd1TGF0dGljZSBhdXRvbm9tb3VzbHkgbWFwcyBjbGllbnQgaW5mcmFzdHJ1Y3R1cmUsIGhpZ2hsaWdodHMgZ2FwcywgYW5kIGF1dG8tZ2VuZXJhdGVzIHBvbGljeSB0ZW1wbGF0ZXMsIGxldHRpbmcgeW91IGZvY3VzIG9uIGhpZ2gtbWFyZ2luIHN0cmF0ZWdpYyBhZHZpc29yeS4nKSxcbiAgICAgICAgKCdmaW50ZWNoJywgJ0ZpbnRlY2hzICYgSGlnaC1Hcm93dGggU3RhcnR1cHMnLCAnRW50ZXJwcmlzZSBTYWxlcyBBY2NlbGVyYXRvcicsICdMYW5kaW5nIGEgbWFqb3IgZW50ZXJwcmlzZSBiYW5rIG9yIGZpbmFuY2lhbCBjb250cmFjdCBzdGFsbHMgZm9yIHdlZWtzIHdoZW4gdGhlIGJ1eWVyJydzIHByb2N1cmVtZW50IHRlYW0gZHVtcHMgYSBncnVlbGluZyA0MDAtcXVlc3Rpb24gY29tcGxpYW5jZSBzcHJlYWRzaGVldC4nLCAnRHJvcCB0aGUgcXVlc3Rpb25uYWlyZSBpbnRvIFJlZ3VMYXR0aWNlLiBUaGUgQUkgZW5naW5lIGNyb3NzLXJlZmVyZW5jZXMgeW91ciBsaXZlIGV2aWRlbmNlLCBhdXRvLWZpbGxzIHRoZSBkb2N1bWVudCBpbiBtaW51dGVzLCBhbmQgZ2VuZXJhdGVzIGFuIGF1ZGl0LXJlYWR5IHBhY2sgc2hvd2luZyB5b3VyIGFjdGl2ZSBJU08gMjcwMDEsIFNPQyAyLCBhbmQgU0FNQSBwb3N0dXJlLCBjdXR0aW5nIHNhbGVzIGN5Y2xlcyBieSAxMHguJyksXG4gICAgICAgICgnYXVkaXRvcicsICdBdWRpdG9ycyAmIENvbXBsaWFuY2UgT2ZmaWNlcnMnLCAnRnJpY3Rpb25sZXNzIEF1ZGl0aW5nJywgJ1RoZSBhbm51YWwgY2VydGlmaWNhdGlvbiBhdWRpdCBpcyBhIGhpZ2gtc3RyZXNzIHNjcmFtYmxlIG9mIHNjcmVlbnNob3QgZ2F0aGVyaW5nLCBzYW1wbGUgdGVzdGluZywgYW5kIGRldmVsb3BlciBpbnRlcnZpZXdzLCBkcmFpbmluZyB3ZWVrcyBvZiBlbmdpbmVlcmluZyB0aW1lLicsICdQcm92aWRlIHlvdXIgZXh0ZXJuYWwgYXVkaXRvciB3aXRoIGEgcmVhZC1vbmx5IHNlY3VyZSBkYXNoYm9hcmQgdG8geW91ciBsaXZlIENvbXBsaWFuY2UgR3JhcGguIEF1ZGl0b3JzIGNhbiBpbnNwZWN0IGF1dG9tYXRpY2FsbHkgbG9nZ2VkIGV2aWRlbmNlIHRyYWlscywgdmVyaWZ5IGNvbnRyb2wgbWFwcGluZ3MsIGFuZCBhcHByb3ZlIHNhbXBsZXMgZGlyZWN0bHkgXHUyMDE0IHR1cm5pbmcgd2Vla3Mgb2YgY2hhb3MgaW50byBhIDItaG91ciBzaWduLW9mZi4nKWAsXG4gICAgfSk7XG4gIH1cbn1cblxuLy8gVml0ZSBwbHVnaW4gdGhhdCBoYW5kbGVzIGFsbCAvYXBpLyogcm91dGVzIGluIGRldlxuY29uc3QgYXBpTWlkZGxld2FyZVBsdWdpbiA9IHtcbiAgbmFtZTogXCJhcGktbWlkZGxld2FyZVwiLFxuICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XG4gICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZShhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhuYW1lID0gKHJlcS51cmwgfHwgXCJcIikuc3BsaXQoXCI/XCIpWzBdO1xuICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygocmVxLnVybCB8fCBcIlwiKS5zcGxpdChcIj9cIilbMV0gfHwgXCJcIik7XG5cbiAgICAgIC8vIFx1MjUwMFx1MjUwMCAvYXBpL2dlbyBcdTIwMTQgcHJveHkgaXBhcGkuY28gdG8gYXZvaWQgYnJvd3NlciBDT1JTIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgICAgaWYgKHBhdGhuYW1lID09PSBcIi9hcGkvZ2VvXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2lwYXBpLmNvL2pzb24vXCIpO1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwLmpzb24oKTtcbiAgICAgICAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSAyMDA7XG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGlwOiBudWxsLCBjaXR5OiBudWxsLCByZWdpb246IG51bGwsIGNvdW50cnlfbmFtZTogbnVsbCB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBhdGhuYW1lLnN0YXJ0c1dpdGgoXCIvYXBpL1wiKSkge1xuICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBBbGwgb3RoZXIgL2FwaS8qIHJvdXRlcyBuZWVkIFR1cnNvXG4gICAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcblxuICAgICAgY29uc3QgeyBkYlVybCwgZGJUb2tlbiB9ID0gcmVhZEVudigpO1xuICAgICAgY29uc3QgZGIgPSBjcmVhdGVDbGllbnQoeyB1cmw6IGRiVXJsIHx8IFwiZmlsZTpsb2NhbC5kYlwiLCBhdXRoVG9rZW46IGRiVG9rZW4gfSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGVuc3VyZVRhYmxlcyhkYik7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlthcGldIHRhYmxlIGluaXQgZXJyb3I6XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIC8vIFx1MjUwMFx1MjUwMCAvYXBpL3VzZS1jYXNlcyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICAgIGlmIChwYXRobmFtZSA9PT0gXCIvYXBpL3VzZS1jYXNlc1wiKSB7XG4gICAgICAgIGlmIChyZXEubWV0aG9kID09PSBcIkdFVFwiKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLmV4ZWN1dGUoXCJTRUxFQ1QgKiBGUk9NIHVzZV9jYXNlcyBPUkRFUiBCWSBpZCBBU0NcIik7XG4gICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBzdWNjZXNzOiB0cnVlLCB1c2VDYXNlczogcmVzdWx0LnJvd3MgfSkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlthcGkvdXNlLWNhc2VzXSBlcnJvcjpcIiwgZXJyKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBTdHJpbmcoZXJyKSB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBcdTI1MDBcdTI1MDAgL2FwaS92aXNpdG9yIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgICAgaWYgKHBhdGhuYW1lID09PSBcIi9hcGkvdmlzaXRvclwiKSB7XG5cbiAgICAgICAgLy8gUE9TVCBcdTIwMTQgcmVnaXN0ZXIgbmV3IHZpc2l0b3IgT1IgbG9nIHNlc3Npb24gZm9yIHJldHVybmluZyB2aXNpdG9yXG4gICAgICAgIGlmIChyZXEubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gYXdhaXQgZ2V0Qm9keShyZXEpO1xuICAgICAgICAgICAgY29uc3QgeyB2aXNpdG9ySWQsIG5hbWUsIGVtYWlsLCBjb21wYW55LCBwaG9uZSwgaXAsIGxvY2F0aW9uLCBwYWdlLCByZWZlcnJlciwgdXNlckFnZW50IH0gPSBib2R5O1xuXG4gICAgICAgICAgICBpZiAodmlzaXRvcklkKSB7XG4gICAgICAgICAgICAgIC8vIFJFVFVSTklORyB2aXNpdG9yIFx1MjAxNCB1cGRhdGUgbGFzdF9zZWVuLCBpbmNyZW1lbnQgdmlzaXRfY291bnQsIGxvZyBzZXNzaW9uXG4gICAgICAgICAgICAgIGF3YWl0IGRiLmV4ZWN1dGUoe1xuICAgICAgICAgICAgICAgIHNxbDogYFVQREFURSB2aXNpdG9ycyBTRVQgdmlzaXRfY291bnQgPSB2aXNpdF9jb3VudCArIDEsIGxhc3Rfc2VlbiA9IENVUlJFTlRfVElNRVNUQU1QIFdIRVJFIGlkID0gP2AsXG4gICAgICAgICAgICAgICAgYXJnczogW3Zpc2l0b3JJZF0sXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIC8vIElmIHRoZXkgc3VibWl0dGVkIGRldGFpbHMgdGhpcyB0aW1lIHRvbyAodXBncmFkZSksIHVwZGF0ZSBwcm9maWxlXG4gICAgICAgICAgICAgIGlmIChuYW1lIHx8IGVtYWlsKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZGIuZXhlY3V0ZSh7XG4gICAgICAgICAgICAgICAgICBzcWw6IGBVUERBVEUgdmlzaXRvcnMgU0VUIG5hbWUgPSBDT0FMRVNDRSg/LCBuYW1lKSwgZW1haWwgPSBDT0FMRVNDRSg/LCBlbWFpbCksIGNvbXBhbnkgPSBDT0FMRVNDRSg/LCBjb21wYW55KSwgcGhvbmUgPSBDT0FMRVNDRSg/LCBwaG9uZSkgV0hFUkUgaWQgPSA/YCxcbiAgICAgICAgICAgICAgICAgIGFyZ3M6IFtuYW1lIHx8IG51bGwsIGVtYWlsIHx8IG51bGwsIGNvbXBhbnkgfHwgbnVsbCwgcGhvbmUgfHwgbnVsbCwgdmlzaXRvcklkXSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGF3YWl0IGRiLmV4ZWN1dGUoe1xuICAgICAgICAgICAgICAgIHNxbDogYElOU0VSVCBJTlRPIHZpc2l0b3Jfc2Vzc2lvbnMgKHZpc2l0b3JfaWQsIGlwLCBsb2NhdGlvbiwgcGFnZSwgcmVmZXJyZXIsIHVzZXJfYWdlbnQpIFZBTFVFUyAoPywgPywgPywgPywgPywgPylgLFxuICAgICAgICAgICAgICAgIGFyZ3M6IFt2aXNpdG9ySWQsIGlwIHx8IG51bGwsIGxvY2F0aW9uIHx8IG51bGwsIHBhZ2UgfHwgXCJob21lXCIsIHJlZmVycmVyIHx8IG51bGwsIHVzZXJBZ2VudCB8fCBudWxsXSxcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIuZXhlY3V0ZSh7XG4gICAgICAgICAgICAgICAgc3FsOiBcIlNFTEVDVCBuYW1lLCBlbWFpbCwgdmlzaXRfY291bnQgRlJPTSB2aXNpdG9ycyBXSEVSRSBpZCA9ID9cIixcbiAgICAgICAgICAgICAgICBhcmdzOiBbdmlzaXRvcklkXSxcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSAyMDA7XG4gICAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgcmV0dXJuaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpc2l0b3JJZCxcbiAgICAgICAgICAgICAgICBuYW1lOiByZXN1bHQucm93c1swXT8ubmFtZSB8fCBudWxsLFxuICAgICAgICAgICAgICAgIGVtYWlsOiByZXN1bHQucm93c1swXT8uZW1haWwgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICB2aXNpdENvdW50OiByZXN1bHQucm93c1swXT8udmlzaXRfY291bnQgfHwgMSxcbiAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBORVcgdmlzaXRvciBcdTIwMTQgY3JlYXRlIHByb2ZpbGUgKyBsb2cgZmlyc3Qgc2Vzc2lvblxuICAgICAgICAgICAgICBjb25zdCBuZXdJZCA9IHJhbmRvbVVVSUQoKTtcblxuICAgICAgICAgICAgICBhd2FpdCBkYi5leGVjdXRlKHtcbiAgICAgICAgICAgICAgICBzcWw6IGBJTlNFUlQgSU5UTyB2aXNpdG9ycyAoaWQsIG5hbWUsIGVtYWlsLCBjb21wYW55LCBwaG9uZSwgaXAsIGxvY2F0aW9uKSBWQUxVRVMgKD8sID8sID8sID8sID8sID8sID8pYCxcbiAgICAgICAgICAgICAgICBhcmdzOiBbbmV3SWQsIG5hbWUgfHwgbnVsbCwgZW1haWwgfHwgbnVsbCwgY29tcGFueSB8fCBudWxsLCBwaG9uZSB8fCBudWxsLCBpcCB8fCBudWxsLCBsb2NhdGlvbiB8fCBudWxsXSxcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgYXdhaXQgZGIuZXhlY3V0ZSh7XG4gICAgICAgICAgICAgICAgc3FsOiBgSU5TRVJUIElOVE8gdmlzaXRvcl9zZXNzaW9ucyAodmlzaXRvcl9pZCwgaXAsIGxvY2F0aW9uLCBwYWdlLCByZWZlcnJlciwgdXNlcl9hZ2VudCkgVkFMVUVTICg/LCA/LCA/LCA/LCA/LCA/KWAsXG4gICAgICAgICAgICAgICAgYXJnczogW25ld0lkLCBpcCB8fCBudWxsLCBsb2NhdGlvbiB8fCBudWxsLCBwYWdlIHx8IFwiaG9tZVwiLCByZWZlcnJlciB8fCBudWxsLCB1c2VyQWdlbnQgfHwgbnVsbF0sXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gMjAwO1xuICAgICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJldHVybmluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmlzaXRvcklkOiBuZXdJZCxcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlthcGkvdmlzaXRvciBQT1NUXSBlcnJvcjpcIiwgZXJyKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBTdHJpbmcoZXJyKSB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdFVCBcdTIwMTQgZ2V0IHZpc2l0b3IgcHJvZmlsZSBieSBpZFxuICAgICAgICBpZiAocmVxLm1ldGhvZCA9PT0gXCJHRVRcIikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHNlYXJjaFBhcmFtcy5nZXQoXCJpZFwiKTtcbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDA7XG4gICAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJpZCByZXF1aXJlZFwiIH0pKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIuZXhlY3V0ZSh7XG4gICAgICAgICAgICAgIHNxbDogXCJTRUxFQ1QgKiBGUk9NIHZpc2l0b3JzIFdIRVJFIGlkID0gP1wiLFxuICAgICAgICAgICAgICBhcmdzOiBbaWRdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LnJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDA0O1xuICAgICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwidmlzaXRvciBub3QgZm91bmRcIiB9KSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gMjAwO1xuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IHRydWUsIHZpc2l0b3I6IHJlc3VsdC5yb3dzWzBdIH0pKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbYXBpL3Zpc2l0b3IgR0VUXSBlcnJvcjpcIiwgZXJyKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBTdHJpbmcoZXJyKSB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBcdTI1MDBcdTI1MDAgL2FwaS92aXNpdCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICAgIGlmIChwYXRobmFtZSA9PT0gXCIvYXBpL3Zpc2l0XCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAocmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBnZXRCb2R5KHJlcSk7XG4gICAgICAgICAgICBjb25zdCBwYWdlID0gYm9keS5wYWdlIHx8IFwiaG9tZVwiO1xuICAgICAgICAgICAgY29uc3QgaXAgPSBib2R5LmlwIHx8IG51bGw7XG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGJvZHkubG9jYXRpb24gfHwgbnVsbDtcblxuICAgICAgICAgICAgYXdhaXQgZGIuZXhlY3V0ZSh7XG4gICAgICAgICAgICAgIHNxbDogXCJJTlNFUlQgSU5UTyB2aXNpdG9yX2xvZ3MgKHBhZ2VfcGF0aCwgaXAsIGxvY2F0aW9uKSBWQUxVRVMgKD8sID8sID8pXCIsXG4gICAgICAgICAgICAgIGFyZ3M6IFtwYWdlLCBpcCwgbG9jYXRpb25dLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGF3YWl0IGRiLmV4ZWN1dGUoe1xuICAgICAgICAgICAgICBzcWw6IGBcbiAgICAgICAgICAgICAgICBJTlNFUlQgSU5UTyB2aXNpdG9yX3N0YXRzIChwYWdlX3BhdGgsIHZpZXdzLCBsYXN0X3Zpc2l0KVxuICAgICAgICAgICAgICAgIFZBTFVFUyAoPywgMSwgQ1VSUkVOVF9USU1FU1RBTVApXG4gICAgICAgICAgICAgICAgT04gQ09ORkxJQ1QocGFnZV9wYXRoKSBETyBVUERBVEUgU0VUXG4gICAgICAgICAgICAgICAgICB2aWV3cyA9IHZpZXdzICsgMSxcbiAgICAgICAgICAgICAgICAgIGxhc3RfdmlzaXQgPSBDVVJSRU5UX1RJTUVTVEFNUFxuICAgICAgICAgICAgICBgLFxuICAgICAgICAgICAgICBhcmdzOiBbcGFnZV0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIuZXhlY3V0ZSh7XG4gICAgICAgICAgICAgIHNxbDogXCJTRUxFQ1Qgdmlld3MgRlJPTSB2aXNpdG9yX3N0YXRzIFdIRVJFIHBhZ2VfcGF0aCA9ID9cIixcbiAgICAgICAgICAgICAgYXJnczogW3BhZ2VdLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gMjAwO1xuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IHRydWUsIGNvdW50OiByZXN1bHQucm93c1swXT8udmlld3MgfHwgMSB9KSk7XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcS5tZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSBzZWFyY2hQYXJhbXMuZ2V0KFwicGFnZVwiKSB8fCBcImhvbWVcIjtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLmV4ZWN1dGUoe1xuICAgICAgICAgICAgICBzcWw6IFwiU0VMRUNUIHZpZXdzIEZST00gdmlzaXRvcl9zdGF0cyBXSEVSRSBwYWdlX3BhdGggPSA/XCIsXG4gICAgICAgICAgICAgIGFyZ3M6IFtwYWdlXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSAyMDA7XG4gICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogdHJ1ZSwgY291bnQ6IHJlc3VsdC5yb3dzWzBdPy52aWV3cyB8fCAwIH0pKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDU7XG4gICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwiTWV0aG9kIG5vdCBhbGxvd2VkXCIgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlthcGkvdmlzaXRdIGVycm9yOlwiLCBlcnIpO1xuICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogU3RyaW5nKGVycikgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gXHUyNTAwXHUyNTAwIC9hcGkvY29udGFjdCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICAgIGlmIChwYXRobmFtZSA9PT0gXCIvYXBpL2NvbnRhY3RcIiAmJiByZXEubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHsgbmFtZSwgZW1haWwsIGNvbXBhbnksIHBob25lLCBtZXNzYWdlIH0gPSBhd2FpdCBnZXRCb2R5KHJlcSk7XG5cbiAgICAgICAgICBhd2FpdCBkYi5leGVjdXRlKHtcbiAgICAgICAgICAgIHNxbDogXCJJTlNFUlQgSU5UTyBjb250YWN0cyAobmFtZSwgZW1haWwsIGNvbXBhbnksIHBob25lLCBtZXNzYWdlKSBWQUxVRVMgKD8sID8sID8sID8sID8pXCIsXG4gICAgICAgICAgICBhcmdzOiBbbmFtZSwgZW1haWwsIGNvbXBhbnkgfHwgbnVsbCwgcGhvbmUgfHwgbnVsbCwgbWVzc2FnZSB8fCBudWxsXSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gMjAwO1xuICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBzdWNjZXNzOiB0cnVlIH0pKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlthcGkvY29udGFjdF0gZXJyb3I6XCIsIGVycik7XG4gICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA1MDA7XG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBTdHJpbmcoZXJyKSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBcdTI1MDBcdTI1MDAgL2FwaS9hc3Nlc3NtZW50IFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgICAgaWYgKHBhdGhuYW1lID09PSBcIi9hcGkvYXNzZXNzbWVudFwiICYmIHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgeyBuYW1lLCBlbWFpbCwgY29tcGFueSwgcGhvbmUsIHNjb3JlLCBhbnN3ZXJzIH0gPSBhd2FpdCBnZXRCb2R5KHJlcSk7XG5cbiAgICAgICAgICBhd2FpdCBkYi5leGVjdXRlKHtcbiAgICAgICAgICAgIHNxbDogXCJJTlNFUlQgSU5UTyBhc3Nlc3NtZW50cyAobmFtZSwgZW1haWwsIGNvbXBhbnksIHBob25lLCBzY29yZSwgYW5zd2VycykgVkFMVUVTICg/LCA/LCA/LCA/LCA/LCA/KVwiLFxuICAgICAgICAgICAgYXJnczogW25hbWUsIGVtYWlsLCBjb21wYW55IHx8IG51bGwsIHBob25lIHx8IG51bGwsIHNjb3JlLCBKU09OLnN0cmluZ2lmeShhbnN3ZXJzIHx8IHt9KV0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogdHJ1ZSB9KSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbYXBpL2Fzc2Vzc21lbnRdIGVycm9yOlwiLCBlcnIpO1xuICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogU3RyaW5nKGVycikgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVW5rbm93biAvYXBpLyogcm91dGVcbiAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDA0O1xuICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBcIk5vdCBmb3VuZFwiIH0pKTtcbiAgICB9KTtcbiAgfSxcbn07XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKSxcbiAgICBhcGlNaWRkbGV3YXJlUGx1Z2luLFxuICBdLmZpbHRlcihCb29sZWFuKSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICAgIGRlZHVwZTogW1xuICAgICAgXCJyZWFjdFwiLFxuICAgICAgXCJyZWFjdC1kb21cIixcbiAgICAgIFwicmVhY3QvanN4LXJ1bnRpbWVcIixcbiAgICAgIFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIsXG4gICAgICBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiLFxuICAgICAgXCJAdGFuc3RhY2svcXVlcnktY29yZVwiLFxuICAgIF0sXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlaLFNBQVMsb0JBQW9CO0FBQzlhLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxRQUFRO0FBQ2YsU0FBUyxrQkFBa0I7QUFOM0IsSUFBTSxtQ0FBbUM7QUFTekMsU0FBUyxVQUFVO0FBQ2pCLE1BQUksUUFBUSxRQUFRLElBQUksc0JBQXNCO0FBQzlDLE1BQUksVUFBVSxRQUFRLElBQUksb0JBQW9CO0FBRTlDLE1BQUksR0FBRyxXQUFXLE1BQU0sR0FBRztBQUN6QixVQUFNLGFBQWEsR0FBRyxh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
