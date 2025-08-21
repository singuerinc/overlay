import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useColumnsSetNumCommand() {
  const executeCommand = useExecuteCommand();
  const updateColumns = useColumnsMutation();

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
