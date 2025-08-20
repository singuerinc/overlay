import { useToggleGridMutation } from "@/features/grid/store/useToggleGridMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useToggleGridCommand() {
  const executeCommand = useExecuteCommand();
  const toggleGrid = useToggleGridMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
          toggleGrid.mutate({
            visible,
          });
        },
        () => {
          toggleGrid.mutate({
            visible: !visible,
          });
        }
      );
      executeCommand(command, true);
    },
  };
}
