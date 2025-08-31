import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useRulerMutation } from "@/features/rulers/store/useRulerMutation";
import type { IRuler } from "@/features/rulers/types";

export function useRulerSetPositionCommand() {
  const executeCommand = useCommandExecute();
  const updateRuler = useRulerMutation();

  return {
    execute: (position: IRuler["position"]) => {
      const command = new Command(
        "Ruler - Set position",
        () => {
          updateRuler.mutate({
            position,
          });
        },
        () => {
          updateRuler.mutate({
            position,
          });
        }
      );
      executeCommand(command);
    },
  };
}
