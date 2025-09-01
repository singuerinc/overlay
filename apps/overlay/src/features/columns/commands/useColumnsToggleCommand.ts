import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import type { IColumns } from "@/features/columns/types";
import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";

export function useColumnsToggleCommand() {
  const { execute: executeCommand } = useCommands();
  const updateColumns = useColumnsMutation();

  return {
    execute: (visible: IColumns["visible"]) => {
      const command = new Command(
        "Columns - Toggle visibility",
        () =>
          updateColumns.mutateAsync({
            visible,
          }),
        () =>
          updateColumns.mutateAsync({
            visible: !visible,
          })
      );
      return executeCommand(command);
    },
  };
}
