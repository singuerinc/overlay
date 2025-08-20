import { useToggleRulerMutation } from "@/features/rulers/store/useToggleRulerMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useToggleRulerCommand() {
  const executeCommand = useExecuteCommand();
  const toggleRuler = useToggleRulerMutation();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
          toggleRuler.mutate({
            visible,
          });
        },
        () => {
          toggleRuler.mutate({
            visible: !visible,
          });
        }
      );
      executeCommand(command, true);
    },
  };
}
