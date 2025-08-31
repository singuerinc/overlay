import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import type { IPreset } from "@/features/preset/types";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";

export function useWorkspaceSetActivePresetIdCommand() {
  const { data: workspace } = useWorkspaceQuery();
  const { execute: executeCommand } = useCommands();
  const mutation = useWorkspaceMutation();

  return {
    execute: (presetId: IPreset["id"]) => {
      const command = new Command(
        "Workspace - Set active preset",
        () => {
          if (workspace) {
            mutation.mutate({
              activePresetId: presetId,
            });
          }
        },
        () => {
          //
        }
      );
      executeCommand(command, true);
    },
  };
}
