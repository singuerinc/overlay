import type { ColumnsColorType } from "@/features/columns/ColumnsColor";
import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IColumns } from "../types";

export function useColumnsColorCommand() {
  const executeCommand = useCommandExecute();
  const updateColumns = useColumnsMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (columns: IColumns, color: ColumnsColorType) => {
      const prevColor = columns.color;
      const command = new Command(
        () => {
          updateColumns.mutate({
            color,
          });
        },
        () => {
          updateColumns.mutate({
            color: prevColor,
          });
          setSelectedTool(columns);
        }
      );
      executeCommand(command);
    },
  };
}
