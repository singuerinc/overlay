import { useToolBoxMutation } from "@/features/toolbox/store/useToolBoxMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useToolBoxMoveCommand() {
  const executeCommand = useExecuteCommand();
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
