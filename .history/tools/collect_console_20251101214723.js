import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const OUT_DIR = path.resolve(process.cwd(), "tools", "console-output");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const URL = "https://PallaviBade28.github.io/Portfolio/";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const page = await context.newPage();

  const logs = [];
  page.on("console", (msg) => {
    const text = msg.text();
    logs.push({ type: "console", level: msg.type(), text, location: msg.location() });
    console.log(`[console:${msg.type()}] ${text}`);
  });

  page.on("pageerror", (err) => {
    logs.push({ type: "pageerror", message: err.message, stack: err.stack });
    console.error("[pageerror]", err.message);
  });

  page.on("requestfailed", (request) => {
    logs.push({ type: "requestfailed", url: request.url(), method: request.method(), failure: request.failure()?.errorText });
    console.error("[requestfailed]", request.method(), request.url(), request.failure()?.errorText);
  });

  page.on("response", async (response) => {
    const status = response.status();
    if (status >= 400) {
      logs.push({ type: "badresponse", url: response.url(), status });
      console.error(`[badresponse] ${status} ${response.url()}`);
    }
  });

  try {
    const resp = await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
    logs.push({ type: "navigation", url: URL, status: resp?.status() });

    // Wait a bit for runtime errors to appear from async code
    await page.waitForTimeout(3000);

    // Save screenshot
    const screenshotPath = path.join(OUT_DIR, "page-screenshot.png");
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log("Saved screenshot:", screenshotPath);

    // Save page HTML for inspection
    const html = await page.content();
    fs.writeFileSync(path.join(OUT_DIR, "index.html"), html, "utf8");
    console.log("Saved page HTML");

    // Save collected logs
    fs.writeFileSync(path.join(OUT_DIR, "console-log.json"), JSON.stringify(logs, null, 2), "utf8");
    console.log("Saved console-log.json");
  } catch (err) {
    console.error("Error during page visit:", err);
    fs.writeFileSync(path.join(OUT_DIR, "error-run.json"), JSON.stringify({ message: err.message, stack: err.stack }, null, 2));
  } finally {
    await browser.close();
  }
})();
