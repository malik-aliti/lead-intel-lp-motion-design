/**
 * A clean "lead packet": the scored, classified lead as a compact card.
 * Reused by the CRM route scene and the ambient loop.
 */
import {
  COLORS,
  FONT_FAMILY,
  TRACK,
  WEIGHT,
  accentA,
  creamA,
} from "../theme/tokens";
import { CONVERGENCE, PROFILE } from "../theme/strings";

export const LeadPacket: React.FC<{
  unit: number;
  compact?: boolean;
  /** 0..1 how "landed"/hot the packet reads (drives fill + border). */
  landed?: number;
}> = ({ unit, compact, landed = 0 }) => (
  <div
    style={{
      padding: compact ? `${unit * 0.9}px ${unit * 1.2}px` : unit * 1.5,
      borderRadius: unit * 1,
      background: `color-mix(in srgb, ${accentA(0.16)} ${40 + landed * 60}%, ${creamA(0.05)})`,
      border: `1px solid ${accentA(0.35 + landed * 0.3)}`,
      display: "flex",
      alignItems: "center",
      gap: unit * 1,
      boxShadow: `0 ${unit}px ${unit * 3}px rgba(0,0,0,0.35)`,
      whiteSpace: "nowrap",
    }}
  >
    <span style={{ fontSize: unit * 1.6 }}>🔥</span>
    <div style={{ display: "flex", flexDirection: "column", gap: unit * 0.2 }}>
      <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.bold, fontSize: unit * 1.7, color: COLORS.cream }}>
        {PROFILE.name}
      </span>
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: WEIGHT.medium,
          fontSize: unit * 1.2,
          color: accentA(0.85),
          letterSpacing: TRACK.label,
          textTransform: "uppercase",
        }}
      >
        {CONVERGENCE.classification} · {CONVERGENCE.scoreValue}
      </span>
    </div>
  </div>
);
