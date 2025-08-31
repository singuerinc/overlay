import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useRulerMutation } from "@/features/rulers/store/useRulerMutation";

export function useRulerSetOriginCommand() {
  const executeCommand = useCommandExecute();
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
