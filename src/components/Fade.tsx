/**
 * Scene-level fade in/out driven by the sequence-local frame. Keeps cuts
 * cinematic without CSS transitions. Pass the scene's own duration.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Fade: React.FC<{
  dur: number;
  inFrames?: number;
  outFrames?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ dur, inFrames = 12, outFrames = 12, children, style }) => {
  const frame = useCurrentFrame();
  // Build a strictly-increasing range, tolerating inFrames/outFrames = 0.
  const fadeIn = Math.max(0.0001, inFrames);
  const range: number[] = [0, fadeIn];
  const out: number[] = [0, 1];
  if (outFrames > 0) {
    range.push(Math.max(fadeIn + 0.0001, dur - outFrames), dur);
    out.push(1, 0);
  }
  const opacity = interpolate(frame, range, out, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity, ...style }}>{children}</AbsoluteFill>
  );
};
