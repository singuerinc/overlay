import { useActiveFrameId } from "@/appStore";
import { RULER_KEYS } from "@/features/rulers/store/rulerKeys";
import type { IRuler } from "@/features/rulers/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useSetPositionRulerMutation() {
  const queryClient = useQueryClient();
  const frameId = useActiveFrameId();

  return useMutation({
    mutationFn: async ({ position }: { position: IRuler["position"] }) => {
      const ruler = queryClient.getQueryData<IRuler>(RULER_KEYS.ruler(frameId));
      if (ruler) {
        const updatedRuler = produce(ruler, (draftState: IRuler) => {
          draftState.position = position;
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
