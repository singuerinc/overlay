import { useGridCyclePatternCommand } from "@/features/grid/store/useGridCyclePatternCommand";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { useGridSetGapCommand } from "@/features/grid/store/useGridSetGapCommand";
import { useGridSetOpacityCommand } from "@/features/grid/store/useGridSetOpacityCommand";
import { useGridToggleCommand } from "@/features/grid/store/useGridToggleCommand";

export function useGrid() {
  const { data: grid } = useGridQuery();
  const toggleCmd = useGridToggleCommand();
  const setOpacityCmd = useGridSetOpacityCommand();
  const cyclePatternCmd = useGridCyclePatternCommand();
  const setGapCmd = useGridSetGapCommand();

  return {
    toggle: () => {
      if (grid) {
        toggleCmd.execute(!grid.visible);
      }
    },
    setOpacity: setOpacityCmd.execute,
    cyclePattern: cyclePatternCmd.execute,
    setGap: setGapCmd.execute,
  };
}
