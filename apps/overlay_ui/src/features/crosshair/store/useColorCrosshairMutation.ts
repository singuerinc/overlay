import type { CrosshairColorType } from "@/features/crosshair/CrosshairColor";
import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { ICrosshair } from "../types";

export function useColorCrosshairMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ color }: { color: CrosshairColorType }) => {
      const crosshair = queryClient.getQueryData<ICrosshair>(
        CROSSHAIR_KEYS.crosshair
      );

      const updatedCrosshair = produce(crosshair, (draftState: ICrosshair) => {
        draftState.color = color;
      });

      localStorage.setItem("crosshair", JSON.stringify(updatedCrosshair));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CROSSHAIR_KEYS.crosshair });
    },
  });
}
