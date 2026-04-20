import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const LOGO = staticFile("screenshots/logo-new.png");
const SCREENSHOT = staticFile("screenshots/homepage.png");

const mauve = "#7A3B5E";
const cream = "#FAF7F2";
const gold = "#C8A97D";
const mist = "#6B6580";

function fade(frame: number, inAt: number, outAt: number) {
  return interpolate(frame, [inAt, inAt + 12, outAt - 12, outAt], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
}

export const IGLaunchReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slower timing: 600 frames total @ 30fps = 20 seconds
  const scene1 = fade(frame, 0, 140);
  const scene2 = fade(frame, 130, 310);
  const scene3 = fade(frame, 300, 460);
  const scene4 = fade(frame, 450, 600);

  // Scene 1 animations
  const logoS1 = spring({ frame, fps, config: { damping: 14 } });
  const textS1 = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const urlS1 = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scene 2 animations
  const ssSpring = spring({ frame: frame - 150, fps, config: { damping: 12, mass: 0.6 } });

  // Scene 3 animations
  const countProgress = (delay: number) =>
    interpolate(frame, [325 + delay, 355 + delay], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scene 4 animations
  const ctaSpring = spring({ frame: frame - 465, fps, config: { damping: 14 } });

  const bg = (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${gold}, ${mauve}, ${gold})`, zIndex: 10 }} />
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(122,59,94,0.04)" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 240, height: 240, borderRadius: "50%", background: "rgba(122,59,94,0.03)" }} />
    </>
  );

  const centered = (children: React.ReactNode, bgColor: string, opacity: number) => (
    <AbsoluteFill style={{ opacity, backgroundColor: bgColor }}>
      {bg}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", height: "100%", padding: "0 50px",
      }}>
        {children}
      </div>
    </AbsoluteFill>
  );

  return (
    <AbsoluteFill style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ═══ SCENE 1 ═══ */}
      {centered(
        <>
          <Img src={LOGO} style={{ width: 160, height: 160, borderRadius: "50%", transform: `scale(${logoS1})` }} />
          <div style={{ height: 40 }} />
          <div style={{ opacity: textS1, fontFamily: "Georgia, serif", fontSize: 64, fontWeight: 700, color: "white", textAlign: "center" }}>
            We're Live.
          </div>
          <div style={{ height: 20 }} />
          <div style={{ opacity: urlS1, fontSize: 24, color: gold, letterSpacing: 5 }}>mamahala.ca</div>
          <div style={{ height: 36 }} />
          <div style={{ opacity: urlS1, textAlign: "center" }}>
            <div style={{ fontSize: 20, color: "white", fontWeight: 600 }}>Dr. Hala Ali</div>
            <div style={{ fontSize: 14, color: gold, marginTop: 6, letterSpacing: 3 }}>MAMA HALA CONSULTING</div>
          </div>
        </>,
        mauve, scene1,
      )}

      {/* ═══ SCENE 2 ═══ */}
      {centered(
        <>
          <div style={{ fontSize: 14, color: gold, letterSpacing: 4, fontWeight: 600 }}>WELCOME HOME</div>
          <div style={{ height: 14 }} />
          <div style={{ fontFamily: "Georgia, serif", fontSize: 40, fontWeight: 700, color: mauve, textAlign: "center", lineHeight: 1.2 }}>
            A New Home for<br /><span style={{ color: gold, fontStyle: "italic" }}>Healing & Growth</span>
          </div>
          <div style={{ height: 30 }} />
          <div style={{
            transform: `translateY(${interpolate(ssSpring, [0, 1], [80, 0])}px) scale(${Math.min(ssSpring, 1)})`,
            background: "white", borderRadius: 12, overflow: "hidden", width: 860,
            boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
          }}>
            <div style={{ height: 30, background: "#EFEBE7", display: "flex", alignItems: "center", padding: "0 12px", gap: 6 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF5F57" }} />
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#28C840" }} />
              <div style={{ marginLeft: 12, background: "white", borderRadius: 4, padding: "2px 16px", fontSize: 10, color: mist }}>mamahala.ca</div>
            </div>
            <Img src={SCREENSHOT} style={{ width: "100%", display: "block" }} />
          </div>
          <div style={{ height: 20 }} />
          <div style={{ fontSize: 14, color: mist }}>23 services · Bilingual EN/AR · Free consultation</div>
        </>,
        cream, scene2,
      )}

      {/* ═══ SCENE 3 ═══ */}
      {centered(
        <>
          <div style={{ fontSize: 14, color: gold, letterSpacing: 4, fontWeight: 600 }}>WHAT'S INSIDE</div>
          <div style={{ height: 40 }} />
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", width: 800 }}>
            {[
              { n: 23, label: "Services", delay: 0 },
              { n: 14, label: "Quizzes", delay: 8 },
              { n: 21, label: "Toolkits", delay: 16 },
              { n: 74, label: "Countries", delay: 24, suffix: "+" },
            ].map((s, i) => {
              const op = interpolate(frame, [322 + s.delay, 332 + s.delay], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{ opacity: op, textAlign: "center", width: 170, padding: "20px 0" }}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 50, fontWeight: 700, color: "white", lineHeight: 1 }}>
                    {Math.round(s.n * countProgress(s.delay))}{s.suffix || ""}
                  </div>
                  <div style={{ fontSize: 14, color: gold, marginTop: 8, letterSpacing: 1 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
          <div style={{ height: 30 }} />
          <div style={{
            opacity: interpolate(frame, [370, 385], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 700, color: "white", fontStyle: "italic",
          }}>
            And More.
          </div>
          <div style={{ height: 24 }} />
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { label: "Youth", bg: "#C4878A" },
              { label: "Families", bg: "#C8A97D" },
              { label: "Adults", bg: "#5A8B6F" },
              { label: "Couples", bg: "#D4836A" },
            ].map((p, i) => {
              const pillOp = interpolate(frame, [385 + i * 5, 393 + i * 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={p.label} style={{ opacity: pillOp, background: p.bg, color: "white", padding: "8px 18px", borderRadius: 30, fontSize: 14, fontWeight: 600 }}>{p.label}</div>
              );
            })}
          </div>
        </>,
        mauve, scene3,
      )}

      {/* ═══ SCENE 4 ═══ */}
      {centered(
        <>
          <Img src={LOGO} style={{ width: 120, height: 120, borderRadius: "50%", transform: `scale(${Math.min(ctaSpring, 1)})` }} />
          <div style={{ height: 30 }} />
          <div style={{ fontFamily: "Georgia, serif", fontSize: 48, fontWeight: 700, color: mauve, textAlign: "center", lineHeight: 1.15 }}>
            Your Journey<br />Starts Here
          </div>
          <div style={{ height: 16 }} />
          <div style={{ fontSize: 18, color: mist, textAlign: "center", lineHeight: 1.6 }}>
            Your first conversation is free.<br />30 minutes. No pressure.
          </div>
          <div style={{ height: 28 }} />
          <div style={{
            background: mauve, color: "white", padding: "16px 50px", borderRadius: 50,
            fontSize: 24, fontWeight: 700, letterSpacing: 2,
            transform: `scale(${Math.min(ctaSpring, 1)})`,
          }}>
            mamahala.ca
          </div>
          <div style={{ height: 14 }} />
          <div style={{ fontSize: 14, color: mist }}>WhatsApp: +1 613-222-2104</div>
          <div style={{ height: 50 }} />
          <div style={{
            opacity: interpolate(frame, [510, 530], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            textAlign: "center",
          }}>
            <div style={{ width: 50, height: 1, background: "rgba(200,169,125,0.3)", margin: "0 auto 8px" }} />
            <div style={{ fontSize: 12, color: gold, fontWeight: 600, letterSpacing: 2 }}>Powered by</div>
            <div style={{ fontSize: 18, color: mauve, fontWeight: 700, marginTop: 4 }}>M. Ali</div>
            <div style={{ fontSize: 10, color: "#A09BAD", marginTop: 4 }}>mo.ali811@gmail.com · WhatsApp: +971 522 464 844</div>
          </div>
        </>,
        cream, scene4,
      )}
    </AbsoluteFill>
  );
};
