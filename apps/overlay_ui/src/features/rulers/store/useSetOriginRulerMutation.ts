import { RULER_KEYS } from "@/features/rulers/store/rulerKeys";
import type { IRuler } from "@/features/rulers/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useSetOriginRulerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      originX,
      originY,
    }: {
      originX: number;
      originY: number;
    }) => {
      const ruler = queryClient.getQueryData<IRuler>(RULER_KEYS.ruler);
      if (ruler) {
        const updatedRuler = produce(ruler, (draftState: IRuler) => {
          draftState.originX = originX;
          draftState.originY = originY;
        });

        localStorage.setItem("ruler", JSON.stringify(updatedRuler));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RULER_KEYS.ruler });
    },
  });
}
