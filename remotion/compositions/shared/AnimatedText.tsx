import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../../lib/theme";

type AnimatedHeadingProps = {
  text: string;
  fontSize?: number;
  color?: string;
  isArabic?: boolean;
  maxWidth?: number;
};

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  fontSize = 72,
  color = BRAND.colors.charcoal,
  isArabic = false,
  maxWidth = 1400,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontSize,
        fontWeight: 700,
        color,
        fontFamily: isArabic ? BRAND.fonts.arabic : BRAND.fonts.heading,
        direction: isArabic ? "rtl" : "ltr",
        transform: `scale(${scale})`,
        opacity,
        textAlign: "center",
        maxWidth,
        lineHeight: 1.2,
      }}
    >
      {text}
    </div>
  );
};

type FadeUpTextProps = {
  text: string;
  fontSize?: number;
  color?: string;
  isArabic?: boolean;
  fontFamily?: string;
  fontWeight?: number;
  letterSpacing?: number;
  maxWidth?: number;
};

export const FadeUpText: React.FC<FadeUpTextProps> = ({
  text,
  fontSize = 32,
  color = BRAND.colors.slate,
  isArabic = false,
  fontFamily,
  fontWeight = 400,
  letterSpacing = 0,
  maxWidth = 1200,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 18], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily: fontFamily ?? (isArabic ? BRAND.fonts.arabic : BRAND.fonts.body),
        direction: isArabic ? "rtl" : "ltr",
        opacity,
        transform: `translateY(${y}px)`,
        textAlign: "center",
        letterSpacing,
        maxWidth,
        lineHeight: 1.6,
      }}
    >
      {text}
    </div>
  );
};

type TypewriterProps = {
  text: string;
  fontSize?: number;
  color?: string;
  isArabic?: boolean;
  charsPerFrame?: number;
};

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  fontSize = 28,
  color = BRAND.colors.charcoal,
  isArabic = false,
  charsPerFrame = 0.8,
}) => {
  const frame = useCurrentFrame();
  const charsToShow = Math.min(Math.floor(frame * charsPerFrame), text.length);
  const displayed = text.slice(0, charsToShow);
  const showCursor = frame % 20 < 14 && charsToShow < text.length;

  return (
    <div
      style={{
        fontSize,
        fontWeight: 400,
        fontStyle: "italic",
        color,
        fontFamily: isArabic ? BRAND.fonts.arabic : BRAND.fonts.body,
        direction: isArabic ? "rtl" : "ltr",
        textAlign: "center",
        maxWidth: 1300,
        lineHeight: 1.7,
      }}
    >
      &ldquo;{displayed}{showCursor ? "|" : ""}{charsToShow >= text.length ? "&rdquo;" : ""}
    </div>
  );
};
