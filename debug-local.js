import { chromium } from "@playwright/test";
import { spawn } from "child_process";

const run = async () => {
  console.log("Starting dev server...");
  const devServer = spawn("npx", ["vite"], {
    cwd: process.cwd(),
    shell: true,
  });

  devServer.stdout.on("data", (data) => {
    console.log(`[DevServer] ${data}`);
  });

  devServer.stderr.on("data", (data) => {
    console.error(`[DevServer Error] ${data}`);
  });

  // Wait 4 seconds for dev server to start
  await new Promise((resolve) => setTimeout(resolve, 4000));

  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on("console", (msg) => {
    console.log(`[Browser Console] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on("pageerror", (err) => {
    console.error(`[Browser JS Error] ${err.message}\nStack: ${err.stack}`);
  });

  console.log("Navigating to http://localhost:8080...");
  try {
    await page.goto("http://localhost:8080", { timeout: 10000 });
    // Wait for 3 seconds to capture any delayed logs/errors
    await new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (err) {
    console.error("Navigation failed:", err);
  }

  console.log("Closing browser and dev server...");
  await browser.close();
  devServer.kill();
  process.exit(0);
};

run().catch((err) => {
  console.error("Debug script crashed:", err);
  process.exit(1);
});
