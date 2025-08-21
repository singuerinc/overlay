import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";

export function useColumnsSetGapCommand() {
  const executeCommand = useCommandExecute();
  const updateColumns = useColumnsMutation();

  return {
    execute: (gap: number) => {
      const command = new Command(
        () => {
          updateColumns.mutate({
            gap,
          });
        },
        () => {}
      );
      executeCommand(command, true);
    },
  };
}
