import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import {
  GUIDELINE_HORIZONTAL,
  GUIDELINE_VERTICAL,
  type IGuideLineStore,
} from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useRotateGuidelineMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
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
              x: draftState.guidelines[foundItemIdx].y,
              y: draftState.guidelines[foundItemIdx].x,
              type:
                draftState.guidelines[foundItemIdx].type === GUIDELINE_VERTICAL
                  ? GUIDELINE_HORIZONTAL
                  : GUIDELINE_VERTICAL,
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
