import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useRulerMutation } from "@/features/rulers/store/useRulerMutation";
import type { IRuler } from "@/features/rulers/types";

export function useRulerSetPositionCommand() {
  const { execute: executeCommand } = useCommands();
  const updateRuler = useRulerMutation();

  return {
    execute: (position: IRuler["position"]) => {
      const command = new Command(
        "Ruler - Set position",
        () =>
          updateRuler.mutateAsync({
            position,
          }),
        () =>
          updateRuler.mutateAsync({
            position,
          })
      );
      return executeCommand(command);
    },
  };
}
