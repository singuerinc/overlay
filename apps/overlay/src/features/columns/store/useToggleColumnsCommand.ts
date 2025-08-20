import { useToggleColumnsMutation } from "@/features/columns/store/useToggleColumnsMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useToggleColumnsCommand() {
  const executeCommand = useExecuteCommand();
  const toggleColumns = useToggleColumnsMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
          toggleColumns.mutate({
            visible,
          });
        },
        () => {
          toggleColumns.mutate({
            visible: !visible,
          });
        }
      );
      executeCommand(command, true);
    },
  };
}
