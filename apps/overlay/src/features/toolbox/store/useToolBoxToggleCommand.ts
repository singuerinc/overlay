import { useToolBoxMutation } from "@/features/toolbox/store/useToolBoxMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useToolBoxToggleCommand() {
  const executeCommand = useExecuteCommand();
  const mutation = useToolBoxMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
          mutation.mutate({
            visible,
          });
        },
        () => {
          mutation.mutate({
            visible: !visible,
          });
        }
      );
      executeCommand(command, true);
    },
  };
}
