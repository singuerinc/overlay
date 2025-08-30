export const ColumnsColor = ["neutral", "cyan", "red", "green"] as const;
export type ColumnsColorType = (typeof ColumnsColor)[number];
