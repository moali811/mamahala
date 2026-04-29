/**
 * Smart scroll primitives.
 *
 * Three exports:
 *   - scrollToElement(target, opts) — scroll a target into view, intent-aware.
 *   - scrollToTop(opts)             — scroll the page (or a scroller) to top.
 *   - scrollToFirstError(form)      — scroll to the first invalid field in a form.
 *
 * All three respect prefers-reduced-motion, cancel on user input, wait for
 * layout to settle before measuring, and resolve a Promise when the scroll
 * actually completes (or is cancelled / times out).
 *
 * Header / nav / keyboard offsets are CSS-driven via scroll-padding-top /
 * scroll-padding-bottom, so we never compute pixel math here.
 */

import { watchForUserCancel } from "./cancellation";
import { waitForLayoutSettle } from "./layout-settle";

export type ScrollOutcome = "done" | "cancelled" | "timeout" | "no-target";

export type ScrollOpts = {
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  behavior?: "smooth" | "instant";
  cancelOnUserInput?: boolean;
  waitForLayout?: boolean;
  timeoutMs?: number;
  /**
   * Hard offset to add on top of CSS scroll-padding. Use sparingly — most
   * cases should be solved by adjusting --scroll-clearance-top instead.
   */
  extraOffsetTop?: number;
};

const DEFAULTS: Required<Omit<ScrollOpts, "extraOffsetTop">> = {
  block: "start",
  inline: "nearest",
  behavior: "smooth",
  cancelOnUserInput: true,
  waitForLayout: true,
  timeoutMs: 1500,
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resolveTarget(target: Element | string): Element | null {
  if (typeof target !== "string") return target;
  if (target.startsWith("#") || target.startsWith(".") || target.includes("[")) {
    return document.querySelector(target);
  }
  return document.getElementById(target);
}

/**
 * Watch the page scrollY (or a custom scroller) until it stops moving for a
 * short idle window. Resolves when "settled" or aborted. Works with native
 * smooth-scroll which doesn't expose a finished-event everywhere yet.
 */
function awaitScrollEnd(signal: AbortSignal, idleMs = 100, hardCapMs = 1500): Promise<void> {
  return new Promise<void>((resolve) => {
    let timer = 0;
    let lastY = window.scrollY;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      window.clearTimeout(cap);
      signal.removeEventListener("abort", finish);
      resolve();
    };

    const onScroll = () => {
      if (window.scrollY === lastY) return;
      lastY = window.scrollY;
      window.clearTimeout(timer);
      timer = window.setTimeout(finish, idleMs);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    timer = window.setTimeout(finish, idleMs);
    const cap = window.setTimeout(finish, hardCapMs);
    signal.addEventListener("abort", finish, { once: true });
  });
}

export async function scrollToElement(
  target: Element | string,
  opts: ScrollOpts = {},
): Promise<ScrollOutcome> {
  if (typeof window === "undefined") return "no-target";
  const cfg = { ...DEFAULTS, ...opts };
  const reduce = prefersReducedMotion();
  const behavior: ScrollBehavior = reduce ? "auto" : cfg.behavior === "instant" ? "auto" : "smooth";

  const cancel = cfg.cancelOnUserInput && behavior === "smooth" ? watchForUserCancel() : null;
  const signal = cancel?.signal ?? new AbortController().signal;

  try {
    const el = resolveTarget(target);
    if (!el) return "no-target";

    if (cfg.waitForLayout) {
      await waitForLayoutSettle(el, cfg.timeoutMs, signal);
      if (signal.aborted) return "cancelled";
    }

    if (opts.extraOffsetTop && opts.extraOffsetTop !== 0) {
      const rect = el.getBoundingClientRect();
      const padTop = parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop || "0",
      ) || 0;
      const targetY = window.scrollY + rect.top - padTop - opts.extraOffsetTop;
      window.scrollTo({ top: Math.max(0, targetY), behavior });
    } else {
      el.scrollIntoView({ behavior, block: cfg.block, inline: cfg.inline });
    }

    if (behavior === "auto") return "done";

    await awaitScrollEnd(signal, 100, cfg.timeoutMs);
    return signal.aborted ? "cancelled" : "done";
  } finally {
    cancel?.cleanup();
  }
}

export async function scrollToTop(opts: ScrollOpts = {}): Promise<ScrollOutcome> {
  return scrollWindowToY(0, opts);
}

/**
 * Scroll the window to an absolute Y. Used when the caller has computed a
 * custom target (e.g. tour overlays that need to centre an element above a
 * bottom-sheet zone). Same intent-aware semantics as scrollToElement.
 */
export async function scrollWindowToY(y: number, opts: ScrollOpts = {}): Promise<ScrollOutcome> {
  if (typeof window === "undefined") return "no-target";
  const cfg = { ...DEFAULTS, ...opts };
  const reduce = prefersReducedMotion();
  const behavior: ScrollBehavior = reduce ? "auto" : cfg.behavior === "instant" ? "auto" : "smooth";

  const cancel = cfg.cancelOnUserInput && behavior === "smooth" ? watchForUserCancel() : null;
  const signal = cancel?.signal ?? new AbortController().signal;

  try {
    window.scrollTo({ top: Math.max(0, y), left: 0, behavior });
    if (behavior === "auto") return "done";
    await awaitScrollEnd(signal, 100, cfg.timeoutMs);
    return signal.aborted ? "cancelled" : "done";
  } finally {
    cancel?.cleanup();
  }
}

const ERROR_SELECTOR = [
  '[aria-invalid="true"]',
  '[data-error="true"]',
  '.field-error',
  '[data-field-error]',
].join(",");

export async function scrollToFirstError(
  scope: ParentNode = document,
  opts: ScrollOpts = {},
): Promise<ScrollOutcome> {
  const el = scope.querySelector(ERROR_SELECTOR);
  if (!el) return "no-target";
  const focusTarget = (el.matches("input,select,textarea,button")
    ? (el as HTMLElement)
    : (el.querySelector("input,select,textarea,button") as HTMLElement | null));
  const result = await scrollToElement(el, { block: "center", ...opts });
  if (result === "done" && focusTarget) {
    try { focusTarget.focus({ preventScroll: true }); } catch { /* noop */ }
  }
  return result;
}
