import { useColumnsUpdateMutation } from "@/features/columns/store/useColumnsUpdateMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useToggleColumnsCommand() {
  const executeCommand = useExecuteCommand();
  const updateColumns = useColumnsUpdateMutation();

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
