import type { ColumnsColorType } from "@/features/columns/ColumnsColor";
import { useColumnsMutation } from "@/features/columns/store/useColumnsMutation";
import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IColumns } from "../types";

export function useColumnsColorCommand() {
  const { execute: executeCommand } = useCommands();
  const updateColumns = useColumnsMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (columns: IColumns, color: ColumnsColorType) => {
      const prevColor = columns.color;
      const command = new Command(
        "Columns - Change color",
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
