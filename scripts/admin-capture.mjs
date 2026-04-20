// Puppeteer capture — logs in once, uses ?tab= deep links for navigation.
import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = process.env.OUT_DIR || "/Users/moali811/Claude/Mama Hala Consulting/admin-tutorial/screenshots";
const DESKTOP_DIR = path.join(OUT, "desktop");
const MOBILE_DIR = path.join(OUT, "mobile");

const BASE = process.env.BASE_URL || "http://localhost:3456";
const PASSWORD = process.env.ADMIN_PASSWORD;
if (!PASSWORD) {
  console.error("ADMIN_PASSWORD env var is required. Run with: set -a && source .env.local && set +a && node scripts/admin-capture.mjs");
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
  return file;
}

async function login(page) {
  console.log("→ login");
  // Already on /admin from capture-01 step
  await wait(1500);
  await page.waitForSelector('input[type="password"]', { timeout: 15000 });
  await page.type('input[type="password"]', PASSWORD);
  await page.keyboard.press("Enter");
  await page.waitForFunction(
    () => {
      const txt = document.body.innerText || "";
      return /MCMS/i.test(txt) && /Bookings|Dashboard|Invoices/.test(txt) && !/Open MCMS/.test(txt);
    },
    { timeout: 20000 }
  );
  await wait(2000);
  console.log("  authenticated");
}

async function gotoTab(page, tab) {
  await page.goto(`${BASE}/admin?tab=${tab}`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await wait(3500);
}

async function clickText(page, text) {
  const ok = await page.evaluate((t) => {
    const cands = Array.from(document.querySelectorAll("button, [role='tab'], a, [role='button']"));
    const m = cands.find((el) => (el.textContent || "").trim().toLowerCase() === t.toLowerCase());
    if (m) { m.scrollIntoView({ block: "center" }); m.click(); return true; }
    return false;
  }, text);
  await wait(1500);
  return ok;
}

async function clickContains(page, text) {
  const ok = await page.evaluate((t) => {
    const cands = Array.from(document.querySelectorAll("button, [role='tab'], a, [role='button']"));
    const m = cands.find((el) => (el.textContent || "").trim().toLowerCase().includes(t.toLowerCase()));
    if (m) { m.scrollIntoView({ block: "center" }); m.click(); return true; }
    return false;
  }, text);
  await wait(1500);
  return ok;
}

async function captureDesktop(page) {
  await page.setViewport(DESKTOP_VP);

  // Capture login from main page first (before any login attempt)
  await page.goto(`${BASE}/admin`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded", timeout: 60000 });
  await wait(2500);
  await shoot(page, DESKTOP_DIR, "01-login");

  await login(page);

  await gotoTab(page, "bookings");
  await shoot(page, DESKTOP_DIR, "02-bookings-list");
  await shoot(page, DESKTOP_DIR, "02b-bookings-full", true);

  await clickContains(page, "Availability");
  await wait(1200);
  await shoot(page, DESKTOP_DIR, "03-availability-schedule");

  await clickContains(page, "Blocked");
  await shoot(page, DESKTOP_DIR, "04-availability-blocked");

  await clickText(page, "Rules");
  await shoot(page, DESKTOP_DIR, "05-availability-rules");

  await clickText(page, "Travel");
  await shoot(page, DESKTOP_DIR, "06-availability-travel");

  await gotoTab(page, "invoices");
  await shoot(page, DESKTOP_DIR, "07-invoices-dashboard");
  await shoot(page, DESKTOP_DIR, "07b-invoices-dashboard-full", true);

  await clickText(page, "Compose");
  await shoot(page, DESKTOP_DIR, "08-invoices-compose");
  await shoot(page, DESKTOP_DIR, "08b-invoices-compose-full", true);

  await clickText(page, "History");
  await shoot(page, DESKTOP_DIR, "09-invoices-history");

  await clickText(page, "Customers");
  await shoot(page, DESKTOP_DIR, "10-invoices-customers");

  await clickText(page, "Recurring");
  await shoot(page, DESKTOP_DIR, "11-invoices-recurring");

  await clickText(page, "Reports");
  await shoot(page, DESKTOP_DIR, "12-invoices-reports");

  await gotoTab(page, "dashboard");
  await shoot(page, DESKTOP_DIR, "13-dashboard");
  await shoot(page, DESKTOP_DIR, "13b-dashboard-full", true);

  await gotoTab(page, "leads");
  await shoot(page, DESKTOP_DIR, "14-clients");

  await gotoTab(page, "events");
  await shoot(page, DESKTOP_DIR, "15-events");

  await gotoTab(page, "blog");
  await shoot(page, DESKTOP_DIR, "16-blog");

  await gotoTab(page, "services");
  await shoot(page, DESKTOP_DIR, "17-services");

  await gotoTab(page, "testimonials");
  await shoot(page, DESKTOP_DIR, "18-testimonials");

  await gotoTab(page, "faqs");
  await shoot(page, DESKTOP_DIR, "19-faqs");

  await gotoTab(page, "resources");
  await shoot(page, DESKTOP_DIR, "20-resources");

  await gotoTab(page, "quiz-results");
  await shoot(page, DESKTOP_DIR, "21-quizzes");

  await gotoTab(page, "settings");
  await shoot(page, DESKTOP_DIR, "22-settings");
  await shoot(page, DESKTOP_DIR, "22b-settings-full", true);
}

async function captureMobile(page) {
  await page.setViewport(MOBILE_VP);
  await page.goto(`${BASE}/admin`, { waitUntil: "domcontentloaded" });
  await wait(3000);
  await shoot(page, MOBILE_DIR, "m-01-login");

  await page.waitForSelector('input[type="password"]', { timeout: 15000 }).catch(() => {});
  const hasPwd = await page.$('input[type="password"]');
  if (hasPwd) {
    await page.type('input[type="password"]', PASSWORD);
    await page.keyboard.press("Enter");
    await wait(4000);
  } else {
    await wait(2000);
  }
  await shoot(page, MOBILE_DIR, "m-02-bookings");

  for (const tab of ["invoices", "dashboard", "leads", "settings"]) {
    await page.goto(`${BASE}/admin?tab=${tab}`, { waitUntil: "domcontentloaded" });
    await wait(3500);
    await shoot(page, MOBILE_DIR, `m-03-${tab}`);
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-background-networking",
    ],
  });
  // Block analytics and fonts to prevent networkidle hangs
  const blockPatterns = [/google-analytics/, /googletagmanager/, /google\.com\/g\/collect/, /doubleclick/, /fonts\.googleapis/];
  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(45000);
    page.setDefaultNavigationTimeout(60000);
    await page.setRequestInterception(true);
    page.on("request", (r) => {
      if (blockPatterns.some((p) => p.test(r.url()))) return r.abort();
      r.continue();
    });
    page.on("console", (m) => {
      if (m.type() === "error") {
        const t = m.text();
        if (!/google\.com|gtm|analytics/.test(t)) console.log("[page err]", t.slice(0, 160));
      }
    });

    console.log("=== desktop ===");
    await captureDesktop(page);

    console.log("=== mobile ===");
    await captureMobile(page);
  } catch (e) {
    console.error("FAILED:", e.message);
    console.error(e.stack);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
