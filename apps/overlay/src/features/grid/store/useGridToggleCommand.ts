import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useGridMutation } from "@/features/grid/store/useGridMutation";

export function useGridToggleCommand() {
  const executeCommand = useCommandExecute();
  const updateGrid = useGridMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
          updateGrid.mutate({
            visible,
          });
        },
        () => {
          updateGrid.mutate({
            visible: !visible,
          });
        }
      );
      executeCommand(command, true);
    },
  };
}
