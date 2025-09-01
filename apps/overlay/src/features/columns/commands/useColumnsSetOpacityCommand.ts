import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import type { IColumns } from "@/features/columns/types";
import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";

export function useColumnsSetOpacityCommand() {
  const { data: columns } = useColumnsQuery();
  const { execute: executeCommand } = useCommands();
  const updateColumns = useColumnsMutation();

  return {
    execute: (opacity: IColumns["opacity"]) => {
      const prevOpacity = columns?.opacity;
      const command = new Command(
        "Columns - Set opacity",
        () =>
          updateColumns.mutateAsync({
            opacity,
          }),

        () =>
          updateColumns.mutateAsync({
            opacity: prevOpacity,
          })
      );
      return executeCommand(command);
    },
  };
}
