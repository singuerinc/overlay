import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { useGridToggleCommand } from "@/features/grid/store/useGridToggleCommand";
import { useCallback } from "react";

export function useGridToggle() {
  const { data: grid } = useGridQuery();
  const toggleCommand = useGridToggleCommand();
  const toggle = useCallback(() => {
    if (grid) {
      toggleCommand.execute(!grid.visible);
    }
  }, [grid, toggleCommand]);

  return { toggle };
}
