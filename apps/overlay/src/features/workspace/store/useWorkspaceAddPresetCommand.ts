import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { usePresetAddMutation } from "@/features/preset/store/usePresetAddMutation";
import type { IPreset } from "@/features/preset/types";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";

export function useWorkspaceAddPresetCommand() {
  const { data: workspace } = useWorkspaceQuery();
  const executeCommand = useCommandExecute();
  const addPresetMutation = usePresetAddMutation();

  return {
    execute: (preset: IPreset) => {
      const command = new Command(
        "Workspace - Add preset",
        () => {
          if (workspace) {
            addPresetMutation.mutate({
              preset,
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
