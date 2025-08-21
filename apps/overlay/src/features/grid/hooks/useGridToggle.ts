import { useGetGridQuery } from "@/features/grid/store/useGetGridQuery";
import { useToggleGridCommand } from "@/features/grid/store/useToggleGridCommand";
import { useCallback } from "react";

export function useGridToggle() {
  const { data: grid } = useGetGridQuery();
  const toggleCommand = useToggleGridCommand();
  const toggle = useCallback(() => {
    if (grid) {
      toggleCommand.execute(!grid.visible);
    }
  }, [grid, toggleCommand]);

  return { toggle };
}
