import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../../lib/theme";

export const Outro: React.FC<{ durationFrames: number }> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleEnter = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const bodyEnter = spring({ frame: frame - 14, fps, config: { damping: 14, stiffness: 90 } });
  const sigEnter = spring({ frame: frame - 28, fps, config: { damping: 14, stiffness: 90 } });

  return (
    <AbsoluteFill
      style={{
        background: BRAND.gradients.plum,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", padding: "0 120px", color: "white" }}>
        <div
          style={{
            fontFamily: BRAND.fonts.heading,
            fontSize: 112,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            opacity: titleEnter,
            transform: `translateY(${interpolate(titleEnter, [0, 1], [40, 0])}px)`,
          }}
        >
          You're ready.
        </div>

        <div
          style={{
            marginTop: 32,
            fontFamily: BRAND.fonts.body,
            fontSize: 32,
            lineHeight: 1.45,
            fontWeight: 400,
            opacity: bodyEnter,
            transform: `translateY(${interpolate(bodyEnter, [0, 1], [30, 0])}px)`,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          Every tool you need to run your practice — in one place.
          <br />
          Run, refine, and welcome every client with confidence.
        </div>

        <div
          style={{
            marginTop: 64,
            display: "inline-flex",
            alignItems: "center",
            gap: 18,
            padding: "16px 32px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            opacity: sigEnter,
            transform: `translateY(${interpolate(sigEnter, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: BRAND.fonts.body,
              fontSize: 20,
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            mamahala.ca/admin
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
