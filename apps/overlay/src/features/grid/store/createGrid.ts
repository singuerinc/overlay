import { GridColors } from "@/features/grid/GridColor";
import { GridPattern, type IGrid } from "@/features/grid/types";

export function createGrid(
  props?: Partial<Exclude<IGrid, "id" | "type">>
): IGrid {
  return {
    id: "grid",
    type: "grid",
    visible: true,
    color: GridColors[0],
    opacity: 1,
    gapX: 16,
    gapY: 16,
    pattern: GridPattern[0],
    ...props,
  };
}
