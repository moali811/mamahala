"use client";

import { useCallback, useMemo } from "react";
import {
  scrollToElement,
  scrollToFirstError,
  scrollToTop,
  type ScrollOpts,
  type ScrollOutcome,
} from "@/lib/scroll";

/**
 * Convenience hook exposing memoized smart-scroll primitives.
 *
 * All three are intent-aware: they cancel on user input, wait for layout to
 * settle, and respect prefers-reduced-motion automatically.
 */
export function useSmartScroll() {
  const toElement = useCallback(
    (target: Element | string, opts?: ScrollOpts): Promise<ScrollOutcome> =>
      scrollToElement(target, opts),
    [],
  );

  const toTop = useCallback(
    (opts?: ScrollOpts): Promise<ScrollOutcome> => scrollToTop(opts),
    [],
  );

  const toFirstError = useCallback(
    (scope?: ParentNode, opts?: ScrollOpts): Promise<ScrollOutcome> =>
      scrollToFirstError(scope, opts),
    [],
  );

  return useMemo(
    () => ({ toElement, toTop, toFirstError }),
    [toElement, toTop, toFirstError],
  );
}
