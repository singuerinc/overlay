import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import type { IColumns } from "@/features/columns/types";
import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";

export function useColumnsToggleCommand() {
  const executeCommand = useCommandExecute();
  const updateColumns = useColumnsMutation();

  return {
    execute: (visible: IColumns["visible"]) => {
      const command = new Command(
        "Columns - Toggle visibility",
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
      executeCommand(command);
    },
  };
}
