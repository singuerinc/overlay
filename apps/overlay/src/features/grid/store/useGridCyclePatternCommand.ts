import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useGridMutation } from "@/features/grid/store/useGridMutation";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { type IGridPattern } from "@/features/grid/types";

export function useGridCyclePatternCommand() {
  const { data: grid } = useGridQuery();
  const executeCommand = useCommandExecute();
  const updateGrid = useGridMutation();

  const patterns = ["dots", "lines"];

  return {
    execute: () => {
      if (!grid) return;

      const prevPattern = grid.pattern;
      const nextPattern = patterns[
        (patterns.indexOf(prevPattern) + 1) % patterns.length
      ] as IGridPattern;

      const command = new Command(
        "Grid - Cycle pattern",
        () => {
          updateGrid.mutate({
            pattern: nextPattern,
          });
        },
        () => {
          updateGrid.mutate({
            pattern: prevPattern,
          });
        }
      );
      executeCommand(command);
    },
  };
}
