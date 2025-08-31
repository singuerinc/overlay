import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { GridColors } from "@/features/grid/GridColor";
import { useGridMutation } from "@/features/grid/store/useGridMutation";
import { type IGrid } from "../types";

export function useGridCycleColorCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useGridMutation();

  return {
    execute: (grid: IGrid) => {
      const prevColor = grid.color;
      const command = new Command(
        "Grid - Change color",
        () => {
          const newColor =
            GridColors[
              (GridColors.indexOf(grid.color) + 1) % GridColors.length
            ];
          mutation.mutate({
            color: newColor,
          });
        },
        () => {
          mutation.mutate({
            id: grid.id,
            color: prevColor,
          });
        }
      );
      executeCommand(command);
    },
  };
}
