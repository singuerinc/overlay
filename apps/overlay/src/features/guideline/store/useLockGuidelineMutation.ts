import { useActiveFrameId } from "@/appStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IGuideline } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useLockGuidelineMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, locked }: { id: string; locked: boolean }) => {
      const guideline = queryClient.getQueryData<IGuideline>(
        GUIDELINES_KEYS.guideline(frameId, id)
      );

      if (guideline) {
        const newGuideline = produce(guideline, (draftState: IGuideline) => {
          draftState.locked = locked;
        });

        localStorage.setItem(
          GUIDELINES_KEYS.guideline(frameId, id).join("-"),
          JSON.stringify(newGuideline)
        );
      }
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: GUIDELINES_KEYS.guideline(frameId, id),
      });
    },
  });
}
