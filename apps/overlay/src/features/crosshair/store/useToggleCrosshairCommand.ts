import { useToggleCrosshairMutation } from "@/features/crosshair/store/useToggleCrosshairMutation";
import type { ICrosshair } from "@/features/crosshair/types";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";
import { useSetSelectedTool } from "../../../features/tools/store/tools";

export function useToggleCrosshairCommand() {
  const setSelectedTool = useSetSelectedTool();
  const executeCommand = useExecuteCommand();
  const toggleCrosshair = useToggleCrosshairMutation();

  return {
    execute: (crosshair: ICrosshair, visible: boolean) => {
      const command = new Command(
        () => {
          toggleCrosshair.mutate({
            id: crosshair.id,
            visible,
          });
          setSelectedTool(visible ? crosshair : null);
        },
        () => {
          toggleCrosshair.mutate({
            id: crosshair.id,
            visible: !visible,
          });
          setSelectedTool(!visible ? null : crosshair);
        }
      );
      executeCommand(command);
    },
  };
}
