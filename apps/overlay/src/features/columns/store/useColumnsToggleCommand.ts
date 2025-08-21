import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useColumnsToggleCommand() {
  const executeCommand = useExecuteCommand();
  const updateColumns = useColumnsMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
          updateColumns.mutate({
            visible,
          });
        },
        () => {
          updateColumns.mutate({
            visible: !visible,
          });
        }
      );
      executeCommand(command, true);
    },
  };
}
