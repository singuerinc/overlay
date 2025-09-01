import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useToolBoxMutation } from "@/features/toolbox/store/useToolBoxMutation";

export function useToolBoxMoveCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useToolBoxMutation();

  return {
    execute: (x: number, y: number) => {
      const command = new Command(
        "Toolbox - Move",
        () =>
          mutation.mutateAsync({
            x,
            y,
          }),
        () => Promise.resolve(void 0)
      );
      executeCommand(command, true);
    },
  };
}
