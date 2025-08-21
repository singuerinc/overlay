import { useActiveFrameId } from "@/appStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { type IGuideline } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useGuidelineMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: { id: string } & Partial<IGuideline>) => {
      const guideline = queryClient.getQueryData<IGuideline>(
        GUIDELINES_KEYS.guideline(frameId, props.id)
      );
      if (guideline) {
        const newGuideline = produce(guideline, (draftState: IGuideline) => {
          Object.assign(draftState, props);
        });

        localStorage.setItem(
          GUIDELINES_KEYS.guideline(frameId, props.id).join("-"),
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
