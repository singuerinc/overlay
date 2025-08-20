import { useActiveFrameId } from "@/appStore";
import { RULER_KEYS } from "@/features/rulers/store/rulerKeys";
import type { IRulerStore } from "@/features/rulers/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useToggleRulerMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ visible }: { visible: boolean }) => {
      const ruler = queryClient.getQueryData<IRulerStore>(
        RULER_KEYS.ruler(frameId)
      );

      const updatedRuler = produce(ruler, (draftState: IRulerStore) => {
        draftState.visible = visible;
      });

      localStorage.setItem(
        RULER_KEYS.ruler(frameId).join("-"),
        JSON.stringify(updatedRuler)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RULER_KEYS.ruler(frameId) });
    },
  });
}
