import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import type { IColumns } from "@/features/columns/types";
import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";

export function useColumnsSetSizeCommand() {
  const executeCommand = useCommandExecute();
  const updateColumns = useColumnsMutation();

  return {
    execute: (size: IColumns["size"]) => {
      const command = new Command(
        () => {
          updateColumns.mutate({
            size,
          });
        },
        () => {}
      );
      executeCommand(command, true);
    },
  };
}
