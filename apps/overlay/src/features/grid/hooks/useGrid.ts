import { useGridCycleColorCommand } from "@/features/grid/commands/useGridCycleColorCommand";
import { useGridCyclePatternCommand } from "@/features/grid/commands/useGridCyclePatternCommand";
import { useGridSetGapCommand } from "@/features/grid/commands/useGridSetGapCommand";
import { useGridSetOpacityCommand } from "@/features/grid/commands/useGridSetOpacityCommand";
import { useGridToggleCommand } from "@/features/grid/commands/useGridToggleCommand";
import { useGridQuery } from "@/features/grid/store/useGridQuery";

export function useGrid() {
  const { data: grid } = useGridQuery();
  const toggleCmd = useGridToggleCommand();
  const setOpacityCmd = useGridSetOpacityCommand();
  const cyclePatternCmd = useGridCyclePatternCommand();
  const setGapCmd = useGridSetGapCommand();
  const cycleColor = useGridCycleColorCommand();

  return {
    cycleColor: cycleColor.execute,
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
