import { PRESETS_KEYS } from "@/features/preset/store/presetsKeys";
import { useWorkspaceId } from "@/features/workspace/hooks/useWorkspaceId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IPreset } from "../types";

export function usePresetMutation() {
  const workspaceId = useWorkspaceId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: { id: IPreset["id"] } & Partial<IPreset>) => {
      const preset = queryClient.getQueryData<IPreset>(
        PRESETS_KEYS.preset(workspaceId, props.id)
      );

      const updatedPreset = produce(preset, (draftState: IPreset) => {
        Object.assign(draftState, props);
      });

      localStorage.setItem(
        PRESETS_KEYS.preset(workspaceId, props.id).join("-"),
        JSON.stringify(updatedPreset)
      );

      return updatedPreset;
    },
    onSuccess: (preset?: IPreset) => {
      if (preset) {
        queryClient.setQueryData(
          PRESETS_KEYS.preset(workspaceId, preset.id),
          preset
        );
      }
    },
  });
}
