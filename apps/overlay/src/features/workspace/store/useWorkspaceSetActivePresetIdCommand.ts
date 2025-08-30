import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import type { IPreset } from "@/features/preset/types";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";

export function useWorkspaceSetActivePresetIdCommand() {
  const { data: workspace } = useWorkspaceQuery();
  const executeCommand = useCommandExecute();
  const mutation = useWorkspaceMutation();

  return {
    execute: (presetId: IPreset["id"]) => {
      const command = new Command(
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
