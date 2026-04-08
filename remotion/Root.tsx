import React from "react";
import { Composition } from "remotion";
import { ProgramIntro } from "./compositions/ProgramIntro";
import { ProgramsOverview } from "./compositions/ProgramsOverview";
import { PROGRAMS } from "./lib/content";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
