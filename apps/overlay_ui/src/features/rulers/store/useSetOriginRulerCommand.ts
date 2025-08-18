import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useSetOriginRulerMutation } from "@/features/rulers/store/useSetOriginRulerMutation";

export function useSetOriginRulerCommand() {
  const executeCommand = useExecuteCommand();
  const setOriginRuler = useSetOriginRulerMutation();

  return {
    execute: (originX: number, originY: number) => {
      const { originX: prevOriginX, originY: prevOriginY } = {
        originX,
        originY,
      };
      const command = new Command(
        () => {
          setOriginRuler.mutate({
            originX: originX,
            originY: originY,
          });
        },
        () => {
          setOriginRuler.mutate({
            originX: prevOriginX,
            originY: prevOriginY,
          });
        }
      );
      executeCommand(command);
    },
  };
}
