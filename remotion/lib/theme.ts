/* ================================================================
   Remotion Video Theme — Mama Hala Consulting
   Mirrors the site's design system for visual consistency.
   ================================================================ */

export const BRAND = {
  colors: {
    // Primary — Dusty Rose
    rose: "#C4878A",
    roseLight: "#D08E90",
    roseDark: "#B07578",
    rose50: "#FDF5F5",

    // Secondary — Deep Plum
    plum: "#7A3B5E",
    plumLight: "#9B4E79",
    plumDark: "#5E2D48",
    plum50: "#faf5f8",

    // Accent — Warm Gold
    sand: "#C8A97D",
    sandLight: "#D9C4A0",
    sandDark: "#B08D5E",

    // Accent — Warm Terracotta
    terracotta: "#D4836A",
    terracottaLight: "#E09E89",

    // Surface
    peach: "#F9E8E2",
    peachLight: "#FDF4F0",

    // Neutrals
    charcoal: "#2D2A33",
    slate: "#4A4A5C",
    mist: "#6B6580",
    linen: "#FAF7F2",
    cloud: "#F3EFE8",
    white: "#FFFFFF",
  },

  fonts: {
    heading: "'DM Serif Display', Georgia, 'Times New Roman', serif",
    display: "'Fraunces', Georgia, serif",
    body: "'Plus Jakarta Sans', system-ui, sans-serif",
    arabic: "'Tajawal', system-ui, sans-serif",
  },

  gradients: {
    sage: "linear-gradient(135deg, #E8C4C0, #F0D5CA, #FAF0EC)",
    plum: "linear-gradient(135deg, #7A3B5E, #5E2D48)",
    warm: "linear-gradient(135deg, #FAF7F2, #F3EFE8, rgba(200, 169, 125, 0.1))",
    sunset: "linear-gradient(135deg, #F9E8E2, #E8C4C0, #C4878A40)",
  },

  // Per-program brand colors
  programs: {
    "intentional-parent": { color: "#7A3B5E", gradient: "linear-gradient(135deg, #7A3B5E, #9B4E79)" },
    "resilient-teens":    { color: "#C4878A", gradient: "linear-gradient(135deg, #C4878A, #D08E90)" },
    "stronger-together":  { color: "#D4836A", gradient: "linear-gradient(135deg, #D4836A, #E09E89)" },
    "inner-compass":      { color: "#C8A97D", gradient: "linear-gradient(135deg, #C8A97D, #D9C4A0)" },
  },
} as const;

export const VIDEO = {
  landscape: { width: 1920, height: 1080 },
  portrait: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
} as const;
