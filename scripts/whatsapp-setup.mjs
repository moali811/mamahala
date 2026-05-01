#!/usr/bin/env node
/* ================================================================
   WhatsApp Setup — one-command Meta provisioning
   ================================================================
   What this script does:
     1. Generates a random webhook verify token
     2. Submits all 9 message templates to Meta (EN + AR)
     3. Prints the env var block ready to paste into Vercel

   What this script does NOT do (you have to click these):
     • Business verification at business.facebook.com
     • Adding the WhatsApp number with Coexistence enrollment
     • Generating the System User access token
     • Pasting the webhook URL + verify token into Meta's webhook UI

   Usage:
     node scripts/whatsapp-setup.mjs
       (prompts for token + WABA ID interactively)

     WA_ACCESS_TOKEN=... WA_BUSINESS_ACCOUNT_ID=... \
       node scripts/whatsapp-setup.mjs
       (no prompts — pull from env)

     node scripts/whatsapp-setup.mjs --dry-run
       (print what would be submitted, don't call Meta)

     node scripts/whatsapp-setup.mjs --en-only
       (skip Arabic templates — submit them later)
   ================================================================ */

import { randomBytes } from 'node:crypto';
import { createInterface } from 'node:readline/promises';

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const EN_ONLY = args.has('--en-only');

const GRAPH_VERSION = 'v21.0';

/* ─── Template definitions (single source of truth) ──────────── */

/**
 * Each template: name, category, languages, body per language.
 * Variable order in body MUST match TEMPLATE_PARAM_ORDER in
 * src/lib/whatsapp/templates.ts (positional substitution).
 */
const TEMPLATES = [
  {
    name: 'booking_confirmation',
    category: 'UTILITY',
    bodies: {
      en: 'Hi {{1}} 🌿 Your session with Dr. Hala Ali | Mama Hala is confirmed for {{2}} at {{3}}. Join on Google Meet: {{4}}. Need to reschedule? {{5}}. Reply STOP to opt out.',
      ar: 'مرحباً {{1}} 🌿 تم تأكيد جلستك مع د. هلا علي | مما هلا في {{2}} الساعة {{3}}. انضمي عبر Google Meet: {{4}}. لإعادة الجدولة: {{5}}. أرسلي STOP لإلغاء الاشتراك.',
    },
    sampleVars: ['Sara', 'Monday, May 5', '2:00 PM', 'https://meet.google.com/abc-defg-hij', 'https://mamahala.ca/en/book/manage?token=demo'],
  },
  {
    name: 'session_reminder_1h',
    category: 'UTILITY',
    bodies: {
      en: 'Hi {{1}}, your session with Dr. Hala Ali | Mama Hala starts in one hour. Join on Google Meet: {{2}}. Reply STOP to opt out.',
      ar: 'مرحباً {{1}}، جلستك مع د. هلا علي | مما هلا تبدأ خلال ساعة. انضمي عبر Google Meet: {{2}}. أرسلي STOP لإلغاء الاشتراك.',
    },
    sampleVars: ['Sara', 'https://meet.google.com/abc-defg-hij'],
  },
  {
    name: 'magic_link',
    category: 'UTILITY',
    bodies: {
      en: 'Hi {{1}}, here is your one-time sign-in link for your Mama Hala account: {{2}}. It expires in 15 minutes. If this was not you, please ignore this message.',
      ar: 'مرحباً {{1}}، هذا رابط تسجيل الدخول لمرة واحدة لحسابك في مما هلا: {{2}}. ينتهي خلال 15 دقيقة. إذا لم تطلبي هذا، يرجى تجاهل الرسالة.',
    },
    sampleVars: ['Sara', 'https://mamahala.ca/api/account/magic-link?token=demo'],
  },
  {
    name: 'payment_reminder_pre_due',
    category: 'UTILITY',
    bodies: {
      en: 'Hi {{1}}, friendly reminder — your invoice for {{2}} is due {{3}}. Pay securely here: {{4}}. Questions? Just reply. Reply STOP to opt out.',
      ar: 'مرحباً {{1}}، تذكير ودّي — فاتورتك بقيمة {{2}} مستحقة في {{3}}. ادفعي بأمان من هنا: {{4}}. لأي سؤال، فقط ردّي. أرسلي STOP لإلغاء الاشتراك.',
    },
    sampleVars: ['Sara', 'CAD 250.00', 'May 5', 'https://mamahala.ca/pay/demo'],
  },
  {
    name: 'payment_reminder_overdue',
    category: 'UTILITY',
    bodies: {
      en: 'Hi {{1}}, your invoice for {{2}} is now {{3}} days past due. Resolve it here: {{4}}. Reply if you need a payment plan. Reply STOP to opt out.',
      ar: 'مرحباً {{1}}، فاتورتك بقيمة {{2}} متأخرة الآن {{3}} يوماً. يمكنك تسويتها من هنا: {{4}}. إذا كنت بحاجة لخطة دفع، فقط ردّي. أرسلي STOP لإلغاء الاشتراك.',
    },
    sampleVars: ['Sara', 'CAD 250.00', '7', 'https://mamahala.ca/pay/demo'],
  },
  // All four rebook nudges submit as MARKETING — Meta auto-classifies
  // any "rebook"/"come back" framing as win-back regardless of tone.
  // See src/lib/whatsapp/templates.ts for the cost/category notes.
  {
    name: 'rebook_nudge_warm',
    category: 'MARKETING',
    bodies: {
      en: 'Hi {{1}}, friendly reminder — when you are ready, you can rebook with Dr. Hala Ali | Mama Hala in one tap: {{2}}. Reply STOP to opt out.',
      ar: 'مرحباً {{1}}، تذكير ودّي — عندما تكونين مستعدة، يمكنك إعادة الحجز مع د. هلا علي | مما هلا بضغطة واحدة: {{2}}. أرسلي STOP لإلغاء الاشتراك.',
    },
    sampleVars: ['Sara', 'https://mamahala.ca/en/book/rebook/demo'],
  },
  {
    name: 'rebook_nudge_cadence',
    category: 'MARKETING',
    bodies: {
      en: 'Hi {{1}}, in case it slipped your list — about {{2}} weeks since your last session. Rebook with Dr. Hala Ali | Mama Hala in one tap: {{3}}. Reply STOP to opt out.',
      ar: 'مرحباً {{1}}، في حال نسيتِ — مرّت حوالي {{2}} أسبوعاً منذ آخر جلسة. أعيدي الحجز مع د. هلا علي | مما هلا بضغطة واحدة: {{3}}. أرسلي STOP لإلغاء الاشتراك.',
    },
    sampleVars: ['Sara', '4', 'https://mamahala.ca/en/book/rebook/demo'],
  },
  {
    name: 'rebook_nudge_long_gap',
    category: 'MARKETING',
    bodies: {
      en: 'Hi {{1}}, life gets busy. Whenever you would like to come back, rebook with Dr. Hala Ali | Mama Hala in one tap: {{2}}. Reply STOP to opt out.',
      ar: 'مرحباً {{1}}، الحياة مشغولة. متى ما أردتِ العودة، يمكنك إعادة الحجز مع د. هلا علي | مما هلا بضغطة واحدة: {{2}}. أرسلي STOP لإلغاء الاشتراك.',
    },
    sampleVars: ['Sara', 'https://mamahala.ca/en/book/rebook/demo'],
  },
  {
    name: 'rebook_nudge_seasonal',
    category: 'MARKETING',
    bodies: {
      en: 'Hi {{1}}, around this time of year you usually book a session. Rebook with Dr. Hala Ali | Mama Hala in one tap: {{2}}. Reply STOP to opt out.',
      ar: 'مرحباً {{1}}، عادة تحجزين جلسة في مثل هذا الوقت من السنة. أعيدي الحجز مع د. هلا علي | مما هلا بضغطة واحدة: {{2}}. أرسلي STOP لإلغاء الاشتراك.',
    },
    sampleVars: ['Sara', 'https://mamahala.ca/en/book/rebook/demo'],
  },
];

/* ─── Helpers ───────────────────────────────────────────────── */

function color(code, text) {
  return `\x1b[${code}m${text}\x1b[0m`;
}
const green = (t) => color(32, t);
const yellow = (t) => color(33, t);
const red = (t) => color(31, t);
const dim = (t) => color(2, t);
const bold = (t) => color(1, t);

async function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(question);
  rl.close();
  return answer.trim();
}

/* Build the Meta payload for one template + locale. */
function buildPayload(template, locale) {
  const body = template.bodies[locale];
  const exampleParams = template.sampleVars;
  return {
    name: template.name,
    language: locale === 'ar' ? 'ar' : 'en',
    category: template.category,
    components: [
      {
        type: 'BODY',
        text: body,
        example: { body_text: [exampleParams] },
      },
    ],
  };
}

async function submitTemplate(wabaId, accessToken, payload) {
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${wabaId}/message_templates`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => null);
  return { status: res.status, json };
}

/* List existing templates so we can skip them without resubmitting.
   Resubmits with mismatched category fail noisily, and Meta's classifier
   flaps between IN_REVIEW iterations — pre-fetching is the only way to
   make this script idempotent. */
async function fetchExistingTemplates(wabaId, accessToken) {
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${wabaId}/message_templates?fields=name,language,status,category&limit=1000`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = json?.error?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return json?.data || [];
}

/* ─── Main ──────────────────────────────────────────────────── */

async function main() {
  console.log(bold('\n📱 WhatsApp template setup\n'));

  // Collect credentials (skipped for --dry-run since we don't call Meta)
  let accessToken = process.env.WA_ACCESS_TOKEN || '';
  let wabaId = process.env.WA_BUSINESS_ACCOUNT_ID || '';

  if (DRY_RUN) {
    accessToken = accessToken || 'DRY_RUN_TOKEN';
    wabaId = wabaId || 'DRY_RUN_WABA_ID';
  } else {
    if (!accessToken) {
      console.log(dim('Get this from Meta Business Manager → Users → System Users → Generate New Token'));
      accessToken = await prompt('WA_ACCESS_TOKEN: ');
    }
    if (!wabaId) {
      console.log(dim('\nGet this from WhatsApp Manager → Account Settings (top-right of the WhatsApp Manager dashboard)'));
      wabaId = await prompt('WA_BUSINESS_ACCOUNT_ID: ');
    }
    if (!accessToken || !wabaId) {
      console.error(red('\n✗ Missing credentials — aborted.\n'));
      process.exit(1);
    }
  }

  // Generate webhook verify token
  const webhookVerifyToken = randomBytes(24).toString('base64url');

  // Pre-fetch existing templates so we skip by name+locale rather than
  // resubmitting and tripping over Meta's category-mismatch errors.
  const existingByKey = new Map();
  if (!DRY_RUN) {
    try {
      console.log(dim('\nFetching existing templates from Meta...'));
      const existing = await fetchExistingTemplates(wabaId, accessToken);
      for (const t of existing) {
        existingByKey.set(`${t.name}__${t.language}`, t);
      }
      console.log(dim(`  Found ${existing.length} existing template entries.`));
    } catch (err) {
      console.log(yellow(`  Could not pre-fetch existing templates (${err.message}).`));
      console.log(yellow(`  Proceeding without pre-fetch — duplicates may surface as errors.`));
    }
  }

  console.log(bold(`\nSubmitting templates ${DRY_RUN ? '(DRY RUN — nothing sent to Meta)' : ''}\n`));

  const locales = EN_ONLY ? ['en'] : ['en', 'ar'];
  const results = [];

  for (const tpl of TEMPLATES) {
    for (const locale of locales) {
      const payload = buildPayload(tpl, locale);
      const label = `${tpl.name} (${locale})`;
      if (DRY_RUN) {
        console.log(dim(`  ${label.padEnd(40)} → would submit`));
        results.push({ name: tpl.name, locale, ok: true, status: 'dry-run' });
        continue;
      }
      const langCode = locale === 'ar' ? 'ar' : 'en';
      const existing = existingByKey.get(`${tpl.name}__${langCode}`);
      if (existing) {
        console.log(yellow(`  ◌ ${label.padEnd(40)} exists at Meta (${existing.status}, ${existing.category})`));
        results.push({ name: tpl.name, locale, ok: true, status: 'duplicate' });
        continue;
      }
      try {
        const { status, json } = await submitTemplate(wabaId, accessToken, payload);
        if (status >= 200 && status < 300) {
          console.log(green(`  ✓ ${label.padEnd(40)} ${json?.status ?? 'submitted'}`));
          results.push({ name: tpl.name, locale, ok: true, status: json?.status });
        } else {
          // Common cases: duplicate (already exists) → not a failure.
          // Meta returns several phrasings: "already exists", or
          // "There is already English content for this template"
          // (subcode 2388024). Match by subcode where we know it.
          const errMsg = json?.error?.message || `HTTP ${status}`;
          const errSubcode = json?.error?.error_subcode;
          const errUserMsg = json?.error?.error_user_msg;
          const errDetail = [errMsg, errSubcode && `subcode ${errSubcode}`, errUserMsg].filter(Boolean).join(' — ');
          const isDuplicate = errSubcode === 2388024 || /already exists|duplicate|already \w+ content/i.test(`${errMsg} ${errUserMsg ?? ''}`);
          if (isDuplicate) {
            console.log(yellow(`  ◌ ${label.padEnd(40)} already exists (skipped)`));
            results.push({ name: tpl.name, locale, ok: true, status: 'duplicate' });
          } else {
            console.log(red(`  ✗ ${label.padEnd(40)} ${errDetail}`));
            results.push({ name: tpl.name, locale, ok: false, error: errDetail });
          }
        }
      } catch (err) {
        console.log(red(`  ✗ ${label.padEnd(40)} ${err.message}`));
        results.push({ name: tpl.name, locale, ok: false, error: err.message });
      }
    }
  }

  const ok = results.filter((r) => r.ok).length;
  const fail = results.filter((r) => !r.ok).length;

  console.log(`\n${bold('Result:')} ${green(`${ok} ok`)}, ${fail > 0 ? red(`${fail} failed`) : '0 failed'}`);

  if (fail > 0) {
    console.log(yellow('\nSome templates failed. Common causes:'));
    console.log(dim('  • Body text rejected by Meta — reword in scripts/whatsapp-setup.mjs and re-run'));
    console.log(dim('  • Token missing whatsapp_business_management permission'));
    console.log(dim('  • Wrong WABA ID (check WhatsApp Manager → Account Settings)'));
  }

  // Print env var block
  console.log(bold('\n📋 Paste these into Vercel → Settings → Environment Variables'));
  console.log(dim('   (Production + Preview)\n'));
  console.log(`WA_ENABLED=false`);
  console.log(`WA_PHONE_NUMBER_ID=${dim('<from WhatsApp Manager → Phone Numbers → click your number>')}`);
  console.log(`WA_BUSINESS_ACCOUNT_ID=${wabaId}`);
  console.log(`WA_ACCESS_TOKEN=${dim('<the system-user token you used above — keep it secret>')}`);
  console.log(`WA_WEBHOOK_VERIFY_TOKEN=${webhookVerifyToken}`);
  console.log(`WA_APP_SECRET=${dim('<from Meta App → Settings → Basic → App Secret>')}`);

  console.log(bold('\n🔗 Then in Meta WhatsApp Manager → Configuration → Webhook'));
  console.log(`   Callback URL: ${green('https://mamahala.ca/api/whatsapp/webhook')}`);
  console.log(`   Verify Token: ${green(webhookVerifyToken)}`);
  console.log(`   Subscribe to: ${green('messages')}\n`);

  console.log(bold('🚦 Last step: when all templates show APPROVED in WhatsApp Manager:'));
  console.log(`   In Vercel, change ${yellow('WA_ENABLED=false')} → ${green('WA_ENABLED=true')}`);
  console.log(`   Redeploy. Done.\n`);
}

main().catch((err) => {
  console.error(red(`\n✗ ${err.message}\n`));
  process.exit(1);
});
