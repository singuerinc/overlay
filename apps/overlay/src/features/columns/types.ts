import type { ColumnsColorType } from "@/features/columns/ColumnsColor";
import type { ITool } from "@/features/tools/ITool";

export interface IColumns extends ITool<"columns"> {
  visible: boolean;
  opacity: number;
  numColumns: number;
  size: `${number}%` | `${number}px`;
  gap: number;
  color: ColumnsColorType;
}

export type IColumnsStore = IColumns;
