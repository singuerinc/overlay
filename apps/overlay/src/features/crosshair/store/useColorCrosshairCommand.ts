import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import type { CrosshairColorType } from "@/features/crosshair/CrosshairColor";
import { useUpdateCrosshairMutation } from "@/features/crosshair/store/useUpdateCrosshairMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type ICrosshair } from "../types";

export function useColorCrosshairCommand() {
  const executeCommand = useExecuteCommand();
  const updateCrosshair = useUpdateCrosshairMutation();
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
