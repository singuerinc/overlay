import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { type IGuideLineStore, type IGuideline } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useAddGuidelineMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ guideline }: { guideline: IGuideline }) => {
      const prevGuidelines = queryClient.getQueryData<IGuideLineStore>(
        GUIDELINES_KEYS.guidelines
      );

      const guidelines = produce(
        prevGuidelines,
        (draftState: IGuideLineStore) => {
          draftState.guidelines.push(guideline);
        }
      );

      queryClient.setQueryData(GUIDELINES_KEYS.guidelines, guidelines);
      localStorage.setItem("guidelines", JSON.stringify(guidelines));

      return guidelines;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GUIDELINES_KEYS.guidelines });
    },
  });
}
