import { useActiveFrameId } from "@/appStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import {
  GUIDELINE_HORIZONTAL,
  GUIDELINE_VERTICAL,
  type IGuideline,
} from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useRotateGuidelineMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const guideline = queryClient.getQueryData<IGuideline>(
        GUIDELINES_KEYS.guideline(frameId, id)
      );
      if (guideline) {
        const newGuideline = produce(guideline, (draftState: IGuideline) => {
          draftState.x = guideline.y;
          draftState.y = guideline.x;
          draftState.type =
            guideline.type === GUIDELINE_VERTICAL
              ? GUIDELINE_HORIZONTAL
              : GUIDELINE_VERTICAL;
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
