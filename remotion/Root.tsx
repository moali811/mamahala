import React from "react";
import { Composition } from "remotion";
import { ProgramIntro } from "./compositions/ProgramIntro";
import { ProgramsOverview } from "./compositions/ProgramsOverview";
import { IGLaunchReel } from "./compositions/IGLaunchReel";
import { IGLaunchReelAr } from "./compositions/IGLaunchReelAr";
import { IGLaunchReelBilingual } from "./compositions/IGLaunchReelBilingual";
import { PROGRAMS } from "./lib/content";
import { AdminTutorial, getTutorialDurationFrames } from "./compositions/tutorial/AdminTutorial";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ---- Admin Tutorial (narrated walkthrough for Dr. Hala) ---- */}
      <Composition
        id="AdminTutorial"
        component={AdminTutorial}
        durationInFrames={getTutorialDurationFrames()}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ---- IG Launch Reels ---- */}
      <Composition
        id="IGLaunchReel"
        component={IGLaunchReel}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="IGLaunchReel-AR"
        component={IGLaunchReelAr}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="IGLaunchReel-Bilingual"
        component={IGLaunchReelBilingual}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1350}
      />

      {/* ---- Programs Overview (Landing Page) ---- */}
      <Composition
        id="ProgramsOverview-EN"
        component={ProgramsOverview}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ lang: "en" as const }}
      />
      <Composition
        id="ProgramsOverview-AR"
        component={ProgramsOverview}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ lang: "ar" as const }}
      />

      {/* ---- Per-Program Intros (EN + AR for each) ---- */}
      {PROGRAMS.map((program) => (
        <React.Fragment key={program.slug}>
          <Composition
            id={`ProgramIntro-${program.slug}-EN`}
            component={ProgramIntro}
            durationInFrames={750}
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{ lang: "en" as const, program }}
          />
          <Composition
            id={`ProgramIntro-${program.slug}-AR`}
            component={ProgramIntro}
            durationInFrames={750}
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{ lang: "ar" as const, program }}
          />
        </React.Fragment>
      ))}
    </>
  );
};
