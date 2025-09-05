import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { RULER_KEYS } from "@/features/rulers/store/rulerKeys";
import { rulerSave } from "@/features/rulers/store/rulerSave";
import type { IRulerStore } from "@/features/rulers/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useRulerMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<IRulerStore, "id" | "type">>) => {
      const ruler = queryClient.getQueryData<IRulerStore>(
        RULER_KEYS.ruler(presetId)
      );

      if (ruler) {
        const updatedRuler = produce(ruler, (draftState: IRulerStore) => {
          Object.assign(draftState, props);
        });

        await rulerSave(presetId, updatedRuler);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RULER_KEYS.ruler(presetId) });
    },
  });
}
