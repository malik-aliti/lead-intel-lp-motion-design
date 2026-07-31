/**
 * Aspect-aware layout so one set of components serves 16:9, 1:1 and 9:16.
 * `unit` is a vmin-like base (min dimension / 100) for fluid sizing.
 */
import { useVideoConfig } from "remotion";
import { SAFE } from "../theme/tokens";

export const useStage = () => {
  const { width, height } = useVideoConfig();
  const min = Math.min(width, height);
  const unit = min / 100; // 1 "u" ≈ 1% of the smaller side
  const margin = min * SAFE.marginPct;
  const isPortrait = height > width;
  const isSquare = Math.abs(width - height) < 1;
  return { width, height, min, unit, margin, isPortrait, isSquare };
};
