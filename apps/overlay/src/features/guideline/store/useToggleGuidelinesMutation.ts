import { useActiveFrameId } from "@/appStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IGuidelineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useToggleGuidelinesMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ visible }: { visible: boolean }) => {
      const guidelines = queryClient.getQueryData<IGuidelineStore>(
        GUIDELINES_KEYS.guidelines(frameId)
      );

      const newGuidelines = produce(
        guidelines,
        (draftState: IGuidelineStore) => {
          draftState.visible = visible;
        }
      );

      localStorage.setItem(
        GUIDELINES_KEYS.guidelines(frameId).join("-"),
        JSON.stringify(newGuidelines)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GUIDELINES_KEYS.guidelines(frameId),
      });
    },
  });
}
