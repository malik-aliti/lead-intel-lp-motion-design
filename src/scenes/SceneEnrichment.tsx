/**
 * Scene 3 — social profiling. Several sources are researched to qualify the
 * profile (LinkedIn, Internet, company registry, public records); the data flows
 * through OXO Lead Intel AI, which resolves the professional profile and computes
 * the Social Fit score. The signature terracotta pulses carry data source->AI.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  COLORS,
  FONT_FAMILY,
  SOCIAL_FINAL,
  TRACK,
  WEIGHT,
  accentA,
  creamA,
} from "../theme/tokens";
import { ENRICH } from "../theme/strings";
import { useStage } from "../lib/useStage";
import { expo } from "../lib/anim";
import { Label } from "../components/Label";
import { EngineCore } from "../components/EngineCore";
import { ProfileCard } from "../components/ProfileCard";
import { ScoreCounter } from "../components/ScoreCounter";
import { Fade } from "../components/Fade";

const SourceIcon: React.FC<{ name: string; size: number }> = ({ name, size }) => {
  if (name === "LinkedIn") {
    return (
      <div style={{ width: size, height: size, borderRadius: size * 0.18, background: "#0A66C2", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_FAMILY, fontWeight: WEIGHT.bold, fontSize: size * 0.52, color: "#fff" }}>in</div>
    );
  }
  if (name === "Internet") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={COLORS.warm1} strokeWidth={1.6}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </svg>
    );
  }
  if (name === "Company registry") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={COLORS.warm1} strokeWidth={1.6}>
        <rect x="4" y="4" width="16" height="17" rx="1" />
        <path d="M8 8h3M13 8h3M8 12h3M13 12h3M8 16h3M13 16h3" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={COLORS.warm1} strokeWidth={1.6}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M14 3v5h5M9 12h7M9 16h7" />
    </svg>
  );
};

export const SceneEnrichment: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { unit, isPortrait, width, height } = useStage();

  const social = interpolate(frame, [58, 100], [0, SOCIAL_FINAL], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });

  const sources = ENRICH.sources;
  const colH = isPortrait ? height * 0.3 : height * 0.46;
  const connW = isPortrait ? 2 : width * 0.085;
  const coreSize = isPortrait ? width * 0.24 : height * 0.19;
  const cardW = isPortrait ? width * 0.72 : width * 0.24;
  const chipSize = unit * 3.4;

  // per-source y within the fan svg
  const yOf = (i: number) => (colH * (i + 0.5)) / sources.length;

  const SourceColumn = (
    <div style={{ height: colH, display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
      {sources.map((sname, i) => {
        const start = 10 + i * 8;
        const op = interpolate(frame, [start, start + 10], [0.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
        const lit = interpolate(frame, [start + 4, start + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={sname} style={{ display: "flex", alignItems: "center", gap: unit * 1.2, opacity: op }}>
            <SourceIcon name={sname} size={chipSize} />
            <div style={{ display: "flex", flexDirection: "column", gap: unit * 0.2 }}>
              <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semibold, fontSize: unit * 1.6, color: COLORS.cream }}>{sname}</span>
              <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.medium, fontSize: unit * 1.1, color: `color-mix(in srgb, ${COLORS.accent} ${lit * 100}%, ${creamA(0.35)})` }}>
                {lit > 0.6 ? "matched" : "searching"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );

  // converging fan: base lines + a data pulse travelling each line to the core
  const Fan = (
    <svg width={connW} height={colH} style={{ overflow: "visible" }}>
      {sources.map((_, i) => {
        const y0 = yOf(i);
        const x0 = 2;
        const x1 = connW - 2;
        const y1 = colH / 2;
        const start = 14 + i * 8;
        const draw = interpolate(frame, [start, start + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
        const t = interpolate(frame, [start + 8, start + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
        const px = x0 + (x1 - x0) * t;
        const py = y0 + (y1 - y0) * t;
        const dotOp = interpolate(t, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
        return (
          <g key={i}>
            <line x1={x0} y1={y0} x2={x0 + (x1 - x0) * draw} y2={y0 + (y1 - y0) * draw} stroke={creamA(0.14)} strokeWidth={1} />
            <circle cx={px} cy={py} r={unit * 0.6} fill={COLORS.accent} opacity={dotOp} style={{ filter: `drop-shadow(0 0 ${unit}px ${accentA(0.8)})` }} />
          </g>
        );
      })}
    </svg>
  );

  const Core = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: unit * 1.2 }}>
      <EngineCore size={coreSize} presence={interpolate(frame, [10, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} intensity={0.5 + 0.5 * interpolate(frame, [30, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <Label size={unit * 1.15} color={COLORS.warm2} tracking={TRACK.label}>{ENRICH.aiLabel}</Label>
    </div>
  );

  const Output = (
    <div style={{ display: "flex", flexDirection: "column", gap: unit * 1.6, alignItems: "center" }}>
      <ProfileCard reveal={frame - 40} unit={unit} width={cardW} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: unit * 0.5, opacity: interpolate(frame, [56, 72], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <Label size={unit * 1.2} color={creamA(0.5)} tracking={TRACK.label}>{ENRICH.scoreLabel}</Label>
        <ScoreCounter value={social} unit={unit * 0.6} color={COLORS.warm1} showOutOf={false} />
      </div>
    </div>
  );

  return (
    <Fade dur={dur}>
      <AbsoluteFill style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", gap: unit * 3 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: unit * 1, maxWidth: unit * 72, textAlign: "center", opacity: interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <Label size={unit * 1.6} color={COLORS.accent} tracking={TRACK.labelWide}>{ENRICH.label}</Label>
          <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.regular, fontSize: unit * 1.7, color: COLORS.dim, lineHeight: 1.4 }}>{ENRICH.caption}</span>
        </div>

        <div style={{ display: "flex", flexDirection: isPortrait ? "column" : "row", alignItems: "center", gap: isPortrait ? unit * 2.4 : unit * 2 }}>
          {SourceColumn}
          {!isPortrait ? Fan : null}
          {Core}
          {!isPortrait ? (
            <svg width={connW} height={colH} style={{ overflow: "visible" }}>
              <line x1={2} y1={colH / 2} x2={connW - 2} y2={colH / 2} stroke={creamA(0.14)} strokeWidth={1} />
              <circle cx={2 + (connW - 4) * interpolate(frame, [46, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo })} cy={colH / 2} r={unit * 0.6} fill={COLORS.accent} opacity={interpolate(frame, [44, 50, 62, 68], [0, 1, 1, 0])} style={{ filter: `drop-shadow(0 0 ${unit}px ${accentA(0.8)})` }} />
            </svg>
          ) : null}
          {Output}
        </div>
      </AbsoluteFill>
    </Fade>
  );
};
