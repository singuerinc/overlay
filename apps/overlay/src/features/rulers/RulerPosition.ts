export const RulerPosition = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;
export type RulerPositionType = (typeof RulerPosition)[number];
