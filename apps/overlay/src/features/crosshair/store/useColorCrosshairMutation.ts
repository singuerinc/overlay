import { useActiveFrameId } from "@/appStore";
import type { CrosshairColorType } from "@/features/crosshair/CrosshairColor";
import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { ICrosshair } from "../types";

export function useColorCrosshairMutation() {
  const queryClient = useQueryClient();
  const frameId = useActiveFrameId();

  return useMutation({
    mutationFn: async ({ color }: { color: CrosshairColorType }) => {
      const crosshair = queryClient.getQueryData<ICrosshair>(
        CROSSHAIR_KEYS.crosshair(frameId)
      );

      const updatedCrosshair = produce(crosshair, (draftState: ICrosshair) => {
        draftState.color = color;
      });

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
