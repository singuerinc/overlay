import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { ICrosshairStore } from "../types";

export function useToggleCrosshairMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ visible }: { visible: boolean }) => {
      const crosshair = queryClient.getQueryData<ICrosshairStore>(
        CROSSHAIR_KEYS.crosshair
      );

      const updatedCrosshair = produce(
        crosshair,
        (draftState: ICrosshairStore) => {
          draftState.visible = visible;
        }
      );
      console.log({ updatedCrosshair });
      localStorage.setItem("crosshair", JSON.stringify(updatedCrosshair));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CROSSHAIR_KEYS.crosshair });
    },
  });
}
