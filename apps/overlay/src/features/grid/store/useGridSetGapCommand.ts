import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useGridMutation } from "@/features/grid/store/useGridMutation";
import { useGridQuery } from "@/features/grid/store/useGridQuery";

export function useGridSetGapCommand() {
  const { data: grid } = useGridQuery();
  const executeCommand = useCommandExecute();
  const updateGrid = useGridMutation();

  return {
    execute: (gap: number) => {
      if (!grid) return;

      const command = new Command(
        () => {
          updateGrid.mutate({
            gapX: gap,
            gapY: gap,
          });
        },
        () => {
          //
        }
      );
      executeCommand(command, true);
    },
  };
}
