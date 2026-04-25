#!/usr/bin/env node
/* ================================================================
   KV Backup — full export of Vercel KV (Upstash Redis) to JSON.

   Usage:
     node scripts/backup-kv.mjs                # filtered, plaintext
     node scripts/backup-kv.mjs --dry-run      # counts keys per namespace, doesn't write
     node scripts/backup-kv.mjs --include-test # disable filter, dump everything raw
     node scripts/backup-kv.mjs --out=/path    # custom output dir

   Scheduled / secure mode (used by ~/Library/LaunchAgents/com.mamahala.backup-kv.plist):
     node scripts/backup-kv.mjs --scheduled    # alias for --encrypt --notify --prune --quiet
     node scripts/backup-kv.mjs --encrypt      # encrypt with passphrase from macOS keychain
     node scripts/backup-kv.mjs --notify       # email status to RESEND_ADMIN_EMAIL via Resend
     node scripts/backup-kv.mjs --prune        # keep last 12 weeklies + last 12 monthlies
     node scripts/backup-kv.mjs --quiet        # suppress per-record reasons (PII) in stdout

   Reads KV_REST_API_URL + KV_REST_API_TOKEN from .env.local in this directory.
   Reads exclusion patterns from scripts/.backup-filter.json.

   Encryption: openssl AES-256-CBC + PBKDF2. Passphrase stored in macOS keychain
   under service "MamaHala-Backup-Encryption" (set by setup-backup-schedule.sh).
   Decrypt: openssl enc -d -aes-256-cbc -pbkdf2 -in <file>.enc -out <file>.json

   Sidecar: kv-YYYY-MM-DDTHH-MM-SS.meta.json (PII-free metadata, used for anomaly detection).
   ================================================================ */

import { writeFile, mkdir, readFile, readdir, unlink, chmod, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir, tmpdir } from 'node:os';
import { spawn, execFileSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

// ---------- env loader (no dotenv dep) ----------
async function loadEnv() {
  for (const file of ['.env.local', '.env.production']) {
    const p = join(PROJECT_ROOT, file);
    if (!existsSync(p)) continue;
    const text = await readFile(p, 'utf8');
    for (const line of text.split('\n')) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (!m) continue;
      const [, k, rawV] = m;
      if (process.env[k]) continue; // first wins (.env.local before .env.production)
      let v = rawV.trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      process.env[k] = v;
    }
  }
}

// ---------- args ----------
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const includeTest = args.includes('--include-test');
const scheduled = args.includes('--scheduled');
const doEncrypt = scheduled || args.includes('--encrypt');
const doNotify = scheduled || args.includes('--notify');
const doPrune = scheduled || args.includes('--prune');
const quiet = scheduled || args.includes('--quiet');
const outArg = args.find((a) => a.startsWith('--out='));
const customOut = outArg ? outArg.slice('--out='.length) : null;

const KEYCHAIN_SERVICE = 'MamaHala-Backup-Encryption';
const ANOMALY_DROP_RATIO = 0.8; // alert if keptCount drops below 80% of previous
const WEEKLY_RETAIN = 12;       // keep most recent N encrypted backups
const MONTHLY_RETAIN = 12;      // additionally keep first-of-month for last N months

// ---------- filter loader ----------
const SYSTEM_NAMESPACES = new Set(['cms', 'settings', 'availability', 'stats', 'invoice-seq', 'webhooks']);

async function loadFilter() {
  if (includeTest) return null;
  const p = join(__dirname, '.backup-filter.json');
  if (!existsSync(p)) {
    console.warn('⚠️  No .backup-filter.json found — running unfiltered. Use --include-test to silence.');
    return null;
  }
  const raw = JSON.parse(await readFile(p, 'utf8'));
  return {
    emails: new Set((raw.emails || []).map((s) => s.toLowerCase())),
    namePatterns: (raw.namePatterns || []).map((s) => s.toLowerCase()),
    exactNames: new Set((raw.exactNames || []).map((s) => s.toLowerCase())),
    keepEmails: new Set((raw.keepEmails || []).map((s) => s.toLowerCase())),
    keepNames: new Set((raw.keepNames || []).map((s) => s.toLowerCase())),
  };
}

function extractIdentifiers(key, record) {
  const emails = new Set();
  const names = new Set();
  const NAME_FIELDS = new Set(['name', 'customername', 'clientname', 'firstname', 'lastname', 'fullname']);
  const walk = (v, parentField) => {
    if (typeof v === 'string') {
      const m = v.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi);
      if (m) m.forEach((e) => emails.add(e.toLowerCase()));
      if (parentField && NAME_FIELDS.has(parentField) && v.trim()) {
        names.add(v.trim().toLowerCase());
      }
    } else if (v && typeof v === 'object') {
      for (const k in v) walk(v[k], k.toLowerCase());
    }
  };
  walk(record, null);
  // Also harvest emails from the key itself (e.g. academy:student:foo@bar.com)
  const keyEmails = key.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi);
  if (keyEmails) keyEmails.forEach((e) => emails.add(e.toLowerCase()));
  return { emails, names };
}

// ---------- encryption (openssl, passphrase from macOS keychain) ----------
function getKeychainPassphrase() {
  try {
    return execFileSync(
      '/usr/bin/security',
      ['find-generic-password', '-s', KEYCHAIN_SERVICE, '-w'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
  } catch {
    throw new Error(
      `Encryption passphrase not in keychain. Run scripts/setup-backup-schedule.sh first to set it.`
    );
  }
}

async function encryptFile(plaintextPath, encryptedPath, passphrase) {
  // Write passphrase to a 0600 tmpfile, pass via -pass file: (passphrase never appears in argv/env).
  const passFile = join(tmpdir(), `mh-pass-${randomBytes(8).toString('hex')}`);
  await writeFile(passFile, passphrase, { mode: 0o600 });
  try {
    await new Promise((resolve, reject) => {
      const proc = spawn('/usr/bin/openssl', [
        'enc', '-aes-256-cbc', '-pbkdf2', '-iter', '100000', '-salt',
        '-pass', `file:${passFile}`,
        '-in', plaintextPath,
        '-out', encryptedPath,
      ], { stdio: ['ignore', 'inherit', 'pipe'] });
      let err = '';
      proc.stderr.on('data', (b) => (err += b.toString()));
      proc.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(`openssl exited ${code}: ${err.trim()}`))
      );
    });
    await chmod(encryptedPath, 0o600);
  } finally {
    try { await unlink(passFile); } catch {}
  }
}

// ---------- meta sidecar + anomaly detection ----------
async function writeMetaSidecar(metaPath, meta) {
  await writeFile(metaPath, JSON.stringify(meta, null, 2));
  await chmod(metaPath, 0o600);
}

async function readPreviousMeta(outDir) {
  if (!existsSync(outDir)) return null;
  const files = (await readdir(outDir)).filter((f) => f.endsWith('.meta.json')).sort();
  if (files.length === 0) return null;
  try {
    return JSON.parse(await readFile(join(outDir, files[files.length - 1]), 'utf8'));
  } catch {
    return null;
  }
}

function detectAnomaly(currentKept, previousMeta) {
  if (!previousMeta || typeof previousMeta.keptCount !== 'number') return null;
  if (previousMeta.keptCount === 0) return null;
  const ratio = currentKept / previousMeta.keptCount;
  if (ratio < ANOMALY_DROP_RATIO) {
    return {
      reason: `Kept-count dropped from ${previousMeta.keptCount} to ${currentKept} (${Math.round(ratio * 100)}% of previous)`,
      previous: previousMeta.keptCount,
      current: currentKept,
      previousTimestamp: previousMeta.timestamp,
    };
  }
  return null;
}

// ---------- pruning (keep last N weeklies + N monthlies) ----------
async function pruneBackups(outDir) {
  if (!existsSync(outDir)) return { kept: 0, deleted: 0 };
  const all = (await readdir(outDir)).filter((f) => /^kv-.*\.(json|json\.enc)$/.test(f));
  // Group by base stamp (without extension)
  const stampOf = (f) => f.replace(/\.(json|json\.enc|meta\.json)$/, '').replace(/^kv-/, '');
  const stamps = [...new Set(all.map(stampOf))].sort(); // chronological

  if (stamps.length === 0) return { kept: 0, deleted: 0 };

  const keep = new Set();
  // Keep last WEEKLY_RETAIN
  for (const s of stamps.slice(-WEEKLY_RETAIN)) keep.add(s);
  // Keep first backup of each of last MONTHLY_RETAIN months
  const byMonth = new Map();
  for (const s of stamps) {
    const m = s.slice(0, 7); // YYYY-MM
    if (!byMonth.has(m)) byMonth.set(m, s);
  }
  const months = [...byMonth.keys()].sort().slice(-MONTHLY_RETAIN);
  for (const m of months) keep.add(byMonth.get(m));

  const deletedStamps = stamps.filter((s) => !keep.has(s));
  let deleted = 0;
  for (const s of deletedStamps) {
    for (const ext of ['json', 'json.enc', 'meta.json']) {
      const f = join(outDir, `kv-${s}.${ext}`);
      if (existsSync(f)) {
        await unlink(f);
        deleted++;
      }
    }
  }
  return { kept: keep.size, deleted };
}

// ---------- notification (Resend HTTP API) ----------
async function sendNotification(subject, body) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_ADMIN_EMAIL;
  if (!apiKey || !from || !to) {
    console.warn('⚠️  Notification skipped: missing RESEND_API_KEY / RESEND_FROM_EMAIL / RESEND_ADMIN_EMAIL');
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: body,
    }),
  });
  if (!res.ok) {
    console.warn(`⚠️  Notification send failed: ${res.status} ${await res.text()}`);
  }
}

function classifyForExclusion(key, record, filter) {
  if (!filter) return null;
  const ns = key.includes(':') ? key.slice(0, key.indexOf(':')) : '(root)';
  if (SYSTEM_NAMESPACES.has(ns)) return null;
  const { emails, names } = extractIdentifiers(key, record);

  // keep-whitelist wins
  for (const e of emails) if (filter.keepEmails.has(e)) return null;
  for (const n of names) if (filter.keepNames.has(n)) return null;

  for (const e of emails) if (filter.emails.has(e)) return `email:${e}`;
  for (const n of names) {
    if (filter.exactNames.has(n)) return `name-exact:${n}`;
    for (const p of filter.namePatterns) if (n.includes(p)) return `name-contains:${p}`;
  }
  return null;
}

// ---------- KV REST helpers ----------
async function kvCommand(url, token, cmd) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  if (!res.ok) throw new Error(`KV ${cmd[0]} failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.result;
}

async function* scanAll(url, token) {
  let cursor = '0';
  do {
    const res = await kvCommand(url, token, ['SCAN', cursor, 'MATCH', '*', 'COUNT', '500']);
    cursor = res[0];
    for (const key of res[1]) yield key;
  } while (cursor !== '0');
}

async function dumpKey(url, token, key) {
  const type = await kvCommand(url, token, ['TYPE', key]);
  let value;
  switch (type) {
    case 'string': {
      const raw = await kvCommand(url, token, ['GET', key]);
      try { value = JSON.parse(raw); } catch { value = raw; }
      break;
    }
    case 'hash':   value = await kvCommand(url, token, ['HGETALL', key]); break;
    case 'set':    value = await kvCommand(url, token, ['SMEMBERS', key]); break;
    case 'list':   value = await kvCommand(url, token, ['LRANGE', key, '0', '-1']); break;
    case 'zset':   value = await kvCommand(url, token, ['ZRANGE', key, '0', '-1', 'WITHSCORES']); break;
    default:       value = null;
  }
  // also capture TTL if present
  const ttl = await kvCommand(url, token, ['TTL', key]);
  return { type, value, ttl: ttl > 0 ? ttl : null };
}

function namespaceOf(key) {
  const i = key.indexOf(':');
  return i === -1 ? '(root)' : key.slice(0, i);
}

// ---------- main ----------
(async () => {
  await loadEnv();
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    console.error('❌ Missing KV_REST_API_URL or KV_REST_API_TOKEN in .env.local');
    process.exit(1);
  }
  const filter = await loadFilter();
  if (filter) {
    console.log(`🚫 Filter active: ${filter.emails.size} emails, ${filter.namePatterns.length + filter.exactNames.size} name patterns. (--include-test to disable)`);
  } else {
    console.log('📦 Filter disabled (--include-test) — dumping ALL records.');
  }

  console.log('🔍 Scanning KV...');
  const keys = [];
  for await (const k of scanAll(url, token)) keys.push(k);
  keys.sort();
  console.log(`   Found ${keys.length} keys`);

  // Namespace summary
  const byNs = {};
  for (const k of keys) {
    const ns = namespaceOf(k);
    byNs[ns] = (byNs[ns] || 0) + 1;
  }
  console.log('\n📊 Keys per namespace (raw):');
  for (const [ns, n] of Object.entries(byNs).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${String(n).padStart(5)}  ${ns}`);
  }

  if (dryRun) {
    console.log('\n(dry run — exiting without writing)');
    return;
  }

  console.log('\n⬇️  Dumping values...');
  const data = {};
  const excluded = {};        // key -> reason
  const excludedByNs = {};    // namespace -> count
  let i = 0;
  for (const key of keys) {
    const record = await dumpKey(url, token, key);
    const reason = classifyForExclusion(key, record.value, filter);
    if (reason) {
      excluded[key] = reason;
      const ns = namespaceOf(key);
      excludedByNs[ns] = (excludedByNs[ns] || 0) + 1;
    } else {
      data[key] = record;
    }
    if (++i % 50 === 0) process.stdout.write(`   ${i}/${keys.length}\r`);
  }
  console.log(`   ${keys.length}/${keys.length} done`);

  const keptCount = Object.keys(data).length;
  const excludedCount = Object.keys(excluded).length;
  if (filter) {
    console.log(`\n✂️  Excluded ${excludedCount} test records (${keptCount} kept)`);
    if (excludedCount > 0) {
      console.log('   Excluded by namespace:');
      for (const [ns, n] of Object.entries(excludedByNs).sort((a, b) => b[1] - a[1])) {
        console.log(`     ${String(n).padStart(5)}  ${ns}`);
      }
      if (!quiet) {
        // Top reasons (contains email PII — suppressed in --quiet mode)
        const byReason = {};
        for (const r of Object.values(excluded)) byReason[r] = (byReason[r] || 0) + 1;
        const topReasons = Object.entries(byReason).sort((a, b) => b[1] - a[1]).slice(0, 8);
        console.log('   Top reasons:');
        for (const [r, n] of topReasons) console.log(`     ${String(n).padStart(5)}  ${r}`);
      }
    }
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const outDir = customOut || join(homedir(), 'Backups', 'MamaHala', 'kv');
  await mkdir(outDir, { recursive: true });
  const suffix = filter ? '' : '-raw';
  const baseName = `kv-${stamp}${suffix}`;
  const plaintextPath = join(outDir, `${baseName}.json`);
  const encryptedPath = join(outDir, `${baseName}.json.enc`);
  const metaPath = join(outDir, `${baseName}.meta.json`);

  const keptByNs = {};
  for (const k of Object.keys(data)) {
    const ns = namespaceOf(k);
    keptByNs[ns] = (keptByNs[ns] || 0) + 1;
  }

  const payload = {
    meta: {
      timestamp: new Date().toISOString(),
      keyCount: keptCount,
      rawKeyCount: keys.length,
      namespaces: keptByNs,
      filtered: !!filter,
      source: url.replace(/^https?:\/\//, '').split('.')[0],
      ...(filter ? { excluded: { count: excludedCount, byNamespace: excludedByNs } } : {}),
    },
    keys: data,
    ...(filter && excludedCount > 0 ? { excludedKeys: excluded } : {}),
  };
  await writeFile(plaintextPath, JSON.stringify(payload, null, 2));
  await chmod(plaintextPath, 0o600);
  console.log(`\n✅ Backup written: ${plaintextPath}`);
  const plainSizeKB = (JSON.stringify(payload).length / 1024).toFixed(1);
  console.log(`   Size: ${plainSizeKB} KB`);

  // ---------- anomaly detection (before encryption so we can read previous .meta) ----------
  const previousMeta = await readPreviousMeta(outDir);
  const anomaly = detectAnomaly(keptCount, previousMeta);
  if (anomaly) {
    console.log(`\n⚠️  Anomaly: ${anomaly.reason}`);
  }

  // ---------- encryption ----------
  let finalPath = plaintextPath;
  let encryptError = null;
  if (doEncrypt) {
    try {
      const passphrase = getKeychainPassphrase();
      await encryptFile(plaintextPath, encryptedPath, passphrase);
      await unlink(plaintextPath);
      finalPath = encryptedPath;
      const encStat = await stat(encryptedPath);
      console.log(`🔐 Encrypted: ${encryptedPath} (${(encStat.size / 1024).toFixed(1)} KB, plaintext deleted)`);
    } catch (e) {
      encryptError = e.message;
      console.error(`❌ Encryption failed: ${encryptError}`);
      console.error('   Plaintext kept at:', plaintextPath);
    }
  }

  // ---------- meta sidecar (PII-free, used by next run for anomaly detection) ----------
  const sidecar = {
    timestamp: payload.meta.timestamp,
    keptCount,
    rawKeyCount: keys.length,
    excludedCount,
    namespaces: keptByNs,
    filtered: !!filter,
    encrypted: doEncrypt && !encryptError,
    fileName: basename(finalPath),
  };
  await writeMetaSidecar(metaPath, sidecar);

  // ---------- pruning ----------
  let pruneStats = null;
  if (doPrune) {
    pruneStats = await pruneBackups(outDir);
    console.log(`🧹 Prune: kept ${pruneStats.kept} backup stamps, deleted ${pruneStats.deleted} old files`);
  }

  // ---------- notification ----------
  if (doNotify) {
    let subject, body;
    const sizeMB = (await stat(finalPath)).size / 1024 / 1024;
    const nsLines = Object.entries(keptByNs).sort((a, b) => b[1] - a[1])
      .map(([n, c]) => `  ${String(c).padStart(5)}  ${n}`).join('\n');

    if (encryptError) {
      subject = `❌ Mama Hala KV Backup — encryption FAILED`;
      body = `Backup data was captured but encryption failed.\n\nError: ${encryptError}\n\nKept: ${keptCount} records\nFile (PLAINTEXT, secure manually): ${finalPath}\n\nFix the keychain entry, then re-run.`;
    } else if (anomaly) {
      subject = `⚠️ Mama Hala KV Backup — drop detected (${anomaly.current} vs ${anomaly.previous})`;
      body = `Anomaly detected during scheduled backup.\n\n${anomaly.reason}\nPrevious backup: ${anomaly.previousTimestamp}\n\nThis week: ${keptCount} records (${sizeMB.toFixed(2)} MB)\nNamespaces:\n${nsLines}\n\nIf the drop is intentional (e.g. mass cleanup), no action needed.\nIf not, investigate at /admin and consider restoring from the previous backup.`;
    } else {
      subject = `✅ Mama Hala KV Backup — ${keptCount} records`;
      body = `Scheduled backup complete.\n\nKept: ${keptCount} records (${sizeMB.toFixed(2)} MB)\nExcluded (test/internal): ${excludedCount}\nFile: ${basename(finalPath)}\n\nNamespaces:\n${nsLines}${pruneStats ? `\n\nRetention: ${pruneStats.kept} stamps kept, ${pruneStats.deleted} old files removed.` : ''}`;
    }
    await sendNotification(subject, body);
    console.log(`📧 Notification sent: ${subject}`);
  }
})().catch(async (e) => {
  console.error('❌ Backup failed:', e.message);
  if (doNotify) {
    try {
      await sendNotification(
        `❌ Mama Hala KV Backup FAILED`,
        `The scheduled KV backup hit a fatal error.\n\nError: ${e.message}\n\nStack:\n${e.stack || '(no stack)'}\n\nLog into the Mac and run scripts/backup-kv.mjs manually to investigate.`
      );
    } catch {}
  }
  process.exit(1);
});
