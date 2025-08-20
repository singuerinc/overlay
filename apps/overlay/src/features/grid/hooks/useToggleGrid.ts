import { useGetGridQuery } from "@/features/grid/store/useGetGridQuery";
import { useToggleGridCommand } from "@/features/grid/store/useToggleGridCommand";
import { useCallback } from "react";

export function useToggleGrid() {
  const { data: grid } = useGetGridQuery();
  const toggleGridCommand = useToggleGridCommand();
  const toggleGrid = useCallback(() => {
    if (grid) {
      toggleGridCommand.execute(!grid.visible);
    }
  }, [grid, toggleGridCommand]);

  return { toggleGrid };
}
