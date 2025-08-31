import type { GridColorType } from "@/features/grid/GridColor";
import type { ITool } from "@/features/tools/ITool";

export const GridPattern = ["dots", "lines", "both"] as const;

export type IGridPattern = (typeof GridPattern)[number];

export interface IGrid extends ITool<"grid"> {
  visible: boolean;
  opacity: number;
  color: GridColorType;
  gapX: number;
  gapY: number;
  pattern: IGridPattern;
}

export type IGridStore = IGrid;
