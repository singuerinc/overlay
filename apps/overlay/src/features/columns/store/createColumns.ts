import { ColumnsColor } from "@/features/columns/ColumnsColor";
import type { IColumns } from "@/features/columns/types";

export function createColumns(
  props?: Partial<Exclude<IColumns, "id" | "type">>
): IColumns {
  return {
    id: "columns",
    type: "columns",
    visible: true,
    opacity: 0.2,
    size: "920px",
    gap: 4,
    numColumns: 12,
    color: ColumnsColor[0],
    ...props,
  };
}
