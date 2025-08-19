import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IGuideLineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useToggleGuidelinesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ visible }: { visible: boolean }) => {
      const guidelines = queryClient.getQueryData<IGuideLineStore>(
        GUIDELINES_KEYS.guidelines
      );

      const newGuidelines = produce(
        guidelines,
        (draftState: IGuideLineStore) => {
          draftState.isGuidelinesVisible = visible;
        }
      );

      localStorage.setItem("guidelines", JSON.stringify(newGuidelines));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GUIDELINES_KEYS.guidelines });
    },
  });
}
