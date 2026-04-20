// Chapter manifest — timings from audio generation, screenshots + callouts hand-picked.
// Durations are read at render time; keep in sync with remotion/assets/tutorial-manifest.json.

export type Callout = {
  /** Normalized coordinates 0..1 within the screenshot area */
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  /** Appears at this fraction (0..1) of the chapter body */
  from: number;
  to: number;
};

export type ScreenPanel = {
  image: string;
  /** Body-time fraction range (0..1) when this screenshot is on screen */
  from: number;
  to: number;
  zoom?: { from: number; to: number };
  pan?: { fromX: number; fromY: number; toX: number; toY: number };
  callouts?: Callout[];
};

export type Caption = { text: string; emphasis?: boolean };

export type Chapter = {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  durationSeconds: number;
  audio: string;
  panels: ScreenPanel[];
  captions: Caption[];
};

export const CHAPTERS: Chapter[] = [
  {
    id: "01-welcome",
    number: 1,
    title: "Welcome to MCMS",
    subtitle: "Your admin command center",
    durationSeconds: 11.53,
    audio: "tutorial-audio/01-welcome.wav",
    panels: [
      {
        image: "tutorial-screenshots/02b-bookings-full.png",
        from: 0,
        to: 1,
        zoom: { from: 1.0, to: 1.06 },
        pan: { fromX: 0, fromY: 0, toX: -20, toY: -10 },
      },
    ],
    captions: [
      { text: "Welcome, Dr. Hala.", emphasis: true },
      { text: "This is your new admin dashboard." },
      { text: "Everything you need to run your practice — in one place." },
    ],
  },
  {
    id: "02-login",
    number: 2,
    title: "Signing In",
    subtitle: "Your starting point",
    durationSeconds: 10.25,
    audio: "tutorial-audio/02-login.wav",
    panels: [
      {
        image: "tutorial-screenshots/01-login.png",
        from: 0,
        to: 1,
        zoom: { from: 1.0, to: 1.08 },
        callouts: [
          { x: 0.33, y: 0.44, w: 0.34, h: 0.08, label: "Enter your password", from: 0.15, to: 0.6 },
          { x: 0.36, y: 0.56, w: 0.28, h: 0.04, label: "Check 'Remember me'", from: 0.45, to: 0.9 },
          { x: 0.33, y: 0.62, w: 0.34, h: 0.06, label: "Open MCMS", from: 0.7, to: 1 },
        ],
      },
    ],
    captions: [
      { text: "Visit mamahala.ca/admin" },
      { text: "Enter your password" },
      { text: "Check 'Remember me' on your own device" },
    ],
  },
  {
    id: "03-bookings",
    number: 3,
    title: "Bookings",
    subtitle: "The heart of your day",
    durationSeconds: 29.16,
    audio: "tutorial-audio/03-bookings.wav",
    panels: [
      {
        image: "tutorial-screenshots/02-bookings-list.png",
        from: 0,
        to: 1,
        zoom: { from: 1.0, to: 1.04 },
        callouts: [
          { x: 0.18, y: 0.09, w: 0.48, h: 0.06, label: "Booking Requests · Recurring · Availability", from: 0.1, to: 0.4 },
          { x: 0.18, y: 0.23, w: 0.4, h: 0.05, label: "Filter by status", from: 0.35, to: 0.6 },
          { x: 0.82, y: 0.17, w: 0.13, h: 0.05, label: "New Booking", from: 0.8, to: 1 },
        ],
      },
    ],
    captions: [
      { text: "Three tabs: Requests · Recurring · Availability" },
      { text: "Pending · Approved · Completed filters" },
      { text: "Approve → confirmation email sent automatically" },
      { text: "Decline → gently turn down the request" },
      { text: "New Booking → add a client manually", emphasis: true },
    ],
  },
  {
    id: "04-availability",
    number: 4,
    title: "Your Availability",
    subtitle: "When clients can book you",
    durationSeconds: 32.6,
    audio: "tutorial-audio/04-availability.wav",
    panels: [
      {
        image: "tutorial-screenshots/03-availability-schedule.png",
        from: 0,
        to: 0.3,
        callouts: [
          { x: 0.2, y: 0.09, w: 0.55, h: 0.06, label: "Schedule · Blocked · Travel · Rules", from: 0, to: 1 },
        ],
      },
      {
        image: "tutorial-screenshots/04-availability-blocked.png",
        from: 0.3,
        to: 0.55,
        callouts: [
          { x: 0.2, y: 0.28, w: 0.5, h: 0.12, label: "Add blocked dates — vacation, holiday, sick day", from: 0, to: 1 },
        ],
      },
      {
        image: "tutorial-screenshots/06-availability-travel.png",
        from: 0.55,
        to: 0.8,
        callouts: [
          { x: 0.2, y: 0.28, w: 0.5, h: 0.1, label: "Travel → timezone adjusts automatically", from: 0, to: 1 },
        ],
      },
      {
        image: "tutorial-screenshots/05-availability-rules.png",
        from: 0.8,
        to: 1,
        callouts: [
          { x: 0.2, y: 0.28, w: 0.5, h: 0.15, label: "Rules respect your energy", from: 0, to: 1 },
        ],
      },
    ],
    captions: [
      { text: "Schedule — weekly hours" },
      { text: "Blocked Dates — vacations, days off" },
      { text: "Travel — trip location adjusts timezone" },
      { text: "Rules — notice, buffers, max sessions/day", emphasis: true },
    ],
  },
  {
    id: "05-invoices",
    number: 5,
    title: "Invoices",
    subtitle: "Getting paid",
    durationSeconds: 38.04,
    audio: "tutorial-audio/05-invoices.wav",
    panels: [
      {
        image: "tutorial-screenshots/07-invoices-dashboard.png",
        from: 0,
        to: 0.18,
        callouts: [
          { x: 0.2, y: 0.08, w: 0.5, h: 0.1, label: "Revenue & insights at a glance", from: 0, to: 1 },
        ],
      },
      {
        image: "tutorial-screenshots/08-invoices-compose.png",
        from: 0.18,
        to: 0.78,
        zoom: { from: 1.0, to: 1.06 },
        callouts: [
          { x: 0.2, y: 0.18, w: 0.35, h: 0.08, label: "Customer", from: 0.05, to: 0.3 },
          { x: 0.2, y: 0.3, w: 0.35, h: 0.08, label: "Service → price auto-fills", from: 0.3, to: 0.55 },
          { x: 0.2, y: 0.42, w: 0.35, h: 0.08, label: "Complexity · Packages · Sliding scale", from: 0.55, to: 0.8 },
          { x: 0.6, y: 0.3, w: 0.25, h: 0.08, label: "Voice → AI writes it", from: 0.8, to: 1 },
        ],
      },
      {
        image: "tutorial-screenshots/09-invoices-history.png",
        from: 0.78,
        to: 1,
        callouts: [
          { x: 0.2, y: 0.15, w: 0.55, h: 0.1, label: "Mark paid · Resend · Download PDF", from: 0, to: 1 },
        ],
      },
    ],
    captions: [
      { text: "Dashboard — revenue at a glance" },
      { text: "Compose — pick customer & service" },
      { text: "Price fills in automatically" },
      { text: "Adjust for complexity or sliding scale" },
      { text: "Voice recorder — AI writes the description" },
      { text: "Preview → Send — payment link included", emphasis: true },
      { text: "History — track every invoice" },
    ],
  },
  {
    id: "06-dashboard-clients",
    number: 6,
    title: "Dashboard & Clients",
    subtitle: "Know who to follow up with",
    durationSeconds: 15.62,
    audio: "tutorial-audio/06-dashboard-clients.wav",
    panels: [
      {
        image: "tutorial-screenshots/13-dashboard.png",
        from: 0,
        to: 0.5,
        callouts: [
          { x: 0.2, y: 0.15, w: 0.7, h: 0.1, label: "Leads · Downloads · Signups · Page views", from: 0, to: 1 },
        ],
      },
      {
        image: "tutorial-screenshots/14-clients.png",
        from: 0.5,
        to: 1,
        callouts: [
          { x: 0.2, y: 0.18, w: 0.5, h: 0.1, label: "Hot · Warm · Cold — sorted for you", from: 0, to: 1 },
        ],
      },
    ],
    captions: [
      { text: "Dashboard — real-time practice metrics" },
      { text: "Leads tagged Hot · Warm · Cold" },
      { text: "See every client's journey on your site" },
    ],
  },
  {
    id: "07-content",
    number: 7,
    title: "Content & Services",
    subtitle: "Every page on your website",
    durationSeconds: 20.02,
    audio: "tutorial-audio/07-content.wav",
    panels: [
      {
        image: "tutorial-screenshots/16-blog.png",
        from: 0,
        to: 0.33,
        callouts: [
          { x: 0.6, y: 0.12, w: 0.25, h: 0.06, label: "Translate EN ↔ AR", from: 0, to: 1 },
        ],
      },
      {
        image: "tutorial-screenshots/17-services.png",
        from: 0.33,
        to: 0.66,
      },
      {
        image: "tutorial-screenshots/20-resources.png",
        from: 0.66,
        to: 1,
      },
    ],
    captions: [
      { text: "Blog · Services · Testimonials · FAQs · Resources" },
      { text: "Each with its own editor" },
      { text: "English + Arabic — AI translates for you", emphasis: true },
      { text: "Photos, prices, toolkits — a few clicks" },
    ],
  },
  {
    id: "08-settings",
    number: 8,
    title: "Settings",
    subtitle: "Your business at a glance",
    durationSeconds: 16.26,
    audio: "tutorial-audio/08-settings.wav",
    panels: [
      {
        image: "tutorial-screenshots/22-settings.png",
        from: 0,
        to: 1,
        zoom: { from: 1.0, to: 1.05 },
        callouts: [
          { x: 0.2, y: 0.15, w: 0.65, h: 0.15, label: "Business info · Stats · Social · Pricing", from: 0.1, to: 0.8 },
        ],
      },
    ],
    captions: [
      { text: "Business info · stats · social · pricing" },
      { text: "Everything on your site reflects what you save here" },
      { text: "Welcome to your command center.", emphasis: true },
    ],
  },
];

export const TOTAL_SECONDS = CHAPTERS.reduce((s, c) => s + c.durationSeconds, 0);
export const TITLE_CARD_SECONDS = 1.8;
export const FPS = 30;
