import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../../lib/theme";

type Props = {
  number: number;
  title: string;
  subtitle?: string;
  durationFrames: number;
};

export const ChapterTitle: React.FC<Props> = ({ number, title, subtitle, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 18, stiffness: 100 } });
  const exitStart = durationFrames - 12;
  const exit = interpolate(frame, [exitStart, durationFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = enter * exit;
  const titleTy = interpolate(enter, [0, 1], [40, 0]);
  const subTy = interpolate(enter, [0, 1], [60, 0]);
  const numTy = interpolate(enter, [0, 1], [-40, 0]);

  return (
    <AbsoluteFill
      style={{
        background: BRAND.gradients.warm,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      {/* Soft accent arcs */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.colors.rose}30, transparent 70%)`,
          top: -200,
          right: -200,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.colors.sand}25, transparent 70%)`,
          bottom: -150,
          left: -150,
        }}
      />

      <div style={{ textAlign: "center", padding: "0 120px", zIndex: 2 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "10px 22px",
            background: "white",
            borderRadius: 999,
            boxShadow: "0 8px 24px rgba(122,59,94,0.12)",
            marginBottom: 36,
            transform: `translateY(${numTy}px)`,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: BRAND.colors.plum,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: BRAND.fonts.heading,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {number}
          </div>
          <div
            style={{
              fontFamily: BRAND.fonts.body,
              fontSize: 22,
              color: BRAND.colors.mist,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Chapter {number}
          </div>
        </div>

        <div
          style={{
            fontFamily: BRAND.fonts.heading,
            fontSize: 148,
            color: BRAND.colors.plumDark,
            lineHeight: 1.05,
            fontWeight: 400,
            transform: `translateY(${titleTy}px)`,
            letterSpacing: "-2px",
          }}
        >
          {title}
        </div>

        {subtitle ? (
          <div
            style={{
              marginTop: 24,
              fontFamily: BRAND.fonts.body,
              fontSize: 38,
              color: BRAND.colors.slate,
              fontWeight: 400,
              transform: `translateY(${subTy}px)`,
              fontStyle: "italic",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
