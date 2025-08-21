import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useUpdateRulerMutation } from "@/features/rulers/store/useUpdateRulerMutation";
import type { IRuler } from "@/features/rulers/types";

export function useSetPositionRulerCommand() {
  const executeCommand = useExecuteCommand();
  const updateRuler = useUpdateRulerMutation();

  return {
    execute: (position: IRuler["position"]) => {
      const command = new Command(
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
