import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../../lib/theme";
import type { Caption } from "./manifest";

type Props = {
  captions: Caption[];
  bodyDurationFrames: number;
};

// Distributes captions evenly across the chapter body so each one
// gets its own on-screen moment timed to the narration.
export const CaptionBar: React.FC<Props> = ({ captions, bodyDurationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (captions.length === 0) return null;

  const perCaption = bodyDurationFrames / captions.length;
  const activeIdx = Math.min(
    captions.length - 1,
    Math.floor(frame / perCaption)
  );
  const localInCaption = frame - activeIdx * perCaption;

  const enter = spring({
    frame: localInCaption,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const exit = interpolate(localInCaption, [perCaption - 10, perCaption], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const opacity = enter * exit;
  const translateY = interpolate(enter, [0, 1], [24, 0]);

  const caption = captions[activeIdx];

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 64,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          padding: "22px 48px",
          background: "rgba(45, 42, 51, 0.92)",
          color: "white",
          borderRadius: 18,
          fontSize: caption.emphasis ? 52 : 42,
          fontFamily: caption.emphasis ? BRAND.fonts.heading : BRAND.fonts.body,
          fontWeight: caption.emphasis ? 700 : 500,
          letterSpacing: caption.emphasis ? "0.5px" : "0.2px",
          textAlign: "center",
          lineHeight: 1.25,
          opacity,
          transform: `translateY(${translateY}px)`,
          boxShadow: "0 18px 44px rgba(0,0,0,0.32)",
          borderLeft: `4px solid ${caption.emphasis ? BRAND.colors.sand : BRAND.colors.rose}`,
          borderRight: `4px solid ${caption.emphasis ? BRAND.colors.sand : BRAND.colors.rose}`,
        }}
      >
        {caption.text}
      </div>
    </div>
  );
};
