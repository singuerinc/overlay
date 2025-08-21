import { useGridMutation } from "@/features/grid/store/useGridMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useGridToggleCommand() {
  const executeCommand = useExecuteCommand();
  const updateGrid = useGridMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
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
      executeCommand(command, true);
    },
  };
}
