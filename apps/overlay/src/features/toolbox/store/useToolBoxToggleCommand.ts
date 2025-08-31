import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useToolBoxMutation } from "@/features/toolbox/store/useToolBoxMutation";

export function useToolBoxToggleCommand() {
  const executeCommand = useCommandExecute();
  const mutation = useToolBoxMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        "Toolbox - Toggle visibility",
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
