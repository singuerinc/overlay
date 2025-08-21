import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import type { CrosshairColorType } from "@/features/crosshair/CrosshairColor";
import { useCrosshairMutation } from "@/features/crosshair/store/useCrosshairMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type ICrosshair } from "../types";

export function useCrosshairColorCommand() {
  const executeCommand = useExecuteCommand();
  const updateCrosshair = useCrosshairMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (crosshair: ICrosshair, color: CrosshairColorType) => {
      const prevColor = crosshair.color;
      const command = new Command(
        () => {
          updateCrosshair.mutate({
            color,
          });
        },
        () => {
          updateCrosshair.mutate({
            color: prevColor,
          });
          setSelectedTool(crosshair);
        }
      );
      executeCommand(command);
    },
  };
}
