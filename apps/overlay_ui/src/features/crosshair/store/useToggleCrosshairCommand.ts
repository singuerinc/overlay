import { useToggleCrosshairMutation } from "@/features/crosshair/store/useToggleCrosshairMutation";
import {
  useRulerSetPositionX,
  useRulerSetPositionY,
} from "@/features/rulers/store/rulerStore";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useToggleCrosshairCommand() {
  const executeCommand = useExecuteCommand();
  const toggleCrosshair = useToggleCrosshairMutation();
  const setRulePositionX = useRulerSetPositionX();
  const setRulePositionY = useRulerSetPositionY();

  return {
    execute: (visible: boolean) => {
      console.log("toggle");
      const command = new Command(
        () => {
          setRulePositionX(null);
          setRulePositionY(null);
          toggleCrosshair.mutate({
            visible,
          });
        },
        () => {
          toggleCrosshair.mutate({
            visible: !visible,
          });
        }
      );
      executeCommand(command, true);
    },
  };
}
