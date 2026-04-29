"use client";

import { useEffect, useRef, type RefObject } from "react";
import { scrollToElement, type ScrollOpts } from "@/lib/scroll";

/**
 * Declarative "scroll when X changes" — replaces the duplicated
 * `useEffect(() => { ref.current?.scrollIntoView(...) }, [step])` pattern.
 *
 * Pass either a target ref or a selector. By default the first mount does NOT
 * trigger a scroll (use `skipFirst={false}` to opt in).
 */
export function ScrollOnDeps({
  deps,
  target,
  selector,
  skipFirst = true,
  block = "start",
  inline = "nearest",
  behavior = "smooth",
  extraOffsetTop,
  enabled = true,
}: {
  deps: ReadonlyArray<unknown>;
  target?: RefObject<Element | null>;
  selector?: string;
  skipFirst?: boolean;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  behavior?: "smooth" | "instant";
  extraOffsetTop?: number;
  enabled?: boolean;
}): null {
  const firstRun = useRef(true);

  useEffect(() => {
    if (!enabled) return;
    if (skipFirst && firstRun.current) {
      firstRun.current = false;
      return;
    }
    firstRun.current = false;

    const el: Element | string | null =
      target?.current ?? (selector ? selector : null);
    if (!el) return;
    const opts: ScrollOpts = { block, inline, behavior, extraOffsetTop };
    void scrollToElement(el, opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return null;
}
