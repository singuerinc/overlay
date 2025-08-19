import { useActiveFrameId } from "@/appStore";
import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { ICrosshairStore } from "../types";

export function useToggleCrosshairMutation() {
  const queryClient = useQueryClient();
  const frameId = useActiveFrameId();

  return useMutation({
    mutationFn: async ({ visible }: { visible: boolean }) => {
      const crosshair = queryClient.getQueryData<ICrosshairStore>(
        CROSSHAIR_KEYS.crosshair(frameId)
      );

      const updatedCrosshair = produce(
        crosshair,
        (draftState: ICrosshairStore) => {
          draftState.visible = visible;
        }
      );

      localStorage.setItem(
        CROSSHAIR_KEYS.crosshair(frameId).join("-"),
        JSON.stringify(updatedCrosshair)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CROSSHAIR_KEYS.crosshair(frameId),
      });
    },
  });
}
