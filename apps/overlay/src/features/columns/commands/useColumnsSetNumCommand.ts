import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import type { IColumns } from "@/features/columns/types";
import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";

export function useColumnsSetNumCommand() {
  const { execute: executeCommand } = useCommands();
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
