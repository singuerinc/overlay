import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useUpdateRulerMutation } from "@/features/rulers/store/useUpdateRulerMutation";

export function useSetOriginRulerCommand() {
  const executeCommand = useExecuteCommand();
  const updateRuler = useUpdateRulerMutation();

  return {
    execute: (originX: number, originY: number) => {
      const { originX: prevOriginX, originY: prevOriginY } = {
        originX,
        originY,
      };
      const command = new Command(
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
