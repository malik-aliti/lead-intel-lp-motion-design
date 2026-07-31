/**
 * Uppercase micro-label. The site's voice: tiny, heavy, wide tracking.
 * Defaults match `.src-hd` / `.eng-lbl` (8px-ish, 700, .16em).
 */
import { COLORS, FONT_FAMILY, TRACK, WEIGHT } from "../theme/tokens";

export const Label: React.FC<{
  children: React.ReactNode;
  size?: number;
  weight?: number;
  color?: string;
  tracking?: string;
  uppercase?: boolean;
  style?: React.CSSProperties;
}> = ({
  children,
  size = 13,
  weight = WEIGHT.bold,
  color = COLORS.warm3,
  tracking = TRACK.label,
  uppercase = true,
  style,
}) => (
  <span
    style={{
      fontFamily: FONT_FAMILY,
      fontSize: size,
      fontWeight: weight,
      letterSpacing: tracking,
      textTransform: uppercase ? "uppercase" : "none",
      color,
      lineHeight: 1.4,
      display: "inline-block",
      ...style,
    }}
  >
    {children}
  </span>
);
