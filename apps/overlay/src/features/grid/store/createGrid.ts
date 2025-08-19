import type { IGrid } from "@/features/grid/types";

export function createGrid(gapX: number, gapY: number): IGrid {
  return {
    id: "grid",
    type: "grid",
    visible: true,
    gapX,
    gapY,
  };
}
