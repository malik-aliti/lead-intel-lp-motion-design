/**
 * Small animation helpers. Keep interpolate() calls inline in components where
 * they read as keyframes; use these only for the repeated idioms.
 */
import { Easing, interpolate, spring } from "remotion";
import { EASE_OUT_EXPO } from "../theme/tokens";

export const expo = Easing.bezier(...EASE_OUT_EXPO);

/** Clamped, eased 0..1 progress across a frame window. */
export const prog = (
  frame: number,
  from: number,
  to: number,
  easing = expo,
) =>
  interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/** A spring entrance value 0..1 (brief: spring physics for entrances). */
export const enter = (
  frame: number,
  fps: number,
  delay = 0,
  config: Parameters<typeof spring>[0]["config"] = { damping: 200 },
) =>
  spring({
    frame: frame - delay,
    fps,
    config,
    durationInFrames: 30,
  });

/** Staggered per-index delay. */
export const stagger = (i: number, step: number, base = 0) => base + i * step;
