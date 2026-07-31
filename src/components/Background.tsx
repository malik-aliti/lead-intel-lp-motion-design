/**
 * The film's canvas: warm near-black (#202020), a faint dot grid lifted from
 * the site panel, a restrained radial vignette, and animated film grain.
 * Grain is driven by useCurrentFrame() (no CSS animation, per Remotion rules).
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, creamA } from "../theme/tokens";

const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  const frame = useCurrentFrame();
  // Re-seed every frame so the grain shimmers like real film.
  const seed = frame % 977;
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

export const Background: React.FC<{ grain?: boolean }> = ({ grain = true }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* dot grid — the panel's real texture, held very quiet */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle, ${creamA(0.05)} 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
        }}
      />
      {/* radial vignette: clear center, darkened edges */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 120% at 50% 46%, transparent 42%, rgba(0,0,0,0.55) 100%)`,
        }}
      />
      {grain ? <Grain /> : null}
    </AbsoluteFill>
  );
};
