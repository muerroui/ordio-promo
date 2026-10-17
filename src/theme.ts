import type { CSSProperties } from "react";

export const colors = {
  bg: "#07111F",
  bgSoft: "#0D1B2E",
  panel: "rgba(16, 32, 52, 0.94)",
  line: "rgba(255,255,255,0.10)",
  text: "#F8FAFC",
  muted: "#91A4BC",
  blue: "#4F7CFF",
  purple: "#8B5CF6",
  red: "#FF4D67",
  green: "#32D583",
  amber: "#FDB022",
} as const;

export const arabicFont =
  '"Noto Sans Arabic", "Noto Kufi Arabic", Tahoma, Arial, sans-serif';

export const fullScreen: CSSProperties = {
  background: colors.bg,
  color: colors.text,
  fontFamily: arabicFont,
  overflow: "hidden",
};

export const glass: CSSProperties = {
  background: colors.panel,
  border: `1px solid ${colors.line}`,
  boxShadow: "0 30px 90px rgba(0,0,0,.34)",
  backdropFilter: "blur(18px)",
};
