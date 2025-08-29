import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import type { IColumns } from "@/features/columns/types";
import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";

export function useColumnsSetOpacityCommand() {
  const executeCommand = useCommandExecute();
  const updateColumns = useColumnsMutation();

  return {
    execute: (opacity: IColumns["opacity"]) => {
      const command = new Command(
        () => {
          updateColumns.mutate({
            opacity,
          });
        },
        () => {}
      );
      executeCommand(command, true);
    },
  };
}
