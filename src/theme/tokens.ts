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

/* ── Timing (frames @ 30fps) ──────────────────────────────────────────────── */
export const FPS = 30;

/** 24s narrative scene map. Sum = 720 frames. */
export const NARRATIVE = {
  wordmarkIn: { from: 0, duration: 60 }, // 0–2s  cold open
  capture: { from: 60, duration: 90 }, // 2–5s
  dualScore: { from: 150, duration: 180 }, // 5–11s
  convergence: { from: 330, duration: 90 }, // 11–14s
  routeCRM: { from: 420, duration: 90 }, // 14–17s
  phoneAlert: { from: 510, duration: 120 }, // 17–21s
  wordmarkOut: { from: 630, duration: 90 }, // 21–24s  end card
} as const;
export const NARRATIVE_DURATION = 720;

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
