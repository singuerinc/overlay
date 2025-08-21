import { useActiveFrameId } from "@/appStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { type IGuideline, type IGuidelineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useGuidelineAddMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ guideline }: { guideline: IGuideline }) => {
      const prevGuidelines = queryClient.getQueryData<IGuidelineStore>(
        GUIDELINES_KEYS.guidelines(frameId)
      );

      const guidelines = produce(
        prevGuidelines,
        (draftState: IGuidelineStore) => {
          draftState.guidelines.push(guideline.id);
        }
      );

      queryClient.setQueryData(GUIDELINES_KEYS.guidelines(frameId), guidelines);
      queryClient.setQueryData(
        GUIDELINES_KEYS.guideline(frameId, guideline.id),
        guideline
      );

      localStorage.setItem(
        GUIDELINES_KEYS.guidelines(frameId).join("-"),
        JSON.stringify(guidelines)
      );
      localStorage.setItem(
        GUIDELINES_KEYS.guideline(frameId, guideline.id).join("-"),
        JSON.stringify(guideline)
      );

      return guidelines;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GUIDELINES_KEYS.guidelines(frameId),
      });
    },
  });
}
