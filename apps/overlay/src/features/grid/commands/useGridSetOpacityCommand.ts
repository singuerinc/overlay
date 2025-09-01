import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useGridMutation } from "@/features/grid/store/useGridMutation";
import { useGridQuery } from "@/features/grid/store/useGridQuery";

export function useGridSetOpacityCommand() {
  const { data: grid } = useGridQuery();
  const { execute: executeCommand } = useCommands();
  const updateGrid = useGridMutation();

  return {
    execute: (opacity: number) => {
      if (!grid) return;

      const prevOpacity = grid.opacity;
      const command = new Command(
        "Grid - Set opacity",
        () =>
          updateGrid.mutateAsync({
            opacity,
          }),
        () =>
          updateGrid.mutateAsync({
            opacity: prevOpacity,
          })
      );
      return executeCommand(command);
    },
  };
}
