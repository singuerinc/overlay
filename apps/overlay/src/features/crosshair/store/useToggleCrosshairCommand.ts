import { useToggleCrosshairMutation } from "@/features/crosshair/store/useToggleCrosshairMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useToggleCrosshairCommand() {
  const executeCommand = useExecuteCommand();
  const toggleCrosshair = useToggleCrosshairMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
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
