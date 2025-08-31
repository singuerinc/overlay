import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useCrosshairMutation } from "@/features/crosshair/store/useCrosshairMutation";

export function useCrosshairToggleCommand() {
  const { execute: executeCommand } = useCommands();
  const updateCrosshair = useCrosshairMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        "Crosshair - Toggle visibility",
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
      executeCommand(command);
    },
  };
}
