import { useUpdateRulerMutation } from "@/features/rulers/store/useUpdateRulerMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useToggleRulerCommand() {
  const executeCommand = useExecuteCommand();
  const updateRuler = useUpdateRulerMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
          updateRuler.mutate({
            visible,
          });
        },
        () => {
          updateRuler.mutate({
            visible: !visible,
          });
        }
      );
      executeCommand(command, true);
    },
  };
}
