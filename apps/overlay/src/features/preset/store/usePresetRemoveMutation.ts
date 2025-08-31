import { PRESETS_KEYS } from "@/features/preset/store/presetsKeys";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";
import { WORKSPACE_KEYS } from "@/features/workspace/store/workspaceKeys";
import type { IWorkspace } from "@/features/workspace/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type IPreset } from "../types";

export function usePresetRemoveMutation() {
  const queryClient = useQueryClient();
  const workspaceMutation = useWorkspaceMutation();

  return useMutation({
    mutationFn: async ({ preset }: { preset: IPreset }) => {
      const workspace = queryClient.getQueryData<IWorkspace>(
        WORKSPACE_KEYS.workspace()
      );

      if (workspace) {
        await workspaceMutation.mutateAsync({
          activePresetId: workspace.presets.at(0) ?? null,
          presets: workspace.presets.filter(
            (presetId) => presetId !== preset.id
          ),
        });

        localStorage.removeItem(
          PRESETS_KEYS.preset(workspace.id, preset.id).join("-")
        );

        queryClient.setQueryData(
          PRESETS_KEYS.preset(workspace.id, preset.id),
          undefined
        );

        return {
          workspaceId: workspace.id,
          presetId: preset.id,
        };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: WORKSPACE_KEYS.workspace(),
      });
    },
  });
}
