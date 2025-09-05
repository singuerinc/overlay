import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import { crosshairSave } from "@/features/crosshair/store/crosshairSave";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { ICrosshairStore } from "../types";

export function useCrosshairMutation() {
  const queryClient = useQueryClient();
  const presetId = usePresetActiveId();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<ICrosshairStore, "id">>) => {
      const crosshair = queryClient.getQueryData<ICrosshairStore>(
        CROSSHAIR_KEYS.crosshair(presetId)
      );

      if (crosshair) {
        const updatedCrosshair = produce(
          crosshair,
          (draftState: ICrosshairStore) => {
            Object.assign(draftState, props);
          }
        );

        await crosshairSave(presetId, updatedCrosshair);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CROSSHAIR_KEYS.crosshair(presetId),
      });
    },
  });
}
