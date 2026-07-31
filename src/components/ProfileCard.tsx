/**
 * The Fit-track identity card. Fields resolve one by one (staggered) as the
 * lead is enriched into a professional profile. Exact sample identity from
 * strings.ts — never placeholder.
 */
import { interpolate } from "remotion";
import { COLORS, FONT_FAMILY, TRACK, WEIGHT, accentA, creamA } from "../theme/tokens";
import { PROFILE } from "../theme/strings";
import { Label } from "./Label";
import { expo } from "../lib/anim";

const Field: React.FC<{
  value: string;
  index: number;
  reveal: number; // scene-local frame
  unit: number;
  primary?: boolean;
}> = ({ value, index, reveal, unit, primary }) => {
  const start = 10 + index * 7;
  const op = interpolate(reveal, [start, start + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const dx = interpolate(reveal, [start, start + 12], [unit * 1.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  return (
    <div
      style={{
        opacity: op,
        translate: `${dx}px 0px`,
        fontFamily: FONT_FAMILY,
        fontWeight: primary ? WEIGHT.bold : WEIGHT.regular,
        fontSize: primary ? unit * 2.9 : unit * 1.85,
        letterSpacing: primary ? TRACK.tight : "0em",
        color: primary ? COLORS.cream : COLORS.warm2,
        lineHeight: 1.3,
      }}
    >
      {value}
    </div>
  );
};

export const ProfileCard: React.FC<{
  reveal: number; // scene-local frame
  unit: number;
  width: number;
}> = ({ reveal, unit, width }) => {
  const fields = [PROFILE.title, PROFILE.company, PROFILE.industry, PROFILE.location];
  return (
    <div
      style={{
        width,
        padding: unit * 2.6,
        borderRadius: unit * 1.2,
        backgroundColor: creamA(0.04),
        border: `1px solid ${creamA(0.1)}`,
        display: "flex",
        flexDirection: "column",
        gap: unit * 1.1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: unit * 1.2, marginBottom: unit * 0.6 }}>
        <div
          style={{
            width: unit * 4.6,
            height: unit * 4.6,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${accentA(0.9)}, ${accentA(0.5)})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT_FAMILY,
            fontWeight: WEIGHT.bold,
            fontSize: unit * 2,
            color: COLORS.bg,
            opacity: interpolate(reveal, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          AK
        </div>
        <Field value={PROFILE.name} index={0} reveal={reveal} unit={unit} primary />
      </div>
      <div style={{ height: 1, background: creamA(0.08) }} />
      {fields.map((f, i) => (
        <Field key={f} value={f} index={i + 1} reveal={reveal} unit={unit} />
      ))}
      <div style={{ marginTop: unit * 0.4 }}>
        <Label size={unit * 1.25} color={accentA(0.85)} tracking={TRACK.label}>
          {PROFILE.label}
        </Label>
      </div>
    </div>
  );
};
