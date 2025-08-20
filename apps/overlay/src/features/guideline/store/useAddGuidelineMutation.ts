import { useActiveFrameId } from "@/appStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { type IGuideLineStore, type IGuideline } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useAddGuidelineMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ guideline }: { guideline: IGuideline }) => {
      const prevGuidelines = queryClient.getQueryData<IGuideLineStore>(
        GUIDELINES_KEYS.guidelines(frameId)
      );

      const guidelines = produce(
        prevGuidelines,
        (draftState: IGuideLineStore) => {
          draftState.guidelines.push(guideline);
        }
      );

      queryClient.setQueryData(GUIDELINES_KEYS.guidelines(frameId), guidelines);
      localStorage.setItem(
        GUIDELINES_KEYS.guidelines(frameId).join("-"),
        JSON.stringify(guidelines)
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
