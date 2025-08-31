import { createGrid } from "@/features/grid/store/createGrid";
import { GRID_KEYS } from "@/features/grid/store/gridKeys";
import type { IGridStore } from "@/features/grid/types";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import type { IPreset } from "@/features/preset/types";
import { useQuery } from "@tanstack/react-query";

export function getGrid(presetId: IPreset["id"]): Promise<IGridStore> {
  return new Promise((resolve) => {
    const maybeGrid = localStorage.getItem(GRID_KEYS.grid(presetId).join("-"));

    if (maybeGrid === null) {
      const grid = createGrid();
      localStorage.setItem(
        GRID_KEYS.grid(presetId).join("-"),
        JSON.stringify(grid)
      );
      resolve(grid);
    } else {
      resolve(JSON.parse(maybeGrid));
    }
  });
}

export function useGridQuery() {
  const presetId = usePresetActiveId();
  return useQuery({
    queryKey: GRID_KEYS.grid(presetId),
    queryFn: () => getGrid(presetId),
  });
}
