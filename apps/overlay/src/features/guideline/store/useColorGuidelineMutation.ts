import type { GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IGuideLineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useColorGuidelineMutation() {
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
        GUIDELINES_KEYS.guidelines
      );
      const foundItemIdx = guidelines.findIndex((item) => item.id === id);

      const newGuidelines = produce(
        guidelines,
        (draftState: IGuideLineStore) => {
          draftState[foundItemIdx] = {
            ...draftState[foundItemIdx],
            color,
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
