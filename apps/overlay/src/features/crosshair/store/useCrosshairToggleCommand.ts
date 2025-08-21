import { useCrosshairMutation } from "@/features/crosshair/store/useCrosshairMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useCrosshairToggleCommand() {
  const executeCommand = useExecuteCommand();
  const updateCrosshair = useCrosshairMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
          updateCrosshair.mutate({
            visible,
          });
        },
        () => {
          updateCrosshair.mutate({
            visible: !visible,
          });
        }
      );
      executeCommand(command, true);
    },
  };
}
