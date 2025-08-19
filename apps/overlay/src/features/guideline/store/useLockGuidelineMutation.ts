import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IGuideLineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useLockGuidelineMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, locked }: { id: string; locked: boolean }) => {
      const guidelines = queryClient.getQueryData<IGuideLineStore>(
        GUIDELINES_KEYS.guidelines
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
              locked,
            };
          }
        );

        localStorage.setItem("guidelines", JSON.stringify(newGuidelines));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guidelines"] });
    },
  });
}
