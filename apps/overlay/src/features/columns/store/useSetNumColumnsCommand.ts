import { useColumnsUpdateMutation } from "@/features/columns/store/useColumnsUpdateMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useSetNumColumnsCommand() {
  const executeCommand = useExecuteCommand();
  const updateColumns = useColumnsUpdateMutation();

  return {
    execute: (numColumns: number) => {
      const command = new Command(
        () => {
          updateColumns.mutate({
            numColumns,
          });
        },
        () => {
          updateColumns.mutate({
            numColumns: -numColumns,
          });
        }
      );
      executeCommand(command);
    },
  };
}
