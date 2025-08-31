import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import type { IColumns } from "@/features/columns/types";
import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";

export function useColumnsSetNumCommand() {
  const executeCommand = useCommandExecute();
  const updateColumns = useColumnsMutation();

  return {
    execute: (numColumns: IColumns["numColumns"]) => {
      const command = new Command(
        "Columns - Set number of columns",
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
