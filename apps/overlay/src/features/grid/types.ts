import type { ITool } from "@/features/tools/ITool";

export interface IGrid extends ITool {
  visible: boolean;
  gapX: number;
  gapY: number;
}

export type IGridStore = IGrid;
