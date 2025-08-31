import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import type { IPreset } from "@/features/preset/types";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";

export function useWorkspaceAddPresetCommand() {
  const { data: workspace } = useWorkspaceQuery();
  const executeCommand = useCommandExecute();
  const mutation = useWorkspaceMutation();

  return {
    execute: (preset: IPreset) => {
      const command = new Command(
        "Workspace - Add preset",
        () => {
          if (workspace) {
            mutation.mutate({
              presets: [...workspace.presets, preset.id],
              activePresetId: preset.id,
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
