import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { createClient } from "@libsql/client";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const pathname = (req.url || "").split("?")[0];
          const searchParams = new URLSearchParams((req.url || "").split("?")[1] || "");

          if (pathname.startsWith("/api/")) {
            // Read credentials from .env or env vars
            let dbUrl = process.env.TURSO_DATABASE_URL;
            let dbToken = process.env.TURSO_AUTH_TOKEN;

            if (fs.existsSync(".env")) {
              const envContent = fs.readFileSync(".env", "utf8");
              envContent.split("\n").forEach((line) => {
                const parts = line.split("=");
                if (parts.length >= 2) {
                  const key = parts[0].trim();
                  const val = parts.slice(1).join("=").trim();
                  if (key === "TURSO_DATABASE_URL") dbUrl = val;
                  if (key === "TURSO_AUTH_TOKEN") dbToken = val;
                }
              });
            }

            const dbClient = createClient({
              url: dbUrl || "",
              authToken: dbToken || "",
            });

            // Helper to parse JSON body
            const getBody = () => new Promise<any>((resolve) => {
              let body = "";
              req.on("data", (chunk) => { body += chunk; });
              req.on("end", () => {
                try {
                  resolve(JSON.parse(body));
                } catch (e) {
                  resolve({});
                }
              });
            });

            res.setHeader("Content-Type", "application/json");

            // ----------------------------------------------------
            // 1. VISIT TRACKER ENDPOINT
            // ----------------------------------------------------
            if (pathname === "/api/visit") {
              try {
                let page = "home";
                if (req.method === "POST") {
                  const body = await getBody();
                  page = body.page || "home";
                } else {
                  page = searchParams.get("page") || "home";
                }

                if (req.method === "POST") {
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
                }

                const result = await dbClient.execute({
                  sql: "SELECT views FROM visitor_stats WHERE page_path = ?",
                  args: [page],
                });

                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, count: result.rows[0]?.views || 0 }));
              } catch (err) {
                console.error("Local visit tracker error:", err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              }
              return;
            }
            // ----------------------------------------------------
            // 2. ASSESSMENT SUBMISSION ENDPOINT
            // ----------------------------------------------------
            if (pathname === "/api/assessment" && req.method === "POST") {
              try {
                const { name, email, company, phone, score, answers } = await getBody();

                await dbClient.execute({
                  sql: `INSERT INTO assessments (name, email, company, phone, score, answers) 
                        VALUES (?, ?, ?, ?, ?, ?)`,
                  args: [name, email, company || null, phone || null, score, JSON.stringify(answers || {})],
                });

                res.statusCode = 200;
                res.end(JSON.stringify({ success: true }));
              } catch (err) {
                console.error("Local assessment handler error:", err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              }
              return;
            }

            // ----------------------------------------------------
            // 3. CONTACT SUBMISSION ENDPOINT
            // ----------------------------------------------------
            if (pathname === "/api/contact" && req.method === "POST") {
              try {
                const { name, email, company, phone, message } = await getBody();

                await dbClient.execute({
                  sql: "INSERT INTO contacts (name, email, company, phone, message) VALUES (?, ?, ?, ?, ?)",
                  args: [name, email, company || null, phone || null, message || null],
                });

                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, Messages: [{ Status: "success" }] }));
              } catch (err) {
                console.error("Local contact handler error:", err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              }
              return;
            }
          }
        } catch (e) {
          console.error("Local GRC API middleware error:", e);
        }

        next();
      });
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
