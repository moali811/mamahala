"use client";

import { useEffect } from "react";
import { scrollToElement } from "@/lib/scroll";

/**
 * Keyboard-aware viewport handling for mobile (especially iOS PWAs).
 *
 *  - Listens to visualViewport for keyboard show/hide.
 *  - Publishes the keyboard height as `--keyboard-inset-bottom` on <html> so
 *    sticky elements and scroll-padding-bottom can adapt.
 *  - When an input/textarea gains focus and would be hidden behind the
 *    keyboard, scrolls it into view (centered).
 */
export function useKeyboardInset() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const vv = window.visualViewport;
    if (!vv) return;

    const root = document.documentElement;

    const updateInset = () => {
      const inset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      root.style.setProperty("--keyboard-inset-bottom", `${Math.round(inset)}px`);
    };

    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (!t.matches?.("input,textarea,select,[contenteditable=true],[contenteditable]")) return;
      // Wait one frame for visualViewport.height to update post-focus.
      requestAnimationFrame(() => {
        const rect = t.getBoundingClientRect();
        const visibleBottom = vv.offsetTop + vv.height;
        if (rect.bottom > visibleBottom - 16 || rect.top < vv.offsetTop + 16) {
          void scrollToElement(t, { block: "center", cancelOnUserInput: false });
        }
      });
    };

    vv.addEventListener("resize", updateInset);
    vv.addEventListener("scroll", updateInset);
    document.addEventListener("focusin", onFocusIn);
    updateInset();

    return () => {
      vv.removeEventListener("resize", updateInset);
      vv.removeEventListener("scroll", updateInset);
      document.removeEventListener("focusin", onFocusIn);
      root.style.removeProperty("--keyboard-inset-bottom");
    };
  }, []);
}
