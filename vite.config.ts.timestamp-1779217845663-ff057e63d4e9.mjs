// vite.config.ts
import { defineConfig } from "file:///C:/lablabai/FinLabX/demo6/MVP/ReguLattice%20Website/compliance-catalyst/node_modules/vite/dist/node/index.js";
import react from "file:///C:/lablabai/FinLabX/demo6/MVP/ReguLattice%20Website/compliance-catalyst/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/lablabai/FinLabX/demo6/MVP/ReguLattice%20Website/compliance-catalyst/node_modules/lovable-tagger/dist/index.js";
import { createClient } from "file:///C:/lablabai/FinLabX/demo6/MVP/ReguLattice%20Website/compliance-catalyst/node_modules/@libsql/client/lib-esm/node.js";
import fs from "fs";
var __vite_injected_original_dirname = "C:\\lablabai\\FinLabX\\demo6\\MVP\\ReguLattice Website\\compliance-catalyst";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const pathname = (req.url || "").split("?")[0];
          const searchParams = new URLSearchParams((req.url || "").split("?")[1] || "");
          if (pathname.startsWith("/api/")) {
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
              authToken: dbToken || ""
            });
            const getBody = () => new Promise((resolve) => {
              let body = "";
              req.on("data", (chunk) => {
                body += chunk;
              });
              req.on("end", () => {
                try {
                  resolve(JSON.parse(body));
                } catch (e) {
                  resolve({});
                }
              });
            });
            res.setHeader("Content-Type", "application/json");
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
                    args: [page]
                  });
                }
                const result = await dbClient.execute({
                  sql: "SELECT views FROM visitor_stats WHERE page_path = ?",
                  args: [page]
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
            if (pathname === "/api/assessment" && req.method === "POST") {
              try {
                const { name, email, company, phone, score, answers } = await getBody();
                await dbClient.execute({
                  sql: `INSERT INTO assessments (name, email, company, phone, score, answers) 
                        VALUES (?, ?, ?, ?, ?, ?)`,
                  args: [name, email, company || null, phone || null, score, JSON.stringify(answers || {})]
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
            if (pathname === "/api/contact" && req.method === "POST") {
              try {
                const { name, email, company, phone, message } = await getBody();
                await dbClient.execute({
                  sql: "INSERT INTO contacts (name, email, company, phone, message) VALUES (?, ?, ?, ?, ?)",
                  args: [name, email, company || null, phone || null, message || null]
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
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"]
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxsYWJsYWJhaVxcXFxGaW5MYWJYXFxcXGRlbW82XFxcXE1WUFxcXFxSZWd1TGF0dGljZSBXZWJzaXRlXFxcXGNvbXBsaWFuY2UtY2F0YWx5c3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXGxhYmxhYmFpXFxcXEZpbkxhYlhcXFxcZGVtbzZcXFxcTVZQXFxcXFJlZ3VMYXR0aWNlIFdlYnNpdGVcXFxcY29tcGxpYW5jZS1jYXRhbHlzdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovbGFibGFiYWkvRmluTGFiWC9kZW1vNi9NVlAvUmVndUxhdHRpY2UlMjBXZWJzaXRlL2NvbXBsaWFuY2UtY2F0YWx5c3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAbGlic3FsL2NsaWVudFwiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCI6OlwiLFxuICAgIHBvcnQ6IDgwODAsXG4gICAgaG1yOiB7XG4gICAgICBvdmVybGF5OiBmYWxzZSxcbiAgICB9LFxuICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcbiAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcGF0aG5hbWUgPSAocmVxLnVybCB8fCBcIlwiKS5zcGxpdChcIj9cIilbMF07XG4gICAgICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygocmVxLnVybCB8fCBcIlwiKS5zcGxpdChcIj9cIilbMV0gfHwgXCJcIik7XG5cbiAgICAgICAgICBpZiAocGF0aG5hbWUuc3RhcnRzV2l0aChcIi9hcGkvXCIpKSB7XG4gICAgICAgICAgICAvLyBSZWFkIGNyZWRlbnRpYWxzIGZyb20gLmVudiBvciBlbnYgdmFyc1xuICAgICAgICAgICAgbGV0IGRiVXJsID0gcHJvY2Vzcy5lbnYuVFVSU09fREFUQUJBU0VfVVJMO1xuICAgICAgICAgICAgbGV0IGRiVG9rZW4gPSBwcm9jZXNzLmVudi5UVVJTT19BVVRIX1RPS0VOO1xuXG4gICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhcIi5lbnZcIikpIHtcbiAgICAgICAgICAgICAgY29uc3QgZW52Q29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhcIi5lbnZcIiwgXCJ1dGY4XCIpO1xuICAgICAgICAgICAgICBlbnZDb250ZW50LnNwbGl0KFwiXFxuXCIpLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IGxpbmUuc3BsaXQoXCI9XCIpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gcGFydHNbMF0udHJpbSgpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gcGFydHMuc2xpY2UoMSkuam9pbihcIj1cIikudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJUVVJTT19EQVRBQkFTRV9VUkxcIikgZGJVcmwgPSB2YWw7XG4gICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBcIlRVUlNPX0FVVEhfVE9LRU5cIikgZGJUb2tlbiA9IHZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBkYkNsaWVudCA9IGNyZWF0ZUNsaWVudCh7XG4gICAgICAgICAgICAgIHVybDogZGJVcmwgfHwgXCJcIixcbiAgICAgICAgICAgICAgYXV0aFRva2VuOiBkYlRva2VuIHx8IFwiXCIsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gSGVscGVyIHRvIHBhcnNlIEpTT04gYm9keVxuICAgICAgICAgICAgY29uc3QgZ2V0Qm9keSA9ICgpID0+IG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgbGV0IGJvZHkgPSBcIlwiO1xuICAgICAgICAgICAgICByZXEub24oXCJkYXRhXCIsIChjaHVuaykgPT4geyBib2R5ICs9IGNodW5rOyB9KTtcbiAgICAgICAgICAgICAgcmVxLm9uKFwiZW5kXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKGJvZHkpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlKHt9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAvLyAxLiBWSVNJVCBUUkFDS0VSIEVORFBPSU5UXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAocGF0aG5hbWUgPT09IFwiL2FwaS92aXNpdFwiKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhZ2UgPSBcImhvbWVcIjtcbiAgICAgICAgICAgICAgICBpZiAocmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBnZXRCb2R5KCk7XG4gICAgICAgICAgICAgICAgICBwYWdlID0gYm9keS5wYWdlIHx8IFwiaG9tZVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBwYWdlID0gc2VhcmNoUGFyYW1zLmdldChcInBhZ2VcIikgfHwgXCJob21lXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBkYkNsaWVudC5leGVjdXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc3FsOiBgXG4gICAgICAgICAgICAgICAgICAgICAgSU5TRVJUIElOVE8gdmlzaXRvcl9zdGF0cyAocGFnZV9wYXRoLCB2aWV3cywgbGFzdF92aXNpdClcbiAgICAgICAgICAgICAgICAgICAgICBWQUxVRVMgKD8sIDEsIENVUlJFTlRfVElNRVNUQU1QKVxuICAgICAgICAgICAgICAgICAgICAgIE9OIENPTkZMSUNUKHBhZ2VfcGF0aCkgRE8gVVBEQVRFIFNFVFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld3MgPSB2aWV3cyArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0X3Zpc2l0ID0gQ1VSUkVOVF9USU1FU1RBTVBcbiAgICAgICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgICAgICAgYXJnczogW3BhZ2VdLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGJDbGllbnQuZXhlY3V0ZSh7XG4gICAgICAgICAgICAgICAgICBzcWw6IFwiU0VMRUNUIHZpZXdzIEZST00gdmlzaXRvcl9zdGF0cyBXSEVSRSBwYWdlX3BhdGggPSA/XCIsXG4gICAgICAgICAgICAgICAgICBhcmdzOiBbcGFnZV0sXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICAgICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogdHJ1ZSwgY291bnQ6IHJlc3VsdC5yb3dzWzBdPy52aWV3cyB8fCAwIH0pKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkxvY2FsIHZpc2l0IHRyYWNrZXIgZXJyb3I6XCIsIGVycik7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA1MDA7XG4gICAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBlcnIubWVzc2FnZSB9KSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgLy8gMi4gQVNTRVNTTUVOVCBTVUJNSVNTSU9OIEVORFBPSU5UXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAocGF0aG5hbWUgPT09IFwiL2FwaS9hc3Nlc3NtZW50XCIgJiYgcmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG5hbWUsIGVtYWlsLCBjb21wYW55LCBwaG9uZSwgc2NvcmUsIGFuc3dlcnMgfSA9IGF3YWl0IGdldEJvZHkoKTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IGRiQ2xpZW50LmV4ZWN1dGUoe1xuICAgICAgICAgICAgICAgICAgc3FsOiBgSU5TRVJUIElOVE8gYXNzZXNzbWVudHMgKG5hbWUsIGVtYWlsLCBjb21wYW55LCBwaG9uZSwgc2NvcmUsIGFuc3dlcnMpIFxuICAgICAgICAgICAgICAgICAgICAgICAgVkFMVUVTICg/LCA/LCA/LCA/LCA/LCA/KWAsXG4gICAgICAgICAgICAgICAgICBhcmdzOiBbbmFtZSwgZW1haWwsIGNvbXBhbnkgfHwgbnVsbCwgcGhvbmUgfHwgbnVsbCwgc2NvcmUsIEpTT04uc3RyaW5naWZ5KGFuc3dlcnMgfHwge30pXSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gMjAwO1xuICAgICAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBzdWNjZXNzOiB0cnVlIH0pKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkxvY2FsIGFzc2Vzc21lbnQgaGFuZGxlciBlcnJvcjpcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDUwMDtcbiAgICAgICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IGVyci5tZXNzYWdlIH0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIC8vIDMuIENPTlRBQ1QgU1VCTUlTU0lPTiBFTkRQT0lOVFxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKHBhdGhuYW1lID09PSBcIi9hcGkvY29udGFjdFwiICYmIHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lLCBlbWFpbCwgY29tcGFueSwgcGhvbmUsIG1lc3NhZ2UgfSA9IGF3YWl0IGdldEJvZHkoKTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IGRiQ2xpZW50LmV4ZWN1dGUoe1xuICAgICAgICAgICAgICAgICAgc3FsOiBcIklOU0VSVCBJTlRPIGNvbnRhY3RzIChuYW1lLCBlbWFpbCwgY29tcGFueSwgcGhvbmUsIG1lc3NhZ2UpIFZBTFVFUyAoPywgPywgPywgPywgPylcIixcbiAgICAgICAgICAgICAgICAgIGFyZ3M6IFtuYW1lLCBlbWFpbCwgY29tcGFueSB8fCBudWxsLCBwaG9uZSB8fCBudWxsLCBtZXNzYWdlIHx8IG51bGxdLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSAyMDA7XG4gICAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IHRydWUsIE1lc3NhZ2VzOiBbeyBTdGF0dXM6IFwic3VjY2Vzc1wiIH1dIH0pKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkxvY2FsIGNvbnRhY3QgaGFuZGxlciBlcnJvcjpcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDUwMDtcbiAgICAgICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IGVyci5tZXNzYWdlIH0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkxvY2FsIEdSQyBBUEkgbWlkZGxld2FyZSBlcnJvcjpcIiwgZSk7XG4gICAgICAgIH1cblxuICAgICAgICBuZXh0KCk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKSwgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiICYmIGNvbXBvbmVudFRhZ2dlcigpXS5maWx0ZXIoQm9vbGVhbiksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgICBkZWR1cGU6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCIsIFwicmVhY3QvanN4LXJ1bnRpbWVcIiwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiwgXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIiwgXCJAdGFuc3RhY2svcXVlcnktY29yZVwiXSxcbiAgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVosU0FBUyxvQkFBb0I7QUFDOWEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFFBQVE7QUFMZixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxnQkFBZ0IsUUFBUTtBQUN0QixhQUFPLFlBQVksSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTO0FB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
