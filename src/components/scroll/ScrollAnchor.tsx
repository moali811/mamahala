"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * Declarative scroll target with the unified header-clearance offset.
 *
 * Replaces ad-hoc `<div id="…" className="scroll-mt-24">` patterns. The
 * `.scroll-anchor` class resolves to `scroll-margin-top: var(--scroll-clearance-top)`
 * so all targets share the same offset regardless of where they live.
 *
 * Usage:
 *   <ScrollAnchor id="enroll" />               // zero-height marker before content
 *   <ScrollAnchor id="enroll">{content}</ScrollAnchor>
 */
export function ScrollAnchor({
  id,
  className = "",
  style,
  children,
  as: Tag = "div",
  extraOffsetTop,
}: {
  id: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  as?: "div" | "section" | "article" | "span";
  extraOffsetTop?: number;
}) {
  const mergedStyle: CSSProperties = extraOffsetTop
    ? {
        scrollMarginTop: `calc(var(--scroll-clearance-top) + ${extraOffsetTop}px)`,
        ...style,
      }
    : style ?? {};
  const merged = `scroll-anchor ${className}`.trim();
  return (
    <Tag id={id} className={merged} style={mergedStyle}>
      {children}
    </Tag>
  );
}
