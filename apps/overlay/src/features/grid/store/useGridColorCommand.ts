import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useGridMutation } from "@/features/grid/store/useGridMutation";
import { type GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { type IGrid } from "../types";

export function useGridColorCommand() {
  const executeCommand = useCommandExecute();
  const mutation = useGridMutation();

  return {
    execute: (grid: IGrid, color: GuidelineColorType) => {
      const prevColor = grid.color;
      const command = new Command(
        "Grid - Change color",
        () => {
          mutation.mutate({
            color,
          });
        },
        () => {
          mutation.mutate({
            id: grid.id,
            color: prevColor,
          });
        }
      );
      executeCommand(command);
    },
  };
}
