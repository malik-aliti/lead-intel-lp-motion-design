/**
 * "OXO Lead Intel" lockup, following the site logo pattern:
 * OXO in black weight + tight tracking, a thin divider, then "Lead Intel"
 * as a lighter, wide-tracked sub-mark. Sizing driven by `unit`.
 */
import { COLORS, FONT_FAMILY, TRACK, WEIGHT, creamA } from "../theme/tokens";
import { WORDMARK } from "../theme/strings";

export const Wordmark: React.FC<{
  unit: number;
  /** overall scale multiplier */
  scale?: number;
  color?: string;
  subColor?: string;
  /** stack vs inline lockup */
  stacked?: boolean;
}> = ({ unit, scale = 1, color = COLORS.cream, subColor = COLORS.warm3, stacked = false }) => {
  const oxoSize = unit * 6.4 * scale;
  const subSize = unit * 2.05 * scale;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: stacked ? "column" : "row",
        alignItems: stacked ? "center" : "baseline",
        gap: stacked ? unit * 1.2 : unit * 1.6,
        fontFamily: FONT_FAMILY,
      }}
    >
      <span
        style={{
          fontSize: oxoSize,
          fontWeight: WEIGHT.black,
          letterSpacing: TRACK.wordmarkTight,
          color,
          lineHeight: 1,
        }}
      >
        {WORDMARK.oxo}
      </span>
      <span
        style={{
          fontSize: subSize,
          fontWeight: WEIGHT.semibold,
          letterSpacing: TRACK.wordmarkSub,
          textTransform: "uppercase",
          color: subColor,
          lineHeight: 1,
          paddingLeft: stacked ? 0 : unit * 1.6,
          borderLeft: stacked ? "none" : `1px solid ${creamA(0.18)}`,
        }}
      >
        {WORDMARK.product}
      </span>
    </div>
  );
};
