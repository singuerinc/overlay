import type { ITool } from "@/features/tools/ITool";

export const GridPattern = ["dots", "lines"] as const;

export type IGridPattern = (typeof GridPattern)[number];

export interface IGrid extends ITool<"grid"> {
  visible: boolean;
  gapX: number;
  gapY: number;
  pattern: IGridPattern;
}

export type IGridStore = IGrid;
