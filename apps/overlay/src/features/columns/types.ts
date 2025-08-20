import type { ITool } from "@/features/tools/ITool";

export interface IColumns extends ITool<"columns"> {
  visible: boolean;
  numColumns: number;
  size: number;
  gap: number;
}

export type IColumnsStore = IColumns;
