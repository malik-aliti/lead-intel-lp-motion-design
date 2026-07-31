/**
 * OXO Lead Intel — motion-design tokens.
 *
 * Single source of truth. Every value here was extracted 1:1 from the live
 * landing page stylesheet (weareoxo-digital.com/assets/css/style.css), the
 * `--a-*` "animation panel / client colors" block. Do not hardcode colors,
 * type or timing anywhere else.
 */

/* ── Palette (animation-panel / dark "client colors") ─────────────────────── */
export const COLORS = {
  /** Warm near-black panel background (site --a-bg). NOT navy. */
  bg: "#202020",
  /** One shade up for depth / cards. */
  bgUp: "#282826",
  /** Rings, borders, COLD (site --a-bg2 / --cold-dk). */
  line: "#414141",
  /** Off-white — primary text & processed particles (site --a-cream). */
  cream: "#F3F0EC",
  /** Pure white — reserved for peak-emphasis text (site --a-white). */
  white: "#FFFFFF",
  /** Light warm gray (site --a-warm1). */
  warm1: "#D3CFC6",
  /** Medium warm gray = HOT (site --a-warm2 / --hot-dk). */
  warm2: "#C0BCAF",
  /** Muted warm gray = WARM (site --a-warm3 / --warm-dk). */
  warm3: "#B5AF9F",
  /** Dim secondary text (site --mu2). */
  dim: "#9A948E",
  /** THE single accent — scan line, engine core, FIRE ignition (site --a-accent). */
  accent: "#E18D5E",
} as const;

/** Classification colors, used ONLY when semantically correct. */
export const CLASS_COLORS = {
  FIRE: "#E18D5E", // terracotta — same hue as the signature accent (by design)
  HOT: "#C0BCAF",
  WARM: "#B5AF9F",
  COLD: "#414141",
} as const;

/** Accent at alpha — matches the site's rgba(225,141,94,x) usages. */
export const accentA = (a: number) => `rgba(225,141,94,${a})`;
/** Cream at alpha — matches rgba(243,240,236,x) hairlines/text. */
export const creamA = (a: number) => `rgba(243,240,236,${a})`;
/** Ink at alpha (on light chips). */
export const inkA = (a: number) => `rgba(31,31,29,${a})`;

/* ── Typography ───────────────────────────────────────────────────────────── */
/** CSS font stack (used everywhere for fontFamily). */
export const FONT_FAMILY = `"Poppins", system-ui, -apple-system, sans-serif`;
/** Bare FontFace family name registered by loadFont(). Must match the stack head. */
export const FONT_NAME = "Poppins";

/**
 * Weights present as self-hosted woff2 in public/fonts.
 * Display headline = 400 + tight tracking, punctuated by 800/900 uppercase.
 * Micro-labels = 600/700 + wide tracking, uppercase.
 */
export const WEIGHT = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 800,
  black: 900,
} as const;

/** Letter-spacing scale (em), lifted from the site. */
export const TRACK = {
  displayTight: "-0.045em", // hero H1
  wordmarkTight: "-0.03em", // OXO logo
  tight: "-0.02em", // H2
  label: "0.16em", // uppercase micro-labels (src-hd / eng-lbl)
  labelWide: "0.2em", // .eye
  wordmarkSub: "0.24em", // "Lead Intel" spaced sub-mark
} as const;

/* ── Motion ───────────────────────────────────────────────────────────────── */
/** Cinematic ease-out-expo used for all UI moves (brief spec). */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
/** Site's original material easing, kept for continuity where apt. */
export const EASE_STD = [0.4, 0, 0.2, 1] as const;
/** Overshoot settle, from the site's alert (.pipe-alert). */
export const EASE_BACK = [0.34, 1.56, 0.64, 1] as const;

/* ── Scoring (single source of truth) ─────────────────────────────────────── */
/**
 * Realistic funnel-stage strengths (80–99). The Behavioral score is their mean,
 * the Social (profile) score is fixed, and the Combined score is the 50/50 blend.
 * Every frame reads these so the totals never drift.
 *   mean(94,84,82,92) = 88  ·  social 94  ·  combined (88+94)/2 = 91
 */
export const SCORING = {
  stages: [
    { name: "Discovery", score: 94 },
    { name: "Interest", score: 84 },
    { name: "Consideration", score: 82 },
    { name: "Decision", score: 92 },
  ],
  social: 94,
} as const;

export const BEHAVIORAL_FINAL = Math.round(
  SCORING.stages.reduce((a, s) => a + s.score, 0) / SCORING.stages.length,
); // 88
export const SOCIAL_FINAL = SCORING.social; // 94
export const COMBINED_FINAL = Math.round((BEHAVIORAL_FINAL + SOCIAL_FINAL) / 2); // 91

/* ── Timing (frames @ 30fps) ──────────────────────────────────────────────── */
export const FPS = 30;

/**
 * ~30s narrative scene map. Sum = 900 frames. Durations give the voice-over room
 * (each VO line sits inside its scene); scenes hold via Fade, so the extra time
 * is breathing room, not dead air.
 */
export const NARRATIVE = {
  wordmarkIn: { from: 0, duration: 60 }, // 0–2s      cold open
  capture: { from: 60, duration: 150 }, // 2–7s       off-plan LP + signals
  enrichment: { from: 210, duration: 156 }, // 7–12.2s   multi-source social profiling
  globalScore: { from: 366, duration: 162 }, // 12.2–17.6s behavioral + social -> FIRE gauge
  crm: { from: 528, duration: 108 }, // 17.6–21.2s Salesforce record + score add
  phoneAlert: { from: 636, duration: 126 }, // 21.2–25.4s FIRE alert
  wordmarkOut: { from: 762, duration: 138 }, // 25.4–30s  end card
} as const;
export const NARRATIVE_DURATION = 900;

/** Voice-over line start frames (each fits inside its scene). */
export const VO_AT = {
  l1: 6, // cold open
  l2: 66, // capture
  l3: 216, // enrichment
  l4: 372, // global scoring
  l5: 534, // crm
  l6: 642, // phone
  l7: 768, // end card
} as const;

/**
 * Ambient loop. 360 frames = 12.0s @ 30fps, deliberately a common multiple of
 * the engine ring periods (120/90/60f) and core pulse (60f) so the continuously
 * spinning core wraps with zero rotational jump. Everything else is a function
 * of loop phase p = (frame % 360) / 360, with envelopes that return to their
 * frame-0 value at the seam. See Loop.tsx.
 */
export const LOOP_DURATION = 360; // 12.0s @ 30fps
/** Phase windows (0..1) for the single processed lead per cycle. */
export const LOOP_PHASE = {
  /** meters fill as the lead passes the core, then empty (peak mid, 0 at edges). */
  scoreCenter: 0.5,
  /** the one FIRE ignition beat per loop. */
  fireStart: 0.56,
  firePeak: 0.68,
  fireEnd: 0.86,
} as const;

/* ── Layout ───────────────────────────────────────────────────────────────── */
export const SAFE = {
  /** Strict safe margin as a fraction of the smaller canvas dimension. */
  marginPct: 0.075,
} as const;
