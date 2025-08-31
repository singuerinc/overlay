import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useToolBoxMutation } from "@/features/toolbox/store/useToolBoxMutation";

export function useToolBoxToggleCommand() {
  const { execute: executeCommand } = useCommands();
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
