// Resume capture — only the modules we still need.
import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = "/Users/moali811/Claude/Mama Hala Consulting/admin-tutorial/screenshots";
const DESKTOP_DIR = path.join(OUT, "desktop");
const MOBILE_DIR = path.join(OUT, "mobile");

const BASE = "http://localhost:3456";
const PASSWORD = process.env.ADMIN_PASSWORD;
if (!PASSWORD) {
  console.error("ADMIN_PASSWORD env var is required. Run with: set -a && source .env.local && set +a && node scripts/admin-capture-resume.mjs");
  process.exit(1);
}

const DESKTOP_VP = { width: 1440, height: 900, deviceScaleFactor: 2 };
const MOBILE_VP = { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function shoot(page, dir, name, fullPage = false) {
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, `${name}.png`);
  await page.screenshot({ path: file, fullPage });
  console.log("✓", name);
}

async function login(page) {
  console.log("→ login");
  await page.goto(`${BASE}/admin`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await wait(2500);
  const pwd = await page.$('input[type="password"]');
  if (pwd) {
    await page.type('input[type="password"]', PASSWORD);
    await page.keyboard.press("Enter");
    await page.waitForFunction(
      () => {
        const t = document.body.innerText || "";
        return /Bookings|Dashboard|Invoices/.test(t) && !/Open MCMS/.test(t);
      },
      { timeout: 30000 }
    );
  }
  await wait(2500);
}

async function gotoTab(page, tab) {
  await page.goto(`${BASE}/admin?tab=${tab}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await wait(4000);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(45000);
    page.setDefaultNavigationTimeout(90000);
    await page.setRequestInterception(true);
    const block = [/google-analytics/, /googletagmanager/, /google\.com\/g\/collect/, /doubleclick/, /fonts\.googleapis/];
    page.on("request", (r) => {
      if (block.some((p) => p.test(r.url()))) return r.abort();
      r.continue();
    });
    page.on("console", (m) => { if (m.type() === "error" && !/google|gtm/.test(m.text())) console.log("[err]", m.text().slice(0, 120)); });

    await page.setViewport(DESKTOP_VP);
    await login(page);

    const remaining = [
      ["services", "17-services"],
      ["testimonials", "18-testimonials"],
      ["faqs", "19-faqs"],
      ["resources", "20-resources"],
      ["quiz-results", "21-quizzes"],
      ["settings", "22-settings"],
    ];

    for (const [tab, name] of remaining) {
      try {
        await gotoTab(page, tab);
        await shoot(page, DESKTOP_DIR, name);
        if (tab === "settings") await shoot(page, DESKTOP_DIR, "22b-settings-full", true);
      } catch (e) {
        console.log(`  ⚠ failed ${tab}: ${e.message}`);
      }
    }

    // Mobile
    console.log("=== mobile ===");
    await page.setViewport(MOBILE_VP);
    await page.goto(`${BASE}/admin`, { waitUntil: "domcontentloaded" });
    await wait(3500);
    const hasPwd = await page.$('input[type="password"]');
    if (hasPwd) {
      await shoot(page, MOBILE_DIR, "m-01-login");
      await page.type('input[type="password"]', PASSWORD);
      await page.keyboard.press("Enter");
      await wait(5000);
    }
    await shoot(page, MOBILE_DIR, "m-02-bookings");

    for (const tab of ["invoices", "dashboard", "leads", "services", "settings"]) {
      try {
        await gotoTab(page, tab);
        await shoot(page, MOBILE_DIR, `m-03-${tab}`);
      } catch (e) {
        console.log(`  ⚠ mobile ${tab}: ${e.message}`);
      }
    }
  } catch (e) {
    console.error("FAILED:", e.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
