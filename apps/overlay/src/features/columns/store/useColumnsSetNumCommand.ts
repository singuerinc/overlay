import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";

export function useColumnsSetNumCommand() {
  const executeCommand = useCommandExecute();
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
