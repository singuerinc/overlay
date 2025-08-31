import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useRulerMutation } from "@/features/rulers/store/useRulerMutation";

export function useRulerToggleCommand() {
  const executeCommand = useCommandExecute();
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
