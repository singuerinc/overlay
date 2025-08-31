import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useGridMutation } from "@/features/grid/store/useGridMutation";
import { useGridQuery } from "@/features/grid/store/useGridQuery";

export function useGridSetGapCommand() {
  const { data: grid } = useGridQuery();
  const { execute: executeCommand } = useCommands();
  const updateGrid = useGridMutation();

  return {
    execute: (gap: number) => {
      if (!grid) return;

      const prevGap = grid.gapX;
      const command = new Command(
        "Grid - Set gap",
        () => {
          updateGrid.mutate({
            gapX: gap,
            gapY: gap,
          });
        },
        () => {
          updateGrid.mutate({
            gapX: prevGap,
            gapY: prevGap,
          });
        }
      );
      executeCommand(command);
    },
  };
}
