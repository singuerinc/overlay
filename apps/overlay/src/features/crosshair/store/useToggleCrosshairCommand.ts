import { useUpdateCrosshairMutation } from "@/features/crosshair/store/useUpdateCrosshairMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useToggleCrosshairCommand() {
  const executeCommand = useExecuteCommand();
  const updateCrosshair = useUpdateCrosshairMutation();

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
