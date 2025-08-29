import type { ITool } from "@/features/tools/ITool";

export interface IColumns extends ITool<"columns"> {
  visible: boolean;
  opacity: number;
  numColumns: number;
  size: `${number}%` | `${number}px`;
  gap: number;
}

export type IColumnsStore = IColumns;
