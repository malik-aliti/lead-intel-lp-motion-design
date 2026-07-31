/**
 * THE signature motion. Promoted from the site's `.scan` element:
 * a 1px terracotta line with a soft vertical gradient + glow that "reads data
 * into existence". Two forms:
 *
 *  <ScanLine>       the moving line itself, positioned by a 0..1 progress.
 *  <RevealByScan>   wraps content; a scan line sweeps across and clip-reveals
 *                   what it has passed. Used for the wordmark and value blocks.
 */
import { AbsoluteFill } from "remotion";
import { COLORS, accentA } from "../theme/tokens";

type Orientation = "vertical" | "horizontal";

export const ScanLine: React.FC<{
  /** 0..1 position across the container. */
  progress: number;
  orientation?: Orientation;
  /** line thickness in px */
  thickness?: number;
  color?: string;
  opacity?: number;
}> = ({
  progress,
  orientation = "vertical",
  thickness = 2,
  color = COLORS.accent,
  opacity = 1,
}) => {
  const vertical = orientation === "vertical";
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      <div
        style={{
          position: "absolute",
          ...(vertical
            ? {
                left: `${progress * 100}%`,
                top: 0,
                bottom: 0,
                width: thickness,
                background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
                boxShadow: `0 0 14px 1px ${accentA(0.55)}`,
              }
            : {
                top: `${progress * 100}%`,
                left: 0,
                right: 0,
                height: thickness,
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                boxShadow: `0 0 14px 1px ${accentA(0.55)}`,
              }),
        }}
      />
    </AbsoluteFill>
  );
};

export const RevealByScan: React.FC<{
  progress: number; // 0..1 sweep
  orientation?: Orientation;
  showLine?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ progress, orientation = "vertical", showLine = true, children, style }) => {
  const vertical = orientation === "vertical";
  // Content behind the line is revealed; a soft feather trails the edge.
  const p = Math.max(0, Math.min(1, progress));
  const pct = p * 100;
  const clip = vertical
    ? `inset(0 ${100 - pct}% 0 0)`
    : `inset(0 0 ${100 - pct}% 0)`;
  return (
    <div style={{ position: "relative", ...style }}>
      <div style={{ clipPath: clip, WebkitClipPath: clip }}>{children}</div>
      {showLine && p > 0.001 && p < 0.999 ? (
        <ScanLine progress={p} orientation={orientation} />
      ) : null}
    </div>
  );
};
