import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
        const parsedUrl = new URL(req.url || "", `http://${req.headers.host}`);
        const pathname = parsedUrl.pathname;

        if (pathname.startsWith("/api/")) {
          // Read credentials from .env or env vars
          let dbUrl = process.env.TURSO_DATABASE_URL;
          let dbToken = process.env.TURSO_AUTH_TOKEN;

          try {
            const fs = await import("fs");
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
          } catch (e) {}

          const { createClient } = await import("@libsql/client");
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
                page = parsedUrl.searchParams.get("page") || "home";
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

              // Send Mailjet notification
              const MJ_API_KEY = "f2e0ab5af468c23789f8ef1bedfa2e59";
              const MJ_SECRET_KEY = "36fa567993ccd2023deb25df5ab198ee";
              
              const htmlBody = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(135deg, #0d9488, #115e59); padding: 24px; border-radius: 12px 12px 0 0;">
                    <h2 style="color: #ffffff; margin: 0; font-size: 22px;">📊 New Compliance Assessment Completed</h2>
                    <p style="color: #ccfbf1; margin: 8px 0 0 0; font-size: 14px;">via ReguLattice Website (Local Dev)</p>
                  </div>
                  <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
                    <h3 style="color: #0f172a; margin-top: 0;">Score: <span style="color: #0d9488; font-size: 24px; font-weight: bold;">${score}/100</span></h3>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; width: 120px;"><strong>Name</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${name}</td></tr>
                      <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;"><strong>Email</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;"><a href="mailto:${email}" style="color: #0d9488;">${email}</a></td></tr>
                      <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;"><strong>Company</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${company || "Not specified"}</td></tr>
                      <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;"><strong>Phone / WA</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${phone || "Not provided"}</td></tr>
                    </table>
                  </div>
                </div>
              `;

              const mailjetPayload = {
                Messages: [{
                  From: { Email: "info@regulattice.com", Name: "ReguLattice Website" },
                  To: [
                    { Email: "info@regulattice.com", Name: "ReguLattice" },
                    { Email: "moazzamwaheed@gmail.com", Name: "Moazzam Waheed" }
                  ],
                  Subject: `Compliance Assessment Completed by ${name} (${score}/100)`,
                  TextPart: `Name: ${name}\nEmail: ${email}\nScore: ${score}/100`,
                  HTMLPart: htmlBody
                }]
              };

              fetch("https://api.mailjet.com/v3.1/send", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic " + Buffer.from(`${MJ_API_KEY}:${MJ_SECRET_KEY}`).toString("base64")
                },
                body: JSON.stringify(mailjetPayload)
              }).catch(err => console.error("Mailjet fail:", err));

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

              // Send Mailjet notification
              const MJ_API_KEY = "f2e0ab5af468c23789f8ef1bedfa2e59";
              const MJ_SECRET_KEY = "36fa567993ccd2023deb25df5ab198ee";

              const htmlBody = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 24px; border-radius: 12px 12px 0 0;">
                    <h2 style="color: #2dd4bf; margin: 0; font-size: 22px;">🚀 New Expert Consultation Request</h2>
                    <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">via ReguLattice Website (Local Dev)</p>
                  </div>
                  <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; width: 120px;"><strong>Name</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${name}</td></tr>
                      <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;"><strong>Email</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;"><a href="mailto:${email}" style="color: #0d9488;">${email}</a></td></tr>
                      <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;"><strong>Company</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${company || "Not specified"}</td></tr>
                      <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;"><strong>Phone / WA</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${phone || "Not provided"}</td></tr>
                      <tr><td style="padding: 12px 0; color: #64748b; font-size: 14px;"><strong>Message</strong></td><td style="padding: 12px 0; color: #0f172a; font-size: 14px; white-space: pre-wrap;">${message}</td></tr>
                    </table>
                  </div>
                </div>
              `;

              const mailjetPayload = {
                Messages: [{
                  From: { Email: "info@regulattice.com", Name: "ReguLattice Website" },
                  To: [
                    { Email: "info@regulattice.com", Name: "ReguLattice" },
                    { Email: "moazzamwaheed@gmail.com", Name: "Moazzam Waheed" }
                  ],
                  Subject: `Expert Consultation Request from ${name}`,
                  TextPart: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                  HTMLPart: htmlBody
                }]
              };

              fetch("https://api.mailjet.com/v3.1/send", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic " + Buffer.from(`${MJ_API_KEY}:${MJ_SECRET_KEY}`).toString("base64")
                },
                body: JSON.stringify(mailjetPayload)
              }).catch(err => console.error("Mailjet fail:", err));

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
