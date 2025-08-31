import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { usePresetAddMutation } from "@/features/preset/store/usePresetAddMutation";
import { type IPreset } from "../types";

export function usePresetAddCommand() {
  const executeCommand = useCommandExecute();
  const mutation = usePresetAddMutation();

  return {
    execute: (preset: IPreset) => {
      const command = new Command(
        "Presets - Add one",
        () => {
          mutation.mutate({
            preset,
          });
        },
        () => {
          //
        }
      );
      executeCommand(command, true);
    },
  };
}
