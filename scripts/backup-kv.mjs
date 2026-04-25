#!/usr/bin/env node
/* ================================================================
   KV Backup — full export of Vercel KV (Upstash Redis) to JSON.

   Usage:
     node scripts/backup-kv.mjs                # filtered (test data excluded per .backup-filter.json)
     node scripts/backup-kv.mjs --dry-run      # counts keys per namespace, doesn't write
     node scripts/backup-kv.mjs --include-test # disable filter, dump everything raw
     node scripts/backup-kv.mjs --out=/path    # custom output dir

   Reads KV_REST_API_URL + KV_REST_API_TOKEN from .env.local in this directory.
   Reads exclusion patterns from scripts/.backup-filter.json.

   Output: kv-YYYY-MM-DD-HHMMSS.json containing { meta, keys: { name: { type, value } } }
   When filtered, meta also includes { excluded: { count, byReason } }.
   System namespaces (cms, settings, availability, stats, invoice-seq, webhooks) are never filtered.
   ================================================================ */

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

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
const outArg = args.find((a) => a.startsWith('--out='));
const customOut = outArg ? outArg.slice('--out='.length) : null;

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
      // Top reasons
      const byReason = {};
      for (const r of Object.values(excluded)) byReason[r] = (byReason[r] || 0) + 1;
      const topReasons = Object.entries(byReason).sort((a, b) => b[1] - a[1]).slice(0, 8);
      console.log('   Top reasons:');
      for (const [r, n] of topReasons) console.log(`     ${String(n).padStart(5)}  ${r}`);
    }
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const outDir = customOut || join(homedir(), 'Documents', 'MamaHala-Backups', 'kv');
  await mkdir(outDir, { recursive: true });
  const suffix = filter ? '' : '-raw';
  const outPath = join(outDir, `kv-${stamp}${suffix}.json`);

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
  await writeFile(outPath, JSON.stringify(payload, null, 2));
  console.log(`\n✅ Backup written: ${outPath}`);
  console.log(`   Size: ${(JSON.stringify(payload).length / 1024).toFixed(1)} KB`);
})().catch((e) => {
  console.error('❌ Backup failed:', e.message);
  process.exit(1);
});
