import { useActiveFrameId } from "@/appStore";
import { createGrid } from "@/features/grid/store/createGrid";
import { GRID_KEYS } from "@/features/grid/store/gridKeys";
import type { IGridStore } from "@/features/grid/types";
import { useQuery } from "@tanstack/react-query";

function getGrid(frameId: string): Promise<IGridStore> {
  return new Promise((resolve) => {
    const maybeGrid = localStorage.getItem(GRID_KEYS.grid(frameId).join("-"));

    if (maybeGrid === null) {
      const grid = createGrid();
      localStorage.setItem(
        GRID_KEYS.grid(frameId).join("-"),
        JSON.stringify(grid)
      );
      resolve(grid);
    } else {
      resolve(JSON.parse(maybeGrid));
    }
  });
}

export function useGridQuery() {
  const frameId = useActiveFrameId();
  return useQuery({
    queryKey: GRID_KEYS.grid(frameId),
    queryFn: () => getGrid(frameId),
  });
}
