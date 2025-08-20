import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useSetPositionRulerMutation } from "@/features/rulers/store/useSetPositionRulerMutation";
import type { IRuler } from "@/features/rulers/types";

export function useSetPositionRulerCommand() {
  const executeCommand = useExecuteCommand();
  const setPositionRuler = useSetPositionRulerMutation();

  return {
    execute: (position: IRuler["position"]) => {
      const command = new Command(
        () => {
          setPositionRuler.mutate({
            position,
          });
        },
        () => {
          setPositionRuler.mutate({
            position,
          });
        }
      );
      executeCommand(command);
    },
  };
}
