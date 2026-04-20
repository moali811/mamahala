import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../../lib/theme";

export const Intro: React.FC<{ durationFrames: number }> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoEnter = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const titleEnter = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 90 } });
  const subEnter = spring({ frame: frame - 24, fps, config: { damping: 14, stiffness: 90 } });

  const exitStart = durationFrames - 10;
  const exit = interpolate(frame, [exitStart, durationFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: BRAND.gradients.sunset,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: exit,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            transform: `scale(${logoEnter}) translateY(${interpolate(logoEnter, [0, 1], [-20, 0])}px)`,
            display: "inline-block",
          }}
        >
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: 44,
              background: "white",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 50px rgba(122,59,94,0.25)",
              fontFamily: BRAND.fonts.heading,
              fontSize: 80,
              color: BRAND.colors.plumDark,
              letterSpacing: "-2px",
            }}
          >
            MH
          </div>
        </div>

        <div
          style={{
            marginTop: 56,
            fontFamily: BRAND.fonts.body,
            fontSize: 24,
            color: BRAND.colors.plum,
            letterSpacing: "8px",
            textTransform: "uppercase",
            fontWeight: 600,
            opacity: titleEnter,
            transform: `translateY(${interpolate(titleEnter, [0, 1], [20, 0])}px)`,
          }}
        >
          Mama Hala Consulting
        </div>

        <div
          style={{
            marginTop: 16,
            fontFamily: BRAND.fonts.heading,
            fontSize: 132,
            color: BRAND.colors.plumDark,
            lineHeight: 1,
            fontWeight: 400,
            opacity: titleEnter,
            transform: `translateY(${interpolate(titleEnter, [0, 1], [40, 0])}px)`,
            letterSpacing: "-3px",
          }}
        >
          MCMS
        </div>

        <div
          style={{
            marginTop: 28,
            fontFamily: BRAND.fonts.body,
            fontSize: 34,
            color: BRAND.colors.slate,
            fontWeight: 400,
            fontStyle: "italic",
            opacity: subEnter,
            transform: `translateY(${interpolate(subEnter, [0, 1], [30, 0])}px)`,
          }}
        >
          Admin Tutorial — A Complete Walkthrough
        </div>
      </div>
    </AbsoluteFill>
  );
};
