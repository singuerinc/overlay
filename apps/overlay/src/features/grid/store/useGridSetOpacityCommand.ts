import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useGridMutation } from "@/features/grid/store/useGridMutation";
import { useGridQuery } from "@/features/grid/store/useGridQuery";

export function useGridSetOpacityCommand() {
  const { data: grid } = useGridQuery();
  const executeCommand = useCommandExecute();
  const updateGrid = useGridMutation();

  return {
    execute: (opacity: number) => {
      if (!grid) return;

      const command = new Command(
        () => {
          updateGrid.mutate({
            opacity,
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
