import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { usePresetAddMutation } from "@/features/preset/store/usePresetAddMutation";
import { type IPreset } from "../types";

export function usePresetAddCommand() {
  const { execute: executeCommand } = useCommands();
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
