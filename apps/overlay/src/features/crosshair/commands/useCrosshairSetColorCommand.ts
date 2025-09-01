import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import type { CrosshairColorType } from "@/features/crosshair/CrosshairColor";
import { useCrosshairMutation } from "@/features/crosshair/store/useCrosshairMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type ICrosshair } from "../types";

export function useCrosshairSetColorCommand() {
  const { execute: executeCommand } = useCommands();
  const updateCrosshair = useCrosshairMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (crosshair: ICrosshair, color: CrosshairColorType) => {
      const prevColor = crosshair.color;
      const command = new Command(
        "Crosshair - Change Color",
        () =>
          updateCrosshair.mutateAsync({
            color,
          }),
        () =>
          updateCrosshair
            .mutateAsync({
              color: prevColor,
            })
            .then(() => {
              setSelectedTool(crosshair);
            })
      );
      return executeCommand(command);
    },
  };
}
