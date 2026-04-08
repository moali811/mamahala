/* ================================================================
   Program Intro Video — Per-program composition
   Plays on each individual program page.
   Each program gets its own branded intro with Dr. Hala's voice.
   ~25 seconds | 750 frames @ 30fps
   ================================================================ */

import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../lib/theme";
import type { ProgramVideoContent } from "../lib/content";
import { Logo } from "./shared/Logo";
import { AnimatedHeading, FadeUpText, Typewriter } from "./shared/AnimatedText";
import { BookingCTA } from "./shared/BookingCTA";
import { WarmBackground, AccentBar, DotPattern } from "./shared/Backgrounds";

type ProgramIntroProps = {
  lang: "en" | "ar";
  program: ProgramVideoContent;
};

export const ProgramIntro: React.FC<ProgramIntroProps> = ({ lang, program }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const isAr = lang === "ar";

  const barProgress = spring({ frame, fps, config: { damping: 20 } });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - fps, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <WarmBackground accentColor={program.color} />
      <DotPattern color={program.color} opacity={0.04} />
      <AccentBar
        color={program.color}
        secondaryColor={BRAND.colors.plum}
        progress={barProgress}
      />

      {/* ---- Scene 1: Logo + Program Title (0-130) ---- */}
      <Sequence from={0} durationInFrames={130}>
        <SceneTitle program={program} lang={lang} />
      </Sequence>

      {/* ---- Scene 2: Dr. Hala's personal quote (110-310) ---- */}
      <Sequence from={110} durationInFrames={200}>
        <SceneHalaQuote program={program} lang={lang} />
      </Sequence>

      {/* ---- Scene 3: What you'll learn (290-490) ---- */}
      <Sequence from={290} durationInFrames={200}>
        <SceneHighlights program={program} lang={lang} />
      </Sequence>

      {/* ---- Scene 4: Framework + Stats (470-600) ---- */}
      <Sequence from={470} durationInFrames={130}>
        <SceneFramework program={program} lang={lang} />
      </Sequence>

      {/* ---- Scene 5: CTA + Booking (580-750) ---- */}
      <Sequence from={580} durationInFrames={170}>
        <SceneCTA program={program} lang={lang} />
      </Sequence>
    </AbsoluteFill>
  );
};

/* ---- Scene 1: Title ---- */
const SceneTitle: React.FC<{ program: ProgramVideoContent; lang: "en" | "ar" }> = ({
  program,
  lang,
}) => {
  const isAr = lang === "ar";
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [100, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 28,
        opacity: fadeOut,
      }}
    >
      <Logo size={90} />

      {/* Category pill */}
      <Sequence from={15}>
        <CategoryPill text={program.whoFor[lang]} color={program.color} isArabic={isAr} />
      </Sequence>

      <Sequence from={20}>
        <AnimatedHeading
          text={program.title[lang]}
          fontSize={isAr ? 76 : 72}
          isArabic={isAr}
          color={BRAND.colors.charcoal}
        />
      </Sequence>

      <Sequence from={40}>
        <FadeUpText
          text={program.tagline[lang]}
          fontSize={isAr ? 30 : 28}
          isArabic={isAr}
          color={program.color}
          fontWeight={500}
        />
      </Sequence>

      {/* Decorative underline */}
      <Sequence from={50}>
        <AccentLine color={program.color} />
      </Sequence>
    </AbsoluteFill>
  );
};

const CategoryPill: React.FC<{
  text: string;
  color: string;
  isArabic: boolean;
}> = ({ text, color, isArabic }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontSize: isArabic ? 18 : 16,
        fontWeight: 600,
        color,
        fontFamily: isArabic ? BRAND.fonts.arabic : BRAND.fonts.body,
        direction: isArabic ? "rtl" : "ltr",
        textTransform: isArabic ? "none" : "uppercase",
        letterSpacing: isArabic ? 0 : 3,
        opacity,
        background: `${color}12`,
        padding: "8px 24px",
        borderRadius: 30,
      }}
    >
      {text}
    </div>
  );
};

const AccentLine: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const width = spring({ frame, fps, config: { damping: 15 } });

  return (
    <div
      style={{
        width: width * 100,
        height: 3,
        backgroundColor: color,
        borderRadius: 2,
        opacity: 0.6,
      }}
    />
  );
};

/* ---- Scene 2: Dr. Hala's Quote ---- */
const SceneHalaQuote: React.FC<{ program: ProgramVideoContent; lang: "en" | "ar" }> = ({
  program,
  lang,
}) => {
  const isAr = lang === "ar";
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [170, 200], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 140px",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Large decorative quote */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: isAr ? undefined : 100,
          right: isAr ? 100 : undefined,
          fontSize: 200,
          color: program.color,
          opacity: 0.08,
          fontFamily: BRAND.fonts.heading,
          lineHeight: 0.5,
        }}
      >
        {isAr ? "\u201D" : "\u201C"}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        <Sequence from={10}>
          <Typewriter
            text={program.halaQuote[lang]}
            fontSize={isAr ? 32 : 30}
            color={BRAND.colors.charcoal}
            isArabic={isAr}
            charsPerFrame={isAr ? 0.6 : 0.7}
          />
        </Sequence>

        <Sequence from={140}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <Logo size={44} fadeInDuration={10} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                direction: isAr ? "rtl" : "ltr",
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: BRAND.colors.plum,
                  fontFamily: isAr ? BRAND.fonts.arabic : BRAND.fonts.body,
                }}
              >
                {isAr ? "د. هالة علي" : "Dr. Hala Ali"}
              </span>
              <span
                style={{
                  fontSize: 15,
                  color: BRAND.colors.mist,
                  fontFamily: isAr ? BRAND.fonts.arabic : BRAND.fonts.body,
                }}
              >
                {isAr ? "مستشارة أسرية معتمدة" : "Certified Family Counselor"}
              </span>
            </div>
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};

/* ---- Scene 3: What You'll Learn ---- */
const SceneHighlights: React.FC<{ program: ProgramVideoContent; lang: "en" | "ar" }> = ({
  program,
  lang,
}) => {
  const isAr = lang === "ar";
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [170, 200], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
        padding: "80px 200px",
        opacity: fadeIn * fadeOut,
      }}
    >
      <FadeUpText
        text={isAr ? "ماذا ستتعلم" : "What You\u2019ll Learn"}
        fontSize={isAr ? 44 : 40}
        isArabic={isAr}
        color={BRAND.colors.charcoal}
        fontWeight={600}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100%",
          maxWidth: 1000,
          alignItems: isAr ? "flex-end" : "flex-start",
        }}
      >
        {program.highlights[lang].map((item, i) => (
          <Sequence key={i} from={25 + i * 22}>
            <HighlightItem
              text={item}
              color={program.color}
              index={i}
              isArabic={isAr}
            />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const HighlightItem: React.FC<{
  text: string;
  color: string;
  index: number;
  isArabic: boolean;
}> = ({ text, color, index, isArabic }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slideIn = spring({ frame, fps, config: { damping: 12 } });
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        opacity,
        transform: `translateX(${isArabic ? -(1 - slideIn) * 60 : (1 - slideIn) * 60}px)`,
        direction: isArabic ? "rtl" : "ltr",
      }}
    >
      {/* Checkmark circle */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          background: `${color}18`,
          border: `2px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          color,
          flexShrink: 0,
        }}
      >
        &#10003;
      </div>
      <div
        style={{
          fontSize: isArabic ? 28 : 26,
          color: BRAND.colors.charcoal,
          fontFamily: isArabic ? BRAND.fonts.arabic : BRAND.fonts.body,
          fontWeight: 500,
        }}
      >
        {text}
      </div>
    </div>
  );
};

/* ---- Scene 4: Framework + Quick Stats ---- */
const SceneFramework: React.FC<{ program: ProgramVideoContent; lang: "en" | "ar" }> = ({
  program,
  lang,
}) => {
  const isAr = lang === "ar";
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [100, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
        opacity: fadeIn * fadeOut,
      }}
    >
      <FadeUpText
        text={isAr ? "مبني على أسس علمية" : "Evidence-Based Approach"}
        fontSize={isAr ? 40 : 36}
        isArabic={isAr}
        color={BRAND.colors.charcoal}
        fontWeight={600}
      />

      {/* Framework badge */}
      <Sequence from={15}>
        <div
          style={{
            background: BRAND.colors.white,
            borderRadius: 20,
            padding: "28px 52px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            borderLeft: isAr ? "none" : `4px solid ${program.color}`,
            borderRight: isAr ? `4px solid ${program.color}` : "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: BRAND.colors.mist,
              fontFamily: isAr ? BRAND.fonts.arabic : BRAND.fonts.body,
              textTransform: isAr ? "none" : "uppercase",
              letterSpacing: isAr ? 0 : 2,
            }}
          >
            {isAr ? "الإطار النظري" : "FRAMEWORK"}
          </div>
          <div
            style={{
              fontSize: isAr ? 28 : 26,
              fontWeight: 600,
              color: program.color,
              fontFamily: isAr ? BRAND.fonts.arabic : BRAND.fonts.body,
              direction: isAr ? "rtl" : "ltr",
            }}
          >
            {program.framework[lang]}
          </div>
        </div>
      </Sequence>

      {/* Stats row */}
      <Sequence from={35}>
        <div style={{ display: "flex", gap: 40 }}>
          <StatItem
            value={`${program.modules}`}
            label={isAr ? "وحدة" : "Modules"}
            color={program.color}
            isArabic={isAr}
          />
          <StatItem
            value={`${program.hours}`}
            label={isAr ? "ساعة" : "Hours"}
            color={program.color}
            isArabic={isAr}
          />
          <StatItem
            value="3"
            label={isAr ? "مستويات" : "Levels"}
            color={program.color}
            isArabic={isAr}
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

const StatItem: React.FC<{
  value: string;
  label: string;
  color: string;
  isArabic: boolean;
}> = ({ value, label, color, isArabic }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color,
          fontFamily: BRAND.fonts.body,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 16,
          color: BRAND.colors.mist,
          fontFamily: isArabic ? BRAND.fonts.arabic : BRAND.fonts.body,
          textTransform: isArabic ? "none" : "uppercase",
          letterSpacing: isArabic ? 0 : 1.5,
        }}
      >
        {label}
      </div>
    </div>
  );
};

/* ---- Scene 5: CTA ---- */
const SceneCTA: React.FC<{ program: ProgramVideoContent; lang: "en" | "ar" }> = ({
  program,
  lang,
}) => {
  const isAr = lang === "ar";
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        opacity: fadeIn,
      }}
    >
      <Logo size={70} />

      <FadeUpText
        text={program.title[lang]}
        fontSize={isAr ? 44 : 40}
        isArabic={isAr}
        color={BRAND.colors.charcoal}
        fontWeight={600}
      />

      <Sequence from={20}>
        <BookingCTA
          text={program.cta[lang]}
          isArabic={isAr}
          accentColor={program.color}
        />
      </Sequence>

      {/* Secondary CTA — booking nudge */}
      <Sequence from={50}>
        <FadeUpText
          text={
            isAr
              ? "أو احجز استشارة مجانية مع د. هالة"
              : "Or book a free consultation with Dr. Hala"
          }
          fontSize={isAr ? 22 : 20}
          isArabic={isAr}
          color={BRAND.colors.mist}
          fontWeight={400}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
