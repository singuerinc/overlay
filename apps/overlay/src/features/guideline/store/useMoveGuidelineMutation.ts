import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IGuideLineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useMoveGuidelineMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, x, y }: { id: string; x: number; y: number }) => {
      const guidelines = queryClient.getQueryData<IGuideLineStore>(
        GUIDELINES_KEYS.guidelines
      );
      const foundItemIdx = guidelines.findIndex((item) => item.id === id);

      const newGuidelines = produce(
        guidelines,
        (draftState: IGuideLineStore) => {
          draftState[foundItemIdx] = {
            ...draftState[foundItemIdx],
            x,
            y,
          };
        }
      );

      localStorage.setItem("guidelines", JSON.stringify(newGuidelines));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guidelines"] });
    },
  });
}
