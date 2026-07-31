/**
 * Large combined-score readout. Caller passes an already-eased `value`; this
 * only renders. Tabular figures so digits don't jitter as they climb.
 */
import { COLORS, FONT_FAMILY, TRACK, WEIGHT } from "../theme/tokens";
import { CONVERGENCE } from "../theme/strings";

export const ScoreCounter: React.FC<{
  value: number; // 0..100, already eased
  unit: number;
  color?: string;
  showOutOf?: boolean;
}> = ({ value, unit, color = COLORS.cream, showOutOf = true }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: unit * 0.8 }}>
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontWeight: WEIGHT.black,
        fontSize: unit * 14,
        letterSpacing: TRACK.displayTight,
        color,
        lineHeight: 0.9,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {Math.round(value)}
    </span>
    {showOutOf ? (
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: WEIGHT.light,
          fontSize: unit * 4,
          letterSpacing: TRACK.tight,
          color: COLORS.dim,
          lineHeight: 1,
        }}
      >
        / {CONVERGENCE.scoreOutOf}
      </span>
    ) : null}
  </div>
);
