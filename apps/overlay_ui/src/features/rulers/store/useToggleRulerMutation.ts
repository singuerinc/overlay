import { RULER_KEYS } from "@/features/rulers/store/rulerKeys";
import type { IRulerStore } from "@/features/rulers/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useToggleRulerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ visible }: { visible: boolean }) => {
      const ruler = queryClient.getQueryData<IRulerStore>(RULER_KEYS.ruler);

      const updatedRuler = produce(ruler, (draftState: IRulerStore) => {
        draftState.visible = visible;
      });

      localStorage.setItem("ruler", JSON.stringify(updatedRuler));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RULER_KEYS.ruler });
    },
  });
}
