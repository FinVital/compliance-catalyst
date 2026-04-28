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
    proxy: {
      "/api/contact": {
        target: "https://api.mailjet.com",
        changeOrigin: true,
        rewrite: () => "/v3.1/send",
        secure: true,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            const auth = Buffer.from("f2e0ab5af468c23789f8ef1bedfa2e59:36fa567993ccd2023deb25df5ab198ee").toString("base64");
            proxyReq.setHeader("Authorization", `Basic ${auth}`);
          });
        },
      },
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
