import { useActiveFrameId } from "@/appStore";
import { RULER_KEYS } from "@/features/rulers/store/rulerKeys";
import type { IRuler } from "@/features/rulers/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useSetOriginRulerMutation() {
  const queryClient = useQueryClient();
  const frameId = useActiveFrameId();

  return useMutation({
    mutationFn: async ({
      originX,
      originY,
    }: {
      originX: number;
      originY: number;
    }) => {
      const ruler = queryClient.getQueryData<IRuler>(RULER_KEYS.ruler(frameId));
      if (ruler) {
        const updatedRuler = produce(ruler, (draftState: IRuler) => {
          draftState.originX = originX;
          draftState.originY = originY;
        });

        localStorage.setItem(
          RULER_KEYS.ruler(frameId).join("-"),
          JSON.stringify(updatedRuler)
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RULER_KEYS.ruler(frameId) });
    },
  });
}
