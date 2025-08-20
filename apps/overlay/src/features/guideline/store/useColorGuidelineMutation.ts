import { useActiveFrameId } from "@/appStore";
import type { GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IGuideLineStore } from "../types";
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
      const guidelines = queryClient.getQueryData<IGuideLineStore>(
        GUIDELINES_KEYS.guidelines(frameId)
      );
      if (guidelines) {
        const foundItemIdx = guidelines.guidelines.findIndex(
          (item) => item.id === id
        );

        const newGuidelines = produce(
          guidelines,
          (draftState: IGuideLineStore) => {
            draftState.guidelines[foundItemIdx] = {
              ...draftState.guidelines[foundItemIdx],
              color,
            };
          }
        );

        localStorage.setItem(
          GUIDELINES_KEYS.guidelines(frameId).join("-"),
          JSON.stringify(newGuidelines)
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GUIDELINES_KEYS.guidelines(frameId),
      });
    },
  });
}
