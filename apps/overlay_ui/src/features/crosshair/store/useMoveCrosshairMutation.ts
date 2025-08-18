import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import type { ICrosshairStore } from "@/features/crosshair/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useMoveCrosshairMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, x, y }: { id: string; x: number; y: number }) => {
      const crosshairList = queryClient.getQueryData<ICrosshairStore>(
        CROSSHAIR_KEYS.crosshair
      );
      const foundItemIdx = crosshairList.findIndex((item) => item.id === id);

      const newCrosshairList = produce(
        crosshairList,
        (draftState: ICrosshairStore) => {
          draftState[foundItemIdx] = {
            ...draftState[foundItemIdx],
            x,
            y,
          };
        }
      );

      localStorage.setItem("crosshair", JSON.stringify(newCrosshairList));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CROSSHAIR_KEYS.crosshair });
    },
  });
}
