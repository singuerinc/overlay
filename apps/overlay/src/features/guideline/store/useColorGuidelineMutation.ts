import { useActiveFrameId } from "@/appStore";
import type { GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IGuideline, IGuidelineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useColorGuidelineMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      color,
    }: {
      id: string;
      color: GuidelineColorType;
    }) => {
      const guideline = queryClient.getQueryData<IGuidelineStore>(
        GUIDELINES_KEYS.guideline(frameId, id)
      );
      if (guideline) {
        const newGuideline = produce(guideline, (draftState: IGuideline) => {
          draftState.color = color;
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
