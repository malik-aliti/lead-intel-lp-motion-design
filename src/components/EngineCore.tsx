/**
 * The OXO Lead Intel core, carried over from the site's `.eng-wrap`:
 * three concentric rings rotating at different speeds/directions and a pulsing
 * terracotta core. All motion is driven by useCurrentFrame() (no CSS anim).
 */
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, accentA, creamA } from "../theme/tokens";

export const EngineCore: React.FC<{
  size: number;
  /** 0..1 overall presence (fade/scale in). */
  presence?: number;
  /** 0..1 intensity of the core glow (rises as scoring peaks). */
  intensity?: number;
}> = ({ size, presence = 1, intensity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // ring rotations (deg) — periods 4s / 3s reverse / 2s, as on the site
  const r1 = (t / 4) * 360;
  const r2 = -(t / 3) * 360;
  const r3 = (t / 2) * 360;

  // core pulse 1 -> 1.1, sinusoidal (2s period)
  const pulse = 1 + 0.1 * (0.5 - 0.5 * Math.cos((t / 2) * Math.PI * 2));
  const glow = 16 + 14 * intensity * (0.5 - 0.5 * Math.cos((t / 2) * Math.PI * 2));

  const ring = (d: number, color: string, gap: "right" | "bottom" | "left", rot: number) => (
    <div
      style={{
        position: "absolute",
        width: d,
        height: d,
        borderRadius: "50%",
        border: `1.5px solid ${color}`,
        [`border${gap[0].toUpperCase()}${gap.slice(1)}Color`]: "transparent",
        rotate: `${rot}deg`,
      }}
    />
  );

  const core = size * 0.35;
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: presence,
        scale: String(0.9 + 0.1 * presence),
      }}
    >
      {ring(size, creamA(0.25), "right", r1)}
      {ring(size * 0.72, accentA(0.3 + 0.2 * intensity), "bottom", r2)}
      {ring(size * 0.48, creamA(0.2), "left", r3)}
      <div
        style={{
          width: core,
          height: core,
          borderRadius: "50%",
          backgroundColor: COLORS.accent,
          scale: String(pulse),
          boxShadow: `0 0 ${glow}px ${accentA(0.35 + 0.25 * intensity)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: core * 0.3,
            height: core * 0.3,
            borderRadius: "50%",
            backgroundColor: COLORS.bg,
          }}
        />
      </div>
    </div>
  );
};
