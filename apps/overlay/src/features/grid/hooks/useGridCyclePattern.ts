import { useGridCyclePatternCommand } from "@/features/grid/store/useGridCyclePatternCommand";
import { useCallback } from "react";

export function useGridCyclePattern() {
  const cmd = useGridCyclePatternCommand();

  const cycle = useCallback(() => {
    cmd.execute();
  }, [cmd]);

  return { cycle };
}
