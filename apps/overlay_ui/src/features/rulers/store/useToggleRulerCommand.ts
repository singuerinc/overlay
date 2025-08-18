import {
  useRulerSetPositionX,
  useRulerSetPositionY,
} from "@/features/rulers/store/rulerStore";
import { useToggleRulerMutation } from "@/features/rulers/store/useToggleRulerMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useToggleRulerCommand() {
  const executeCommand = useExecuteCommand();
  const toggleRuler = useToggleRulerMutation();
  const setRulerPositionX = useRulerSetPositionX();
  const setRulerPositionY = useRulerSetPositionY();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
          setRulerPositionX(null);
          setRulerPositionY(null);
          toggleRuler.mutate({
            visible,
          });
        },
        () => {
          toggleRuler.mutate({
            visible: !visible,
          });
        }
      );
      executeCommand(command, true);
    },
  };
}
