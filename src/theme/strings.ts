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

/** Social profiling / enrichment scene — multi-source research into OXO AI. */
export const ENRICH = {
  label: "SOCIAL PROFILING",
  caption:
    "OXO Lead Intel researches the profile across multiple sources, then computes the Social Fit score.",
  seedLabel: "Lead form",
  sources: ["LinkedIn", "Internet", "Company registry", "Public records"],
  aiLabel: "OXO Lead Intel AI",
  scoreLabel: "SOCIAL FIT SCORE",
} as const;

/** Convergence. */
export const CONVERGENCE = {
  behavioralWeight: "Behavioral 50%",
  socialWeight: "Social 50%",
  combinedLabel: "Combined Score",
  scoreValue: 91,
  scoreOutOf: 100,
  scoreDisplay: "91 / 100",
  classification: "FIRE",
} as const;

/**
 * CRM scene. The lead is ALREADY in the company CRM (Salesforce). OXO Lead Intel
 * does not create or route leads. It adds ONE thing: the score field.
 * Sample record (clearly fictional) with the standard prospect fields.
 */
export const CRM = {
  destination: "Salesforce",
  recordLabel: "Contact",
  note: "The lead is already in your CRM. OXO Lead Intel only adds the score.",
  fields: [
    { label: "First name", value: "Ahmed" },
    { label: "Last name", value: "Khalifa" },
    { label: "Phone", value: "+971 50 418 2209" },
    { label: "Email", value: "a.khalifa@meridiancp.ae" },
    { label: "Company", value: "Meridian Capital Partners" },
    { label: "Title", value: "Managing Director" },
    { label: "Address", value: "Downtown, Dubai, UAE" },
    { label: "Lead source", value: "Marina Heights LP" },
  ],
  scoreField: "OXO Lead Score",
  addedBadge: "Added by OXO Lead Intel",
} as const;

/** Phone notification — Salesforce alert. Three exact lines, middle dots as written. */
export const PHONE = {
  app: "Salesforce",
  time: "now",
  line1: "🔥 FIRE LEAD",
  line2: "Ahmed K. · Score 91 / 100",
  line3: "Call within 5 minutes",
} as const;

/** End card — two stacked lines. */
export const END_CARD = {
  small: "Behavior and profile. Scored in real time.",
  large: "Know which lead to call before your competitor does.",
} as const;

/** Off-plan property landing page (Scene 2). Realistic, not lorem. */
export const LP = {
  developer: "AURA DEVELOPMENT",
  nav: ["Overview", "Residences", "Amenities", "Payment Plan"],
  eyebrow: "OFF PLAN · DUBAI MARINA",
  title: "Marina Heights Residences",
  tagline: "Waterfront 1 to 4 bedroom residences by the harbour.",
  price: "From AED 1.8M",
  cta: "Register your interest",
  details: [
    { k: "Bedrooms", v: "1 to 4 BR" },
    { k: "Handover", v: "Q4 2027" },
    { k: "Payment plan", v: "60 / 40" },
    { k: "Location", v: "Dubai Marina" },
  ],
  form: {
    title: "Register your interest",
    fields: ["Full name", "Email", "Phone"],
    submit: "Download brochure",
  },
} as const;
