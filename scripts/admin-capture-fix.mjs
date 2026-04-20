// Fix capture — waits for each module's header text to actually render.
import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = "/Users/moali811/Claude/Mama Hala Consulting/admin-tutorial/screenshots";
const DESKTOP_DIR = path.join(OUT, "desktop");

const BASE = "http://localhost:3456";
const PASSWORD = process.env.ADMIN_PASSWORD;
if (!PASSWORD) {
  console.error("ADMIN_PASSWORD env var is required. Run with: set -a && source .env.local && set +a && node scripts/admin-capture-fix.mjs");
  process.exit(1);
}

const DESKTOP_VP = { width: 1440, height: 900, deviceScaleFactor: 2 };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function shoot(page, name) {
  const file = path.join(DESKTOP_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
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
  }
  // Wait for sidebar nav to actually appear
  await page.waitForFunction(
    () => {
      const txt = document.body.innerText || "";
      return /Bookings/.test(txt) && /Dashboard/.test(txt) && /Invoices/.test(txt) && !/Signing in/.test(txt) && !/Open MCMS/.test(txt);
    },
    { timeout: 30000 }
  );
  await wait(3000);
}

/**
 * Navigate to a tab and wait until the module's main header text appears
 * AND the "Signing in..." loader is gone.
 */
async function gotoAndWait(page, tab, expectedText) {
  await page.goto(`${BASE}/admin?tab=${tab}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForFunction(
    (expected) => {
      const txt = document.body.innerText || "";
      return txt.includes(expected) && !/Signing in/.test(txt);
    },
    { timeout: 45000 },
    expectedText
  );
  // Small settle time for charts/content
  await wait(2500);
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

    await page.setViewport(DESKTOP_VP);
    await login(page);

    // Module → [tab param, header text to wait for, filename]
    const targets = [
      ["services", "Services", "17-services"],
      ["testimonials", "Testimonials", "18-testimonials"],
      ["faqs", "FAQ", "19-faqs"],
      ["resources", "Resources", "20-resources"],
      ["quiz-results", "Quiz", "21-quizzes"],
      ["settings", "Settings", "22-settings"],
    ];

    for (const [tab, header, name] of targets) {
      try {
        await gotoAndWait(page, tab, header);
        await shoot(page, name);
        if (tab === "settings") {
          await page.screenshot({ path: path.join(DESKTOP_DIR, "22b-settings-full.png"), fullPage: true });
          console.log("✓ 22b-settings-full");
        }
      } catch (e) {
        console.log(`  ⚠ ${tab}: ${e.message.slice(0, 120)}`);
      }
    }

    // Also re-capture events (it was okay but let's double-check) and blog for chapter 7
    for (const [tab, header, name] of [
      ["blog", "Blog", "16-blog"],
      ["events", "Events", "15-events"],
    ]) {
      try {
        await gotoAndWait(page, tab, header);
        await shoot(page, name);
      } catch (e) {
        console.log(`  ⚠ ${tab}: ${e.message.slice(0, 120)}`);
      }
    }
  } catch (e) {
    console.error("FAILED:", e.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
