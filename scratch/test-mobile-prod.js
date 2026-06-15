import { chromium, devices } from "@playwright/test";
import { spawn } from "child_process";

const run = async () => {
  console.log("Starting preview server (production bundle)...");
  // Run vite preview on port 8099
  const previewServer = spawn("npx", ["vite", "preview", "--port", "8099"], {
    cwd: "c:\\lablabai\\FinLabX\\demo6\\MVP\\ReguLattice Website\\compliance-catalyst",
    shell: true,
  });

  previewServer.stdout.on("data", (data) => {
    console.log(`[PreviewServer] ${data}`);
  });

  previewServer.stderr.on("data", (data) => {
    console.error(`[PreviewServer Error] ${data}`);
  });

  // Wait 4 seconds for preview server to start
  await new Promise((resolve) => setTimeout(resolve, 4000));

  console.log("Launching browser with iPhone SE simulation...");
  const browser = await chromium.launch({ headless: true });
  
  // Use iPhone SE settings
  const iPhoneSE = devices["iPhone SE"];
  const context = await browser.newContext({
    ...iPhoneSE,
  });
  
  const page = await context.newPage();

  page.on("console", (msg) => {
    console.log(`[Browser Console] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on("pageerror", (err) => {
    console.error(`[Browser JS Error] ${err.message}\nStack: ${err.stack}`);
  });

  console.log("Navigating to http://localhost:8099...");
  try {
    await page.goto("http://localhost:8099", { timeout: 10000 });
    // Wait for 3 seconds to capture any delayed logs/errors
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Check if #root is empty
    const rootHTML = await page.innerHTML("#root");
    console.log(`[Root HTML length] ${rootHTML.length}`);
    if (rootHTML.length === 0) {
      console.error("[CRITICAL] #root element is empty!");
    } else {
      console.log("[Success] #root element has content!");
    }
  } catch (err) {
    console.error("Navigation/Test failed:", err);
  }

  console.log("Closing browser and preview server...");
  await browser.close();
  previewServer.kill("SIGINT");
  process.exit(0);
};

run().catch((err) => {
  console.error("Test script crashed:", err);
  process.exit(1);
});
