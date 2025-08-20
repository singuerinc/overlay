import { useActiveFrameId } from "@/appStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IGuideline } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useMoveGuidelineMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, x, y }: { id: string; x: number; y: number }) => {
      const guideline = queryClient.getQueryData<IGuideline>(
        GUIDELINES_KEYS.guideline(frameId, id)
      );
      if (guideline) {
        const newGuideline = produce(guideline, (draftState: IGuideline) => {
          draftState.x = x;
          draftState.y = y;
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
