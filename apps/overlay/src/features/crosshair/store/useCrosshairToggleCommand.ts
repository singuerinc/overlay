import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useCrosshairMutation } from "@/features/crosshair/store/useCrosshairMutation";

export function useCrosshairToggleCommand() {
  const executeCommand = useCommandExecute();
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
