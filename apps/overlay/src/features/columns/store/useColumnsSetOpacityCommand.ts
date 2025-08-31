import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import type { IColumns } from "@/features/columns/types";
import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";

export function useColumnsSetOpacityCommand() {
  const { data: columns } = useColumnsQuery();
  const executeCommand = useCommandExecute();
  const updateColumns = useColumnsMutation();

  return {
    execute: (opacity: IColumns["opacity"]) => {
      const prevOpacity = columns?.opacity;
      const command = new Command(
        "Columns - Set opacity",
        () => {
          updateColumns.mutate({
            opacity,
          });
        },
        () => {
          updateColumns.mutate({
            opacity: prevOpacity,
          });
        }
      );
      executeCommand(command);
    },
  };
}
