import { useUpdateGridMutation } from "@/features/grid/store/useUpdateGridMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useToggleGridCommand() {
  const executeCommand = useExecuteCommand();
  const updateGrid = useUpdateGridMutation();

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
