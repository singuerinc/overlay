import { useActiveFrameId } from "@/appStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IGuideLineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useToggleGuidelinesMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ visible }: { visible: boolean }) => {
      const guidelines = queryClient.getQueryData<IGuideLineStore>(
        GUIDELINES_KEYS.guidelines(frameId)
      );

      const newGuidelines = produce(
        guidelines,
        (draftState: IGuideLineStore) => {
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
