export const GridColors = ["cyan", "red", "green", "neutral"] as const;
export type GridColorType = (typeof GridColors)[number];
