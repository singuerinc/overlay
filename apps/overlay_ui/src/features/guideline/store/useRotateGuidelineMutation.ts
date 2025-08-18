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
      const foundItemIdx = guidelines.findIndex((item) => item.id === id);

      const newGuidelines = produce(
        guidelines,
        (draftState: IGuideLineStore) => {
          draftState[foundItemIdx] = {
            ...draftState[foundItemIdx],
            x: draftState[foundItemIdx].y,
            y: draftState[foundItemIdx].x,
            type:
              draftState[foundItemIdx].type === GUIDELINE_VERTICAL
                ? GUIDELINE_HORIZONTAL
                : GUIDELINE_VERTICAL,
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
