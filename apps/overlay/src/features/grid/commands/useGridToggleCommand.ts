import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useGridMutation } from "@/features/grid/store/useGridMutation";

export function useGridToggleCommand() {
  const { execute: executeCommand } = useCommands();
  const updateGrid = useGridMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        "Grid - Toggle visibility",
        () => {
          updateGrid.mutate({
            visible,
          });
        },
        () => {
          updateGrid.mutate({
            visible: !visible,
          });
        }
      );
      executeCommand(command);
    },
  };
}
