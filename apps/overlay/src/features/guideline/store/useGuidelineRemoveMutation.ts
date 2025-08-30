import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { type IGuideline, type IGuidelineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useGuidelineRemoveMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ guideline }: { guideline: IGuideline }) => {
      const prevGuidelines = queryClient.getQueryData<IGuidelineStore>(
        GUIDELINES_KEYS.guidelines(presetId)
      );

      const guidelines = produce(
        prevGuidelines,
        (draftState: IGuidelineStore) => {
          draftState.guidelines = draftState.guidelines.filter(
            (guidelineId) => guidelineId !== guideline.id
          );
        }
      );

      queryClient.setQueryData(
        GUIDELINES_KEYS.guidelines(presetId),
        guidelines
      );
      queryClient.setQueryData(
        GUIDELINES_KEYS.guideline(presetId, guideline.id),
        undefined
      );

      localStorage.setItem(
        GUIDELINES_KEYS.guidelines(presetId).join("-"),
        JSON.stringify(guidelines)
      );

      localStorage.removeItem(
        GUIDELINES_KEYS.guideline(presetId, guideline.id).join("-")
      );

      return guidelines;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GUIDELINES_KEYS.guidelines(presetId),
      });
    },
  });
}
