import { GridColors } from "@/features/grid/GridColor";
import { type IGrid } from "@/features/grid/types";

export function createGrid(
  props?: Partial<Exclude<IGrid, "id" | "type" | "visible">>
): IGrid {
  return {
    id: "grid",
    type: "grid",
    visible: true,
    color: props?.color ?? GridColors[0],
    opacity: props?.opacity ?? 0.2,
    gapX: props?.gapX ?? 16,
    gapY: props?.gapY ?? 16,
    pattern: props?.pattern ?? "dots",
  };
}
