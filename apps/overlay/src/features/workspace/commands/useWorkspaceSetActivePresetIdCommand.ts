import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import type { IPreset } from "@/features/preset/types";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";

export function useWorkspaceSetActivePresetIdCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useWorkspaceMutation();

  return {
    execute: (presetId: IPreset["id"]) => {
      const command = new Command(
        "Workspace - Set active preset",
        () =>
          mutation.mutateAsync({
            activePresetId: presetId,
          }),
        () => Promise.resolve(void 0)
      );
      executeCommand(command, true);
    },
  };
}
