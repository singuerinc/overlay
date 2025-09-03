import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { type IGuideline } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useGuidelineMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      props: { id: IGuideline["id"] } & Partial<IGuideline>
    ) => {
      const guideline = queryClient.getQueryData<IGuideline>(
        GUIDELINES_KEYS.guideline(presetId, props.id)
      );
      if (guideline) {
        const newGuideline = produce(guideline, (draftState: IGuideline) => {
          Object.assign(draftState, props);
        });

        localStorage.setItem(
          GUIDELINES_KEYS.guideline(presetId, props.id).join("-"),
          JSON.stringify(newGuideline)
        );

        return newGuideline;
      }

      return guideline;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: GUIDELINES_KEYS.guideline(presetId, id),
      });
    },
  });
}
