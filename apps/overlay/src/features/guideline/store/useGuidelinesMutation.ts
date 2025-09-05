import { guidelinesSave } from "@/features/guideline/store/guidelinesSave";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IGuidelineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useGuidelinesMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<IGuidelineStore, "id">>) => {
      const guidelines = queryClient.getQueryData<IGuidelineStore>(
        GUIDELINES_KEYS.guidelines(presetId)
      );

      if (guidelines) {
        const newGuidelines = produce(
          guidelines,
          (draftState: IGuidelineStore) => {
            Object.assign(draftState, props);
          }
        );

        await guidelinesSave(presetId, newGuidelines);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GUIDELINES_KEYS.guidelines(presetId),
      });
    },
  });
}
