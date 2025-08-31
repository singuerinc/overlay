import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useRulerMutation } from "@/features/rulers/store/useRulerMutation";

export function useRulerSetOriginCommand() {
  const { execute: executeCommand } = useCommands();
  const updateRuler = useRulerMutation();

  return {
    execute: (originX: number, originY: number) => {
      const { originX: prevOriginX, originY: prevOriginY } = {
        originX,
        originY,
      };
      const command = new Command(
        "Ruler - Set origin",
        () => {
          updateRuler.mutate({
            originX: originX,
            originY: originY,
          });
        },
        () => {
          updateRuler.mutate({
            originX: prevOriginX,
            originY: prevOriginY,
          });
        }
      );
      executeCommand(command);
    },
  };
}
