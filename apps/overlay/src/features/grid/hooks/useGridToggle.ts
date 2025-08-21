import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { useGridToggleCommand } from "@/features/grid/store/useGridToggleCommand";
import { useCallback } from "react";

export function useGridToggle() {
  const { data: grid } = useGridQuery();
  const cmd = useGridToggleCommand();

  const toggle = useCallback(() => {
    if (grid) {
      cmd.execute(!grid.visible);
    }
  }, [grid, cmd]);

  return { toggle };
}
