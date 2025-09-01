import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useCrosshairMutation } from "@/features/crosshair/store/useCrosshairMutation";
import type { ICrosshair } from "@/features/crosshair/types";
import { useSetSelectedTool } from "@/features/tools/store/tools";

export function useCrosshairToggleCommand() {
  const setSelectedTool = useSetSelectedTool();
  const { execute: executeCommand } = useCommands();
  const updateCrosshair = useCrosshairMutation();

  return {
    execute: (crosshair: ICrosshair, visible: boolean) => {
      const command = new Command(
        "Crosshair - Toggle visibility",
        () =>
          updateCrosshair
            .mutateAsync({
              visible,
            })
            .then(() => {
              if (visible) {
                setSelectedTool(crosshair);
              }
            }),
        () =>
          updateCrosshair.mutateAsync({
            visible: !visible,
          })
      );
      return executeCommand(command);
    },
  };
}
