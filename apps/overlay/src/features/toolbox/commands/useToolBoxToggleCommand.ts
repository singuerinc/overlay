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
        () =>
          mutation.mutateAsync({
            visible,
          }),
        () =>
          mutation.mutateAsync({
            visible: !visible,
          })
      );
      executeCommand(command, true);
    },
  };
}
