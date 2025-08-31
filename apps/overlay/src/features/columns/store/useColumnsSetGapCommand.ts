import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import type { IColumns } from "@/features/columns/types";
import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";

export function useColumnsSetGapCommand() {
  const { data: columns } = useColumnsQuery();
  const { execute: executeCommand } = useCommands();
  const updateColumns = useColumnsMutation();

  return {
    execute: (gap: IColumns["gap"]) => {
      const prevGap = columns?.gap;
      const command = new Command(
        "Columns - Set gap",
        () => {
          updateColumns.mutate({
            gap,
          });
        },
        () => {
          updateColumns.mutate({
            gap: prevGap,
          });
        }
      );
      executeCommand(command);
    },
  };
}
