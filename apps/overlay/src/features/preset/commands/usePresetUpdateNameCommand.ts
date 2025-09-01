import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { usePresetMutation } from "@/features/preset/store/usePresetMutation";
import { type IPreset } from "../types";

export function usePresetUpdateNameCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = usePresetMutation();

  return {
    execute: (preset: IPreset, newName: string) => {
      const prevName = preset.name;
      const command = new Command(
        "Presets - Update name",
        () =>
          mutation.mutateAsync({
            id: preset.id,
            name: newName,
          }),
        () =>
          mutation.mutateAsync({
            id: preset.id,
            name: prevName,
          })
      );
      executeCommand(command, true);
    },
  };
}
