/**
 * OXO Lead Intel — every on-screen string, verbatim from the brief.
 *
 * RULE: no em dashes anywhere. Short declarative fragments are the intended
 * voice. The middle dot "·" in the phone notification is deliberate. Do not
 * "improve" punctuation. Copy is centralized here and never inlined.
 */

export const WORDMARK = {
  oxo: "OXO",
  product: "Lead Intel",
} as const;

/** Capture phase — micro-conversion labels, light up one by one in order. */
export const MICRO_CONVERSIONS = [
  "Scroll 80%",
  "Gallery viewed",
  "Brochure downloaded",
  "Payment plan opened",
  "Mortgage calculator",
  "EOI clicked",
] as const;

/** Behavioral track. */
export const BEHAVIORAL = {
  label: "BEHAVIORAL",
  stages: ["Discovery", "Interest", "Consideration", "Decision"],
} as const;

/** Fit / Profile track — exact sample identity. */
export const PROFILE = {
  label: "PROFILE",
  name: "Ahmed K.",
  title: "Managing Director",
  company: "Meridian Capital Partners",
  industry: "Real estate investment",
  location: "Dubai, UAE",
} as const;

/** Convergence. */
export const CONVERGENCE = {
  behavioralWeight: "Behavioral 50%",
  fitWeight: "Fit 50%",
  combinedLabel: "Combined Score",
  scoreValue: 91,
  scoreOutOf: 100,
  scoreDisplay: "91 / 100",
  classification: "FIRE",
} as const;

/** Route to CRM. */
export const CRM = {
  destination: "Salesforce",
  queue: "FIRE queue",
} as const;

/** Phone notification — three exact lines, middle-dot separators as written. */
export const PHONE = {
  line1: "🔥 FIRE LEAD",
  line2: "Ahmed K. · Score 91 / 100",
  line3: "Call within 5 minutes",
} as const;

/** End card — two stacked lines. */
export const END_CARD = {
  small: "Behavior and profile. Scored in real time.",
  large: "Know which lead to call before your competitor does.",
} as const;

/** Property landing page abstraction (Scene 2 backdrop) — real, not lorem. */
export const LP = {
  eyebrow: "OFF PLAN · DUBAI",
  title: "Marina Heights Residences",
  price: "From AED 1.8M",
  ctas: ["View gallery", "Download brochure", "Payment plan"],
} as const;
