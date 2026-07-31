/**
 * Scene 5 — the CRM. Important: OXO Lead Intel does not create or route leads.
 * The prospect is ALREADY in the company's Salesforce with the standard fields
 * (name, phone, email, address, company...). OXO adds exactly one thing: the
 * score field, which writes itself in via the signature scan and ignites FIRE.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  CLASS_COLORS,
  COLORS,
  COMBINED_FINAL,
  FONT_FAMILY,
  TRACK,
  WEIGHT,
  accentA,
  creamA,
} from "../theme/tokens";
import { CRM, CONVERGENCE } from "../theme/strings";
import { useStage } from "../lib/useStage";
import { expo } from "../lib/anim";
import { Fade } from "../components/Fade";

const SalesforceIcon: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.22, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
    <svg width="72%" height="72%" viewBox="0 0 64 44" aria-hidden="true">
      <g fill="#00A1E0">
        <circle cx="24" cy="27" r="14" />
        <circle cx="41" cy="25" r="12" />
        <circle cx="34" cy="15" r="11" />
        <circle cx="15" cy="31" r="9" />
        <rect x="14" y="27" width="36" height="14" rx="7" />
      </g>
    </svg>
  </div>
);

export const SceneCRM: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { unit, isPortrait, width } = useStage();

  const cardW = isPortrait ? width * 0.86 : width * 0.52;

  // the score writes in
  const scoreReveal = interpolate(frame, [40, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
  const scoreVal = interpolate(frame, [42, 68], [0, COMBINED_FINAL], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
  const ignite = interpolate(frame, [58, 78], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });

  const Field: React.FC<{ label: string; value: string; index: number }> = ({ label, value, index }) => {
    const op = interpolate(frame, [8 + index * 3, 8 + index * 3 + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
    return (
      <div style={{ opacity: op, display: "flex", flexDirection: "column", gap: unit * 0.35 }}>
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semibold, fontSize: unit * 1.05, letterSpacing: "0.08em", textTransform: "uppercase", color: creamA(0.4) }}>{label}</span>
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.medium, fontSize: unit * 1.7, color: COLORS.cream }}>{value}</span>
      </div>
    );
  };

  return (
    <Fade dur={dur}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: unit * 2 }}>
        <div style={{ width: cardW, borderRadius: unit * 1.5, background: creamA(0.04), border: `1px solid ${creamA(0.1)}`, overflow: "hidden", boxShadow: `0 ${unit * 3}px ${unit * 8}px rgba(0,0,0,0.4)` }}>
          {/* Salesforce header */}
          <div style={{ display: "flex", alignItems: "center", gap: unit * 1.2, padding: unit * 1.8, borderBottom: `1px solid ${creamA(0.08)}` }}>
            <SalesforceIcon size={unit * 3.2} />
            <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.bold, fontSize: unit * 1.9, color: COLORS.cream }}>{CRM.destination}</span>
            <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.medium, fontSize: unit * 1.3, color: creamA(0.45), border: `1px solid ${creamA(0.14)}`, borderRadius: 999, padding: `${unit * 0.3}px ${unit * 1.1}px` }}>{CRM.recordLabel}</span>
            <span style={{ marginLeft: "auto", fontFamily: FONT_FAMILY, fontWeight: WEIGHT.regular, fontSize: unit * 1.2, color: creamA(0.35) }}>{CRM.note}</span>
          </div>

          {/* existing prospect fields (2 columns) */}
          <div style={{ padding: unit * 2, display: "grid", gridTemplateColumns: isPortrait ? "1fr" : "1fr 1fr", gap: `${unit * 1.6}px ${unit * 3}px` }}>
            {CRM.fields.map((f, i) => (
              <Field key={f.label} label={f.label} value={f.value} index={i} />
            ))}
          </div>

          {/* the ONE field OXO adds — writes in, ignites FIRE */}
          <div style={{ padding: `0 ${unit * 2}px ${unit * 2}px` }}>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: unit * 1,
                border: `1px solid ${accentA(0.3 + 0.4 * ignite)}`,
                background: `color-mix(in srgb, ${accentA(0.14)} ${30 + ignite * 70}%, ${creamA(0.03)})`,
                padding: unit * 1.6,
                display: "flex",
                alignItems: "center",
                gap: unit * 1.4,
                opacity: interpolate(frame, [38, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: unit * 0.3, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: unit * 1 }}>
                  <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semibold, fontSize: unit * 1.05, letterSpacing: "0.08em", textTransform: "uppercase", color: accentA(0.9) }}>{CRM.scoreField}</span>
                  <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.medium, fontSize: unit * 0.95, letterSpacing: "0.06em", textTransform: "uppercase", color: creamA(0.4), border: `1px solid ${creamA(0.14)}`, borderRadius: 999, padding: `${unit * 0.2}px ${unit * 0.9}px` }}>{CRM.addedBadge}</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: unit * 1.2 }}>
                  <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.black, fontSize: unit * 4.4, color: CLASS_COLORS.FIRE, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{Math.round(scoreVal)}</span>
                  <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.light, fontSize: unit * 1.8, color: COLORS.dim }}>/ 100</span>
                  <div style={{ display: "flex", alignItems: "center", gap: unit * 0.6, opacity: ignite }}>
                    <span style={{ fontSize: unit * 1.9 }}>🔥</span>
                    <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.black, fontSize: unit * 2.4, letterSpacing: TRACK.label, color: CLASS_COLORS.FIRE, textShadow: `0 0 ${unit * 1.6 * ignite}px ${accentA(0.7)}` }}>{CONVERGENCE.classification}</span>
                  </div>
                </div>
              </div>
              {/* signature scan writing the field in */}
              {scoreReveal > 0.02 && scoreReveal < 0.98 ? (
                <div style={{ position: "absolute", top: 0, bottom: 0, left: `${scoreReveal * 100}%`, width: 2, background: COLORS.accent, boxShadow: `0 0 12px ${accentA(0.7)}` }} />
              ) : null}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Fade>
  );
};
