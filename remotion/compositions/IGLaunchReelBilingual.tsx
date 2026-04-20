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
const SS_EN = staticFile("screenshots/homepage.png");
const SS_AR = staticFile("screenshots/homepage-ar.png");

const mauve = "#7A3B5E";
const cream = "#FAF7F2";
const gold = "#C8A97D";
const mist = "#6B6580";

function fade(frame: number, inAt: number, outAt: number) {
  return interpolate(frame, [inAt, inAt + 12, outAt - 12, outAt], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
}

export const IGLaunchReelBilingual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scene1 = fade(frame, 0, 140);
  const scene2 = fade(frame, 130, 330);
  const scene3 = fade(frame, 320, 480);
  const scene4 = fade(frame, 470, 600);

  const logoS1 = spring({ frame, fps, config: { damping: 14 } });
  const textS1 = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const urlS1 = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scene 2: AR screenshot first, then EN swaps in
  const ssSpringAR = spring({ frame: frame - 150, fps, config: { damping: 12, mass: 0.6 } });
  const swapToEn = interpolate(frame, [230, 245], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ssSpringEN = spring({ frame: frame - 235, fps, config: { damping: 12, mass: 0.6 } });

  const countProgress = (delay: number) =>
    interpolate(frame, [345 + delay, 375 + delay], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaSpring = spring({ frame: frame - 485, fps, config: { damping: 14 } });

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

      {/* ═══ SCENE 1: Bilingual title ═══ */}
      {centered(
        <>
          <Img src={LOGO} style={{ width: 160, height: 160, borderRadius: "50%", transform: `scale(${logoS1})` }} />
          <div style={{ height: 40 }} />
          <div style={{ opacity: textS1, fontFamily: "Georgia, serif", fontSize: 58, fontWeight: 700, color: "white", textAlign: "center" }}>
            We're Live.
          </div>
          <div style={{ opacity: textS1, fontFamily: "Georgia, serif", fontSize: 42, fontWeight: 700, color: gold, textAlign: "center", marginTop: 8 }}>
            أَطلَقنا الموقع
          </div>
          <div style={{ height: 20 }} />
          <div style={{ opacity: urlS1, fontSize: 24, color: gold, letterSpacing: 5 }}>mamahala.ca</div>
          <div style={{ height: 30 }} />
          <div style={{ opacity: urlS1, textAlign: "center" }}>
            <div style={{ fontSize: 20, color: "white", fontWeight: 600 }}>Dr. Hala Ali · د. هالة علي</div>
            <div style={{ fontSize: 14, color: gold, marginTop: 6, letterSpacing: 2 }}>MAMA HALA CONSULTING</div>
          </div>
        </>,
        mauve, scene1,
      )}

      {/* ═══ SCENE 2: EN then AR screenshot ═══ */}
      {centered(
        <>
          <div style={{ fontSize: 14, color: gold, letterSpacing: 4, fontWeight: 600 }}>
            {swapToEn < 0.5 ? "عَرَبِيّ" : "ENGLISH"}
          </div>
          <div style={{ height: 14 }} />
          <div style={{ fontFamily: "Georgia, serif", fontSize: 36, fontWeight: 700, color: mauve, textAlign: "center", lineHeight: 1.3 }}>
            {swapToEn < 0.5
              ? <>بيتٌ رقميٌّ جديد<br /><span style={{ color: gold, fontStyle: "italic" }}>للشِّفاء والنُّموّ</span></>
              : <>A New Home for<br /><span style={{ color: gold, fontStyle: "italic" }}>Healing & Growth</span></>
            }
          </div>
          <div style={{ height: 24 }} />
          <div style={{ position: "relative", width: 860, height: 460 }}>
            {/* AR screenshot first */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              opacity: 1 - swapToEn,
              transform: `translateY(${interpolate(ssSpringAR, [0, 1], [80, 0])}px) scale(${Math.min(ssSpringAR, 1)})`,
              background: "white", borderRadius: 12, overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
            }}>
              <div style={{ height: 28, background: "#EFEBE7", display: "flex", alignItems: "center", padding: "0 12px", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFBD2E" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }} />
                <div style={{ marginLeft: 10, background: "white", borderRadius: 4, padding: "2px 14px", fontSize: 9, color: mist }}>mamahala.ca/ar</div>
              </div>
              <Img src={SS_AR} style={{ width: "100%", display: "block" }} />
            </div>
            {/* EN screenshot swaps in */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              opacity: swapToEn,
              transform: `translateY(${interpolate(ssSpringEN, [0, 1], [80, 0])}px) scale(${Math.min(ssSpringEN, 1)})`,
              background: "white", borderRadius: 12, overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
            }}>
              <div style={{ height: 28, background: "#EFEBE7", display: "flex", alignItems: "center", padding: "0 12px", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFBD2E" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }} />
                <div style={{ marginLeft: 10, background: "white", borderRadius: 4, padding: "2px 14px", fontSize: 9, color: mist }}>mamahala.ca/en</div>
              </div>
              <Img src={SS_EN} style={{ width: "100%", display: "block" }} />
            </div>
          </div>
          <div style={{ height: 20 }} />
          <div style={{ fontSize: 14, color: mist }}>
            {swapToEn < 0.5 ? "٢٣ خدمة · ثنائيّ اللّغة · استشارة مجّانيّة" : "23 services · Bilingual · Free consultation"}
          </div>
        </>,
        cream, scene2,
      )}

      {/* ═══ SCENE 3: Stats ═══ */}
      {centered(
        <>
          <div style={{ fontSize: 14, color: gold, letterSpacing: 4, fontWeight: 600 }}>WHAT'S INSIDE · ماذا بِالدّاخِل</div>
          <div style={{ height: 40 }} />
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", width: 800 }}>
            {[
              { n: 23, label: "Services · خدمة", delay: 0 },
              { n: 14, label: "Quizzes · اختبار", delay: 8 },
              { n: 21, label: "Toolkits · أداة", delay: 16 },
              { n: 74, label: "Countries · دولة", delay: 24, suffix: "+" },
            ].map((s, i) => {
              const op = interpolate(frame, [342 + s.delay, 352 + s.delay], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{ opacity: op, textAlign: "center", width: 170, padding: "20px 0" }}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 50, fontWeight: 700, color: "white", lineHeight: 1 }}>
                    {Math.round(s.n * countProgress(s.delay))}{s.suffix || ""}
                  </div>
                  <div style={{ fontSize: 13, color: gold, marginTop: 8 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
          <div style={{ height: 30 }} />
          <div style={{
            opacity: interpolate(frame, [390, 405], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            fontFamily: "Georgia, serif", fontSize: 30, fontWeight: 700, color: "white", fontStyle: "italic",
          }}>
            And More. · والمَزيد.
          </div>
        </>,
        mauve, scene3,
      )}

      {/* ═══ SCENE 4: CTA ═══ */}
      {centered(
        <>
          <Img src={LOGO} style={{ width: 120, height: 120, borderRadius: "50%", transform: `scale(${Math.min(ctaSpring, 1)})` }} />
          <div style={{ height: 30 }} />
          <div style={{ fontFamily: "Georgia, serif", fontSize: 44, fontWeight: 700, color: mauve, textAlign: "center", lineHeight: 1.2 }}>
            Your Journey Starts Here
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 700, color: gold, textAlign: "center", marginTop: 8 }}>
            رحلتُكَ تبدأُ هُنا
          </div>
          <div style={{ height: 16 }} />
          <div style={{ fontSize: 16, color: mist, textAlign: "center", lineHeight: 1.6 }}>
            Free 30-min consultation · استشارة مجّانيّة
          </div>
          <div style={{ height: 24 }} />
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
            opacity: interpolate(frame, [530, 550], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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
