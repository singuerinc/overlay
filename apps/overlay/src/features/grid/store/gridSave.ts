import { GRID_KEYS } from "@/features/grid/store/gridKeys";
import type { IGridStore } from "@/features/grid/types";

export async function gridSave(presetId: string, grid: IGridStore) {
  localStorage.setItem(
    GRID_KEYS.grid(presetId).join("-"),
    JSON.stringify(grid)
  );
}
