import { PRESETS_KEYS } from "@/features/preset/store/presetsKeys";
import { useWorkspaceId } from "@/features/workspace/hooks/useWorkspaceId";
import { WORKSPACE_KEYS } from "@/features/workspace/store/workspaceKeys";
import type { IWorkspace } from "@/features/workspace/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { type IPreset } from "../types";

export function usePresetAddMutation() {
  const workspaceId = useWorkspaceId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ preset }: { preset: IPreset }) => {
      const workspace = queryClient.getQueryData<IWorkspace[]>(
        WORKSPACE_KEYS.workspace()
      );

      if (!workspace) return;

      const updatedWorkspace = produce(workspace, (draftState: IWorkspace) => {
        draftState.activePresetId = preset.id;
        draftState.presets.push(preset.id);
      });

      localStorage.setItem(
        WORKSPACE_KEYS.workspace().join("-"),
        JSON.stringify(updatedWorkspace)
      );

      localStorage.setItem(
        PRESETS_KEYS.preset(workspaceId, preset.id).join("-"),
        JSON.stringify(preset)
      );

      queryClient.setQueryData(WORKSPACE_KEYS.workspace(), updatedWorkspace);

      queryClient.setQueryData(
        PRESETS_KEYS.preset(workspaceId, preset.id),
        preset
      );

      return preset;
    },
    onSuccess: (preset?: IPreset) => {
      if (preset) {
        queryClient.invalidateQueries({
          queryKey: WORKSPACE_KEYS.workspace(),
        });
        queryClient.invalidateQueries({
          queryKey: PRESETS_KEYS.preset(workspaceId, preset.id),
        });
      }
    },
  });
}
