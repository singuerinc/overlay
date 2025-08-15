import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { ICrosshairStore } from "../types";

export function useToggleCrosshairMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      const crosshairList = queryClient.getQueryData<ICrosshairStore>(
        CROSSHAIR_KEYS.crosshair
      );
      const foundItemIdx = crosshairList.findIndex((item) => item.id === id);

      const newCrosshairList = produce(
        crosshairList,
        (draftState: ICrosshairStore) => {
          draftState[foundItemIdx] = {
            ...draftState[foundItemIdx],
            visible,
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
