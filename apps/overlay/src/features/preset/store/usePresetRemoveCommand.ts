import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { usePresetRemoveMutation } from "@/features/preset/store/usePresetRemoveMutation";
import { type IPreset } from "../types";

export function usePresetRemoveCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = usePresetRemoveMutation();

  return {
    execute: (preset: IPreset) => {
      const command = new Command(
        "Presets - Remove",
        () => {
          mutation.mutate({ preset });
        },
        () => {
          //
        }
      );
      executeCommand(command, true);
    },
  };
}
