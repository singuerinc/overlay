import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useRulerMutation } from "@/features/rulers/store/useRulerMutation";

export function useRulerToggleCommand() {
  const { execute: executeCommand } = useCommands();
  const updateRuler = useRulerMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        "Ruler - Toggle visibility",
        () => {
          updateRuler.mutate({
            visible,
          });
        },
        () => {
          updateRuler.mutate({
            visible: !visible,
          });
        }
      );
      executeCommand(command);
    },
  };
}
