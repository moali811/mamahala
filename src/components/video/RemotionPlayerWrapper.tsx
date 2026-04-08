"use client";

import React, { Suspense } from "react";
import { Player } from "@remotion/player";

const ProgramIntro = React.lazy(() =>
  import("../../../remotion/compositions/ProgramIntro").then((mod) => ({
    default: mod.ProgramIntro,
  }))
);

const ProgramsOverview = React.lazy(() =>
  import("../../../remotion/compositions/ProgramsOverview").then((mod) => ({
    default: mod.ProgramsOverview,
  }))
);

const Placeholder = () => (
  <div className="aspect-video bg-stone-100 animate-pulse rounded-xl" />
);

/* ----------------------------------------------------------------
   ProgramOverviewPlayer — for the main Programs landing page
   ---------------------------------------------------------------- */
type OverviewPlayerProps = {
  lang: "en" | "ar";
  className?: string;
};

export const ProgramOverviewPlayer: React.FC<OverviewPlayerProps> = ({
  lang,
  className,
}) => (
  <div className={className}>
    <Suspense fallback={<Placeholder />}>
      <Player
        component={ProgramsOverview}
        compositionWidth={1920}
        compositionHeight={1080}
        durationInFrames={900}
        fps={30}
        controls
        style={{ width: "100%", borderRadius: 12 }}
        inputProps={{ lang }}
      />
    </Suspense>
  </div>
);

/* ----------------------------------------------------------------
   ProgramIntroPlayer — for each individual program page
   ---------------------------------------------------------------- */
type ProgramIntroPlayerProps = {
  lang: "en" | "ar";
  programSlug: string;
  className?: string;
};

// Lazy-import the content data
let programsCache: typeof import("../../../remotion/lib/content").PROGRAMS | null = null;
const loadPrograms = () =>
  import("../../../remotion/lib/content").then((m) => {
    programsCache = m.PROGRAMS;
    return m.PROGRAMS;
  });

export const ProgramIntroPlayer: React.FC<ProgramIntroPlayerProps> = ({
  lang,
  programSlug,
  className,
}) => {
  const [program, setProgram] = React.useState(
    programsCache?.find((p) => p.slug === programSlug) ?? null
  );

  React.useEffect(() => {
    if (!program) {
      loadPrograms().then((programs) => {
        setProgram(programs.find((p) => p.slug === programSlug) ?? null);
      });
    }
  }, [programSlug, program]);

  if (!program) {
    return <Placeholder />;
  }

  return (
    <div className={className}>
      <Suspense fallback={<Placeholder />}>
        <Player
          component={ProgramIntro}
          compositionWidth={1920}
          compositionHeight={1080}
          durationInFrames={750}
          fps={30}
          controls
          style={{ width: "100%", borderRadius: 12 }}
          inputProps={{ lang, program }}
        />
      </Suspense>
    </div>
  );
};
