import type { IGrid } from "@/features/grid/types";

export function createGrid(
  props?: Partial<Exclude<IGrid, "id" | "type" | "visible">>
): IGrid {
  return {
    id: "grid",
    type: "grid",
    visible: true,
    gapX: props?.gapX ?? 16,
    gapY: props?.gapY ?? 16,
  };
}
