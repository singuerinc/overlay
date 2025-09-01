import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { usePresetAddMutation } from "@/features/preset/store/usePresetAddMutation";
import type { IPreset } from "@/features/preset/types";

export function useWorkspaceAddPresetCommand() {
  const { execute: executeCommand } = useCommands();
  const addPresetMutation = usePresetAddMutation();

  return {
    execute: (preset: IPreset) => {
      const command = new Command(
        "Workspace - Add preset",
        () =>
          addPresetMutation.mutateAsync({
            preset,
          }),
        () => Promise.resolve(void 0)
      );
      executeCommand(command, true);
    },
  };
}
