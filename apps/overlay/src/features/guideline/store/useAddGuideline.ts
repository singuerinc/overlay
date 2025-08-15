import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { IGuideLineStore, type IGuideline } from "../types";

export function useAddGuideline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ guideline }: { guideline: IGuideline }) => {
      const prevGuidelines = queryClient.getQueryData<IGuideLineStore>([
        "guidelines",
      ]);

      const guidelines = produce(
        prevGuidelines,
        (draftState: IGuideLineStore) => {
          draftState.push(guideline);
        }
      );

      queryClient.setQueryData(["guidelines"], guidelines);
      localStorage.setItem("guidelines", JSON.stringify(guidelines));

      return guidelines;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guidelines"] });
    },
  });
}
