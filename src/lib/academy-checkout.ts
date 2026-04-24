/**
 * Shared Academy checkout trigger — used by both the program overview page
 * and the inline "unlock" card on module pages. Before redirecting to Stripe
 * it writes an `academy:justPaid` breadcrumb to sessionStorage so the module
 * page can show a "verifying purchase" state on return instead of bouncing
 * the user back to the hero.
 */

export interface StartCheckoutOptions {
  programSlug: string;
  programTitle: string;
  levelNumber: number;
  email: string;
  locale: string;
}

export type StartCheckoutResult =
  | { ok: true }
  | { ok: false; error: string };

export function markJustPaid(programSlug: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(
      'academy:justPaid',
      `${programSlug}:${Date.now()}`,
    );
  } catch {
    /* sessionStorage may be unavailable in private mode — non-critical */
  }
}

export function readJustPaid(programSlug: string, maxAgeMs = 60_000): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.sessionStorage.getItem('academy:justPaid');
    if (!raw) return false;
    const sepIdx = raw.lastIndexOf(':');
    if (sepIdx < 0) return false;
    const slug = raw.slice(0, sepIdx);
    const ts = Number(raw.slice(sepIdx + 1));
    if (slug !== programSlug || !Number.isFinite(ts)) return false;
    return Date.now() - ts < maxAgeMs;
  } catch {
    return false;
  }
}

export function clearJustPaid(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem('academy:justPaid');
  } catch { /* ignore */ }
}

export async function startAcademyCheckout(
  opts: StartCheckoutOptions,
): Promise<StartCheckoutResult> {
  try {
    const res = await fetch('/api/academy/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(opts),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.url) {
      markJustPaid(opts.programSlug);
      window.location.href = data.url;
      return { ok: true };
    }
    return { ok: false, error: data.error || 'Checkout failed' };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Network error',
    };
  }
}
