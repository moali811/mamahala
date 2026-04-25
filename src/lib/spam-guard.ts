/* ================================================================
   Shared spam-guard utilities: email validation, honeypot, timing,
   gibberish detection, disposable email blocking.
   ================================================================ */

/** Reasonable RFC-5322-ish email regex. Stricter than `/^.+@.+\..+$/` —
 *  rejects double dots, leading/trailing dots in local part, double-@,
 *  whitespace, and non-ASCII control chars. Not a full RFC parser (those are
 *  enormous and reject very few real addresses), but catches the worst inputs.
 *  Hard length cap of 254 chars matches the SMTP RFC limit. */
const EMAIL_RE = /^(?!\.)(?!.*\.\.)[A-Za-z0-9._%+\-]{1,64}(?<!\.)@(?:[A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
const EMAIL_MAX_LEN = 254;

const VOWELS = new Set('aeiouAEIOU');

/** Common disposable / throwaway email domains. */
const DISPOSABLE_DOMAINS = new Set([
  'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'guerrillamail.de',
  'mailinator.com', 'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com',
  'grr.la', 'dispostable.com', 'trashmail.com', 'trashmail.me', 'trashmail.net',
  'tempail.com', 'temp-mail.org', 'fakeinbox.com', 'maildrop.cc', 'harakirimail.com',
  'mailnesia.com', 'jetable.org', 'getnada.com', 'mohmal.com', 'tmail.ws',
  'minutemail.com', 'tempr.email', 'burpcollaborator.net', 'mailsac.com',
  'inboxkitten.com', '10minutemail.com', 'tempinbox.com', 'spamgourmet.com',
]);

/**
 * Detects gibberish in the local part of an email.
 * Real names/words have a natural vowel-consonant rhythm.
 * Random strings like "abjkljvbn" have almost no vowels
 * and long runs of consonants.
 *
 * SECURITY: callers must pre-cap the input length (we do here too, defensively)
 * — without it the per-character analysis below could be made expensive by an
 * adversarial 100KB local part.
 */
function isGibberishLocal(local: string): boolean {
  // Defensive length cap. RFC 5321 caps local at 64 chars; anything longer is
  // already rejected by EMAIL_RE, but belt-and-braces in case this is ever
  // called from a different validation path.
  if (local.length > 64) return false;
  // Split on dots/dashes/underscores/numbers — analyze each word segment.
  // This handles "dr.smith" → "dr" (too short) + "smith" (clean) → PASS.
  const segments = local.split(/[.\-_+0-9]+/).filter(s => /[a-zA-Z]/.test(s));

  // If any segment ≥4 chars has a healthy vowel ratio, the email is likely real
  for (const seg of segments) {
    if (seg.length < 4) continue;
    let v = 0;
    for (const ch of seg) if (VOWELS.has(ch)) v++;
    if (v / seg.length >= 0.2) return false; // This segment looks like a real word
  }

  // No clean segments found — analyze full letter string
  const letters = local.replace(/[^a-zA-Z]/g, '');
  if (letters.length < 3) return false;

  let vowelCount = 0;
  for (const ch of letters) if (VOWELS.has(ch)) vowelCount++;
  const vowelRatio = vowelCount / letters.length;

  // Find longest consonant run
  let maxConsonantRun = 0;
  let currentRun = 0;
  for (const ch of letters) {
    if (VOWELS.has(ch)) {
      currentRun = 0;
    } else {
      currentRun++;
      if (currentRun > maxConsonantRun) maxConsonantRun = currentRun;
    }
  }

  // 2-5 chars: flag if zero vowels (catches "jdf", "xkr", "bncm")
  // Real short names like "ali", "mo", "lee" always have vowels
  if (letters.length < 6) return vowelRatio === 0;
  // 6+ chars: low vowel ratio + consonant cluster
  return vowelRatio < 0.2 && maxConsonantRun >= 4;
}

/**
 * Validates email: format + not gibberish + not disposable.
 * Zero friction — runs entirely server-side.
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length === 0 || trimmed.length > EMAIL_MAX_LEN) return false;
  if (!EMAIL_RE.test(trimmed)) return false;

  const [local, domain] = trimmed.toLowerCase().split('@');

  // Block disposable email services
  if (DISPOSABLE_DOMAINS.has(domain)) return false;

  // Block gibberish usernames (like "abjkljvbn88")
  if (isGibberishLocal(local)) return false;

  return true;
}

/** Returns true if the honeypot hidden field was filled (bots fill it, humans don't see it). */
export function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  return typeof body._hp === 'string' && body._hp.length > 0;
}

/** Returns true if the form was submitted faster than a human could (< 2 seconds). */
export function isSubmittedTooFast(body: Record<string, unknown>): boolean {
  if (typeof body._t !== 'number' && typeof body._t !== 'string') return false;
  const submitted = Number(body._t);
  if (!submitted || isNaN(submitted)) return false;
  return Date.now() - submitted < 2000;
}

/** Combined spam check — runs honeypot + timing. */
export function spamCheck(body: Record<string, unknown>): {
  blocked: boolean;
  reason?: string;
} {
  if (isHoneypotTriggered(body)) {
    return { blocked: true, reason: 'spam' };
  }
  if (isSubmittedTooFast(body)) {
    return { blocked: true, reason: 'too-fast' };
  }
  return { blocked: false };
}
