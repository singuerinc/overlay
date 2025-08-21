import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useToolBoxMutation } from "@/features/toolbox/store/useToolBoxMutation";

export function useToolBoxMoveCommand() {
  const executeCommand = useCommandExecute();
  const mutation = useToolBoxMutation();

  return {
    execute: (x: number, y: number) => {
      const command = new Command(
        () => {
          mutation.mutate({
            x,
            y,
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
