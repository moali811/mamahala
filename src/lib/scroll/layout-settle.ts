/**
 * Wait for the layout to settle before measuring scroll targets.
 *
 * This solves the classic race where AnimatePresence / setState triggers a
 * scroll in the same tick the new content is mounting — the target's
 * boundingRect lands somewhere wrong because the content hasn't reflowed yet.
 *
 * Strategy:
 *  1. Two RAFs — one paint cycle has passed.
 *  2. Watch the target with ResizeObserver until its rect is stable for one
 *     frame, or `timeoutMs` elapses (whichever comes first).
 */

export async function waitForLayoutSettle(
  target: Element,
  timeoutMs = 1500,
  signal?: AbortSignal,
): Promise<void> {
  if (signal?.aborted) return;

  await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  if (signal?.aborted) return;

  if (typeof ResizeObserver === "undefined") return;

  await new Promise<void>((resolve) => {
    let lastRect = target.getBoundingClientRect();
    let stableFrame = 0;
    let raf = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.clearTimeout(timer);
      signal?.removeEventListener("abort", finish);
      resolve();
    };

    const ro = new ResizeObserver(() => {
      lastRect = target.getBoundingClientRect();
      stableFrame = 0;
    });
    ro.observe(target);

    const tick = () => {
      const r = target.getBoundingClientRect();
      const stable =
        Math.abs(r.top - lastRect.top) < 0.5 &&
        Math.abs(r.height - lastRect.height) < 0.5;
      if (stable) stableFrame++;
      else stableFrame = 0;
      lastRect = r;
      if (stableFrame >= 1) return finish();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const timer = window.setTimeout(finish, timeoutMs);
    signal?.addEventListener("abort", finish, { once: true });
  });
}
