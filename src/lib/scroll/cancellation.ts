/**
 * Cancellation: detect when the user wants to take over a programmatic scroll.
 *
 * We listen for any input that would normally start a scroll — wheel, keyboard
 * navigation keys, and touchmove that travels more than a few pixels (so a tap
 * doesn't accidentally cancel). When fired, the controller's signal aborts.
 */

const TOUCH_DELTA_THRESHOLD = 4;

const SCROLL_KEYS = new Set([
  "PageDown",
  "PageUp",
  "Home",
  "End",
  "ArrowDown",
  "ArrowUp",
  "Space",
  " ",
]);

export type CancelHandle = {
  signal: AbortSignal;
  cleanup: () => void;
};

export function watchForUserCancel(): CancelHandle {
  const ctrl = new AbortController();
  let touchStartY = 0;

  const onWheel = () => ctrl.abort();
  const onKey = (e: KeyboardEvent) => {
    if (SCROLL_KEYS.has(e.key) || SCROLL_KEYS.has(e.code)) ctrl.abort();
  };
  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length > 0) touchStartY = e.touches[0].clientY;
  };
  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 0) return;
    if (Math.abs(e.touches[0].clientY - touchStartY) > TOUCH_DELTA_THRESHOLD) {
      ctrl.abort();
    }
  };

  // Capture phase + passive so we never block the gesture itself.
  const opts: AddEventListenerOptions = { passive: true, capture: true };
  window.addEventListener("wheel", onWheel, opts);
  window.addEventListener("keydown", onKey, opts);
  window.addEventListener("touchstart", onTouchStart, opts);
  window.addEventListener("touchmove", onTouchMove, opts);

  const cleanup = () => {
    window.removeEventListener("wheel", onWheel, opts);
    window.removeEventListener("keydown", onKey, opts);
    window.removeEventListener("touchstart", onTouchStart, opts);
    window.removeEventListener("touchmove", onTouchMove, opts);
  };

  return { signal: ctrl.signal, cleanup };
}
