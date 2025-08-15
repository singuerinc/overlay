import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import type { GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { ICrosshair } from "../types";

export function useColorCrosshairMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      color,
    }: {
      id: string;
      color: GuidelineColorType;
    }) => {
      const crosshairList = queryClient.getQueryData<ICrosshair[]>(
        CROSSHAIR_KEYS.crosshair
      );
      const foundItemIdx = crosshairList.findIndex((item) => item.id === id);

      const newCrosshair = produce(
        crosshairList,
        (draftState: ICrosshair[]) => {
          draftState[foundItemIdx] = {
            ...draftState[foundItemIdx],
            color,
          };
        }
      );

      localStorage.setItem("crosshair", JSON.stringify(newCrosshair));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CROSSHAIR_KEYS.crosshair });
    },
  });
}
