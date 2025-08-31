import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import type { IColumns } from "@/features/columns/types";
import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";

export function useColumnsSetSizeCommand() {
  const { data: columns } = useColumnsQuery();
  const executeCommand = useCommandExecute();
  const updateColumns = useColumnsMutation();

  return {
    execute: (size: IColumns["size"]) => {
      const prevSize = columns?.size;
      const command = new Command(
        "Columns - Set size",
        () => {
          updateColumns.mutate({
            size,
          });
        },
        () => {
          updateColumns.mutate({
            size: prevSize,
          });
        }
      );
      executeCommand(command);
    },
  };
}
