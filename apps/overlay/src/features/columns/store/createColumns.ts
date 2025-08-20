import type { IColumns } from "@/features/columns/types";

export function createColumns(
  props?: Partial<Exclude<IColumns, "id" | "type" | "visible">>
): IColumns {
  return {
    id: "columns",
    type: "columns",
    visible: true,
    size: props?.size ?? 4 * 12,
    gap: props?.gap ?? 4,
    numColumns: props?.numColumns ?? 12,
  };
}
