import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import type { CrosshairColorType } from "@/features/crosshair/CrosshairColor";
import { useColorCrosshairMutation } from "@/features/crosshair/store/useColorCrosshairMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type ICrosshair } from "../types";

export function useColorCrosshairCommand() {
  const executeCommand = useExecuteCommand();
  const colorCrosshair = useColorCrosshairMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (crosshair: ICrosshair, color: CrosshairColorType) => {
      const prevColor = crosshair.color;
      const command = new Command(
        () => {
          colorCrosshair.mutate({
            id: crosshair.id,
            color,
          });
        },
        () => {
          colorCrosshair.mutate({
            id: crosshair.id,
            color: prevColor,
          });
          setSelectedTool(crosshair);
        }
      );
      executeCommand(command);
    },
  };
}
