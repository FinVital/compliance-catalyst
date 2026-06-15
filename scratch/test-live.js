import { chromium, devices } from "@playwright/test";

const run = async () => {
  console.log("Launching browser with iPhone SE simulation to check the LIVE site...");
  const browser = await chromium.launch({ headless: true });
  
  // Use iPhone SE settings
  const iPhoneSE = devices["iPhone SE"];
  const context = await browser.newContext({
    ...iPhoneSE,
  });
  
  const page = await context.newPage();

  page.on("console", (msg) => {
    console.log(`[LIVE Browser Console] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on("pageerror", (err) => {
    console.error(`[LIVE Browser JS Error] ${err.message}\nStack: ${err.stack}`);
  });

  console.log("Navigating to https://regulattice.com...");
  try {
    await page.goto("https://regulattice.com", { timeout: 15000, waitUntil: "networkidle" });
    // Wait for 3 seconds to capture any delayed logs/errors
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Check if #root is empty
    const rootHTML = await page.innerHTML("#root");
    console.log(`[LIVE Root HTML length] ${rootHTML.length}`);
    if (rootHTML.length === 0) {
      console.error("[LIVE CRITICAL] #root element is empty!");
    } else {
      console.log("[LIVE Success] #root element has content!");
    }
  } catch (err) {
    console.error("LIVE Navigation/Test failed:", err);
  }

  console.log("Closing browser...");
  await browser.close();
  process.exit(0);
};

run().catch((err) => {
  console.error("Test script crashed:", err);
  process.exit(1);
});
