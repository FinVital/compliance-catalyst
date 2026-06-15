import { test, expect } from "@playwright/test";

test("capture console logs", async ({ page }) => {
  page.on("console", (msg) => {
    console.log(`[Browser Console] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on("pageerror", (err) => {
    console.error(`[Browser JS Error] ${err.message}\nStack: ${err.stack}`);
  });

  console.log("Navigating to http://localhost:8080...");
  try {
    await page.goto("http://localhost:8080", { timeout: 10000 });
    // Wait to let scripts load and throw errors
    await page.waitForTimeout(3000);
  } catch (err) {
    console.error("Navigation failed:", err);
  }
});
